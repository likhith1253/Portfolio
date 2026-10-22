import type { ReactNode } from "react";
import {
  ALSO_BUILT, BLUESTOCK, CERTS, EDUCATION, OPEN_SOURCE, PROJECTS, RECOGNITION, SITE, SKILLS, TG_TRANSCO,
  type Project, type Role,
} from "@/data/site";

function Ext({ href, children, label, className }: { href: string; children: ReactNode; label?: string; className?: string }) {
  const external = href.startsWith("http");
  return (
    <a href={href} className={className} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

function SectionHead({ id, no, title, lead }: { id: string; no: string; title: string; lead?: string }) {
  return (
    <header className="sec-head">
      <p className="mono eyebrow" aria-hidden="true">{no}</p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

function RoleCard({ role, featured }: { role: Role; featured?: boolean }) {
  const meta = [role.title, role.period, role.location].filter(Boolean) as string[];
  return (
    <article className={`card role${featured ? " feature" : ""}`}>
      <p className="mono meta">{featured ? "AI/ML internship" : "Internship"}</p>
      <h3>{role.org}</h3>
      {meta.length > 0 && <p className="mono meta">{meta.join("  ·  ")}</p>}
      <p>{role.summary}</p>
      {role.bullets && <ul className="bullets">{role.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
      {role.tools && <Tags items={role.tools} />}
    </article>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flow" aria-label="Pipeline">
      {steps.map((s) => <li key={s}>{s}</li>)}
    </ol>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className={`card project${p.featured ? " feature" : ""}`}>
      <p className="mono meta">{p.kind}</p>
      <h3>{p.name}</h3>
      <p className="tagline">{p.tagline}</p>
      <Flow steps={p.flow} />
      <ul className="bullets">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
      <Tags items={p.tags} />
      <p className="links">
        {p.links.map((l) => (
          <Ext key={l.href} href={l.href}>{l.label}<span className="sr-only"> for {p.name}</span><span aria-hidden="true"> ↗</span></Ext>
        ))}
      </p>
    </article>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <div className="wrap bar">
          <a className="brand" href="#top" aria-label="LP. Likhith Ponnada, back to top">LP<span aria-hidden="true">.</span></a>
          <nav aria-label="Primary">
            <ul>
              <li><a href="#internships">Internships</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap" id="top" aria-labelledby="h1">
          <div className="hero-copy">
            <p className="mono eyebrow">Computer Science student · {EDUCATION.school}</p>
            <h1 id="h1">Likhith Ponnada</h1>
            <p className="statement">
              AI/ML-focused CS student who builds <em>complete systems</em>: the data pipeline, the model,
              the API and the interface it ships through.
            </p>
            <p className="actions">
              <a className="btn primary" href="#projects">See projects</a>
              <Ext className="btn" href={SITE.resume}>Resume (PDF)</Ext>
              <Ext className="btn" href={SITE.github}>GitHub</Ext>
            </p>
          </div>
          <figure className="portrait">
            <img src="/images/profile.jpg" width="836" height="1019" alt="Portrait of Likhith Ponnada" fetchPriority="high" />
          </figure>
        </section>

        <section className="wrap" aria-labelledby="internships">
          <SectionHead id="internships" no="01" title="Internships" lead="Applied work with real data and real stakeholders." />
          <div className="stack">
            <RoleCard role={TG_TRANSCO} featured />
            <RoleCard role={BLUESTOCK} />
          </div>
        </section>

        <section className="wrap" aria-labelledby="projects">
          <SectionHead id="projects" no="02" title="Selected projects" lead="Ordered by depth of engineering. Each claim comes from the project's own README." />
          <div className="stack">
            {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
          </div>
          <h3 className="sub">Also built</h3>
          <ul className="plain">
            {ALSO_BUILT.map((a) => (
              <li key={a.name}><Ext href={a.href}><strong>{a.name}</strong><span aria-hidden="true"> ↗</span></Ext> <span className="muted">{a.text}</span></li>
            ))}
          </ul>
        </section>

        <section className="wrap" aria-labelledby="skills">
          <SectionHead id="skills" no="03" title="Skills" />
          <dl className="skills">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <dt className="mono">{s.group}</dt>
                <dd>{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap" aria-labelledby="education">
          <SectionHead id="education" no="04" title="Education & community" />
          <div className="grid two">
            <article className="card">
              <h3>{EDUCATION.school}</h3>
              <p className="mono meta">{EDUCATION.expected}  ·  {EDUCATION.cgpa}</p>
              <p>{EDUCATION.degree}</p>
              <p className="muted">Coursework: {EDUCATION.coursework.join(", ")}.</p>
              <h4>Certificates</h4>
              <ul className="plain">
                {CERTS.map((c) => (
                  <li key={c.title}><Ext href={c.href}>{c.title}<span aria-hidden="true"> ↗</span></Ext><br /><span className="muted">{c.issuer}, {c.date}</span></li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Open source & recognition</h3>
              <ul className="plain">
                {OPEN_SOURCE.map((o) => (
                  <li key={o.name}><strong>{o.name}</strong>. <span className="muted">{o.text}</span>{o.href && <> <Ext href={o.href}>{o.label}<span aria-hidden="true"> ↗</span></Ext></>}</li>
                ))}
                {RECOGNITION.map((r) => (
                  <li key={r.name}><strong>{r.name}</strong>. <span className="muted">{r.text}</span></li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>

      <footer className="wrap foot" id="contact" aria-labelledby="contact-h">
        <h2 id="contact-h">Get in touch</h2>
        <p className="lead">Open to AI/ML and software engineering internships.</p>
        <ul className="contact">
          <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><Ext href={SITE.github}>GitHub</Ext></li>
          <li><Ext href={SITE.linkedin}>LinkedIn</Ext></li>
          <li><Ext href={SITE.resume}>Resume (PDF)</Ext></li>
        </ul>
        <p className="muted small">© {new Date().getFullYear()} Likhith Ponnada</p>
      </footer>
    </>
  );
}
