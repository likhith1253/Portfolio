import { useMemo, useState } from "react";
import { GROUPS, SKILLS, type Skill } from "@/data/site";
import TechIcon from "@/components/TechIcon";
import { ICONS } from "@/lib/icons";

// Skills laid out like an embedding plot: one cluster per group, node size by how
// many projects use the skill. Selecting a skill (on the map or in the logo wall)
// shows where it is used and which skills it appears alongside.
const POS: Record<Skill["group"], { x: number; y: number; color: string }> = {
  "Languages": { x: 120, y: 150, color: "#eceae4" },
  "ML & AI": { x: 345, y: 150, color: "#c8ff3e" },
  "Retrieval": { x: 590, y: 120, color: "#7c9cff" },
  "Frontend": { x: 800, y: 170, color: "#ff5a3c" },
  "Data & databases": { x: 130, y: 430, color: "#ffb547" },
  "Backend": { x: 395, y: 440, color: "#b48cff" },
  "DevOps & tools": { x: 670, y: 450, color: "#5ee0c8" },
};
const PROJECT_ANCHORS: Record<string, string> = {
  Veridex: "#veridex", DocRag: "#docrag", SynergySpace: "#synergy", CensusGrid: "#censusgrid", "Tabular ML Lab": "#tabular-lab",
  "TG Transco": "#experience", Bluestock: "#experience",
  chart_detection: "#builds", "SentinelAI Guard": "#builds", "MT-Dynamics": "#builds", "Movie Intelligence Engine": "#builds",
  ESUA: "#builds", SecurityLogAnalyzer: "#builds", ChemViz: "#builds", OmniLife: "#builds",
  "Water network research": "#about",
};

export default function SkillMap() {
  const [selected, setSelected] = useState("RAG");
  const [group, setGroup] = useState<Skill["group"] | "All">("All");

  const nodes = useMemo(() => {
    const out: (Skill & { x: number; y: number; r: number; color: string })[] = [];
    for (const g of GROUPS) {
      const items = SKILLS.filter((s) => s.group === g);
      const c = POS[g];
      items.forEach((s, i) => {
        const a = i * 2.39996 + (g.length % 5); // golden angle, offset per group
        const rad = i === 0 ? 0 : 20 + Math.sqrt(i) * 26;
        out.push({ ...s, x: c.x + Math.cos(a) * rad * 1.15, y: c.y + Math.sin(a) * rad * 0.85, r: 4.5 + Math.min(s.projects.length, 5) * 1.6, color: c.color });
      });
    }
    return out;
  }, []);

  const sel = nodes.find((n) => n.name === selected) || nodes[0];
  const related = new Set(nodes.filter((n) => n !== sel && n.projects.some((p) => sel.projects.includes(p))).map((n) => n.name));
  const visible = (n: Skill) => group === "All" || n.group === group;

  return (
    <>
      <div className="skillmap">
        <div className="map" data-reveal>
          <svg viewBox="0 0 900 600" role="group" aria-label="Skill map. Choose a skill to see the projects that use it.">
            {GROUPS.map((g) => {
              const ys = nodes.filter((n) => n.group === g).map((n) => n.y - n.r);
              return (
                <text key={g} x={POS[g].x} y={Math.min(...ys) - 24} textAnchor="middle" fontFamily="'JetBrains Mono Variable', monospace" fontSize={11} letterSpacing="0.14em" fill={POS[g].color} opacity={group === "All" || group === g ? 0.8 : 0.15}>
                  {g.toUpperCase()}
                </text>
              );
            })}
            {nodes.filter((n) => related.has(n.name) && visible(n)).map((n) => (
              <line key={`l-${n.name}`} x1={sel.x} y1={sel.y} x2={n.x} y2={n.y} stroke={sel.color} strokeOpacity={0.35} />
            ))}
            {nodes.map((n) => {
              const isSel = n.name === sel.name;
              const showLabel = isSel || related.has(n.name);
              const dim = !visible(n) || (!isSel && !related.has(n.name));
              return (
                <g
                  key={n.name}
                  className={`node${isSel ? " on" : ""}${showLabel ? " lab" : ""}`}
                  tabIndex={visible(n) ? 0 : -1}
                  role="button"
                  aria-pressed={isSel}
                  aria-label={n.projects.length ? `${n.name}: used in ${n.projects.join(", ")}` : `${n.name}: working knowledge`}
                  onMouseEnter={() => setSelected(n.name)}
                  onFocus={() => setSelected(n.name)}
                  onClick={() => setSelected(n.name)}
                  opacity={dim ? 0.5 : 1}
                >
                  {isSel && <circle cx={n.x} cy={n.y} r={n.r + 10} fill="none" stroke={n.color} strokeOpacity={0.5} />}
                  <circle cx={n.x} cy={n.y} r={isSel ? n.r + 3 : n.r} fill={n.color} fillOpacity={isSel ? 1 : 0.75} />
                  <text x={n.x} y={n.y + n.r + 14} textAnchor="middle">{n.name}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="inspector" data-reveal>
          <div className="groups" role="group" aria-label="Filter skills by group">
            {(["All", ...GROUPS] as const).map((g) => (
              <button key={g} className="group-btn" aria-pressed={group === g} onClick={() => setGroup(g)}>{g}</button>
            ))}
          </div>
          <span className="label">{sel.group}</span>
          <h3>{sel.name}</h3>
          {sel.projects.length > 0 && (
            <>
              <span className="mono" style={{ color: "var(--muted)" }}>used in</span>
              <ul className="uses">
                {sel.projects.map((p) => (
                  <li key={p}>
                    {PROJECT_ANCHORS[p] ? <a href={PROJECT_ANCHORS[p]}>{p}</a> : <span>{p}</span>}
                    <span className="mono acid">{PROJECT_ANCHORS[p] ? "→" : ""}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {sel.note && <p className="mono" style={{ color: "var(--dim)", margin: 0 }}>{sel.note}</p>}
          {related.size > 0 && (
            <p className="mono" style={{ color: "var(--dim)", margin: 0 }}>
              appears alongside: {[...related].slice(0, 8).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="wall" data-reveal>
        {GROUPS.filter((g) => group === "All" || g === group).map((g) => (
          <div className="wall-group" key={g}>
            <h3 className="label">{g}</h3>
            <ul className="wall-grid">
              {SKILLS.filter((s) => s.group === g).map((s) => (
                <li key={s.name}>
                  <button
                    type="button"
                    className={`tile${s.name === sel.name ? " on" : ""}${ICONS[s.name] ? "" : " no-mark"}`}
                    aria-pressed={s.name === sel.name}
                    onMouseEnter={() => setSelected(s.name)}
                    onFocus={() => setSelected(s.name)}
                    onClick={() => setSelected(s.name)}
                    title={s.projects.length ? `${s.name}: used in ${s.projects.join(", ")}` : `${s.name}: working knowledge`}
                  >
                    <TechIcon name={s.name} size={30} />
                    <span>{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
