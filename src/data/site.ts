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
      "Runs on CPU or GPU: device auto-selection with fp16/fp32 handling, caches that keep CPU runs usable, and an optional Ollama backend. The benchmark ran on a remote GPU over SSH.",
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
    id: "tabular-lab",
    name: "Tabular ML Lab",
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

export const GROUPS = ["Languages", "ML & AI", "Retrieval", "Frontend", "Data & databases", "Backend", "DevOps & tools"] as const;

export interface Skill {
  name: string;
  group: (typeof GROUPS)[number];
  projects: string[];
  note?: string;
}

// A skill is listed only if it is used in a project shown on this page or in one of the two internships.
// Project names match the cards on the page.
const sk = (name: string, group: Skill["group"], projects: string[], note?: string): Skill => ({ name, group, projects, note });
const GH = ["Veridex", "DocRag", "SynergySpace", "CensusGrid", "Tabular ML Lab", "ChemViz", "ESUA", "chart_detection", "SecurityLogAnalyzer", "Movie Intelligence Engine"];

export const SKILLS: Skill[] = [
  // Languages
  sk("Python", "Languages", ["Veridex", "DocRag", "SynergySpace", "Tabular ML Lab", "chart_detection", "Movie Intelligence Engine", "MT-Dynamics", "ESUA", "ChemViz", "TG Transco", "Bluestock"]),
  sk("JavaScript", "Languages", ["CensusGrid", "SynergySpace", "ChemViz", "SentinelAI Guard", "CAMPWILD"]),
  sk("TypeScript", "Languages", ["SynergySpace", "Veridex", "SentinelAI Guard"]),
  sk("Java", "Languages", ["SecurityLogAnalyzer", "SentinelAI Guard"]),
  sk("Dart", "Languages", ["OmniLife"]),
  sk("C", "Languages", [], "Working knowledge; not tied to one of the projects on this page."),
  sk("SQL", "Languages", ["Bluestock", "CensusGrid", "SynergySpace"]),
  // ML & AI
  sk("scikit-learn", "ML & AI", ["Tabular ML Lab", "chart_detection", "Veridex"]),
  sk("XGBoost", "ML & AI", ["Veridex", "chart_detection"]),
  sk("PyTorch", "ML & AI", ["DocRag", "chart_detection", "MT-Dynamics"]),
  sk("OpenCV", "ML & AI", ["ESUA", "chart_detection", "MT-Dynamics"]),
  sk("YOLOv8", "ML & AI", ["ESUA", "chart_detection"]),
  sk("Image segmentation", "ML & AI", ["MT-Dynamics"], "A U-Net fine-tuned on pseudo-labels, alongside classical segmentation."),
  sk("LangGraph", "ML & AI", ["Veridex", "DocRag"]),
  sk("Hugging Face", "ML & AI", ["DocRag", "ESUA"]),
  sk("Gemini API", "ML & AI", ["SynergySpace", "Veridex", "ChemViz", "SentinelAI Guard"]),
  sk("Groq API", "ML & AI", ["Veridex", "OmniLife"]),
  sk("Ollama", "ML & AI", ["DocRag"]),
  sk("Demand forecasting", "ML & AI", ["TG Transco"]),
  sk("TensorFlow", "ML & AI", [], "Working knowledge; not tied to one of the projects on this page."),
  sk("LangChain", "ML & AI", [], "Working knowledge; not tied to one of the projects on this page."),
  sk("Evolutionary algorithms", "ML & AI", ["Water network research"], "A current college research project; details aren't public yet."),
  sk("CPU-optimized inference", "ML & AI", ["DocRag", "ESUA"], "Semantic and embedding caches in DocRag; a nano model with frame skipping in ESUA."),
  sk("GPU inference (CUDA)", "ML & AI", ["DocRag", "chart_detection", "MT-Dynamics"], "fp16/fp32 selection and a V100 attention workaround in DocRag."),
  sk("Remote GPU runs (SSH)", "ML & AI", ["DocRag"], "The 64-question DocRag benchmark was run on a remote GPU over SSH."),
  // Retrieval
  sk("RAG", "Retrieval", ["DocRag"]),
  sk("Qdrant", "Retrieval", ["DocRag", "Veridex"]),
  sk("ChromaDB", "Retrieval", ["Movie Intelligence Engine"]),
  sk("Reranking", "Retrieval", ["DocRag"]),
  sk("Embeddings", "Retrieval", ["DocRag", "Movie Intelligence Engine"]),
  // Frontend
  sk("React", "Frontend", ["SynergySpace", "Veridex", "CensusGrid", "ChemViz", "SentinelAI Guard"]),
  sk("Next.js", "Frontend", ["SynergySpace", "Veridex"]),
  sk("Tailwind CSS", "Frontend", ["CensusGrid", "SynergySpace", "Veridex"]),
  sk("HTML", "Frontend", ["CAMPWILD", "ChemViz"]),
  sk("CSS", "Frontend", ["CAMPWILD", "ChemViz", "CensusGrid"]),
  sk("Flutter", "Frontend", ["OmniLife"]),
  sk("Streamlit", "Frontend", ["Tabular ML Lab", "DocRag", "MT-Dynamics"]),
  sk("Chart.js", "Frontend", ["ChemViz"]),
  // Data & databases
  sk("PostgreSQL", "Data & databases", ["Veridex", "SynergySpace", "CensusGrid", "Bluestock"]),
  sk("SQLite", "Data & databases", ["DocRag", "ChemViz"]),
  sk("MySQL", "Data & databases", [], "Working knowledge; not tied to one of the projects on this page."),
  sk("Redis", "Data & databases", ["CensusGrid"]),
  sk("Prisma", "Data & databases", ["SynergySpace", "CensusGrid"]),
  sk("SQLAlchemy", "Data & databases", ["Veridex", "Bluestock"]),
  sk("Alembic", "Data & databases", ["Veridex"]),
  sk("Firebase", "Data & databases", ["SentinelAI Guard", "OmniLife"]),
  sk("Pandas", "Data & databases", ["Tabular ML Lab", "chart_detection", "Movie Intelligence Engine", "ChemViz", "Bluestock"]),
  sk("NumPy", "Data & databases", ["Tabular ML Lab", "chart_detection", "ESUA", "Movie Intelligence Engine", "DocRag"]),
  sk("Power BI", "Data & databases", ["Bluestock"]),
  // Backend
  sk("FastAPI", "Backend", ["Veridex", "DocRag", "SynergySpace"]),
  sk("Flask", "Backend", ["TG Transco"]),
  sk("Node.js", "Backend", ["SynergySpace", "CensusGrid"]),
  sk("Express", "Backend", ["SynergySpace", "CensusGrid"]),
  sk("Django", "Backend", ["ChemViz"]),
  sk("Spring Boot", "Backend", ["SentinelAI Guard"]),
  sk("REST APIs", "Backend", ["Veridex", "DocRag", "SynergySpace", "CensusGrid", "ChemViz", "SentinelAI Guard"]),
  sk("Socket.IO", "Backend", ["SynergySpace"]),
  sk("JWT", "Backend", ["SynergySpace", "CensusGrid"]),
  sk("RBAC", "Backend", ["SynergySpace", "CensusGrid", "SecurityLogAnalyzer"]),
  sk("Rate limiting", "Backend", ["CensusGrid", "SynergySpace", "ChemViz"]),
  sk("Stripe", "Backend", ["SynergySpace", "CensusGrid"]),
  sk("Razorpay", "Backend", ["Veridex"]),
  sk("Swagger", "Backend", ["CensusGrid"], "Hand-written OpenAPI docs; the FastAPI projects also expose /docs."),
  // DevOps & tools
  sk("Docker", "DevOps & tools", ["SynergySpace", "SentinelAI Guard"]),
  sk("GitHub Actions", "DevOps & tools", GH),
  sk("Git", "DevOps & tools", GH),
  sk("GitHub", "DevOps & tools", GH),
  sk("Postman", "DevOps & tools", ["CensusGrid"]),
  sk("Vercel", "DevOps & tools", ["CensusGrid", "ChemViz", "SynergySpace", "Veridex"]),
  sk("Render", "DevOps & tools", ["CensusGrid", "ChemViz", "SynergySpace", "Veridex"]),
  sk("pytest", "DevOps & tools", ["Veridex", "DocRag", "ChemViz", "chart_detection", "ESUA", "Movie Intelligence Engine", "Tabular ML Lab", "SynergySpace"]),
  sk("Jest", "DevOps & tools", ["SynergySpace"]),
  sk("Jupyter", "DevOps & tools", ["Tabular ML Lab", "MT-Dynamics"]),
  sk("Maven", "DevOps & tools", ["SentinelAI Guard"]),
  sk("Chrome extensions", "DevOps & tools", ["SentinelAI Guard"]),
];

export interface Build {
  name: string;
  kind: string;
  text: string;
  fact?: string;
  stack: string[];
  href?: string;
}

// Claims checked against each repo's README and code. Caveats are stated on purpose.
export const BUILDS: Build[] = [
  {
    name: "chart_detection",
    kind: "Computer vision",
    text: "A framework for reading chart images: synthetic chart generation, hand-crafted features with classical classifiers, an EfficientNet-B0 CNN, and per-type parsers for bar, line, pie, scatter, histogram and box plots.",
    fact: "Chart-type classifier: XGBoost 98.9% and EfficientNet-B0 99.9% on a 989-image test split. Labels come from filenames, so the split is easy. 95 tests.",
    stack: ["Python", "PyTorch", "scikit-learn", "XGBoost", "OpenCV"],
    href: "https://github.com/likhith1253/chart_detection",
  },
  {
    name: "SentinelAI Guard",
    kind: "Web security · Java",
    text: "A Java 17 Spring Boot service that scores URLs with a plugin pipeline (domain age, TLS, typosquatting, a local blacklist and Gemini), with Firebase auth, a Chrome extension that blocks risky pages, and a Docker build.",
    fact: "Plugin scores are weighted into one risk score. No benchmark published.",
    stack: ["Java", "Spring Boot", "Docker", "Firebase", "Gemini API"],
    href: "https://github.com/likhith1253/SentinelAI-Guard",
  },
  {
    name: "MT-Dynamics",
    kind: "Image segmentation",
    text: "Microtubule tracing on fluorescence video: classical segmentation, a U-Net fine-tuned on pseudo-labels, tracking, and growth, shrink, catastrophe and rescue statistics, with a Streamlit dashboard. Built for a 2026 research programme.",
    fact: "U-Net IoU 0.676 on held-out synthetic frames; real video has no ground truth. Repository is private for now.",
    stack: ["Python", "PyTorch", "OpenCV", "Streamlit"],
  },
  {
    name: "Movie Intelligence Engine",
    kind: "Semantic search",
    text: "A movie recommender that embeds 4,800 TMDb films into ChromaDB and answers a title or a free-text description, with year, rating and runtime filters.",
    fact: "Query latency about 205–226 ms mean on a laptop CPU, including embedding the query. Recommendation quality isn't scored.",
    stack: ["Python", "ChromaDB", "MiniLM embeddings"],
    href: "https://github.com/likhith1253/Movie_Recommendation_System",
  },
  {
    name: "ESUA",
    kind: "Computer vision",
    text: "Scene understanding on webcam or image input: YOLOv8n detects objects and a transparent rule layer flags hazards such as a cup near a laptop and explains why.",
    fact: "About 0.27 s per image on CPU. No labelled evaluation set, so no accuracy is claimed.",
    stack: ["Python", "YOLOv8", "OpenCV"],
    href: "https://github.com/likhith1253/ESUA",
  },
  {
    name: "SecurityLogAnalyzer",
    kind: "Systems · Java",
    text: "A Java console app that scans web-server access logs, scores source IPs, blacklists them and writes a forensic report, with a hand-written red-black tree for time-range and IP queries and PBKDF2 role-based logins.",
    fact: "No third-party libraries. 11 tests.",
    stack: ["Java", "Red-black tree", "PBKDF2"],
    href: "https://github.com/likhith1253/SecurityLogAnalyzer",
  },
  {
    name: "ChemViz",
    kind: "Full stack",
    text: "Upload equipment readings as a CSV and get statistics, charts, a PDF report and AI maintenance notes. Django REST API with token auth, a React web app and a PyQt desktop client.",
    stack: ["Django", "React", "PyQt", "Gemini API"],
    href: "https://chemicalanalyzer.vercel.app",
  },
  {
    name: "OmniLife",
    kind: "Team project · Flutter",
    text: "A cross-platform Flutter app with an AI assistant, built as a team of four.",
    fact: "My part: pull requests merged into the team repository.",
    stack: ["Flutter", "Dart", "Firebase", "Groq API"],
    href: "https://github.com/likhith1253/OmniLife",
  },
];

export interface Cert {
  title: string;
  issuer: string;
  partner?: string;
  instructor?: string;
  date: string;
  category: string;
  description: string;
  topics: string[];
  href: string;
}

// From the credentials themselves (Coursera verification links) and the previous version of this site.
export const CERTS: Cert[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    partner: "Stanford University",
    instructor: "Andrew Ng",
    date: "June 2026",
    category: "Machine learning",
    description: "Foundational supervised learning: regression and classification models, how to evaluate them, and the practical workflow around them.",
    topics: ["Linear regression", "Logistic regression", "Classification", "Model evaluation", "scikit-learn workflows"],
    href: "https://coursera.org/verify/BWX0FSNP3FWS",
  },
  {
    title: "Foundations of Data Science",
    issuer: "Google",
    date: "May 2026",
    category: "Data science",
    description: "Analytical thinking, statistical reasoning, data preparation and interpretation, and a structured approach to getting insight from data.",
    topics: ["Data analysis", "Data preparation", "Statistical thinking", "Data interpretation"],
    href: "https://coursera.org/verify/A9OJ5UE2UJ4R",
  },
];

// A college research project; the details are deliberately not public.
export const RESEARCH = {
  title: "Water distribution network optimization",
  status: "Currently researching",
  summary:
    "A college research project on optimizing water distribution networks: a trajectory-learning evaluation problem within evolutionary-algorithms research.",
  note: "Details aren't public yet.",
  tags: ["Evolutionary algorithms", "Optimization", "Trajectory learning"],
};

export const OPEN_SOURCE = [
  { name: "collective/icalendar", text: "Merged pull request #1116, improving RFC 5545 compliance.", href: "https://github.com/collective/icalendar/pull/1116" },
  { name: "GirlScript Summer of Code 2026", text: "Selected contributor.", href: "" },
];

export const RECOGNITION = [
  { name: "Hack 101 Hackathon", text: "Special mention" },
  { name: "Intel IoT Hackathon", text: "Participant" },
];
