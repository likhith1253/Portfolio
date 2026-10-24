import { useMemo, useRef } from "react";
import { rng, useInView, useLoop, useReducedMotion } from "@/lib/motion";
import { ACID, AMBER, BLUE, DIM, LINE, MONO, MUTED, RED, TEXT, clamp01, easeInOut } from "./util";

// Seven Dry Bean cultivars start mixed and separate as the classifier fits.
// The final number is the held-out test accuracy reported in the repo.
const CLASSES = [
  { name: "DERMASON", c: ACID, x: 170, y: 170 },
  { name: "SIRA", c: BLUE, x: 260, y: 230 },
  { name: "SEKER", c: AMBER, x: 150, y: 300 },
  { name: "HOROZ", c: RED, x: 400, y: 160 },
  { name: "CALI", c: "#b48cff", x: 450, y: 270 },
  { name: "BARBUNYA", c: "#5ee0c8", x: 350, y: 330 },
  { name: "BOMBAY", c: TEXT, x: 540, y: 140 },
];
const CYCLE = 8;

export default function CapstoneViz() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  const pts = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: 210 }, (_, i) => {
      const k = i % CLASSES.length;
      const g = () => (r() + r() + r() - 1.5) * 34;
      return { k, sx: 60 + r() * 520, sy: 90 + r() * 280, tx: CLASSES[k].x + g(), ty: CLASSES[k].y + g() };
    });
  }, []);

  useLoop(inView && !reduced, (time) => {
    const root = svg.current;
    if (!root) return;
    const t = time % CYCLE;
    const p = easeInOut(clamp01((t - 0.6) / 3.6));
    const dots = root.querySelectorAll<SVGCircleElement>(".bean");
    dots.forEach((d, i) => {
      const q = pts[i];
      d.setAttribute("cx", String(q.sx + (q.tx - q.sx) * p));
      d.setAttribute("cy", String(q.sy + (q.ty - q.sy) * p));
      d.setAttribute("fill", p > 0.15 ? CLASSES[q.k].c : MUTED);
      d.setAttribute("opacity", String(t > CYCLE - 0.4 ? 0 : 0.85));
    });
    root.querySelectorAll<SVGTextElement>(".cls").forEach((n) => n.setAttribute("opacity", String(clamp01((p - 0.8) * 5))));
    const acc = root.querySelector<SVGTextElement>(".acc");
    if (acc) acc.textContent = p > 0.98 ? "95.41%" : "—";
    const ep = root.querySelector<SVGTextElement>(".ep");
    if (ep) ep.textContent = `fit ${Math.round(p * 100)}%`;
  });

  return (
    <div className="viz" ref={wrap}>
      <div className="viz-bar">
        <span>tabular ml lab · dry bean, 7 classes</span>
        <span className="live">{reduced ? "static" : "illustration"}</span>
      </div>
      <svg ref={svg} viewBox="0 0 640 440" role="img" aria-label="Illustration: points for seven dry bean classes start mixed and separate into clusters as a classifier fits; the reported held-out test accuracy is 95.41 percent.">
        <rect x={40} y={70} width={560} height={320} rx={10} fill="none" stroke={LINE} />
        {pts.map((q, i) => (
          <circle key={i} className="bean" r={3} cx={reduced ? q.tx : q.sx} cy={reduced ? q.ty : q.sy} fill={reduced ? CLASSES[q.k].c : MUTED} opacity={0.85} />
        ))}
        {CLASSES.map((c) => (
          <text key={c.name} className="cls" x={c.x} y={c.y - 46} textAnchor="middle" fontFamily={MONO} fontSize={9.5} fill={c.c} opacity={reduced ? 1 : 0}>{c.name}</text>
        ))}
        <text className="ep" x={56} y={412} fontFamily={MONO} fontSize={10} fill={DIM}>{reduced ? "fit 100%" : "fit 0%"}</text>
        <text x={514} y={412} textAnchor="end" fontFamily={MONO} fontSize={10} fill={MUTED}>MLP · held-out test</text>
        <text className="acc" x={584} y={413} textAnchor="end" fontFamily={MONO} fontSize={14} fill={ACID}>{reduced ? "95.41%" : "—"}</text>
      </svg>
    </div>
  );
}
