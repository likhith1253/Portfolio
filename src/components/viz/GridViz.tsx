import { useMemo, useRef } from "react";
import { useInView, useLoop, useReducedMotion } from "@/lib/motion";
import { ACID, AMBER, BLUE, DIM, LINE, MONO, MUTED, TEXT } from "./util";

// Illustration only: a distribution network where a demand forecast flags the
// regions likely to come under stress. No real TG Transco data is shown.
const NODES = [
  { id: "A", x: 90, y: 110 }, { id: "B", x: 230, y: 80 }, { id: "C", x: 380, y: 120 }, { id: "D", x: 540, y: 90 },
  { id: "E", x: 140, y: 230 }, { id: "F", x: 300, y: 210 }, { id: "G", x: 460, y: 240 }, { id: "H", x: 570, y: 210 },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7]];
const STRESS = [5, 6];

export default function GridViz() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  // demand curve and forecast, purely illustrative shapes
  const curve = useMemo(() => {
    const actual: string[] = [], fc: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = 40 + i * 9.3;
      const base = 352 - (Math.sin(i / 9.5) * 18 + Math.sin(i / 3.1) * 5 + i * 0.4);
      actual.push(`${x},${base.toFixed(1)}`);
      fc.push(`${x},${(base + Math.sin(i / 2.3) * 4 - 3).toFixed(1)}`);
    }
    return { actual: actual.join(" "), fc: fc.join(" ") };
  }, []);

  useLoop(inView && !reduced, (t) => {
    const root = svg.current;
    if (!root) return;
    root.querySelectorAll<SVGCircleElement>(".flow").forEach((c, i) => {
      const [a, b] = EDGES[i];
      const p = ((t * 0.45 + i * 0.17) % 1);
      c.setAttribute("cx", String(NODES[a].x + (NODES[b].x - NODES[a].x) * p));
      c.setAttribute("cy", String(NODES[a].y + (NODES[b].y - NODES[a].y) * p));
    });
    const on = Math.sin(t * 2.2) > -0.2;
    root.querySelectorAll<SVGGElement>(".stress").forEach((g) => g.setAttribute("opacity", on ? "1" : "0.35"));
    const draw = root.querySelector<SVGPolylineElement>(".fc");
    if (draw) draw.setAttribute("stroke-dashoffset", String(Math.max(0, 640 - ((t * 160) % 900))));
  });

  return (
    <div className="viz" ref={wrap}>
      <div className="viz-bar">
        <span>load forecasting · regional stress</span>
        <span className="live">illustration</span>
      </div>
      <svg ref={svg} viewBox="0 0 640 400" role="img" aria-label="Illustration, not real data: a distribution network with power flowing between substations; a demand forecast line tracks actual load and two regions are flagged as likely high-stress.">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke={LINE} strokeWidth={1.5} />
        ))}
        {EDGES.map(([a], i) => (
          <circle key={i} className="flow" r={2.6} cx={NODES[a].x} cy={NODES[a].y} fill={BLUE} />
        ))}
        {NODES.map((n, i) => {
          const hot = STRESS.includes(i);
          return (
            <g key={n.id} className={hot ? "stress" : undefined}>
              {hot && <circle cx={n.x} cy={n.y} r={18} fill="rgba(255,181,71,0.12)" stroke={AMBER} strokeOpacity={0.6} />}
              <rect x={n.x - 7} y={n.y - 7} width={14} height={14} rx={3} fill="#0c0e13" stroke={hot ? AMBER : TEXT} strokeOpacity={hot ? 1 : 0.5} />
              {hot && <text x={n.x + 22} y={n.y - 12} fontFamily={MONO} fontSize={9.5} fill={AMBER}>high stress</text>}
            </g>
          );
        })}
        <line x1={40} x2={600} y1={378} y2={378} stroke={LINE} />
        <polyline points={curve.actual} fill="none" stroke={MUTED} strokeWidth={1.4} />
        <polyline className="fc" points={curve.fc} fill="none" stroke={ACID} strokeWidth={1.6} strokeDasharray="640" strokeDashoffset={reduced ? 0 : 640} />
        <text x={40} y={292} fontFamily={MONO} fontSize={9.5} fill={MUTED}>demand · actual</text>
        <text x={150} y={292} fontFamily={MONO} fontSize={9.5} fill={ACID}>forecast</text>
        <text x={600} y={292} textAnchor="end" fontFamily={MONO} fontSize={9} fill={DIM}>shapes are illustrative</text>
      </svg>
    </div>
  );
}
