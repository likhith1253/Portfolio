import { useMemo, useRef } from "react";
import { rng, useInView, useLoop, useReducedMotion } from "@/lib/motion";
import { ACID, BLUE, DIM, LINE, MONO, MUTED, TEXT, clamp01, easeInOut } from "./util";

// One pass of the pipeline on an example query: parse -> chunk -> embed -> retrieve
// -> rerank (with the evidence gate) -> cited answer. Loops every CYCLE seconds.
const CYCLE = 10;
const CHUNKS = [
  { tag: "§3.4", y: 104 },
  { tag: "eq.14", y: 150 },
  { tag: "§3.2", y: 196 },
  { tag: "table 2", y: 242 },
  { tag: "§4.1", y: 288 },
];
// where each parsed chunk lands in vector space
const LAND = [[300, 150], [285, 196], [338, 222], [262, 268], [352, 176]];
const Q = [312, 192];
// retrieval order vs. order after the cross-encoder
const RETRIEVED = ["§3.2", "§4.1", "§3.4", "table 2", "eq.14"];
const RERANKED = ["§3.4", "eq.14", "§3.2", "§4.1", "table 2"];
const SCORES: Record<string, string> = { "§3.4": "0.94", "eq.14": "0.91", "§3.2": "0.77", "§4.1": "0.52", "table 2": "0.31" };
const ANSWER = "A simplified, reweighted variational bound on the noise prediction (L_simple).";

export default function DocRagViz() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();

  const cloud = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 70 }, () => [214 + r() * 180, 100 + r() * 210, r()]);
  }, []);

  useLoop(inView && !reduced, (time) => {
    const root = svg.current;
    if (!root) return;
    const t = time % CYCLE;
    const q = (sel: string) => root.querySelectorAll<SVGElement>(sel);

    // 1. parse: chunk highlights sweep down the page
    q(".chunk-hl").forEach((n, i) => n.setAttribute("opacity", String(clamp01((t - 0.2 - i * 0.25) * 3) * (t < 3.2 ? 1 : 0.35))));
    // 2. embed: flying chunk tokens
    q(".fly").forEach((n, i) => {
      const p = easeInOut(clamp01((t - 1.4 - i * 0.18) / 1.1));
      const x = 160 + (LAND[i][0] - 160) * p;
      const y = CHUNKS[i].y + (LAND[i][1] - CHUNKS[i].y) * p;
      n.setAttribute("transform", `translate(${x} ${y})`);
      n.setAttribute("opacity", t > 1.3 && t < CYCLE - 0.4 ? "1" : "0");
    });
    // 3. query vector + neighbours
    const qa = clamp01((t - 3.4) * 2);
    q(".qdot").forEach((n) => n.setAttribute("opacity", String(t < CYCLE - 0.4 ? qa : 0)));
    q(".nn").forEach((n, i) => {
      const p = clamp01((t - 3.8 - i * 0.12) * 3);
      n.setAttribute("stroke-dashoffset", String(60 * (1 - p)));
      n.setAttribute("opacity", t < CYCLE - 0.4 ? "1" : "0");
    });
    // 4. retrieved list, then rerank
    const rp = easeInOut(clamp01((t - 5.6) / 0.9));
    q(".card").forEach((n) => {
      const tag = n.dataset.tag!;
      const from = RETRIEVED.indexOf(tag);
      const to = RERANKED.indexOf(tag);
      const appear = clamp01((t - 4.3 - from * 0.12) * 3);
      const idx = from + (to - from) * rp;
      n.setAttribute("transform", `translate(430 ${96 + idx * 44})`);
      n.setAttribute("opacity", String(t < CYCLE - 0.4 ? appear : 0));
    });
    q(".gate").forEach((n) => n.setAttribute("opacity", t > 6.4 && t < CYCLE - 0.4 ? "1" : "0"));
    q(".score").forEach((n) => n.setAttribute("opacity", t > 6.1 ? "1" : "0"));
    // 5. answer types out
    const chars = Math.floor(clamp01((t - 6.8) / 2.2) * ANSWER.length);
    const ans = root.querySelector<SVGTextElement>(".ans");
    if (ans) ans.textContent = t < CYCLE - 0.4 ? ANSWER.slice(0, chars) : "";
    const cite = root.querySelector<SVGGElement>(".cite");
    if (cite) cite.setAttribute("opacity", t > 9 && t < CYCLE - 0.4 ? "1" : "0");
  });

  const stat = reduced; // reduced motion: show the final frame

  return (
    <div className="viz" ref={wrap}>
      <div className="viz-bar">
        <span>docrag · one query, end to end</span>
        <span className="live">{stat ? "static" : "example"}</span>
      </div>
      <svg ref={svg} viewBox="0 0 640 440" role="img" aria-label="Animated diagram of DocRag: a PDF page is parsed into tagged chunks, embedded into vector space, a query retrieves its nearest chunks, a cross-encoder reranks them, and the answer is returned with a section citation.">
        <text x={24} y={70} fontFamily={MONO} fontSize={10} fill={DIM}>DDPM.pdf · p.4</text>
        <rect x={24} y={80} width={136} height={240} rx={8} fill="#0c0e13" stroke={LINE} />
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={36} y={94 + i * 12.4} width={i % 5 === 4 ? 70 : 108 - (i % 3) * 8} height={4} rx={2} fill="rgba(236,234,228,0.12)" />
        ))}
        {CHUNKS.map((c) => (
          <g key={c.tag} className="chunk-hl" opacity={stat ? 0.35 : 0}>
            <rect x={30} y={c.y - 12} width={124} height={34} rx={5} fill="rgba(124,156,255,0.12)" stroke="rgba(124,156,255,0.6)" />
            <text x={146} y={c.y + 1} textAnchor="end" fontFamily={MONO} fontSize={8.5} fill={BLUE}>{c.tag}</text>
          </g>
        ))}

        <text x={214} y={70} fontFamily={MONO} fontSize={10} fill={DIM}>vector space · e5-base-v2</text>
        {cloud.map(([x, y, a], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} fill={TEXT} opacity={0.12 + a * 0.2} />
        ))}
        {LAND.map(([x, y], i) => (
          <line key={i} className="nn" x1={Q[0]} y1={Q[1]} x2={x} y2={y} stroke={ACID} strokeWidth={1} strokeDasharray="60" strokeDashoffset={stat ? 0 : 60} />
        ))}
        {CHUNKS.map((c, i) => (
          <g key={c.tag} className="fly" opacity={stat ? 1 : 0} transform={`translate(${stat ? LAND[i][0] : 160} ${stat ? LAND[i][1] : c.y})`}>
            <circle r={4.5} fill={BLUE} />
          </g>
        ))}
        <g className="qdot" opacity={stat ? 1 : 0}>
          <circle cx={Q[0]} cy={Q[1]} r={6} fill={ACID} />
          <circle cx={Q[0]} cy={Q[1]} r={12} fill="none" stroke={ACID} strokeOpacity={0.5} />
          <text x={Q[0] - 92} y={334} fontFamily={MONO} fontSize={9.5} fill={ACID}>q: what does DDPM train on?</text>
        </g>

        <text x={430} y={70} fontFamily={MONO} fontSize={10} fill={DIM}>rerank · cross-encoder</text>
        {RETRIEVED.map((tag, i) => {
          const idx = stat ? RERANKED.indexOf(tag) : i;
          return (
            <g key={tag} className="card" data-tag={tag} opacity={stat ? 1 : 0} transform={`translate(430 ${96 + idx * 44})`}>
              <rect width={186} height={34} rx={8} fill="#0c0e13" stroke={tag === "eq.14" ? "rgba(200,255,62,0.55)" : LINE} />
              <text x={12} y={21} fontFamily={MONO} fontSize={10.5} fill={TEXT}>{tag}</text>
              <text className="score" x={174} y={21} textAnchor="end" fontFamily={MONO} fontSize={10} fill={ACID} opacity={stat ? 1 : 0}>{SCORES[tag]}</text>
              {tag === "eq.14" && (
                <text className="gate" x={76} y={21} fontFamily={MONO} fontSize={8} fill={ACID} opacity={stat ? 1 : 0}>evidence gate ✓</text>
              )}
            </g>
          );
        })}

        <rect x={24} y={356} width={592} height={62} rx={10} fill="#0c0e13" stroke="rgba(200,255,62,0.35)" />
        <text x={40} y={380} fontFamily={MONO} fontSize={9.5} fill={MUTED}>ANSWER</text>
        <text className="ans" x={40} y={402} fontFamily={MONO} fontSize={11} fill={TEXT}>{stat ? ANSWER : ""}</text>
        <g className="cite" opacity={stat ? 1 : 0} transform="translate(520 370)">
          <rect width={84} height={20} rx={10} fill="rgba(200,255,62,0.14)" />
          <text x={42} y={14} textAnchor="middle" fontFamily={MONO} fontSize={9.5} fill={ACID}>[DDPM §3.4]</text>
        </g>
      </svg>
    </div>
  );
}
