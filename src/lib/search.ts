import { EDUCATION, EXPERIENCE, PROJECTS, SITE, SKILLS, CERTS, OPEN_SOURCE, ALSO_BUILT } from "@/data/site";

// A tiny retrieval engine over the site's own content. BM25 over short passages,
// a few query expansions, and the passage's section as its citation. No LLM.
export interface Passage { id: string; source: string; anchor: string; text: string }

export function buildPassages(): Passage[] {
  const ps: Passage[] = [];
  ps.push({ id: "about", source: "About", anchor: "#top", text: `${SITE.name}. ${SITE.headline} ${SITE.intro} ${SITE.lookingFor}. Based in ${SITE.location}.` });
  for (const p of PROJECTS) {
    ps.push({ id: `${p.id}-what`, source: p.name, anchor: `#${p.id}`, text: `${p.name} (${p.kind}): ${p.oneLiner} ${p.problem}` });
    p.built.forEach((b, i) => ps.push({ id: `${p.id}-b${i}`, source: p.name, anchor: `#${p.id}`, text: `${p.name}: ${b}` }));
    ps.push({
      id: `${p.id}-m`, source: p.name, anchor: `#${p.id}`,
      text: `${p.name} results: ${p.metrics.map((m) => `${m.value}${m.suffix || ""} ${m.label}`).join(", ")}. ${p.metricNote || ""} Built with ${p.stack.join(", ")}.`,
    });
  }
  for (const r of EXPERIENCE) {
    ps.push({ id: `${r.id}`, source: r.org, anchor: "#experience", text: `${r.title} at ${r.org}, ${r.period}, ${r.location}. ${r.summary} Internship experience.` });
    r.bullets.forEach((b, i) => ps.push({ id: `${r.id}-${i}`, source: r.org, anchor: "#experience", text: `${r.org} internship: ${b} Tools: ${r.tools.join(", ")}.` }));
  }
  ps.push({ id: "edu", source: "Education", anchor: "#more", text: `${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.expected}, ${EDUCATION.cgpa}. Coursework: ${EDUCATION.coursework.join(", ")}. Student, studies, study, university, college, degree.` });
  const groups = [...new Set(SKILLS.map((s) => s.group))];
  for (const g of groups) {
    const items = SKILLS.filter((s) => s.group === g);
    ps.push({ id: `skills-${g}`, source: "Skills", anchor: "#skills", text: `${g} skills: ${items.map((s) => s.name + (s.projects.length ? ` (used in ${s.projects.join(", ")})` : "")).join("; ")}.` });
  }
  ps.push({ id: "certs", source: "Certifications", anchor: "#more", text: `Certifications: ${CERTS.map((c) => `${c.title} from ${c.issuer} (${c.date})`).join("; ")}.` });
  ps.push({ id: "oss", source: "Open source", anchor: "#more", text: `Open source: ${OPEN_SOURCE.map((o) => `${o.name}, ${o.text}`).join(" ")}` });
  ps.push({ id: "also", source: "Other projects", anchor: "#more", text: `Other projects: ${ALSO_BUILT.map((a) => `${a.name}: ${a.text}`).join(" ")}` });
  ps.push({ id: "contact", source: "Contact", anchor: "#contact", text: `Contact ${SITE.name} by email at ${SITE.email}, on LinkedIn, or on GitHub (likhith1253). Resume PDF available. Hire, reach, email, available for internships.` });
  return ps;
}

const STOP = new Set("a an the and or of to in on for with is are was were be by at as it its this that what which who whom how does do did has have he his him i me my you your about from can any tell show give list project projects use used uses using built build make made he's does there here where when".split(" "));
const EXPAND: Record<string, string[]> = {
  ml: ["machine", "learning"], ai: ["ml", "machine", "learning", "llm"], llm: ["langgraph", "rag", "qwen"],
  rag: ["retrieval", "citation", "qdrant"], retrieval: ["rag", "qdrant", "rerank"], backend: ["fastapi", "node", "express", "api"],
  frontend: ["react", "next", "typescript"], intern: ["internship"], internships: ["internship"], experience: ["internship"],
  work: ["internship", "built"], job: ["internship"], test: ["tests"], testing: ["tests"], db: ["postgresql", "sql"],
  database: ["postgresql", "sql", "redis"], security: ["auth", "permission", "rbac", "jwt"], python: ["python"],
  contact: ["email"], hire: ["contact", "email"], email: ["contact"], school: ["education"], college: ["education"],
  study: ["education"], degree: ["education"], accuracy: ["accuracy", "results"], accurate: ["accuracy", "results"], metrics: ["results"], results: ["results"],
  good: ["results"], performance: ["results", "accuracy"], experiment: ["results"], cv: ["opencv", "yolov8"], vision: ["opencv", "yolov8"],
};

const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9.%+#]+/g, " ").split(" ").map((w) => w.replace(/^\.+|\.+$/g, "")).filter((w) => w && !STOP.has(w));

export function makeIndex(passages: Passage[]) {
  const docs = passages.map((p) => tok(p.text + " " + p.source));
  const N = docs.length;
  const avg = docs.reduce((a, d) => a + d.length, 0) / N;
  const df = new Map<string, number>();
  docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
  return (query: string, k = 3) => {
    const q = tok(query);
    const terms = new Map<string, number>();
    q.forEach((w) => {
      terms.set(w, (terms.get(w) || 0) + 1);
      (EXPAND[w] || []).forEach((x) => terms.set(x, (terms.get(x) || 0) + 0.5));
    });
    const scored = docs.map((d, i) => {
      let s = 0;
      for (const [w, qw] of terms) {
        const f = d.filter((x) => x === w || (w.length > 4 && x.startsWith(w))).length;
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(w) || 0) + 0.5) / ((df.get(w) || 0) + 0.5));
        s += qw * idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (d.length / avg))));
      }
      return { p: passages[i], s };
    });
    return scored.filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, k);
  };
}
