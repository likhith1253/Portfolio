// Single source of truth for personal facts. Every value here is taken from the
// owner's resume (public/documents/RESUME.pdf), the previous site, or the
// project READMEs. Do not add claims that cannot be traced to one of those.
export const SITE = {
  name: "Likhith Ponnada",
  url: "https://likhithponnada.vercel.app/",
  github: "https://github.com/likhith1253",
  linkedin: "https://linkedin.com/in/likhith-ponnada",
  email: "plnlikhith@gmail.com",
  resume: "/documents/RESUME.pdf",
};

export const EDUCATION = {
  school: "Amrita Vishwa Vidyapeetham",
  degree: "B.Tech in Computer Science and Engineering",
  expected: "Expected May 2028",
  cgpa: "CGPA 8.3",
  coursework: ["Artificial Intelligence", "Machine Learning", "Probability & Statistics", "Data Structures & Algorithms", "DBMS"],
};

export interface Role {
  org: string;
  title?: string;
  period?: string;
  location?: string;
  summary: string;
  bullets?: string[];
  tools?: string[];
}

// TG Transco: details supplied by the owner (role, dates, description). The 12% / 15% figures are stated as targets, as the owner worded them.
export const TG_TRANSCO: Role = {
  org: "TG Transco",
  title: "AI/ML Intern",
  period: "April 2026 – June 2026",
  location: "Hyderabad, India (on-site)",
  summary: "Internal analytics tool for electrical load forecasting, load-balance analysis and distribution planning.",
  bullets: [
    "Built a Python and Flask web application that brings historical load analysis, predictive forecasting and regional load assessment into one tool.",
    "Trained a machine-learning model to predict electricity demand from historical load patterns, and surfaced its output in the interface to help spot potentially high-stress distribution areas.",
    "Designed to cut load-analysis time by 12% and improve forecasting error by 15% relative to a baseline model (targets for the tool).",
  ],
  tools: ["Python", "Flask", "Machine learning", "Predictive analytics"],
};

export const BLUESTOCK: Role = {
  org: "Bluestock Fintech Pvt. Ltd.",
  title: "Data Analyst Intern",
  period: "April 2026 – June 2026",
  location: "Hyderabad, India",
  summary: "Financial data engineering and analytics on public mutual-fund datasets.",
  bullets: [
    "Built ETL pipelines (Python, Pandas, SQLAlchemy) over 46,000+ mutual fund NAV records and 32,000+ investor transactions.",
    "Designed normalized star-schema databases and computed Sharpe, Sortino, Alpha, Beta, VaR and Maximum Drawdown.",
    "Delivered a Power BI dashboard and 15+ analytical visualizations; benchmarked funds against Nifty 50 and Nifty 100.",
  ],
  tools: ["Python", "Pandas", "SQL", "SQLAlchemy", "PostgreSQL", "Power BI"],
};

export interface Project {
  name: string;
  tagline: string;
  bullets: string[];
  flow: string[];
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  kind: string;
}

// Claims below were checked against each repo's README under D:\ (see report).
export const PROJECTS: Project[] = [
  {
    name: "Veridex",
    kind: "AI financial reconciliation",
    tagline: "Matches payment-gateway, ledger and bank records, finds which leg broke, and explains why. Humans approve every corrective action.",
    bullets: [
      "Deterministic rules first, then an XGBoost arbitration model, then an LLM investigation (LangGraph) only for what survives.",
      "Policy-gated human approval with server-side ceilings and an immutable audit trail.",
      "52 backend test modules run in CI; a seeded evaluation harness scores the engine separately from live usage.",
      "Deployed: Next.js on Vercel, FastAPI on Render, PostgreSQL on Neon.",
    ],
    flow: ["Gateway · Ledger · Bank", "Rules", "XGBoost", "LLM investigation", "Human approval"],
    tags: ["FastAPI", "XGBoost", "LangGraph", "Next.js", "PostgreSQL", "Qdrant"],
    links: [
      { label: "Live app", href: "https://veridex-three.vercel.app" },
      { label: "Source", href: "https://github.com/likhith1253/veridex" },
    ],
    featured: true,
  },
  {
    name: "DocRag",
    kind: "Research-paper RAG",
    tagline: "Question answering over academic PDFs with section- and page-level citations, built to refuse rather than guess.",
    bullets: [
      "Layout-aware parsing keeps equations, tables and algorithms as tagged chunks.",
      "Per-collection Qdrant isolation, MMR plus cross-encoder reranking, and an evidence swap that keeps equation chunks from being dropped.",
      "Grounding prompt returns a refusal when the context lacks the answer. On a 64-question human-verified benchmark: 84.4% answer accuracy, 81.25% retrieval hit rate, 95.3% correct citations.",
    ],
    flow: ["PDF parse", "Chunk + embed", "Qdrant", "Rerank", "Cited answer"],
    tags: ["Python", "Qdrant", "FastAPI", "Streamlit", "sentence-transformers"],
    links: [{ label: "Source", href: "https://github.com/likhith1253/DocRag" }],
  },
  {
    name: "SynergySpace",
    kind: "Real-time collaborative editor",
    tagline: "Multi-user document editing as a microservice monorepo, with AI writing assistance and role-based organizations.",
    bullets: [
      "Live multi-user editing over Socket.IO, with room access and write permission checked against the database.",
      "Separate auth, organization, document, collaboration and FastAPI AI services behind one gateway.",
      "README documents its trade-offs: shared database, single gateway, no published latency benchmark.",
    ],
    flow: ["Next.js", "API gateway", "Auth · Org · Docs", "Collab (Socket.IO)", "AI (FastAPI)"],
    tags: ["Next.js", "Socket.IO", "Prisma", "PostgreSQL", "FastAPI"],
    links: [
      { label: "Live demo", href: "https://synergyspace-web.vercel.app" },
      { label: "Source", href: "https://github.com/likhith1253/Synergy_Space" },
    ],
  },
  {
    name: "CensusGrid",
    kind: "India geography API",
    tagline: "REST API and developer portal for 457,000+ Indian village records across 600+ districts and 36 states and UTs.",
    bullets: [
      "API-key management, JWT auth, rate limiting, Redis edge caching.",
      "Stripe checkout and webhooks for plan upgrades; OpenAPI docs and a traffic-analytics dashboard.",
    ],
    flow: ["React console", "Express gateway", "Auth + limits", "Redis cache", "PostgreSQL"],
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "Redis", "Stripe", "React"],
    links: [
      { label: "Live", href: "https://censusgrid.vercel.app" },
      { label: "Source", href: "https://github.com/likhith1253/village-api" },
    ],
  },
  {
    name: "ML Capstone",
    kind: "ML pipelines + Streamlit dashboard",
    tagline: "Regression, classification and clustering tracks on three public datasets, with leakage-safe preprocessing.",
    bullets: [
      "Scalers and encoders fitted on training data only; hyperparameters tuned with cross-validation; scored on a held-out test set.",
      "Dry Bean classification: MLP reached 95.41% test accuracy (0.9978 multiclass ROC-AUC).",
      "Interactive Streamlit dashboard covers all three tracks.",
    ],
    flow: ["Clean + split", "Fit on train only", "CV tuning", "Held-out test", "Dashboard"],
    tags: ["scikit-learn", "Pandas", "NumPy", "Streamlit", "Jupyter"],
    links: [{ label: "Source", href: "https://github.com/likhith1253/ML_Capstone" }],
  },
];

export const ALSO_BUILT = [
  { name: "Movie Intelligence Engine", text: "Semantic movie recommender with ChromaDB, transformer embeddings, HNSW indexing and metadata filtering.", href: "https://github.com/likhith1253/Movie_Recommendation_System" },
  { name: "ESUA", text: "Real-time scene understanding with YOLOv8, proximity analysis and temporal smoothing.", href: "https://github.com/likhith1253/ESUA" },
  { name: "ChemViz", text: "Equipment analytics platform (Django, Pandas, PostgreSQL) with LLM-generated summaries.", href: "https://chemicalanalyzer.vercel.app" },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "ML & AI", items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "OpenCV", "LangGraph", "RAG", "Vector search (Qdrant, ChromaDB)"] },
  { group: "Data", items: ["Python", "Pandas", "NumPy", "SQL", "PostgreSQL", "Redis", "Power BI"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Express", "Django", "REST APIs", "WebSockets", "JWT / RBAC", "Microservices"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Languages & tools", items: ["Python", "TypeScript", "JavaScript", "Java", "C", "Git", "Docker", "GitHub Actions"] },
];

export const CERTS = [
  { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI / Stanford (Andrew Ng)", date: "June 2026", href: "https://coursera.org/verify/BWX0FSNP3FWS" },
  { title: "Foundations of Data Science", issuer: "Google", date: "May 2026", href: "https://coursera.org/verify/A9OJ5UE2UJ4R" },
];

export const OPEN_SOURCE = [
  { name: "iCalendar", text: "Merged contribution improving RFC 5545 compliance.", href: "https://github.com/collective/icalendar/pull/1116", label: "Pull request #1116" },
  { name: "OpenAlgo", text: "Webhook API and Python strategy integration work.", href: "", label: "" },
  { name: "GirlScript Summer of Code 2026", text: "Selected contributor.", href: "", label: "" },
];

export const RECOGNITION = [
  { name: "Hack 101 Hackathon", text: "Special Mention." },
  { name: "Intel IoT Hackathon", text: "Participant." },
];
