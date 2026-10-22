import { useEffect, useState, type RefObject } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reduced-motion preference, resolved after mount so prerendered HTML and the client agree. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Small seeded PRNG so decorative layouts are identical on the server and the client. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** True while the element is (nearly) on screen. Used to pause offscreen animation loops. */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "120px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** requestAnimationFrame loop that only runs while `active`. `draw` receives seconds since start. */
export function useLoop(active: boolean, draw: (t: number, dt: number) => void) {
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const start = last;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw((now - start) / 1000, dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // draw is intentionally not a dependency: components keep mutable state in refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

export const formatNumber = (v: number, decimals = 0) =>
  v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Smooth scroll + scroll-driven reveals. Called once on the client. */
export async function initMotion(): Promise<() => void> {
  const reduced = prefersReducedMotion();
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  const cleanups: (() => void)[] = [];

  // scroll progress bar
  const bar = document.querySelector<HTMLElement>(".progress");
  if (bar) {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})`; },
    });
    cleanups.push(() => st.kill());
  }

  // counters always land on their final value; with motion they count up
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    const render = (v: number) => { el.textContent = formatNumber(v, decimals) + suffix; };
    if (reduced) { render(target); return; }
    const obj = { v: 0 };
    render(0);
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => render(obj.v),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    cleanups.push(() => tween.kill());
  });

  if (reduced) {
    return () => cleanups.forEach((c) => c());
  }

  const { default: Lenis } = await import("lenis");
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => { gsap.ticker.remove(raf); lenis.destroy(); });

  // anchor links go through Lenis so they glide instead of jumping
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")!;
    const target = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -70 });
    history.replaceState(null, "", id);
    if (id === "#main") target.focus({ preventScroll: true });
  };
  document.addEventListener("click", onClick);
  cleanups.push(() => document.removeEventListener("click", onClick));

  // hero entrance
  const heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .from(".hero h1 .line > span", { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.12 })
    .from(".hero .query", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.1)
    .from(".hero-lede, .hero-side > *", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.55);
  cleanups.push(() => heroTl.kill());

  // headings reveal word by word
  document.querySelectorAll<HTMLElement>(".reveal-words").forEach((el) => {
    const words = el.querySelectorAll(".w > span");
    const tw = gsap.from(words, {
      yPercent: 105,
      duration: 1,
      ease: "expo.out",
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    cleanups.push(() => tw.kill());
  });

  // generic fade-up
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    const tw = gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    cleanups.push(() => tw.kill());
  });

  // project visual panels tilt into place
  gsap.utils.toArray<HTMLElement>(".viz-col").forEach((el) => {
    const tw = gsap.from(el, {
      y: 80,
      rotateX: 8,
      opacity: 0,
      transformPerspective: 900,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    cleanups.push(() => tw.kill());
  });

  // the hero canvas drifts up and fades as you leave it
  const heroFx = gsap.to(".hero-canvas", {
    yPercent: 18,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  cleanups.push(() => heroFx.kill());

  ScrollTrigger.refresh();
  return () => cleanups.forEach((c) => c());
}
