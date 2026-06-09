export interface Project {
  name: string;
  summary: string;
  objective: string;
  problem: string;
  solution: string;
  technologies: string[];
  challenges?: string;
  results?: string;
  architecture?: string[];
  techStackDetails?: { category: string; items: string }[];
  keyFeatures?: string[];
  learningOutcomes?: string[];
  technicalChallenges?: { id: string; title: string; description: string }[];
  architectureDecisions?: { id: string; title: string; description: string }[];
  engineeringTakeaways?: string[];
  impactMetrics?: string[];
  recruiterFocus?: string[];
  github: string;
  demo: string;
  highlightSection?: { title: string; content: string; list?: string[]; footer?: string; };
}

export const projects: Project[] = [
  {
    name: "Realtime Collaborator",
    summary: "A distributed collaborative editor built with a microservices architecture, WebSocket-driven document synchronization, and a dedicated AI service for content assistance.",
    objective: "Build a technically robust collaboration platform that supports live multi-user editing, organization-aware access control, and AI-assisted document workflows across independent backend services.",
    problem: "Real-time collaboration requires tight synchronization, consistent permission enforcement, and isolated AI processing. The project focused on unifying these capabilities while preserving service boundaries and data integrity.",
    solution: "Implemented a full-stack system with React frontend, Socket.io and Yjs for real-time synchronization, PostgreSQL and Prisma for relational data modeling, FastAPI for AI processing, and specialized services for authentication, collaboration, document management, and organization state.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Socket.io",
      "PostgreSQL",
      "Prisma",
      "FastAPI"
    ],
    technicalChallenges: [
      { id: "01", title: "Real-Time Synchronization", description: `Keeping multiple users synchronized while editing the same document required handling concurrent updates without overwriting changes.

Implemented Yjs and Socket.io based synchronization workflows to maintain a consistent shared document state across active sessions.` },
      { id: "02", title: "Microservice Communication", description: `The application is split across multiple services including authentication, collaboration, document management, organization management, and AI processing.

Designing clear service boundaries and managing communication between services required careful API design and responsibility separation.` },
      { id: "03", title: "AI Integration Pipeline", description: "Integrating Gemini into a collaborative editing environment required handling asynchronous requests, prompt construction, response processing, and maintaining a smooth user experience without interrupting editing workflows." },
      { id: "04", title: "Authentication & Permissions", description: "Managing organization-level access control required implementing secure authentication flows and role-based permissions to ensure users only accessed authorized workspaces and documents." },
      { id: "05", title: "Deployment Complexity", description: "Deploying a distributed application with frontend, backend services, databases, and AI components introduced configuration, environment management, and service coordination challenges." }
    ],
    architectureDecisions: [
      { id: "01", title: "Microservices over Monolith", description: `The platform was intentionally separated into specialized services including authentication, collaboration, document management, organization management, and AI processing.

This improved maintainability, enabled independent development, and reduced coupling between unrelated business domains.` },
      { id: "02", title: "WebSockets for Collaboration", description: `Traditional request-response communication would not provide the responsiveness required for collaborative editing.

Socket.io was adopted to support continuous bidirectional communication and live document synchronization.` },
      { id: "03", title: "Dedicated AI Service", description: `Instead of embedding AI logic directly into the core backend, AI processing was isolated into a FastAPI service.

This allows future support for multiple models and independent scaling of AI workloads.` },
      { id: "04", title: "PostgreSQL + Prisma", description: "A relational database model was selected to support structured workspace, organization, user, role, and document relationships while maintaining data integrity and query efficiency." }
    ],
    engineeringTakeaways: [
      "Learned how large applications are divided into smaller services.",
      "Gained practical experience designing relational database schemas.",
      "Improved understanding of real-time communication patterns.",
      "Learned how AI services can be integrated into production-style workflows.",
      "Developed experience managing deployment across multiple services and environments."
    ],
    impactMetrics: [
      "6+ Core Services",
      "Real-Time Multi-User Editing",
      "AI-Assisted Content Generation",
      "Role-Based Access Control",
      "PostgreSQL Data Layer",
      "Microservice Architecture"
    ],
    recruiterFocus: [
      "Full Stack Development",
      "Backend Architecture",
      "Database Design",
      "Real-Time Systems",
      "API Design",
      "AI Integration"
    ],
    github: "https://github.com/likhith1253/Realtime_Collaborator",
    demo: "https://realtime-collaborator-web.vercel.app/",
  },
  {
    name: "CensusGrid",
    summary: "A developer-focused geographic data infrastructure platform providing structured access to India's administrative hierarchy through secure APIs, analytics, API key management, caching, billing, and developer onboarding.",
    objective: "Build a scalable platform that exposes India's administrative geography through modern APIs while providing authentication, analytics, API key management, documentation, billing, and developer onboarding tools.",
    problem: "Location validation and administrative mapping in India is fragmented across multiple datasets, inconsistent naming conventions, and complex hierarchical structures. Organizations often spend significant engineering effort building custom lookup systems before solving their core problems.",
    solution: `Built a complete developer platform providing structured access to India's administrative hierarchy.

The platform includes:
- Geographic REST APIs
- API key lifecycle management
- Usage analytics
- Request telemetry
- Authentication
- Billing infrastructure
- Developer documentation
- Interactive API explorer
- Caching systems
- Subscription management`,
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Upstash Redis",
      "Stripe"
    ],
    techStackDetails: [
      { category: "Frontend", items: "React, Vite, Tailwind CSS" },
      { category: "Backend", items: "Node.js, Express.js" },
      { category: "Database", items: "PostgreSQL, Prisma ORM" },
      { category: "Caching", items: "Upstash Redis" },
      { category: "Authentication", items: "JWT, BCrypt" },
      { category: "Payments", items: "Stripe" },
      { category: "Infrastructure", items: "Neon PostgreSQL, Vercel, Render" }
    ],
    highlightSection: {
      title: "Backend Engineering & Database Design",
      content:
        "A major focus of CensusGrid was designing scalable relational schemas and API infrastructure. The platform was built around carefully modeled entities that serve as the foundation for reliable APIs and analytics.",
      list: [
        "Administrative Hierarchies",
        "API Keys",
        "User Accounts",
        "Usage Analytics",
        "Billing",
        "Subscription Management",
      ],
    },
    keyFeatures: [
      "State lookup APIs",
      "District lookup APIs",
      "Subdistrict lookup APIs",
      "Village search APIs",
      "API key generation and management",
      "Usage analytics dashboard",
      "Request monitoring",
      "Rate limiting",
      "Stripe subscription management",
      "Swagger/OpenAPI documentation",
      "Interactive API explorer",
      "Developer onboarding portal"
    ],
    technicalChallenges: [
      { id: "01", title: "Database Schema Design", description: `A significant portion of the project focused on designing relational schemas capable of representing administrative hierarchies, authentication systems, API keys, billing workflows, usage analytics, and developer accounts.

Careful consideration was required to balance normalization, maintainability, query efficiency, and future scalability.` },
      { id: "02", title: "Administrative Data Modeling", description: "Representing India's multi-level administrative hierarchy required designing efficient relationships between states, districts, subdistricts, and villages while maintaining fast query performance." },
      { id: "03", title: "Caching Strategy", description: "Implemented Redis caching to reduce repeated PostgreSQL queries and improve response times for frequently accessed geographic records. This reduced unnecessary database load and improved scalability for API consumption." },
      { id: "04", title: "JWT Plan Synchronization", description: "User subscription plans can change immediately after billing events. Solved stale authorization issues by validating plan information dynamically rather than relying exclusively on login-time JWT claims." },
      { id: "05", title: "Stripe Webhook Security", description: "Implemented secure webhook validation workflows that correctly process billing events and prevent unauthorized subscription updates." },
      { id: "06", title: "Multi-Tenant Analytics", description: "Usage analytics needed to remain isolated between developer accounts. Designed telemetry aggregation systems that ensure users only access their own metrics while administrators maintain platform-wide visibility." }
    ],
    architectureDecisions: [
      { id: "01", title: "Schema-First Development", description: `Before implementing APIs and dashboards, substantial effort was invested in designing the database structure.

Administrative entities, user accounts, subscriptions, API keys, analytics records, billing information, and telemetry systems were modeled carefully to support future growth.` },
      { id: "02", title: "API-First Product Design", description: "The platform was designed around APIs as the primary product rather than treating APIs as a secondary feature." },
      { id: "03", title: "Redis Edge Caching", description: "Caching was introduced to reduce database load and improve response performance for frequently requested geographic records." },
      { id: "04", title: "Developer Self-Service", description: "API keys, billing, analytics, usage tracking, and documentation were integrated into a single dashboard to reduce onboarding friction." },
      { id: "05", title: "Layered Platform Architecture", description: "Authentication, billing, analytics, caching, and geographic lookup services were separated into distinct logical layers for maintainability and future expansion." }
    ],
    architecture: [
      "Administrative hierarchy modeling",
      "User management",
      "API key infrastructure",
      "Usage telemetry",
      "Billing systems",
      "Subscription management",
      "Analytics dashboards",
      "Normalization trade-offs",
      "Denormalization opportunities",
      "Relationship design",
      "Query efficiency",
      "Long-term maintainability"
    ],
    engineeringTakeaways: [
      "Learned how API products are designed and monetized.",
      "Developed strong experience in relational database design.",
      "Improved understanding of normalization and denormalization trade-offs.",
      "Gained practical experience with caching systems.",
      "Learned secure payment integration workflows using Stripe.",
      "Built analytics pipelines for usage monitoring.",
      "Developed experience designing systems around clean data models.",
      "Learned how strong schema design simplifies application architecture."
    ],
    impactMetrics: [
      "457,000+ Village Records",
      "600+ Districts",
      "36 States & Union Territories",
      "Redis Caching Layer",
      "Stripe Billing Infrastructure",
      "Developer Analytics Dashboard"
    ],
    recruiterFocus: [
      "Backend Engineering",
      "API Design",
      "Database Design",
      "Product Architecture",
      "Caching Systems",
      "Authentication",
      "Billing Infrastructure",
      "Analytics Engineering"
    ],
    github: "https://github.com/likhith1253/village-api",
    demo: "https://censusgrid.vercel.app/",
  },
  {
    name: "Environment Spatial Understanding Assistant (ESUA)",
    summary: "ESUA is a real-time computer vision assistant that moves beyond simple object detection by understanding spatial relationships between detected objects.\n\nThe system continuously analyzes live camera feeds, identifies contextual risks, and generates human-readable safety alerts when potentially dangerous situations are detected.",
    objective: "Build a real-time vision system capable of understanding environmental context and identifying safety risks based on relationships between objects rather than detecting objects in isolation.",
    problem: "Most object detection systems stop at identifying what is present in an image.\n\nHowever, many real-world hazards emerge from interactions between objects.\n\nFor example:\n\n* Liquids near electronics\n* Flammable materials near heat sources\n* Hazardous object proximity\n\nTraditional object detection alone cannot reason about these risks.",
    solution: "Built a real-time spatial reasoning pipeline that combines object detection, temporal filtering, spatial analysis, and rule-based risk assessment.\n\nThe system continuously evaluates detected objects and their relationships to proactively identify safety concerns before incidents occur.",
    technologies: [
      "Python",
      "OpenCV",
      "YOLOv8",
      "Ultralytics"
    ],
    techStackDetails: [
      { category: "Programming", items: "Python" },
      { category: "Computer Vision", items: "OpenCV" },
      { category: "Object Detection", items: "YOLOv8, Ultralytics" },
      { category: "Processing", items: "Real-Time Video Streams, Bounding Box Analysis" },
      { category: "Deployment Target", items: "CPU, Webcam-Based Systems" }
    ],
    keyFeatures: [
      "Real-time object detection",
      "Live webcam analysis",
      "Spatial relationship reasoning",
      "Risk classification",
      "Hazard detection",
      "Context-aware warnings",
      "Temporal filtering",
      "Human-readable explanations",
      "Real-time visualization overlays"
    ],
    technicalChallenges: [
      { id: "01", title: "Beyond Object Detection", description: "Detecting objects is relatively straightforward using modern computer vision models.\n\nThe challenge was developing a system capable of reasoning about interactions and relationships between detected objects." },
      { id: "02", title: "Spatial Reasoning", description: "The system needed to determine whether objects were near, overlapping, or safely separated.\n\nImplemented bounding-box based distance calculations and proximity analysis workflows." },
      { id: "03", title: "False Positive Reduction", description: "Real-time detection pipelines often generate transient detections and visual noise.\n\nIntroduced temporal aggregation mechanisms to confirm object stability before triggering alerts." },
      { id: "04", title: "Context-Aware Risk Analysis", description: "Hazards are not defined by individual objects but by combinations of objects and their spatial relationships.\n\nDesigned rule-based reasoning workflows that evaluate semantic categories and interaction patterns." },
      { id: "05", title: "Real-Time Performance", description: "The system needed to process camera feeds continuously while maintaining responsiveness on CPU-based hardware.\n\nOptimized processing stages to balance detection quality and execution speed." }
    ],
    architectureDecisions: [
      { id: "01", title: "Temporal Aggregation Layer", description: "Object detections are validated across multiple frames before being considered stable.\n\nThis reduces alert noise and improves reliability." },
      { id: "02", title: "Rule-Based Risk Engine", description: "Risk analysis was separated from object detection.\n\nThis allows new safety scenarios to be introduced without modifying the detection model itself." },
      { id: "03", title: "Spatial Relationship Modeling", description: "Bounding box centers and distances were used to estimate proximity relationships between objects.\n\nThis enables context-aware reasoning without requiring depth sensors." },
      { id: "04", title: "CPU-First Design", description: "The system was intentionally designed to run on standard hardware without requiring dedicated GPUs." }
    ],
    engineeringTakeaways: [
      "Learned how modern object detection systems operate.",
      "Explored real-time video processing workflows.",
      "Developed understanding of spatial reasoning techniques.",
      "Built context-aware decision-making systems.",
      "Improved experience designing practical computer vision pipelines.",
      "Learned how AI systems can generate actionable insights rather than raw predictions."
    ],
    impactMetrics: [
      "YOLOv8 Detection",
      "Real-Time Processing",
      "Spatial Reasoning Engine",
      "Context-Aware Alerts",
      "Risk Analysis Pipeline",
      "CPU Optimized"
    ],
    recruiterFocus: [
      "Computer Vision",
      "Real-Time Systems",
      "Spatial Reasoning",
      "AI Engineering",
      "Context-Aware Decision Making",
      "Human-Centered AI"
    ],
    highlightSection: {
      title: "Spatial Intelligence Focus",
      content: "This project explores how computer vision systems can move beyond object recognition and begin reasoning about environmental context.",
      list: [
        "Object Detection",
        "Spatial Reasoning",
        "Context-Aware Analysis",
        "Real-Time Vision Systems",
        "Risk Assessment",
        "Temporal Aggregation",
        "Human-Centered AI"
      ],
      footer: "The emphasis is on understanding relationships between objects rather than identifying objects individually."
    },
    github: "https://github.com/likhith1253/ESUA",
    demo: "",
  },
  {
    name: "",
    summary: "",
    objective: "",
    problem: "",
    solution: "",
    technologies: [],
    challenges: "",
    results: "",
    github: "",
    demo: "",
  },
  {
    name: "",
    summary: "",
    objective: "",
    problem: "",
    solution: "",
    technologies: [],
    challenges: "",
    results: "",
    github: "",
    demo: "",
  },
];
