import { useRef } from "react";
import { useInView, useLoop, useReducedMotion } from "@/lib/motion";
import { ACID, AMBER, BLUE, DIM, LINE, MONO, MUTED, RED, TEXT } from "./util";

// Three editors type into one document; the collab service relays each edit.
// A viewer tries to type and the permission check refuses it.
const EDITORS = [
  { name: "asha · owner", color: ACID, line: 0, text: "Sprint notes: ship the auth refactor Friday" },
  { name: "ravi · editor", color: BLUE, line: 2, text: "Action: add per-user limits to the AI service" },
  { name: "sam · editor", color: AMBER, line: 4, text: "Review: who can edit the shared folders?" },
];
const LINE_Y = (i: number) => 150 + i * 40;
const CYCLE = 9;

export default function SynergyViz() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  useLoop(inView && !reduced, (time) => {
    const root = svg.current;
    if (!root) return;
    const t = time % CYCLE;
    EDITORS.forEach((ed, i) => {
      const start = 0.4 + i * 0.7;
      const n = Math.max(0, Math.min(ed.text.length, Math.floor((t - start) * 14)));
      const shown = t > CYCLE - 0.6 ? "" : ed.text.slice(0, n);
      const txt = root.querySelector<SVGTextElement>(`.ed-text-${i}`);
      if (txt) txt.textContent = shown;
      const caret = root.querySelector<SVGGElement>(`.ed-caret-${i}`);
      if (caret && txt) {
        const w = shown.length * 6.6;
        caret.setAttribute("transform", `translate(${70 + w} ${LINE_Y(ed.line)})`);
      }
      // a relay pulse travels from the server to the document on each burst
      const pulse = root.querySelector<SVGCircleElement>(`.pulse-${i}`);
      if (pulse) {
        const phase = ((t - start) * 1.4) % 1;
        const active = t > start && n < ed.text.length;
        pulse.setAttribute("cy", String(92 + (LINE_Y(ed.line) - 100) * phase));
        pulse.setAttribute("opacity", active ? String(1 - phase) : "0");
      }
    });
    // the viewer attempt
    const deny = root.querySelector<SVGGElement>(".deny");
    if (deny) deny.setAttribute("opacity", t > 5.6 && t < 7.6 ? "1" : "0");
    const viewer = root.querySelector<SVGGElement>(".viewer");
    if (viewer) {
      const x = 360 + Math.sin(time * 0.9) * 40;
      viewer.setAttribute("transform", `translate(${x} ${LINE_Y(6)})`);
    }
  });

  return (
    <div className="viz" ref={wrap}>
      <div className="viz-bar">
        <span>synergyspace · shared document</span>
        <span className="live">{reduced ? "static" : "simulated"}</span>
      </div>
      <svg ref={svg} viewBox="0 0 640 440" role="img" aria-label="Animated diagram: three editors type into one shared document while the collaboration service relays their edits; a viewer who tries to edit is refused with a 403 read-only response.">
        <g transform="translate(250 60)">
          <rect width={140} height={30} rx={15} fill="#0c0e13" stroke="rgba(124,156,255,0.5)" />
          <text x={70} y={19} textAnchor="middle" fontFamily={MONO} fontSize={10} fill={TEXT}>collab-service</text>
        </g>
        <rect x={40} y={110} width={560} height={300} rx={12} fill="#0c0e13" stroke={LINE} />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={64} x2={576} y1={LINE_Y(i) + 8} y2={LINE_Y(i) + 8} stroke="rgba(236,234,228,0.05)" />
        ))}
        {EDITORS.map((ed, i) => (
          <g key={ed.name}>
            <circle className={`pulse-${i}`} cx={320} cy={92} r={4} fill={ed.color} opacity={0} />
            <text className={`ed-text-${i}`} x={70} y={LINE_Y(ed.line) + 4} fontFamily={MONO} fontSize={11} fill={TEXT}>{reduced ? ed.text : ""}</text>
            <g className={`ed-caret-${i}`} transform={`translate(${70 + (reduced ? ed.text.length * 6.6 : 0)} ${LINE_Y(ed.line)})`}>
              <rect x={1} y={-10} width={2} height={18} fill={ed.color} />
              <rect x={1} y={-24} width={ed.name.length * 6 + 10} height={13} rx={3} fill={ed.color} />
              <text x={6} y={-14} fontFamily={MONO} fontSize={8.5} fill="#07080b">{ed.name}</text>
            </g>
          </g>
        ))}
        <g className="viewer" transform={`translate(360 ${LINE_Y(6)})`}>
          <rect x={1} y={-10} width={2} height={18} fill={MUTED} />
          <rect x={1} y={-24} width={90} height={13} rx={3} fill={DIM} />
          <text x={6} y={-14} fontFamily={MONO} fontSize={8.5} fill={TEXT}>kai · viewer</text>
        </g>
        <g className="deny" opacity={reduced ? 1 : 0} transform="translate(392 372)">
          <rect width={196} height={26} rx={13} fill="rgba(255,90,60,0.14)" stroke="rgba(255,90,60,0.6)" />
          <text x={98} y={17} textAnchor="middle" fontFamily={MONO} fontSize={10} fill={RED}>403 · viewer is read-only</text>
        </g>
      </svg>
    </div>
  );
}
