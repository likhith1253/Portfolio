import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// The hero background: points start as noise and "train" into labelled clusters.
// The pointer acts as a query vector; its k nearest neighbours light up.
const CLUSTERS = [
  { label: "ML & AI", color: [200, 255, 62], x: 0.66, y: 0.26, spread: 0.075 },
  { label: "Retrieval", color: [124, 156, 255], x: 0.86, y: 0.42, spread: 0.06 },
  { label: "Data", color: [255, 181, 71], x: 0.53, y: 0.5, spread: 0.065 },
  { label: "Backend", color: [236, 234, 228], x: 0.76, y: 0.66, spread: 0.07 },
  { label: "Frontend", color: [255, 90, 60], x: 0.92, y: 0.16, spread: 0.045 },
];
const K = 10;
const TRAIN_SECONDS = 3.2;

interface Pt { x: number; y: number; sx: number; sy: number; tx: number; ty: number; c: number; ph: number; r: number; }

function gauss() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function EmbeddingField({ onStats }: { onStats?: (epoch: number, loss: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, dpr = 1;
    let pts: Pt[] = [];
    let trainStart = performance.now();
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const mobile = () => w < 760;

    const seed = () => {
      const n = mobile() ? 520 : 1100;
      const weights = [0.28, 0.2, 0.2, 0.2, 0.12];
      pts = [];
      for (let i = 0; i < n; i++) {
        let c = 0, acc = 0;
        const r = Math.random();
        for (let j = 0; j < weights.length; j++) { acc += weights[j]; if (r <= acc) { c = j; break; } }
        const cl = CLUSTERS[c];
        // on narrow screens pull the clusters toward the middle so they sit behind the headline
        const cx = mobile() ? 0.12 + cl.x * 0.8 : cl.x;
        const cy = mobile() ? 0.05 + cl.y * 0.36 : cl.y;
        const sx = Math.random() * w, sy = Math.random() * h;
        pts.push({
          x: sx, y: sy, sx, sy,
          tx: (cx + gauss() * cl.spread) * w,
          ty: (cy + gauss() * cl.spread * 1.15) * h,
          c, ph: Math.random() * Math.PI * 2, r: Math.random() * 1.3 + 0.7,
        });
      }
      trainStart = performance.now();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = (now: number) => {
      const t = (now - trainStart) / 1000;
      const p = reduced ? 1 : Math.min(1, t / TRAIN_SECONDS);
      const e = ease(p);
      ctx.clearRect(0, 0, w, h);

      // faint grid, like a plot
      ctx.strokeStyle = "rgba(236,234,228,0.035)";
      ctx.lineWidth = 1;
      const step = mobile() ? 48 : 72;
      ctx.beginPath();
      for (let x = 0; x < w; x += step) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (let y = 0; y < h; y += step) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();

      const drift = reduced ? 0 : 1;
      for (const q of pts) {
        const jx = Math.sin(now / 1400 + q.ph) * 3.2 * drift * e;
        const jy = Math.cos(now / 1700 + q.ph) * 3.2 * drift * e;
        q.x = q.sx + (q.tx - q.sx) * e + jx;
        q.y = q.sy + (q.ty - q.sy) * e + jy;
      }

      // nearest neighbours to the pointer
      let nn: { q: Pt; d: number }[] = [];
      if (mouse.active) {
        for (const q of pts) {
          const d = (q.x - mouse.x) ** 2 + (q.y - mouse.y) ** 2;
          if (nn.length < K) { nn.push({ q, d }); nn.sort((a, b) => a.d - b.d); }
          else if (d < nn[K - 1].d) { nn[K - 1] = { q, d }; nn.sort((a, b) => a.d - b.d); }
        }
      }
      const hot = new Set(nn.map((n) => n.q));

      for (const q of pts) {
        const [r, g, b] = CLUSTERS[q.c].color;
        const a = 0.18 + 0.55 * e;
        ctx.fillStyle = hot.has(q) ? "rgba(200,255,62,1)" : `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, hot.has(q) ? q.r + 1.8 : q.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (nn.length) {
        nn.forEach((n, i) => {
          ctx.strokeStyle = `rgba(200,255,62,${0.75 - i * 0.06})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.q.x, n.q.y); ctx.stroke();
        });
        ctx.strokeStyle = "rgba(200,255,62,0.9)";
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 9, 0, Math.PI * 2); ctx.stroke();
        // majority cluster of the neighbours
        const votes = new Map<number, number>();
        nn.forEach((n) => votes.set(n.q.c, (votes.get(n.q.c) || 0) + 1));
        const top = [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
        ctx.font = "500 11.5px 'JetBrains Mono Variable', monospace";
        ctx.fillStyle = "rgba(200,255,62,0.95)";
        ctx.fillText(`query · k=${K} → ${CLUSTERS[top].label}`, mouse.x + 16, mouse.y - 12);
      }

      // cluster labels fade in once training has converged
      if (e > 0.85 && !mobile()) {
        ctx.font = "500 11px 'JetBrains Mono Variable', monospace";
        CLUSTERS.forEach((cl) => {
          const [r, g, b] = cl.color;
          ctx.fillStyle = `rgba(${r},${g},${b},${(e - 0.85) / 0.15 * 0.7})`;
          const label = cl.label.toUpperCase();
          const lw = ctx.measureText(label).width;
          const lx = Math.min(cl.x * w + cl.spread * w * 1.2, w - lw - 16);
          const ly = Math.max(cl.y * h - cl.spread * h * 1.4, 92);
          ctx.fillText(label, lx, ly);
        });
      }

      if (onStats) {
        const epoch = Math.round(p * 120);
        const loss = 2.31 * Math.exp(-3.4 * p) + 0.07;
        onStats(epoch, loss);
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ev.clientX - rect.left; mouse.y = ev.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
      if (reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    };
    const onLeave = () => { mouse.active = false; };
    const onClick = (ev: MouseEvent) => {
      if ((ev.target as HTMLElement).closest("a,button,input")) return;
      if (reduced) return;
      // scatter, then retrain
      for (const q of pts) { q.sx = Math.random() * w; q.sy = Math.random() * h; }
      trainStart = performance.now();
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });

    resize();
    io.observe(canvas);
    raf = requestAnimationFrame(frame);
    const hero = canvas.parentElement!;
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("click", onClick);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { resize(); if (reduced) raf = requestAnimationFrame(frame); }, 150); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [onStats]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
