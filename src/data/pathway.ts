export type PathwayStatus = "completed" | "in-progress" | "planned" | "active";

export interface PathwayLink {
  label: string;
  href: string;
  type: "github" | "demo" | "credential" | "external";
}

export interface PathwayNode {
  id: string;
  stage: string;
  title: string;
  subtitle?: string;
  status: PathwayStatus;
  details: {
    summary?: string;
    items?: { label: string; value: string }[];
    links?: PathwayLink[];
    action?: { label: string; sectionId: string };
  };
}

export const pathway: PathwayNode[] = [
  {
    id: "education",
    stage: "01",
    title: "Education",
    subtitle: "Amrita Vishwa Vidyapeetham",
    status: "completed",
    details: {
      summary:
        "Completed undergraduate studies with strong foundation in computer science, algorithms, data structures, and software engineering principles.",
      items: [
        { label: "Institution", value: "Amrita Vishwa Vidyapeetham" },
        { label: "Focus", value: "Computer Science & Engineering" },
        { label: "Status", value: "Completed ✓" },
      ],
      action: { label: "View About", sectionId: "about" },
    },
  },
  {
    id: "opensource",
    stage: "02",
    title: "Open Source & Community",
    subtitle: "Contributions & Recognition",
    status: "completed",
    details: {
      summary:
        "Active contributor to open source projects and community engineering initiatives, focusing on building tools and solving real-world problems.",
      items: [
        { label: "iCalendar RFC 5545", value: "Contribution" },
        { label: "OpenAlgo", value: "Contribution" },
        { label: "GirlScript Summer of Code", value: "2026" },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/likhith1253", type: "github" },
      ],
      action: { label: "View Projects", sectionId: "projects" },
    },
  },
  {
    id: "internship",
    stage: "03",
    title: "Bluestock Fintech Internship",
    subtitle: "Data Analyst Intern",
    status: "completed",
    details: {
      summary:
        "Built end-to-end financial analytics workflows covering ETL pipelines, relational database modeling, performance analytics, and business intelligence dashboards.",
      items: [
        { label: "Company", value: "Bluestock Fintech Pvt. Ltd." },
        { label: "Duration", value: "April 2026 – June 2026" },
        { label: "ETL Pipelines", value: "Data ingestion & transformation" },
        { label: "Database Design", value: "Star-schema modeling" },
        { label: "Power BI Dashboards", value: "Fund performance analytics" },
        { label: "Financial Metrics", value: "Sharpe Ratio, VaR, Alpha, Beta" },
        { label: "Data Processed", value: "46,000+ NAV records" },
        { label: "Transactions Analyzed", value: "32,000+ investor transactions" },
      ],
      action: { label: "View Experience", sectionId: "experience" },
    },
  },
  {
    id: "realtime-collaborator",
    stage: "04",
    title: "Realtime Collaborator",
    subtitle: "Full Stack Microservices Application",
    status: "completed",
    details: {
      summary:
        "A distributed collaborative editor with microservices architecture, real-time WebSocket synchronization, and AI-assisted content generation.",
      items: [
        { label: "Architecture", value: "Microservices (6+ services)" },
        { label: "Frontend", value: "Next.js, React, Tailwind" },
        { label: "Backend", value: "Node.js, Express, Socket.io" },
        { label: "Database", value: "PostgreSQL, Prisma ORM" },
        { label: "AI", value: "Python, FastAPI, Gemini" },
        { label: "Synchronization", value: "Yjs + WebSockets" },
      ],
      links: [
        { label: "Live Demo", href: "https://realtime-collaborator-web.vercel.app/", type: "demo" },
        { label: "GitHub", href: "https://github.com/likhith1253/Realtime_Collaborator", type: "github" },
      ],
      action: { label: "View Project", sectionId: "projects" },
    },
  },
  {
    id: "censusgrid",
    stage: "05",
    title: "CensusGrid",
    subtitle: "Developer Infrastructure Platform",
    status: "completed",
    details: {
      summary:
        "Geographic data infrastructure platform exposing India's administrative hierarchy through secure APIs, with billing, caching, analytics, and developer tooling.",
      items: [
        { label: "Scale", value: "457,000+ village records" },
        { label: "Coverage", value: "600+ districts, 36 states & UTs" },
        { label: "Frontend", value: "React, Vite, Tailwind CSS" },
        { label: "Backend", value: "Node.js, Express.js" },
        { label: "Database", value: "PostgreSQL with Redis caching" },
        { label: "Payments", value: "Stripe billing integration" },
        { label: "Auth", value: "JWT, API key management" },
      ],
      links: [
        { label: "Live Platform", href: "https://censusgrid.vercel.app/", type: "demo" },
        { label: "GitHub", href: "https://github.com/likhith1253/village-api", type: "github" },
      ],
      action: { label: "View Project", sectionId: "projects" },
    },
  },
  {
    id: "movie-engine",
    stage: "06",
    title: "Movie Intelligence Engine",
    subtitle: "ML-Powered Recommendation System",
    status: "completed",
    details: {
      summary:
        "Machine learning recommendation system applying data science techniques to movie analysis and personalized suggestions.",
      items: [
        { label: "Focus", value: "Data science & ML" },
        { label: "Techniques", value: "Collaborative filtering, NLP" },
        { label: "Stack", value: "Python, Pandas, Scikit-Learn" },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/likhith1253/Movie_Recommendation_System", type: "github" },
      ],
      action: { label: "View Project", sectionId: "projects" },
    },
  },
  {
    id: "chemviz",
    stage: "07",
    title: "ChemViz",
    subtitle: "Chemical Analysis & Visualization",
    status: "completed",
    details: {
      summary:
        "Interactive chemical analyzer and visualization tool for molecular data analysis and scientific visualization.",
      items: [
        { label: "Purpose", value: "Chemical analysis tool" },
        { label: "Technology", value: "React, visualization libraries" },
        { label: "Domain", value: "Chemistry & data visualization" },
      ],
      links: [
        { label: "Live App", href: "https://chemicalanalyzer.vercel.app/", type: "demo" },
      ],
      action: { label: "View Project", sectionId: "projects" },
    },
  },
  {
    id: "current-focus",
    stage: "08",
    title: "Current Focus",
    subtitle: "AI-Assisted Full Stack Development",
    status: "active",
    details: {
      summary:
        "Actively building full stack applications with modern tooling, exploring system design patterns, and integrating AI capabilities into production systems.",
      items: [
        { label: "Primary", value: "Full Stack Development" },
        { label: "Exploration", value: "System Design" },
        { label: "Focus Area", value: "AI Integration" },
        { label: "Status", value: "Active — Building in Public" },
      ],
      action: { label: "View Skills", sectionId: "skills" },
    },
  },
];
