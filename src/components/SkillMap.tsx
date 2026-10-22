import { useMemo, useState } from "react";
import { SKILLS, type Skill } from "@/data/site";

// Skills laid out like an embedding plot: one cluster per group, node size by how
// many projects use the skill. Selecting a skill shows where it is used and links
// it to the skills it appears alongside.
const GROUPS: { name: Skill["group"]; x: number; y: number; color: string }[] = [
  { name: "ML & AI", x: 165, y: 175, color: "#c8ff3e" },
  { name: "Retrieval", x: 420, y: 135, color: "#7c9cff" },
  { name: "Frontend", x: 660, y: 150, color: "#ff5a3c" },
  { name: "Data", x: 250, y: 395, color: "#ffb547" },
  { name: "Backend", x: 575, y: 380, color: "#eceae4" },
];
const PROJECT_ANCHORS: Record<string, string> = {
  Veridex: "#veridex", DocRag: "#docrag", SynergySpace: "#synergy", CensusGrid: "#censusgrid", "ML Capstone": "#capstone",
  "TG Transco": "#experience", Bluestock: "#experience",
};

export default function SkillMap() {
  const [selected, setSelected] = useState("RAG");
  const [group, setGroup] = useState<Skill["group"] | "All">("All");

  const nodes = useMemo(() => {
    const out: (Skill & { x: number; y: number; r: number; color: string })[] = [];
    for (const g of GROUPS) {
      const items = SKILLS.filter((s) => s.group === g.name);
      items.forEach((s, i) => {
        const a = i * 2.39996; // golden angle
        const rad = i === 0 ? 0 : 22 + Math.sqrt(i) * 33;
        out.push({ ...s, x: g.x + Math.cos(a) * rad * 1.15, y: g.y + Math.sin(a) * rad * 0.85, r: 5 + s.projects.length * 2.2, color: g.color });
      });
    }
    return out;
  }, []);

  const sel = nodes.find((n) => n.name === selected) || nodes[0];
  const related = new Set(nodes.filter((n) => n !== sel && n.projects.some((p) => sel.projects.includes(p))).map((n) => n.name));
  const visible = (n: Skill) => group === "All" || n.group === group;

  return (
    <div className="skillmap">
      <div className="map" data-reveal>
        <svg viewBox="0 0 800 520" role="group" aria-label="Skill map. Choose a skill to see the projects that use it.">
          {GROUPS.map((g) => (
            <text key={g.name} x={g.x} y={Math.min(...nodes.filter((n) => n.group === g.name).map((n) => n.y - n.r)) - 22} textAnchor="middle" fontFamily="'JetBrains Mono Variable', monospace" fontSize={11} letterSpacing="0.14em" fill={g.color} opacity={group === "All" || group === g.name ? 0.75 : 0.15}>
              {g.name.toUpperCase()}
            </text>
          ))}
          {nodes.filter((n) => related.has(n.name) && visible(n)).map((n) => (
            <line key={`l-${n.name}`} x1={sel.x} y1={sel.y} x2={n.x} y2={n.y} stroke={sel.color} strokeOpacity={0.35} />
          ))}
          {nodes.map((n) => {
            const isSel = n.name === sel.name;
            const dim = !visible(n) || (!isSel && !related.has(n.name) && selected !== "");
            return (
              <g
                key={n.name}
                className={`node${isSel ? " on" : ""}`}
                tabIndex={visible(n) ? 0 : -1}
                role="button"
                aria-pressed={isSel}
                aria-label={`${n.name}: ${n.projects.length ? "used in " + n.projects.join(", ") : "listed on resume"}`}
                onMouseEnter={() => setSelected(n.name)}
                onFocus={() => setSelected(n.name)}
                onClick={() => setSelected(n.name)}
                opacity={dim ? 0.55 : 1}
              >
                {isSel && <circle cx={n.x} cy={n.y} r={n.r + 10} fill="none" stroke={n.color} strokeOpacity={0.5} />}
                <circle cx={n.x} cy={n.y} r={isSel ? n.r + 3 : n.r} fill={n.color} fillOpacity={isSel ? 1 : 0.75} />
                <text x={n.x} y={n.y + n.r + 15} textAnchor="middle">{n.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="inspector" data-reveal>
        <div className="groups" role="group" aria-label="Filter skills by group">
          {(["All", ...GROUPS.map((g) => g.name)] as const).map((g) => (
            <button key={g} className="group-btn" aria-pressed={group === g} onClick={() => setGroup(g)}>{g}</button>
          ))}
        </div>
        <span className="label">{sel.group}</span>
        <h3>{sel.name}</h3>
        {sel.projects.length ? (
          <>
            <span className="mono" style={{ color: "var(--muted)" }}>used in</span>
            <ul className="uses">
              {sel.projects.map((p) => (
                <li key={p}>
                  {PROJECT_ANCHORS[p] ? <a href={PROJECT_ANCHORS[p]}>{p}</a> : <span>{p}</span>}
                  <span className="mono acid">→</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p style={{ color: "var(--muted)", margin: 0 }}>On my resume; not yet used in one of the projects featured here.</p>
        )}
        {related.size > 0 && (
          <p className="mono" style={{ color: "var(--dim)", margin: 0 }}>
            appears alongside: {[...related].slice(0, 8).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
