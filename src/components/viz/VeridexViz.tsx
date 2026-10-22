import { useRef } from "react";
import { useInView, useLoop, useReducedMotion } from "@/lib/motion";
import { ACID, DIM, LINE, MONO, MUTED, RED, TEXT, clamp01, easeInOut, el, qb, type P } from "./util";

// Three records of the same transaction flow into the matcher. Most reconcile;
// some carry a mismatch, get a root cause, and wait for a human to approve the fix.
const LANES: { name: string; y: number }[] = [
  { name: "GATEWAY", y: 130 },
  { name: "LEDGER", y: 220 },
  { name: "BANK", y: 310 },
];
const M: P = [350, 220];
const OK: P = [560, 132];
const EXC: P = [560, 300];
const REASONS = ["FEE_MISMATCH ₹18.40", "TIMING_LAG +2d", "DUPLICATE", "MISSING_SOURCE", "AMOUNT_MISMATCH"];

interface Txn { id: number; born: number; bad: number; reason: string; nodes: SVGElement[]; done: boolean }

export default function VeridexViz() {
  const wrap = useRef<HTMLDivElement>(null);
  const layer = useRef<SVGGElement>(null);
  const okCount = useRef<SVGTextElement>(null);
  const excCount = useRef<SVGTextElement>(null);
  const reasonText = useRef<SVGTextElement>(null);
  const approve = useRef<SVGGElement>(null);
  const state = useRef({ txns: [] as Txn[], next: 0, id: 1040, ok: 0, exc: 0, lastApprove: -10 });
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  useLoop(inView && !reduced, (t) => {
    const s = state.current;
    const g = layer.current;
    if (!g) return;
    if (t > s.next) {
      s.next = t + 1.15;
      const bad = Math.random() < 0.28 ? Math.floor(Math.random() * 3) : -1;
      const nodes: SVGElement[] = [];
      LANES.forEach((_, i) => nodes.push(el("rect", { width: 30, height: 12, rx: 3, fill: i === bad ? RED : TEXT, opacity: 0 }, g)));
      const merged = el("circle", { r: 6, fill: bad >= 0 ? RED : ACID, opacity: 0 }, g);
      const tag = el("text", { "font-family": MONO, "font-size": 10, fill: MUTED, opacity: 0 }, g);
      tag.textContent = `txn_${s.id}`;
      nodes.push(merged, tag);
      s.txns.push({ id: s.id++, born: t, bad, reason: REASONS[Math.floor(Math.random() * REASONS.length)], nodes, done: false });
    }

    for (const x of s.txns) {
      const age = t - x.born;
      const p1 = easeInOut(clamp01(age / 1.7));
      const p2 = easeInOut(clamp01((age - 1.8) / 1.1));
      LANES.forEach((lane, i) => {
        const pos = qb([96, lane.y], [250, lane.y], M, p1);
        const r = x.nodes[i];
        r.setAttribute("x", String(pos[0] - 15));
        r.setAttribute("y", String(pos[1] - 6));
        r.setAttribute("opacity", age < 1.75 ? String(Math.min(1, age * 4)) : "0");
      });
      const merged = x.nodes[3];
      const tag = x.nodes[4];
      const dest = x.bad >= 0 ? EXC : OK;
      const mp = qb(M, [470, x.bad >= 0 ? 290 : 150], dest, p2);
      merged.setAttribute("cx", String(mp[0]));
      merged.setAttribute("cy", String(mp[1]));
      merged.setAttribute("opacity", age > 1.7 && age < 3 ? "1" : "0");
      tag.setAttribute("x", String(mp[0] + 10));
      tag.setAttribute("y", String(mp[1] - 9));
      tag.setAttribute("opacity", age > 1.7 && age < 2.9 ? "0.9" : "0");
      if (!x.done && age > 2.9) {
        x.done = true;
        if (x.bad >= 0) {
          s.exc++;
          if (reasonText.current) reasonText.current.textContent = x.reason;
          if (excCount.current) excCount.current.textContent = String(s.exc).padStart(3, "0");
        } else {
          s.ok++;
          if (okCount.current) okCount.current.textContent = String(s.ok).padStart(3, "0");
        }
      }
    }
    // human approval blinks a few seconds after an exception lands
    if (approve.current) {
      const since = t - s.lastApprove;
      if (s.exc > 0 && since > 4.5) s.lastApprove = t;
      approve.current.setAttribute("opacity", since < 1.6 ? "1" : "0.25");
    }
    // drop finished transactions
    s.txns = s.txns.filter((x) => {
      if (t - x.born > 3.2) { x.nodes.forEach((n) => n.remove()); return false; }
      return true;
    });
  });

  return (
    <div className="viz" ref={wrap}>
      <div className="viz-bar">
        <span>veridex · three-way match</span>
        <span className="live">{reduced ? "static" : "simulated"}</span>
      </div>
      <svg viewBox="0 0 640 440" role="img" aria-label="Animated diagram: gateway, ledger and bank records flow into a matcher; matched transactions reconcile, mismatches become exceptions with a root cause and wait for human approval.">
        {LANES.map((l) => (
          <g key={l.name}>
            <text x={24} y={l.y + 4} fontFamily={MONO} fontSize={11} fill={MUTED}>{l.name}</text>
            <path d={`M96 ${l.y} Q250 ${l.y} ${M[0]} ${M[1]}`} stroke={LINE} strokeDasharray="3 5" fill="none" />
          </g>
        ))}
        <path d={`M${M[0]} ${M[1]} Q470 150 ${OK[0]} ${OK[1]}`} stroke="rgba(200,255,62,0.3)" fill="none" />
        <path d={`M${M[0]} ${M[1]} Q470 290 ${EXC[0]} ${EXC[1]}`} stroke="rgba(255,90,60,0.35)" fill="none" />
        <g transform={`translate(${M[0]} ${M[1]})`}>
          <polygon points="0,-38 33,-19 33,19 0,38 -33,19 -33,-19" fill="#0c0e13" stroke={ACID} strokeOpacity={0.6} />
          <text textAnchor="middle" y={-2} fontFamily={MONO} fontSize={11} fill={TEXT}>MATCH</text>
          <text textAnchor="middle" y={13} fontFamily={MONO} fontSize={8.5} fill={DIM}>rules·xgb·llm</text>
        </g>
        <g transform={`translate(${OK[0] - 70} ${OK[1] - 46})`}>
          <rect width={140} height={56} rx={10} fill="#0c0e13" stroke="rgba(200,255,62,0.4)" />
          <text x={14} y={22} fontFamily={MONO} fontSize={10} fill={MUTED}>RECONCILED</text>
          <text ref={okCount} x={14} y={44} fontFamily={MONO} fontSize={18} fill={ACID}>{reduced ? "042" : "000"}</text>
        </g>
        <g transform={`translate(${EXC[0] - 70} ${EXC[1] - 8})`}>
          <rect width={140} height={74} rx={10} fill="#0c0e13" stroke="rgba(255,90,60,0.45)" />
          <text x={14} y={22} fontFamily={MONO} fontSize={10} fill={MUTED}>EXCEPTIONS</text>
          <text ref={excCount} x={14} y={44} fontFamily={MONO} fontSize={18} fill={RED}>{reduced ? "007" : "000"}</text>
          <text ref={reasonText} x={14} y={62} fontFamily={MONO} fontSize={9} fill={TEXT}>{reduced ? "FEE_MISMATCH ₹18.40" : "root cause …"}</text>
        </g>
        <g ref={approve} opacity={0.25} transform="translate(490 392)">
          <rect width={140} height={26} rx={13} fill="rgba(200,255,62,0.12)" stroke="rgba(200,255,62,0.5)" />
          <text x={70} y={17} textAnchor="middle" fontFamily={MONO} fontSize={10} fill={ACID}>✓ human approved</text>
        </g>
        <g ref={layer} />
      </svg>
    </div>
  );
}
