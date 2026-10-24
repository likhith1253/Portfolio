// Single source of truth for every fact on the site, the prerendered HTML,
// llms.txt, llms-full.txt and profile.json. Every value is taken from the
// owner's resume, details he supplied, or the project READMEs. Do not add
// claims that cannot be traced to one of those.
export const SITE = {
  name: "Likhith Ponnada",
  shortName: "Likhith",
  url: "https://likhithponnada.vercel.app/",
  github: "https://github.com/likhith1253",
  linkedin: "https://linkedin.com/in/likhith-ponnada",
  email: "plnlikhith@gmail.com",
  resume: "/documents/RESUME.pdf",
  location: "Hyderabad, India",
  role: "AI/ML and software engineering",
  headline:
    "I build AI systems end to end: the data pipeline, the model, the API around it and the interface people use.",
  intro:
    "Computer science student at Amrita Vishwa Vidyapeetham. Most of what I build sits where machine learning meets real software: retrieval pipelines that cite their sources, reconciliation engines that explain their decisions, and the backends that keep them honest.",
  lookingFor: "Open to AI/ML and software engineering internships",
};

export const EDUCATION = {
  school: "Amrita Vishwa Vidyapeetham",
  degree: "B.Tech in Computer Science and Engineering",
  expected: "Expected May 2028",
  cgpa: "CGPA 8.3",
  coursework: ["Artificial Intelligence", "Machine Learning", "Probability & Statistics", "Data Structures & Algorithms", "DBMS"],
};

export interface Role {
  id: string;
  org: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tools: string[];
}

// TG Transco: details supplied by the owner. The 12% / 15% figures are targets, as he worded them.
export const EXPERIENCE: Role[] = [
  {
    id: "tg-transco",
    org: "TG Transco",
    title: "AI/ML Intern",
    period: "April 2026 – June 2026",
    location: "Hyderabad, India · on-site",
    summary: "An internal analytics tool for electrical load forecasting, load-balance analysis and distribution planning.",
    bullets: [
      "Built a Python and Flask web application that brings historical load analysis, demand forecasting and regional load assessment into one place.",
      "Trained a machine-learning model to predict electricity demand from historical load patterns, and surfaced its output in the interface to flag distribution areas likely to come under stress.",
      "Designed to cut load-analysis time by 12% and improve forecasting error by 15% against a baseline model (targets for the tool).",
    ],
    tools: ["Python", "Flask", "Machine learning", "Predictive analytics"],
  },
  {
    id: "bluestock",
    org: "Bluestock Fintech Pvt. Ltd.",
    title: "Data Analyst Intern",
    period: "April 2026 – June 2026",
    location: "Remote",
    summary: "Financial data engineering and analytics on public mutual-fund datasets.",
    bullets: [
      "Built ETL pipelines (Python, Pandas, SQLAlchemy) over 46,000+ mutual fund NAV records and 32,000+ investor transactions.",
      "Designed normalized star-schema databases and computed Sharpe, Sortino, alpha, beta, VaR and maximum drawdown.",
      "Delivered a Power BI dashboard and 15+ analytical visualizations, benchmarking funds against the Nifty 50 and Nifty 100.",
    ],
    tools: ["Python", "Pandas", "SQL", "SQLAlchemy", "PostgreSQL", "Power BI"],
  },
];

export interface Metric {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  kind: string;
  year: string;
  oneLiner: string;
  problem: string;
  built: string[];
  metrics: Metric[];
  metricNote?: string;
  stack: string[];
  links: { label: string; href: string }[];
}

// Claims below were checked against each repo's README.
export const PROJECTS: Project[] = [
  {
    id: "veridex",
    name: "Veridex",
    kind: "AI financial reconciliation",
    year: "2026",
    oneLiner: "Finds the transaction that doesn't add up, proves why, and never moves money without a human saying yes.",
    problem:
      "Payment companies keep three records of every transaction: the gateway, the internal ledger and the bank statement. They drift apart through fees, timing lags and duplicates, and someone has to work out which leg broke.",
    built: [
      "Three-way matcher: deterministic rules first, an XGBoost model for the ambiguous cases, and a LangGraph investigation only for what survives both.",
      "Classifies each exception by root cause (missing source, timing lag, fee or tax mismatch, duplicate, amount mismatch) with the evidence that supports it.",
      "Policy-gated human approval for every corrective action, with server-side limits and an audit trail.",
      "FastAPI + PostgreSQL backend and a Next.js console, deployed on Render, Neon and Vercel, with a CI-run test suite.",
    ],
    metrics: [
      { value: 90.15, decimals: 2, label: "F1 on the seeded benchmark" },
      { value: 95.56, decimals: 2, suffix: "%", label: "recall" },
      { value: 85.32, decimals: 2, suffix: "%", label: "precision" },
      { value: 482, label: "backend tests passing" },
    ],
    metricNote: "Reproduced run: 500 transactions, seed 42.",
    stack: ["FastAPI", "XGBoost", "LangGraph", "PostgreSQL", "Next.js", "TypeScript"],
    links: [
      { label: "Live app", href: "https://veridex-three.vercel.app" },
      { label: "Code", href: "https://github.com/likhith1253/veridex" },
    ],
  },
  {
    id: "docrag",
    name: "DocRag",
    kind: "Citation-grounded RAG",
    year: "2026",
    oneLiner: "Answers questions about research papers with the page and section it got them from, and refuses when the paper doesn't say.",
    problem:
      "General chat models misquote equations, invent table values and blend sources. For research papers, an answer without a checkable citation isn't worth much.",
    built: [
      "Layout-aware PDF parsing that keeps equations, tables and algorithms as tagged chunks instead of shredding them.",
      "Per-collection Qdrant isolation so answers never mix papers, with MMR diversity and cross-encoder reranking.",
      "An evidence gate that stops equation and table chunks from being dropped during reranking.",
      "A grounding prompt that returns a refusal when the retrieved context doesn't contain the answer.",
    ],
    metrics: [
      { value: 84.4, decimals: 1, suffix: "%", label: "answer accuracy" },
      { value: 81.25, decimals: 2, suffix: "%", label: "retrieval hit rate" },
      { value: 95.3, decimals: 1, suffix: "%", label: "correct citations" },
      { value: 64, label: "human-verified questions" },
    ],
    metricNote: "Run on a GPU machine over SSH.",
    stack: ["Python", "FastAPI", "Qdrant", "e5-base-v2", "Cross-encoder", "Qwen2.5"],
    links: [{ label: "Code", href: "https://github.com/likhith1253/DocRag" }],
  },
  {
    id: "synergy",
    name: "SynergySpace",
    kind: "Real-time collaboration",
    year: "2026",
    oneLiner: "A multi-user workspace for documents, slides and chat, split into services behind one gateway.",
    problem:
      "Real-time editing is easy to demo and hard to secure: every socket room and every document request has to know who you are and what you're allowed to touch.",
    built: [
      "Live multi-user editing over Socket.IO, with room access and write permission checked against the database on every join and broadcast.",
      "Separate auth, organization, document, collaboration and FastAPI AI services behind an API gateway.",
      "Role-based organizations, invitations, Stripe billing, and an AI writing service that requires a valid token and is rate-limited per user.",
    ],
    metrics: [
      { value: 5, label: "services behind one gateway" },
      { value: 71, label: "automated tests" },
    ],
    stack: ["Next.js", "Node.js", "Socket.IO", "Prisma", "PostgreSQL", "FastAPI"],
    links: [
      { label: "Live demo", href: "https://synergyspace-web.vercel.app" },
      { label: "Code", href: "https://github.com/likhith1253/Synergy_Space" },
    ],
  },
  {
    id: "censusgrid",
    name: "CensusGrid",
    kind: "Geography data API",
    year: "2026",
    oneLiner: "A REST API and developer portal for every Indian village, district and state, with keys, quotas and billing.",
    problem:
      "Address verification in India needs the full administrative hierarchy, and there was no clean, rate-limited API for it.",
    built: [
      "Hierarchical lookups and search across 457,000+ villages in 600+ districts and 36 states and union territories.",
      "API-key management, JWT auth, per-key rate limits and Redis caching with an in-process fallback.",
      "Stripe checkout and webhooks, OpenAPI docs and a usage-analytics dashboard.",
    ],
    metrics: [
      { value: 457000, suffix: "+", label: "villages indexed" },
      { value: 61, label: "API tests" },
    ],
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Redis", "Stripe", "React"],
    links: [
      { label: "Live", href: "https://censusgrid.vercel.app" },
      { label: "Code", href: "https://github.com/likhith1253/village-api" },
    ],
  },
  {
    id: "capstone",
    name: "ML Capstone",
    kind: "Classical ML, done carefully",
    year: "2026",
    oneLiner: "Regression, classification and clustering on three public datasets, with leakage-safe pipelines and an honest write-up of what didn't work.",
    problem:
      "Most coursework ML reports a single number. The interesting part is whether the number survives a proper split, cross-validation and a look at the failure cases.",
    built: [
      "Scalers and encoders fitted on training data only; hyperparameters tuned with cross-validation; scored on a held-out test set.",
      "Ten classifiers compared on the UCI Dry Bean dataset (7 classes); the MLP came out on top.",
      "A Streamlit dashboard for all three tracks, plus a limitations section on single-split variance and lopsided clusters.",
    ],
    metrics: [
      { value: 95.41, decimals: 2, suffix: "%", label: "test accuracy, Dry Bean MLP" },
      { value: 0.9978, decimals: 4, label: "multiclass ROC-AUC" },
    ],
    stack: ["scikit-learn", "Pandas", "NumPy", "Streamlit", "Jupyter"],
    links: [{ label: "Code", href: "https://github.com/likhith1253/ML_Capstone" }],
  },
];

export const ALSO_BUILT = [
  { name: "ESUA", text: "Real-time scene understanding: YOLOv8 detection, temporal smoothing and spatial hazard rules on a webcam feed.", href: "https://github.com/likhith1253/ESUA" },
  { name: "Movie Intelligence Engine", text: "Semantic movie recommender with ChromaDB, transformer embeddings and metadata filtering.", href: "https://github.com/likhith1253/Movie_Recommendation_System" },
  { name: "ChemViz", text: "Equipment analytics platform (Django, Pandas, PostgreSQL) with LLM-generated summaries.", href: "https://chemicalanalyzer.vercel.app" },
];

export interface Skill {
  name: string;
  group: "ML & AI" | "Retrieval" | "Data" | "Backend" | "Frontend";
  projects: string[];
}

// Each skill lists the projects where it is actually used.
export const SKILLS: Skill[] = [
  { name: "PyTorch", group: "ML & AI", projects: [] },
  { name: "scikit-learn", group: "ML & AI", projects: ["ML Capstone"] },
  { name: "XGBoost", group: "ML & AI", projects: ["Veridex"] },
  { name: "TensorFlow", group: "ML & AI", projects: [] },
  { name: "OpenCV / YOLOv8", group: "ML & AI", projects: ["ESUA"] },
  { name: "LangGraph", group: "ML & AI", projects: ["Veridex"] },
  { name: "Forecasting", group: "ML & AI", projects: ["TG Transco"] },
  { name: "RAG", group: "Retrieval", projects: ["DocRag"] },
  { name: "Qdrant", group: "Retrieval", projects: ["DocRag", "Veridex"] },
  { name: "ChromaDB", group: "Retrieval", projects: ["Movie Intelligence Engine"] },
  { name: "Reranking", group: "Retrieval", projects: ["DocRag"] },
  { name: "Embeddings", group: "Retrieval", projects: ["DocRag", "Movie Intelligence Engine"] },
  { name: "Python", group: "Data", projects: ["Veridex", "DocRag", "ML Capstone", "TG Transco", "Bluestock"] },
  { name: "Pandas", group: "Data", projects: ["ML Capstone", "Bluestock", "ChemViz"] },
  { name: "SQL", group: "Data", projects: ["Bluestock", "CensusGrid"] },
  { name: "PostgreSQL", group: "Data", projects: ["Veridex", "SynergySpace", "CensusGrid", "Bluestock"] },
  { name: "Redis", group: "Data", projects: ["CensusGrid"] },
  { name: "Power BI", group: "Data", projects: ["Bluestock"] },
  { name: "FastAPI", group: "Backend", projects: ["Veridex", "DocRag", "SynergySpace"] },
  { name: "Flask", group: "Backend", projects: ["TG Transco"] },
  { name: "Node.js", group: "Backend", projects: ["SynergySpace", "CensusGrid"] },
  { name: "Django", group: "Backend", projects: ["ChemViz"] },
  { name: "WebSockets", group: "Backend", projects: ["SynergySpace"] },
  { name: "Auth / RBAC", group: "Backend", projects: ["SynergySpace", "CensusGrid", "Veridex"] },
  { name: "Docker", group: "Backend", projects: [] },
  { name: "TypeScript", group: "Frontend", projects: ["Veridex", "SynergySpace"] },
  { name: "React", group: "Frontend", projects: ["CensusGrid", "SynergySpace"] },
  { name: "Next.js", group: "Frontend", projects: ["Veridex", "SynergySpace"] },
];

export const CERTS = [
  { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI / Stanford (Andrew Ng)", date: "June 2026", href: "https://coursera.org/verify/BWX0FSNP3FWS" },
  { title: "Foundations of Data Science", issuer: "Google", date: "May 2026", href: "https://coursera.org/verify/A9OJ5UE2UJ4R" },
];

export const OPEN_SOURCE = [
  { name: "collective/icalendar", text: "Merged pull request #1116, improving RFC 5545 compliance.", href: "https://github.com/collective/icalendar/pull/1116" },
  { name: "GirlScript Summer of Code 2026", text: "Selected contributor.", href: "" },
];

export const RECOGNITION = [
  { name: "Hack 101 Hackathon", text: "Special mention" },
  { name: "Intel IoT Hackathon", text: "Participant" },
];
