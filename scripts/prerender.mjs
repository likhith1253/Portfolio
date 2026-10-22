// Build step: inject the server-rendered page into dist/index.html and generate the
// machine-readable files (JSON-LD, llms.txt, llms-full.txt, profile.json, sitemap.xml)
// from the same data the page renders, so they can never disagree.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const { render, data } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { SITE, EDUCATION, EXPERIENCE, PROJECTS, SKILLS, CERTS, OPEN_SOURCE, ALSO_BUILT, RECOGNITION } = data;
const today = new Date().toISOString().slice(0, 10);
const url = SITE.url;
const fmt = (m) => `${m.decimals ? m.value.toFixed(m.decimals) : m.value.toLocaleString("en-US")}${m.suffix || ""} ${m.label}`;
const codeLink = (p) => p.links.find((l) => l.label === "Code")?.href;
const liveLink = (p) => p.links.find((l) => l.label !== "Code")?.href;
const skillNames = [...new Set(SKILLS.map((s) => s.name))];

// ---------- JSON-LD ----------
const person = {
  "@type": "Person",
  "@id": `${url}#person`,
  name: SITE.name,
  givenName: "Likhith",
  familyName: "Ponnada",
  url,
  image: `${url}images/profile.jpg`,
  email: `mailto:${SITE.email}`,
  jobTitle: "Computer Science student, AI/ML and software engineering",
  description: `${SITE.headline} ${SITE.intro}`,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  affiliation: { "@type": "CollegeOrUniversity", name: EDUCATION.school },
  knowsAbout: skillNames,
  sameAs: [SITE.github, SITE.linkedin],
  seeks: { "@type": "Demand", description: SITE.lookingFor },
  hasOccupation: EXPERIENCE.map((r) => ({
    "@type": "Occupation",
    name: `${r.title}, ${r.org}`,
    description: `${r.period}. ${r.summary} ${r.bullets.join(" ")}`,
    occupationLocation: { "@type": "City", name: "Hyderabad" },
    skills: r.tools.join(", "),
  })),
  hasCredential: CERTS.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: c.issuer },
    url: c.href,
  })),
};
const projects = PROJECTS.map((p) => ({
  "@type": "SoftwareSourceCode",
  "@id": `${url}#${p.id}`,
  name: p.name,
  description: `${p.oneLiner} ${p.built.join(" ")} Results: ${p.metrics.map(fmt).join("; ")}.`,
  ...(codeLink(p) ? { codeRepository: codeLink(p) } : {}),
  ...(liveLink(p) ? { url: liveLink(p) } : { url: `${url}#${p.id}` }),
  keywords: p.stack.join(", "),
  author: { "@id": `${url}#person` },
}));
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ProfilePage", "@id": `${url}#page`, url, name: `${SITE.name} · Portfolio`, dateModified: today, mainEntity: { "@id": `${url}#person` }, hasPart: projects.map((p) => ({ "@id": p["@id"] })) },
    person,
    ...projects,
  ],
};

// ---------- llms.txt (llmstxt.org format) ----------
const llms = `# ${SITE.name}

> ${SITE.headline} AI/ML-focused computer science student at ${EDUCATION.school} (${EDUCATION.degree}, ${EDUCATION.expected}). ${SITE.lookingFor}. Based in ${SITE.location}.

Contact: ${SITE.email} · GitHub: ${SITE.github} · LinkedIn: ${SITE.linkedin} · Resume: ${url}documents/RESUME.pdf

## Projects

${PROJECTS.map((p) => `- [${p.name}](${codeLink(p) || liveLink(p)}): ${p.kind}. ${p.oneLiner} Results: ${p.metrics.map(fmt).join("; ")}. Stack: ${p.stack.join(", ")}.`).join("\n")}

## Experience

${EXPERIENCE.map((r) => `- ${r.title}, ${r.org} (${r.period}, ${r.location}): ${r.summary} Tools: ${r.tools.join(", ")}.`).join("\n")}

## Skills

${[...new Set(SKILLS.map((s) => s.group))].map((g) => `- ${g}: ${SKILLS.filter((s) => s.group === g).map((s) => s.name).join(", ")}`).join("\n")}

## Optional

- [Full profile in Markdown](${url}llms-full.txt)
- [Structured profile (JSON Resume)](${url}profile.json)
- [Portfolio](${url})
`;

// ---------- llms-full.txt ----------
const full = `# ${SITE.name}

${SITE.headline}

${SITE.intro}

- Status: ${SITE.lookingFor}
- Location: ${SITE.location}
- Email: ${SITE.email}
- GitHub: ${SITE.github}
- LinkedIn: ${SITE.linkedin}
- Resume: ${url}documents/RESUME.pdf

## Experience

${EXPERIENCE.map((r) => `### ${r.title}, ${r.org}
${r.period} · ${r.location}

${r.summary}

${r.bullets.map((b) => `- ${b}`).join("\n")}

Tools: ${r.tools.join(", ")}`).join("\n\n")}

## Projects

${PROJECTS.map((p) => `### ${p.name} (${p.kind})

${p.oneLiner}

Problem: ${p.problem}

What I built:
${p.built.map((b) => `- ${b}`).join("\n")}

Results: ${p.metrics.map(fmt).join("; ")}.${p.metricNote ? " " + p.metricNote : ""}

Stack: ${p.stack.join(", ")}
Links: ${p.links.map((l) => `${l.label}: ${l.href}`).join(" · ")}`).join("\n\n")}

### Other projects
${ALSO_BUILT.map((a) => `- ${a.name}: ${a.text} (${a.href})`).join("\n")}

## Skills (with the projects that use them)

${SKILLS.map((s) => `- ${s.name} [${s.group}]${s.projects.length ? `: ${s.projects.join(", ")}` : ""}`).join("\n")}

## Education

${EDUCATION.degree}, ${EDUCATION.school}. ${EDUCATION.expected}. ${EDUCATION.cgpa}. Coursework: ${EDUCATION.coursework.join(", ")}.

## Certifications

${CERTS.map((c) => `- ${c.title}, ${c.issuer} (${c.date}): ${c.href}`).join("\n")}

## Open source and recognition

${OPEN_SOURCE.map((o) => `- ${o.name}: ${o.text}${o.href ? ` (${o.href})` : ""}`).join("\n")}
${RECOGNITION.map((r) => `- ${r.name}: ${r.text}`).join("\n")}

Last updated ${today}.
`;

// ---------- profile.json (JSON Resume schema) ----------
const toISO = (s) => {
  const months = { january: "01", february: "02", march: "03", april: "04", may: "05", june: "06", july: "07", august: "08", september: "09", october: "10", november: "11", december: "12" };
  const [m, y] = s.trim().split(/\s+/);
  return `${y}-${months[m.toLowerCase()]}`;
};
const resume = {
  $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: SITE.name,
    label: "AI/ML-focused computer science student",
    email: SITE.email,
    url,
    summary: `${SITE.headline} ${SITE.intro}`,
    location: { city: "Hyderabad", countryCode: "IN" },
    profiles: [
      { network: "GitHub", username: "likhith1253", url: SITE.github },
      { network: "LinkedIn", username: "likhith-ponnada", url: SITE.linkedin },
    ],
  },
  work: EXPERIENCE.map((r) => {
    const [a, b] = r.period.split("–");
    return { name: r.org, position: r.title, location: r.location, startDate: toISO(a), endDate: toISO(b), summary: r.summary, highlights: r.bullets };
  }),
  education: [{ institution: EDUCATION.school, area: "Computer Science and Engineering", studyType: "B.Tech", endDate: "2028-05", score: EDUCATION.cgpa.replace("CGPA ", ""), courses: EDUCATION.coursework }],
  certificates: CERTS.map((c) => ({ name: c.title, issuer: c.issuer, url: c.href })),
  skills: [...new Set(SKILLS.map((s) => s.group))].map((g) => ({ name: g, keywords: SKILLS.filter((s) => s.group === g).map((s) => s.name) })),
  projects: PROJECTS.map((p) => ({ name: p.name, description: p.oneLiner, highlights: [...p.built, `Results: ${p.metrics.map(fmt).join("; ")}`], keywords: p.stack, url: codeLink(p) || liveLink(p) })),
  meta: { canonical: `${url}profile.json`, lastModified: today },
};

// ---------- sitemap ----------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
  <url><loc>${url}llms.txt</loc><lastmod>${today}</lastmod><priority>0.6</priority></url>
  <url><loc>${url}llms-full.txt</loc><lastmod>${today}</lastmod><priority>0.6</priority></url>
  <url><loc>${url}profile.json</loc><lastmod>${today}</lastmod><priority>0.6</priority></url>
  <url><loc>${url}documents/RESUME.pdf</loc><lastmod>${today}</lastmod><priority>0.5</priority></url>
</urlset>
`;

// ---------- write ----------
const indexPath = path.join(dist, "index.html");
let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("root placeholder not found");
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
html = html.replace("<!--jsonld-->", `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`);
fs.writeFileSync(indexPath, html);
fs.writeFileSync(path.join(dist, "llms.txt"), llms);
fs.writeFileSync(path.join(dist, "llms-full.txt"), full);
fs.writeFileSync(path.join(dist, "profile.json"), JSON.stringify(resume, null, 2));
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered index.html (${(html.length / 1024).toFixed(1)} kB) + llms.txt, llms-full.txt, profile.json, sitemap.xml`);
