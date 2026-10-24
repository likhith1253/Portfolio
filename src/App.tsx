import { Fragment, useCallback, useEffect, useRef, type ReactNode } from "react";
import { ALSO_BUILT, CERTS, EDUCATION, EXPERIENCE, OPEN_SOURCE, PROJECTS, RECOGNITION, SITE, type Project } from "@/data/site";
import { formatNumber, initMotion } from "@/lib/motion";
import EmbeddingField from "@/components/EmbeddingField";
import SkillMap from "@/components/SkillMap";
import Ask from "@/components/Ask";
import VeridexViz from "@/components/viz/VeridexViz";
import DocRagViz from "@/components/viz/DocRagViz";
import SynergyViz from "@/components/viz/SynergyViz";
import CensusViz from "@/components/viz/CensusViz";
import CapstoneViz from "@/components/viz/CapstoneViz";
import GridViz from "@/components/viz/GridViz";

const VIZ: Record<string, () => ReactNode> = {
  veridex: () => <VeridexViz />,
  docrag: () => <DocRagViz />,
  synergy: () => <SynergyViz />,
  censusgrid: () => <CensusViz />,
  capstone: () => <CapstoneViz />,
};

const NAV = [
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#ask", label: "ask" },
  { href: "#contact", label: "contact" },
];

type Seg = string | { em: string };
function Words({ as: Tag = "h2", parts, className = "" }: { as?: "h1" | "h2" | "h3"; parts: Seg[]; className?: string }) {
  const words: { w: string; em: boolean }[] = [];
  parts.forEach((p) => {
    const em = typeof p !== "string";
    (em ? p.em : p).split(/\s+/).filter(Boolean).forEach((w) => words.push({ w, em }));
  });
  return (
    <Tag className={`reveal-words ${className}`}>
      {words.map((x, i) => (
        <Fragment key={i}>
          <span className="w">{x.em ? <span><em>{x.w}</em></span> : <span>{x.w}</span>}</span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}

function SecHead({ n, label, title, sub }: { n: string; label: string; title: Seg[]; sub?: string }) {
  return (
    <div className="sec-head">
      <span className="label">{n} / {label}</span>
      <div>
        <Words parts={title} />
        {sub && <p data-reveal>{sub}</p>}
      </div>
    </div>
  );
}

function Count({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  return <b data-count={value} data-decimals={decimals} data-suffix={suffix}>{formatNumber(value, decimals)}{suffix}</b>;
}

function ProjectScene({ p, i }: { p: Project; i: number }) {
  return (
    <article className="project" id={p.id} aria-labelledby={`${p.id}-title`}>
      <div className="project-text">
        <div className="p-index">
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <span className="k">{p.kind}</span>
        </div>
        <h3 id={`${p.id}-title`}>{p.name}</h3>
        <p className="one">{p.oneLiner}</p>
        <p className="problem">{p.problem}</p>
        <ul className="built">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
        <div className="stack">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
        <div className="links">
          {p.links.map((l) => (
            <a key={l.href} className="link-pill" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
      <div className="viz-col">
        {VIZ[p.id]?.()}
        <div className="metrics">
          {p.metrics.map((m) => (
            <div className="metric" key={m.label}>
              <Count value={m.value} decimals={m.decimals} suffix={m.suffix} />
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        {p.metricNote && <p className="metric-note">{p.metricNote}</p>}
      </div>
    </article>
  );
}

const TICKS = [
  { v: "84.4%", l: "answer accuracy · DocRag" },
  { v: "95.3%", l: "correct citations · DocRag" },
  { v: "90.15", l: "F1 · Veridex reconciliation" },
  { v: "482", l: "backend tests · Veridex" },
  { v: "457K+", l: "villages served · CensusGrid" },
  { v: "95.41%", l: "test accuracy · ML Capstone" },
  { v: "2", l: "internships · 2026" },
];

export default function App() {
  const epochRef = useRef<HTMLSpanElement>(null);
  const lossRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<HTMLSpanElement>(null);

  const onStats = useCallback((epoch: number, loss: number) => {
    if (epochRef.current) epochRef.current.textContent = String(epoch).padStart(3, "0");
    if (lossRef.current) lossRef.current.textContent = loss.toFixed(3);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let alive = true;
    initMotion().then((c) => { if (alive) cleanup = c; else c(); });

    // typed query in the hero
    const text = "who builds ML systems end to end?";
    let i = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    if (typed.current && !reduced) {
      typed.current.textContent = "";
      timer = window.setInterval(() => {
        if (!typed.current) return;
        typed.current.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(timer);
      }, 42);
    }

    // custom cursor + magnetic buttons (fine pointers only)
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dot = document.querySelector<HTMLElement>(".cursor");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    let raf = 0;
    const m = { x: -100, y: -100, rx: -100, ry: -100 };
    const move = (e: PointerEvent) => {
      m.x = e.clientX; m.y = e.clientY;
      const hot = (e.target as HTMLElement).closest("a,button,[role=button],input");
      ring?.classList.toggle("is-hover", !!hot);
    };
    const loop = () => {
      m.rx += (m.x - m.rx) * 0.18; m.ry += (m.y - m.ry) * 0.18;
      if (dot) dot.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${m.rx}px, ${m.ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const btns = Array.from(document.querySelectorAll<HTMLElement>(".btn, .nav-cta"));
    const magnet = (e: PointerEvent) => {
      const b = e.currentTarget as HTMLElement;
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    };
    const unmagnet = (e: PointerEvent) => { (e.currentTarget as HTMLElement).style.transform = ""; };
    if (fine && !reduced) {
      window.addEventListener("pointermove", move);
      raf = requestAnimationFrame(loop);
      btns.forEach((b) => { b.addEventListener("pointermove", magnet); b.addEventListener("pointerleave", unmagnet); });
    }

    // highlight the section in view
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === `#${en.target.id}`)));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const s = document.querySelector(n.href); if (s) io.observe(s); });

    return () => {
      alive = false;
      cleanup?.();
      clearInterval(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      btns.forEach((b) => { b.removeEventListener("pointermove", magnet); b.removeEventListener("pointerleave", unmagnet); });
      io.disconnect();
    };
  }, []);

  const [tg, bluestock] = EXPERIENCE;

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      <nav className="nav" aria-label="Primary">
        <a className="nav-brand" href="#top" aria-label="Likhith Ponnada, back to top">
          <span className="dot" aria-hidden="true" /> likhith.ponnada
        </a>
        <ul className="nav-links">
          {NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
        </ul>
        <a className="nav-cta" href={SITE.resume} target="_blank" rel="noopener">résumé ↗</a>
      </nav>

      <header className="hero" id="top">
        <EmbeddingField onStats={onStats} />
        <div className="hero-fade" aria-hidden="true" />
        <div className="hero-inner wrap">
          <div className="query" aria-hidden="true">
            <span className="acid">&gt;</span> <span ref={typed}>who builds ML systems end to end?</span><span className="caret" />
          </div>
          <h1>
            <span className="line"><span>Likhith</span></span>
            <span className="line"><span className="outline">Ponnada</span></span>
          </h1>
          <div className="hero-row">
            <p className="hero-lede">{SITE.headline}</p>
            <div className="hero-side">
              <a className="hero-id" href="#about" aria-label="About Likhith: jump to the About section">
                <img className="avatar" src="/images/avatar.jpg" width={240} height={240} alt="Portrait of Likhith Ponnada" fetchPriority="high" />
                <span className="hero-id-text mono">
                  <span className="status"><i aria-hidden="true" /> {SITE.lookingFor}</span>
                  <span style={{ color: "var(--muted)" }}>{SITE.location}</span>
                </span>
              </a>
              <div className="btns">
                <a className="btn primary" href="#work">See the work <span className="arrow" aria-hidden="true">→</span></a>
                <a className="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
              <span className="mono" style={{ color: "var(--dim)" }} aria-hidden="true">
                epoch <span ref={epochRef}>120</span>/120 · loss <span ref={lossRef}>0.077</span> · move to query · hold to widen · click to retrain
              </span>
            </div>
          </div>
        </div>
        <span className="scroll-hint label" aria-hidden="true">scroll</span>
      </header>

      <div className="ticker" role="region" aria-label="Selected results">
        <div className="ticker-track">
          {[0, 1].map((k) => TICKS.map((t) => (
            <div className="tick" key={`${k}-${t.l}`} aria-hidden={k === 1}>
              <b>{t.v}</b><span>{t.l}</span>
            </div>
          )))}
        </div>
      </div>

      <main id="main" tabIndex={-1}>
        <section id="work" className="section" aria-label="Selected work">
          <div className="wrap">
            <SecHead
              n="01" label="Selected work"
              title={["Systems I've built,", { em: "and what happens inside them." }]}
              sub={SITE.intro}
            />
            {PROJECTS.map((p, i) => <ProjectScene key={p.id} p={p} i={i} />)}
          </div>
        </section>

        <section id="experience" className="section" aria-label="Experience">
          <div className="wrap">
            <SecHead n="02" label="Experience" title={["Internships, where the", { em: "data was real." }]} />
            <div className="exp">
              <article className="role featured" data-reveal aria-labelledby="tg-title">
                <div>
                  <div className="role-top">
                    <span className="tag">AI/ML internship</span>
                    <span className="mono" style={{ color: "var(--muted)" }}>{tg.period}</span>
                  </div>
                  <h3 id="tg-title">{tg.org}</h3>
                  <p className="title">{tg.title} <span>· {tg.location}</span></p>
                  <p className="sum">{tg.summary}</p>
                  <ul className="built">{tg.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <div className="stack">{tg.tools.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </div>
                <GridViz />
              </article>
              <article className="role" data-reveal aria-labelledby="bs-title">
                <div>
                  <div className="role-top">
                    <span className="tag">Data internship</span>
                    <span className="mono" style={{ color: "var(--muted)" }}>{bluestock.period}</span>
                  </div>
                  <h3 id="bs-title">{bluestock.org}</h3>
                  <p className="title">{bluestock.title} <span>· {bluestock.location}</span></p>
                  <p className="sum">{bluestock.summary}</p>
                  <ul className="built">{bluestock.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <div className="stack">{bluestock.tools.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </div>
                <div className="metrics" style={{ alignSelf: "start" }}>
                  <div className="metric"><Count value={46000} suffix="+" /><span>NAV records in the pipeline</span></div>
                  <div className="metric"><Count value={32000} suffix="+" /><span>investor transactions</span></div>
                  <div className="metric"><Count value={15} suffix="+" /><span>analytical visualizations</span></div>
                  <div className="metric"><Count value={6} /><span>risk metrics computed</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-label="About">
          <div className="wrap">
            <SecHead n="03" label="About" title={["Who's", { em: "behind the systems." }]} />
            <div className="about">
              <figure className="portrait" data-reveal>
                <img
                  src="/images/profile.jpg"
                  width={836}
                  height={1019}
                  loading="lazy"
                  decoding="async"
                  alt="Likhith Ponnada at his desk with code open on two monitors, wearing a dark green sweatshirt."
                />
                <i className="corner tl" aria-hidden="true" /><i className="corner br" aria-hidden="true" />
                <figcaption className="mono">likhith · {SITE.location.toLowerCase()}</figcaption>
              </figure>
              <div className="about-body" data-reveal>
                <p className="about-lede">{SITE.intro}</p>
                <p>
                  The work around the model matters as much as the model: evaluation harnesses, permission checks, test suites,
                  and write-ups that say plainly what didn't work. In 2026 that meant two internships and five projects
                  with working backends, tests and published results.
                </p>
                <ul className="fact-list">
                  <li><span>Studying</span><span>{EDUCATION.degree.replace("B.Tech in ", "B.Tech · ")}, {EDUCATION.school}</span></li>
                  <li><span>Graduating</span><span>{EDUCATION.expected.replace("Expected ", "")}</span></li>
                  <li><span>Based in</span><span>{SITE.location}</span></li>
                  <li><span>Looking for</span><span>AI/ML and software engineering internships</span></li>
                </ul>
                <div className="btns" style={{ marginTop: 24 }}>
                  <a className="btn primary" href={`mailto:${SITE.email}`}>Say hello <span className="arrow" aria-hidden="true">→</span></a>
                  <a className="btn" href={SITE.resume} target="_blank" rel="noopener">Résumé (PDF)</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section" aria-label="Skills">
          <div className="wrap">
            <SecHead
              n="04" label="Skills"
              title={["What I work with,", { em: "mapped by where I've used it." }]}
              sub="Bigger nodes show up in more projects. Pick one to see where it's used and what it travels with."
            />
            <SkillMap />
          </div>
        </section>

        <section id="ask" className="section" aria-label="Ask this page">
          <div className="wrap">
            <SecHead
              n="05" label="Ask"
              title={["Ask this page", { em: "a question." }]}
              sub="A small BM25 index over everything on this site. It retrieves the best passages and cites the section they came from. No language model, no server."
            />
            <Ask />
          </div>
        </section>

        <section id="more" className="section" aria-label="Other projects, education and more">
          <div className="wrap">
            <SecHead n="06" label="Also" title={["Smaller builds,", { em: "school and the rest." }]} />
            <div className="cards3">
              {ALSO_BUILT.map((a) => (
                <a key={a.name} className="card" href={a.href} target="_blank" rel="noopener noreferrer" data-reveal>
                  <h4>{a.name} <span className="acid" aria-hidden="true">↗</span></h4>
                  <p>{a.text}</p>
                </a>
              ))}
            </div>
            <div className="facts">
              <div className="card" data-reveal>
                <span className="label">Education</span>
                <h4 style={{ marginTop: 10 }}>{EDUCATION.school}</h4>
                <p>{EDUCATION.degree} · {EDUCATION.expected} · {EDUCATION.cgpa}</p>
                <div className="stack" style={{ marginTop: 14, marginBottom: 0 }}>{EDUCATION.coursework.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
              </div>
              <div className="card" data-reveal>
                <span className="label">Certifications · open source · recognition</span>
                <ul className="fact-list" style={{ marginTop: 14 }}>
                  {CERTS.map((c) => (
                    <li key={c.title}><a href={c.href} target="_blank" rel="noopener noreferrer">{c.title} ↗</a><span>{c.issuer}</span></li>
                  ))}
                  {OPEN_SOURCE.map((o) => (
                    <li key={o.name}>{o.href ? <a href={o.href} target="_blank" rel="noopener noreferrer">{o.name} ↗</a> : <span>{o.name}</span>}<span>{o.text}</span></li>
                  ))}
                  {RECOGNITION.map((r) => <li key={r.name}><span>{r.name}</span><span>{r.text}</span></li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="contact" aria-label="Contact">
        <div className="wrap">
          <span className="label">07 / Contact</span>
          <Words as="h2" className="contact-title" parts={["Building something", { em: "that has to work?" }]} />
          <a className="big-mail" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <div className="btns">
            <a className="btn primary" href={SITE.resume} target="_blank" rel="noopener">Résumé (PDF) <span className="arrow" aria-hidden="true">↗</span></a>
            <a className="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="foot mono">
            <span>© 2026 {SITE.name} · Hyderabad</span>
            <span>
              for machines: <a href="/llms.txt">llms.txt</a> · <a href="/profile.json">profile.json</a> · <a href="/sitemap.xml">sitemap</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
