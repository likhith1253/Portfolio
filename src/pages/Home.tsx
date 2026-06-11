import { motion } from "framer-motion";
import { Mail, FileText, ExternalLink, ChevronRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useActiveSection } from "@/hooks/useActiveSection";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { achievements } from "@/data/achievements";
import { opensource } from "@/data/opensource";
import MissionPathway from "@/components/MissionPathway";
import { getTechIcon } from "@/lib/tech-icons";

// ─── Config ────────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = "likhith1253";

const CONTACT = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: "https://linkedin.com/in/likhith-ponnada",
  email: "plnlikhith@gmail.com",
  resume: "/documents/Resume(full_stack).pdf",
};

const STATS = [
  { value: "5+", label: "Full Stack Projects", sub: "Production-grade applications" },
  { value: "3+", label: "Analytics Projects", sub: "Data pipelines & dashboards" },
  { value: "1",  label: "Internship Experience", sub: "Data Analytics @ Bluestock" },
  { value: "∞",  label: "Current Focus", sub: "Full Stack + Data Engineering" },
];

const NAV_SECTIONS = ["experience", "projects", "skills", "journey", "certifications", "opensource", "achievements", "about", "contact"];

// ─── Animation variants ─────────────────────────────────────────────────────────
const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ─── GitHub heatmap (decorative placeholder) ────────────────────────────────────
function seedRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const HEATMAP = Array.from({ length: 52 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const v = seedRandom(w * 7 + d);
    if (v < 0.44) return 0;
    if (v < 0.64) return 1;
    if (v < 0.81) return 2;
    if (v < 0.93) return 3;
    return 4;
  })
);

const HEAT_COLORS = [
  "bg-secondary",
  "bg-primary/15",
  "bg-primary/35",
  "bg-primary/60",
  "bg-primary",
];

// ─── Section heading component ──────────────────────────────────────────────────
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={FADE_UP}
    >
      <h2
        className="text-3xl font-bold tracking-tight mb-2"
        data-testid={`heading-${id}`}
      >
        {children}
      </h2>
      <div className="h-px w-24 bg-primary" />
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function Home() {
  const active = useActiveSection(NAV_SECTIONS);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/30">

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/60"
        data-testid="navbar"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="font-mono text-sm tracking-wider uppercase text-muted-foreground"
            data-testid="text-logo"
          >
            Likhith&nbsp;// Mission Control
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {[
              { label: "Experience",    id: "experience"    },
              { label: "Projects",      id: "projects"      },
              { label: "Skills",        id: "skills"        },
              { label: "Pathway",       id: "journey"       },
              { label: "Certs",         id: "certifications"},
              { label: "Open Source",   id: "opensource"    },
              { label: "Achievements",  id: "achievements"  },
              { label: "Contact",       id: "contact"       },
            ].map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                data-testid={`nav-${id}`}
                className={`transition-colors duration-200 ${
                  active === id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href={CONTACT.resume}
              data-testid="nav-resume"
              className="px-4 py-1.5 border border-border hover:border-primary/70 transition-colors rounded-sm text-sm font-medium"
            >
              Resume
            </a>
          </div>

          {/* Mobile: just logo + resume */}
          <a
            href={CONTACT.resume}
            className="md:hidden px-3 py-1.5 border border-border rounded-sm text-xs font-medium"
          >
            Resume
          </a>
        </div>
      </nav>

      <main className="pt-24 pb-32 max-w-6xl mx-auto px-6 space-y-32">

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left — text */}
            <div className="space-y-8 order-2 md:order-1">
              <motion.div
                variants={FADE_UP}
                className="inline-flex items-center gap-3 px-3 py-1 border border-border bg-card rounded-sm font-mono text-xs text-muted-foreground uppercase tracking-wider"
                data-testid="status-indicator"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                System Online
              </motion.div>

              <motion.div variants={FADE_UP} className="space-y-3">
                <h1
                  className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
                  data-testid="text-name"
                >
                  Likhith<br />Ponnada
                </h1>
                <p
                  className="text-xl text-muted-foreground font-light"
                  data-testid="text-title"
                >
                  AI-Assisted Full Stack Developer specializing in database design, backend architecture, and intelligent web applications.
                </p>
              </motion.div>

              <motion.p
                variants={FADE_UP}
                className="text-muted-foreground leading-relaxed max-w-lg"
                data-testid="text-description"
              >
                Passionate about building scalable systems from the data layer upward—designing efficient schemas, APIs, analytics platforms, and AI-powered products that transform complex data into usable software.
              </motion.p>

              <motion.div variants={FADE_UP} className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  data-testid="link-view-missions"
                  className="px-6 py-3 bg-foreground text-background font-medium hover:bg-primary hover:text-primary-foreground transition-all rounded-sm text-sm flex items-center gap-2"
                >
                  View Missions <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT.resume}
                  data-testid="link-resume-hero"
                  className="px-6 py-3 border border-border hover:border-primary/70 transition-colors rounded-sm text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Download Resume
                </a>
              </motion.div>

              <motion.div
                variants={FADE_UP}
                className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-border/50"
              >
                {[
                  { label: "Primary Focus",    value: "Full Stack Web"   },
                  { label: "Current Learning", value: "System Design"    },
                  { label: "Analytics Stack",  value: "Python / Pandas"  },
                  { label: "Next Frontier",    value: "ML Systems"       },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-0.5">
                    <div className="font-mono text-xs text-muted-foreground uppercase">
                      {label}
                    </div>
                    <div className="text-sm font-medium" data-testid={`text-${label.toLowerCase().replace(/ /g, "-")}`}>
                      {value}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — profile photo */}
            <motion.div
              variants={FADE_UP}
              className="flex justify-center md:justify-end order-1 md:order-2"
            >
              <div className="relative group" data-testid="profile-image-placeholder">
                <div className="w-52 h-52 md:w-56 md:h-56 rounded-full border-2 border-border group-hover:border-primary/60 transition-all duration-400 flex flex-col items-center justify-center bg-card overflow-hidden flex-shrink-0">
                  {/* Profile image — loads from /public/images/profile.jpg or shows placeholder */}
                  <img
                    src="/images/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                {/* Outer decorative ring */}
                <div className="absolute -inset-3 rounded-full border border-border/20 group-hover:border-primary/20 transition-colors duration-400 pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Quick Stats ────────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={STAGGER}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={FADE_UP}
              className="bg-card border border-card-border p-6 rounded-sm space-y-2"
              data-testid={`stat-card-${i}`}
            >
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="font-medium text-sm leading-tight">{stat.label}</div>
              <div className="font-mono text-xs text-muted-foreground leading-snug">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* ── Experience Log ─────────────────────────────────────────────────── */}
        <section id="experience" className="space-y-12">
          <SectionHeading id="experience">Experience Log</SectionHeading>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={FADE_UP}
                className="bg-card border border-card-border rounded-sm overflow-hidden"
                data-testid={`experience-card-${i}`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-6 border-b border-card-border">
                  <div>
                    <div className="font-mono text-xs text-primary uppercase tracking-wider mb-1">
                      {exp.type}
                    </div>
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <div className="text-muted-foreground text-sm mt-1">{exp.role}</div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-mono text-sm text-muted-foreground">{exp.duration}</div>
                    {exp.location && (
                      <div className="font-mono text-xs text-muted-foreground/50 mt-1">{exp.location}</div>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Responsibilities
                    </div>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="text-sm text-foreground/75 flex gap-2.5 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                        Tools Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 bg-secondary text-secondary-foreground font-mono text-xs rounded-sm border border-border/40"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Key Learnings
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed">{exp.keyLearnings}</p>
                    </div>
                  </div>
                </div>

                {exp.projectsCompleted && (
                  <div className="px-6 pb-6 border-t border-card-border pt-5">
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Projects Completed
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed">{exp.projectsCompleted}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Active Missions ─────────────────────────────────────────────────── */}
        <section id="projects" className="space-y-16">
          <SectionHeading id="projects">Active Missions</SectionHeading>

          <div className="space-y-20">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={FADE_UP}
                className="grid md:grid-cols-12 gap-8"
                data-testid={`project-card-${i}`}
              >
                {/* Left sidebar */}
                <div className="md:col-span-4 space-y-4">
                  <div className="font-mono text-sm text-primary uppercase tracking-wider">
                    Mission {String(i + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-2xl font-bold" data-testid={`text-project-${i}-title`}>
                    {project.name ? (
                      project.name
                    ) : (
                      <span className="text-muted-foreground/30 italic font-light text-xl">
                        Project name
                      </span>
                    )}
                  </h3>

                  {project.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => {
                        const techIcon = getTechIcon(tech);
                        const IconComponent = techIcon?.icon;
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-2 py-1 bg-secondary text-secondary-foreground font-mono text-xs rounded-sm border border-border/40"
                          >
                            {IconComponent && <IconComponent className="w-3.5 h-3.5" style={{ color: techIcon?.color || 'currentColor' }} />}
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {["Tech", "Stack", "Here"].map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 border border-dashed border-border/40 font-mono text-xs rounded-sm text-muted-foreground/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-5 pt-3">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-project-${i}-source`}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                      >
                        <SiGithub className="w-4 h-4" /> Source
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground/25">
                        [ GitHub ]
                      </span>
                    )}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-project-${i}-demo`}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground/25">
                        [ Live Demo ]
                      </span>
                    )}
                  </div>
                </div>

                {/* Right case study card */}
                <div className="md:col-span-8 space-y-6">
                  <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                    {[
                      { label: "Objective", value: project.objective },
                      { label: "Problem",   value: project.problem   },
                      { label: "Solution",  value: project.solution  },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                          {label}
                        </h4>
                        {value ? (
                          <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{value}</div>
                        ) : (
                          <div className="space-y-1.5">
                            <div className="h-3 bg-secondary/50 rounded-sm w-5/6 border border-dashed border-border/30" />
                            <div className="h-3 bg-secondary/30 rounded-sm w-3/5 border border-dashed border-border/20" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>


                  {project.technicalChallenges && project.technicalChallenges.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Technical Challenges
                      </h4>
                      <div className="space-y-6">
                        {project.technicalChallenges.map((challenge, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="text-sm font-semibold text-foreground/90">Challenge {challenge.id}: {challenge.title}</div>
                            <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{challenge.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.architectureDecisions && project.architectureDecisions.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Architecture Decisions
                      </h4>
                      <div className="space-y-6">
                        {project.architectureDecisions.map((decision, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="text-sm font-semibold text-foreground/90">Decision {decision.id}: {decision.title}</div>
                            <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{decision.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.highlightSection && (
                    <div className="bg-primary/5 border border-primary/20 p-8 rounded-sm space-y-6 border-l-2 border-l-primary">
                      <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-4">
                        {project.highlightSection.title}
                      </h4>
                      <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                        {project.highlightSection.content}
                      </div>
                      <div className="text-sm text-foreground/80 mt-4 font-semibold">Key concepts demonstrated:</div>
                      {project.highlightSection.list && (
                        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80 mt-2">
                          {project.highlightSection.list.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      )}
                      {project.highlightSection.footer && (
                        <div className="text-sm text-foreground/80 mt-4">
                          {project.highlightSection.footer}
                        </div>
                      )}
                    </div>
                  )}

                  {project.engineeringTakeaways && project.engineeringTakeaways.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Engineering Takeaways
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        {project.engineeringTakeaways.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.impactMetrics && project.impactMetrics.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6 border-l-2 border-l-primary">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Impact Metrics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.impactMetrics.map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-secondary text-secondary-foreground font-mono text-xs rounded-sm border border-border/40">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.recruiterFocus && project.recruiterFocus.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Recruiter Focus
                      </h4>
                      <div className="text-sm text-foreground/80 mb-2">This project demonstrates:</div>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        {project.recruiterFocus.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.architecture && project.architecture.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Architecture Overview
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        {project.architecture.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.techStackDetails && project.techStackDetails.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Technology Stack
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.techStackDetails.map((tech, idx) => (
                          <div key={idx}>
                            <div className="text-xs font-semibold text-foreground/70 mb-1">{tech.category}</div>
                            <div className="text-sm text-foreground/90">{tech.items}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Key Features
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        {project.keyFeatures.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.learningOutcomes && project.learningOutcomes.length > 0 && (
                    <div className="bg-card border border-card-border p-8 rounded-sm space-y-6">
                      <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                        Learning Outcomes
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        {project.learningOutcomes.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Engineering Dashboard ──────────────────────────────────────────── */}
        <section id="skills" className="space-y-12">
          <SectionHeading id="skills">Engineering Dashboard</SectionHeading>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {skills.map((cat, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                className={`bg-card border border-card-border p-6 rounded-sm space-y-4 ${
                  cat.highlighted ? "border-l-2 border-l-primary" : ""
                }`}
                data-testid={`skill-category-${i}`}
              >
                <h3
                  className={`font-mono text-xs uppercase tracking-wider ${
                    cat.highlighted ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => {
                    const techIcon = getTechIcon(item);
                    const IconComponent = techIcon?.icon;
                    return (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-foreground font-mono text-xs rounded-sm border border-border/40"
                        data-testid={`skill-chip-${item.toLowerCase().replace(/ /g, "-")}`}
                      >
                        {IconComponent && <IconComponent className="w-3.5 h-3.5" style={{ color: techIcon?.color || 'currentColor' }} />}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── GitHub Activity ────────────────────────────────────────────────── */}
        <section id="activity" className="space-y-12">
          <SectionHeading id="activity">Development Activity</SectionHeading>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER}
            className="grid md:grid-cols-3 gap-5"
          >
            {/* Heatmap */}
            <motion.div
              variants={FADE_UP}
              className="md:col-span-2 bg-card border border-card-border p-6 rounded-sm space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Contribution Activity
                </div>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-primary hover:underline flex items-center gap-1.5"
                  data-testid="link-github-profile"
                >
                  <SiGithub className="w-3 h-3" />
                  @{GITHUB_USERNAME}
                </a>
              </div>

              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-max">
                  {HEATMAP.map((week, w) => (
                    <div key={w} className="flex flex-col gap-[3px]">
                      {week.map((level, d) => (
                        <div
                          key={d}
                          className={`w-2.5 h-2.5 rounded-[2px] ${HEAT_COLORS[level]}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground/50 font-mono">
                <span>Less</span>
                {HEAT_COLORS.map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />
                ))}
                <span>More</span>
              </div>
            </motion.div>

            {/* Stats panel */}
            <motion.div
              variants={FADE_UP}
              className="bg-card border border-card-border p-6 rounded-sm space-y-6"
              data-testid="github-stats-panel"
            >
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                GitHub Summary
              </div>
              <div className="space-y-4">
                {[
                  { label: "Public Repos",   value: "—" },
                  { label: "Total Stars",    value: "—" },
                  { label: "Contributions",  value: "—" },
                  { label: "Followers",      value: "—" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="font-mono text-sm text-foreground/50">{value}</span>
                  </div>
                ))}
              </div>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
                data-testid="link-github-visit"
              >
                <SiGithub className="w-4 h-4" /> View on GitHub
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Mission Pathway ─────────────────────────────────────────────────── */}
        <section id="journey" className="space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2" data-testid="heading-journey">
              Mission Pathway
            </h2>
            <div className="h-px w-24 bg-primary mb-3" />
            <p className="text-sm text-muted-foreground max-w-lg">
              Click any node to expand details and navigate to the relevant section.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
          >
            <MissionPathway />
          </motion.div>
        </section>

        {/* ── Current Coordinates ────────────────────────────────────────────── */}
        <section id="coordinates" className="space-y-12">
          <SectionHeading id="coordinates">Current Coordinates</SectionHeading>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
            className="bg-card border border-card-border p-8 rounded-sm"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border/40">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div
                className="font-mono text-sm uppercase tracking-wider text-muted-foreground"
                data-testid="status-mission-active"
              >
                Mission Status: Active — Building in Public
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Primary Focus",    value: "Full Stack Development", highlight: false },
                { label: "Secondary Focus",  value: "Data Analytics",         highlight: false },
                { label: "Current Learning", value: "System Design",          highlight: false },
                { label: "Exploration Area", value: "Machine Learning",       highlight: true  },
              ].map(({ label, value, highlight }) => (
                <div key={label}>
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {label}
                  </div>
                  <div className={`font-medium text-lg leading-snug ${highlight ? "text-primary" : ""}`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Certifications ─────────────────────────────────────────────────── */}
        <section id="certifications" className="space-y-12">
          <SectionHeading id="certifications">Learning & Certifications</SectionHeading>

          {/* Summary Panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
            className="bg-card border border-card-border p-8 rounded-sm space-y-4"
          >
            <div className="font-mono text-xs text-primary uppercase tracking-wider">
              Continuous Learning
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
              Focused on strengthening expertise across Full Stack Development, Data Analytics, Machine Learning, Backend Engineering, and Database Design through a combination of structured coursework and hands-on project development.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                className="bg-card border border-card-border p-8 rounded-sm space-y-6 hover:border-primary/40 transition-colors"
                data-testid={`cert-card-${i}`}
              >
                {/* Header with featured badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="font-mono text-xs text-primary uppercase tracking-wider">
                      {cert.issuer}
                      {cert.academicPartner && ` — ${cert.academicPartner}`}
                    </div>
                    <h3 className="text-xl font-bold leading-snug">{cert.title}</h3>
                  </div>
                  {cert.featured && (
                    <span className="px-2.5 py-1 bg-primary/15 border border-primary/40 text-primary font-mono text-xs rounded-sm whitespace-nowrap">
                      Featured
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Completed
                    </div>
                    <div className="text-sm font-medium">{cert.completionDate}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Category
                    </div>
                    <div className="text-sm font-medium">{cert.category}</div>
                  </div>
                  {cert.instructor && (
                    <div className="col-span-2">
                      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Instructor
                      </div>
                      <div className="text-sm font-medium">{cert.instructor}</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="border-t border-card-border pt-4">
                  <p className="text-sm text-foreground/75 leading-relaxed">{cert.description}</p>
                </div>

                {/* Key Topics */}
                {cert.keyTopicsCovered.length > 0 && (
                  <div className="border-t border-card-border pt-4 space-y-3">
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                      Key Topics Covered
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.keyTopicsCovered.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 bg-secondary text-secondary-foreground font-mono text-xs rounded-sm border border-border/40"
                        >
                          {topic}
                        </span>
                      ))}
                      {cert.keyTopicsCovered.length > 4 && (
                        <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground font-mono text-xs rounded-sm border border-border/40">
                          +{cert.keyTopicsCovered.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {cert.skillsDemonstrated.length > 0 && (
                  <div className="border-t border-card-border pt-4 space-y-3">
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                      Skills Demonstrated
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.skillsDemonstrated.map((skill) => {
                        const techIcon = getTechIcon(skill);
                        const IconComponent = techIcon?.icon;
                        return (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary font-mono text-xs rounded-sm border border-primary/30"
                          >
                            {IconComponent && <IconComponent className="w-3.5 h-3.5" style={{ color: techIcon?.color || 'currentColor' }} />}
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Credential Link */}
                <div className="border-t border-card-border pt-4 flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Status: {cert.status === "completed" && "Completed ✓"}
                  </span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                      data-testid={`cert-link-${i}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Credential
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        
        {/* ── Open Source & Community ────────────────────────────────────────── */}
        <section id="opensource" className="space-y-12">
          <SectionHeading id="opensource">Open Source & Community</SectionHeading>

          <div className="space-y-6">
            {opensource.map((contrib, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={FADE_UP}
                className="bg-card border border-card-border rounded-sm overflow-hidden"
                data-testid={`opensource-card-${i}`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-6 border-b border-card-border">
                  <div>
                    <div className="font-mono text-xs text-primary uppercase tracking-wider mb-1">
                      {contrib.type}
                    </div>
                    <h3 className="text-xl font-bold">{contrib.project}</h3>
                    <div className="text-muted-foreground text-sm mt-1">{contrib.contribution}</div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-mono text-sm text-muted-foreground">{contrib.status}</div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Description
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed">{contrib.description}</p>
                  </div>

                  <div className="space-y-6">
                    {contrib.technologies && contrib.technologies.length > 0 && (
                      <div>
                        <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                          Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {contrib.technologies.map((tool) => {
                            const techIcon = getTechIcon(tool);
                            const IconComponent = techIcon?.icon;
                            return (
                              <span
                                key={tool}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-foreground font-mono text-xs rounded-sm border border-border/40"
                              >
                                {IconComponent && <IconComponent className="w-3.5 h-3.5" style={{ color: techIcon?.color || 'currentColor' }} />}
                                {tool}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {contrib.link && (
                      <div>
                        <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                          Links
                        </div>
                        <div className="flex flex-col gap-2">
                          {contrib.repository && (
                            <a href={contrib.repository} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1.5">
                              <ExternalLink className="w-3.5 h-3.5" /> Repository
                            </a>
                          )}
                          <a href={contrib.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" /> View Contribution
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Achievements ───────────────────────────────────────────────────── */}
        <section id="achievements" className="space-y-12">
          <SectionHeading id="achievements">Achievements & Recognition</SectionHeading>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                className="bg-card border border-card-border p-6 rounded-sm space-y-3 hover:border-primary/30 transition-colors"
                data-testid={`achievement-card-${i}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold leading-snug">{ach.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1">{ach.organization}</div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground shrink-0">{ach.date}</div>
                </div>
                {ach.description && (
                  <p className="text-sm text-foreground/70 leading-relaxed">{ach.description}</p>
                )}
                {ach.status && (
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-2 border-t border-card-border pt-3">
                    Status: {ach.status}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── About ──────────────────────────────────────────────────────────── */}
        <section id="about" className="space-y-8">
          <SectionHeading id="about">About</SectionHeading>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
            className="text-muted-foreground leading-relaxed max-w-2xl"
            data-testid="text-about"
          >
            I'm a software engineering student building full stack, data-driven applications. I care
            about clean architecture, robust database design, and shipping software that works reliably.
            Outside of web development, I'm expanding into analytics — working with Python, Pandas, and
            SQL to make sense of complex datasets. My long-term interest is in machine learning: not
            just training models, but deploying them as dependable production services. I learn best by
            building.
          </motion.p>
        </section>

        {/* ── Contact ────────────────────────────────────────────────────────── */}
        <section id="contact" className="pt-16 border-t border-border/50 space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-2" data-testid="heading-contact">
              Establish Connection
            </h2>
            <p className="text-muted-foreground">
              Open to internships, collaborations, and interesting engineering problems.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER}
            className="flex flex-wrap items-center gap-6"
          >
            <motion.a
              variants={FADE_UP}
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-contact-github"
              className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </motion.a>
            <motion.a
              variants={FADE_UP}
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-contact-linkedin"
              className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </motion.a>
            <motion.a
              variants={FADE_UP}
              href={`mailto:${CONTACT.email}`}
              data-testid="link-contact-email"
              className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">{CONTACT.email}</span>
            </motion.a>
            <motion.a
              variants={FADE_UP}
              href={CONTACT.resume}
              data-testid="link-contact-resume"
              className="flex items-center gap-2.5 px-5 py-2.5 border border-border hover:border-primary/70 transition-colors rounded-sm text-sm font-medium"
            >
              <FileText className="w-4 h-4" /> Download Resume
            </motion.a>
          </motion.div>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/30 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-mono text-xs text-muted-foreground/50 uppercase tracking-wider">
            Likhith Ponnada // Mission Control
          </div>
          <div className="font-mono text-xs text-muted-foreground/30">
            Designed &amp; built from scratch
          </div>
        </div>
      </footer>
    </div>
  );
}
