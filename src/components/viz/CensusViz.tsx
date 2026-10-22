import { useRef } from "react";
import { useInView, useLoop, useReducedMotion } from "@/lib/motion";
import { ACID, BLUE, DIM, LINE, MONO, MUTED, TEXT, clamp01, easeInOut } from "./util";

// An API call types out on the left while the administrative hierarchy it
// searches expands on the right. Counts are the dataset sizes from the README.
const CYCLE = 9;
const REQ = [
  { t: "GET /api/v1/villages/search?q=ram", c: TEXT },
  { t: "x-api-key: vap_live_••••••••", c: MUTED },
  { t: "", c: TEXT },
  { t: "← 200 OK  ·  cache: hit", c: ACID },
  { t: "{ village, subDistrict,", c: MUTED },
  { t: "  district, state }  × 3", c: MUTED },
];
const LEVELS = [
  { name: "India", count: "1 country", x: 380, y: 110 },
  { name: "State / UT", count: "36", x: 410, y: 175 },
  { name: "District", count: "600+", x: 440, y: 240 },
  { name: "Sub-district", count: "tehsil · mandal", x: 470, y: 305 },
  { name: "Village", count: "457,000+", x: 500, y: 370 },
];

export default function CensusViz() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  useLoop(inView && !reduced, (time) => {
    const root = svg.current;
    if (!root) return;
    const t = time % CYCLE;
    let budget = Math.floor(t * 26);
    REQ.forEach((r, i) => {
      const n = Math.max(0, Math.min(r.t.length, budget));
      budget -= r.t.length + 6;
      const el = root.querySelector<SVGTextElement>(`.req-${i}`);
      if (el) el.textContent = t > CYCLE - 0.5 ? "" : r.t.slice(0, n);
    });
    LEVELS.forEach((_, i) => {
      const p = easeInOut(clamp01((t - 1 - i * 0.55) * 2));
      const g = root.querySelector<SVGGElement>(`.lvl-${i}`);
      if (g) g.setAttribute("opacity", String(t > CYCLE - 0.5 ? 0 : p));
      const ln = root.querySelector<SVGPathElement>(`.edge-${i}`);
      if (ln) ln.setAttribute("stroke-dashoffset", String(80 * (1 - p)));
    });
    const scan = root.querySelector<SVGRectElement>(".scan");
    if (scan) {
      const p = clamp01((t - 3.8) / 1.4);
      scan.setAttribute("y", String(96 + p * 290));
      scan.setAttribute("opacity", t > 3.8 && t < 5.4 ? "0.9" : "0");
    }
  });

  return (
    <div className="viz" ref={wrap}>
      <div className="viz-bar">
        <span>censusgrid · search request</span>
        <span className="live">{reduced ? "static" : "example"}</span>
      </div>
      <svg ref={svg} viewBox="0 0 640 440" role="img" aria-label="Animated diagram: an authenticated search request to the CensusGrid API returns 200 OK from cache while the India administrative hierarchy expands: 36 states and union territories, 600-plus districts, sub-districts, and 457,000-plus villages.">
        <rect x={24} y={84} width={300} height={200} rx={10} fill="#0c0e13" stroke={LINE} />
        <circle cx={42} cy={100} r={4} fill="#ff5a3c" opacity={0.7} />
        <circle cx={56} cy={100} r={4} fill="#ffb547" opacity={0.7} />
        <circle cx={70} cy={100} r={4} fill={ACID} opacity={0.7} />
        {REQ.map((r, i) => (
          <text key={i} className={`req-${i}`} x={40} y={134 + i * 22} fontFamily={MONO} fontSize={11} fill={r.c}>{reduced ? r.t : ""}</text>
        ))}
        <rect x={24} y={300} width={300} height={110} rx={10} fill="#0c0e13" stroke={LINE} />
        <text x={40} y={326} fontFamily={MONO} fontSize={9.5} fill={MUTED}>PIPELINE</text>
        {["api key", "rate limit", "redis", "postgres"].map((s, i) => (
          <g key={s} transform={`translate(${40 + i * 70} 346)`}>
            <rect width={62} height={24} rx={12} fill={i === 2 ? "rgba(200,255,62,0.14)" : "transparent"} stroke={i === 2 ? "rgba(200,255,62,0.6)" : LINE} />
            <text x={31} y={16} textAnchor="middle" fontFamily={MONO} fontSize={9} fill={i === 2 ? ACID : TEXT}>{s}</text>
          </g>
        ))}
        <text x={40} y={394} fontFamily={MONO} fontSize={9} fill={DIM}>key → quota → cache → db (on miss)</text>

        <rect className="scan" x={360} y={96} width={260} height={2} fill={ACID} opacity={0} />
        {LEVELS.map((l, i) => (
          <g key={l.name}>
            {i > 0 && (
              <path className={`edge-${i}`} d={`M${LEVELS[i - 1].x + 6} ${LEVELS[i - 1].y + 12} V${l.y} H${l.x - 8}`} fill="none" stroke={BLUE} strokeOpacity={0.5} strokeDasharray="80" strokeDashoffset={reduced ? 0 : 80} />
            )}
            <g className={`lvl-${i}`} opacity={reduced ? 1 : 0}>
              <circle cx={l.x} cy={l.y} r={5} fill={i === LEVELS.length - 1 ? ACID : BLUE} />
              <text x={l.x + 14} y={l.y + 4} fontFamily={MONO} fontSize={11} fill={TEXT}>{l.name}</text>
              <text x={l.x + 14} y={l.y + 20} fontFamily={MONO} fontSize={10} fill={i === LEVELS.length - 1 ? ACID : MUTED}>{l.count}</text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
