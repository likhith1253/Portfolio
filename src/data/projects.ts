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
    name: "Movie Intelligence Engine",
    summary: "An intelligent recommendation engine capable of understanding contextual similarity using vector embeddings, semantic search, and hybrid retrieval on a 5000+ movie dataset.",
    objective: "Build a production-ready recommendation system that demonstrates practical vector database capabilities, semantic search workflows, and embedding-powered retrieval systems.",
    problem: "Traditional recommendation systems rely heavily on metadata and keyword matching, often failing to capture semantic relationships between movies. Vector databases and embedding models offer powerful alternatives but require understanding of indexing strategies, similarity search algorithms, and hybrid retrieval patterns.",
    solution: `Built a comprehensive movie recommendation system using ChromaDB vector databases and transformer-based embeddings.

The system implements:
- Semantic search using sentence transformer embeddings
- HNSW indexing for scalable approximate nearest neighbor search
- Hybrid retrieval combining vector similarity with metadata filtering
- Interactive CLI for querying and benchmarking
- CRUD operations for movie data management
- Advanced filtering capabilities
- Query performance benchmarking framework`,
    technologies: [
      "Python",
      "ChromaDB",
      "Sentence Transformers",
      "Pandas",
      "NumPy",
      "Scikit-learn"
    ],
    techStackDetails: [
      { category: "Core", items: "Python, Pandas, NumPy" },
      { category: "Vector Database", items: "ChromaDB, HNSW Indexing" },
      { category: "Embeddings", items: "Sentence Transformers, All-MiniLM-L6-v2" },
      { category: "Search", items: "Semantic Search, ANN Search, Hybrid Retrieval" },
      { category: "Interface", items: "Interactive CLI, Query Benchmarking" }
    ],
    highlightSection: {
      title: "Vector Databases & Semantic Search",
      content: "A major focus of this project was understanding how vector databases operate in practice, including embedding generation, indexing strategies, similarity search algorithms, and hybrid retrieval patterns that combine vector similarity with structured metadata.",
      list: [
        "ChromaDB Integration",
        "HNSW Indexing",
        "Semantic Retrieval",
        "Metadata Filtering",
        "Hybrid Search",
        "Query Benchmarking",
        "CRUD Operations",
        "Recommendation Engine Architecture"
      ],
    },
    keyFeatures: [
      "5000+ movie dataset",
      "Semantic similarity search",
      "Vector embeddings with sentence transformers",
      "HNSW approximate nearest neighbor indexing",
      "Metadata-based filtering",
      "Hybrid retrieval (vector + metadata)",
      "Interactive CLI interface",
      "Query performance benchmarking",
      "CRUD operations for data management",
      "Advanced filtering capabilities",
      "Recommendation pipelines"
    ],
    technicalChallenges: [
      { id: "01", title: "Embedding Generation Strategy", description: `Selecting the right embedding model was critical for capturing semantic relationships between movie descriptions.

Evaluated multiple sentence transformer models and selected All-MiniLM-L6-v2 for its balance between embedding quality, inference speed, and resource requirements.` },
      { id: "02", title: "HNSW Index Configuration", description: `HNSW (Hierarchical Navigable Small World) indexing enables scalable approximate nearest neighbor search.

Tuned index parameters including ef_construction and M to balance query accuracy against index build time and memory usage.` },
      { id: "03", title: "Hybrid Retrieval Design", description: `Pure vector search can miss relevant results when metadata matters.

Implemented hybrid retrieval that combines vector similarity scores with structured metadata filters, allowing users to constrain results by genre, year, rating, and other attributes.` },
      { id: "04", title: "Query Benchmarking Framework", description: `Built a benchmarking system to measure query performance across different index configurations and dataset sizes.

This provided practical understanding of how indexing parameters affect retrieval speed and accuracy.` },
      { id: "05", title: "CLI Interaction Design", description: `Designed an interactive CLI that allows users to explore the system without requiring a web interface.

Supports natural language queries, filtering options, result ranking, and performance metrics display.` }
    ],
    architectureDecisions: [
      { id: "01", title: "ChromaDB over Custom Implementation", description: `Rather than building vector indexing from scratch, used ChromaDB to leverage production-tested indexing algorithms and query optimization.

This allowed focus on application logic rather than low-level vector operations.` },
      { id: "02", title: "Sentence Transformers over Word Embeddings", description: `Sentence-level embeddings capture contextual meaning better than word-level embeddings.

Selected sentence transformer models pre-trained on semantic similarity tasks for better recommendation quality.` },
      { id: "03", title: "HNSW over Exact Search", description: `For datasets beyond a few thousand records, exact nearest neighbor search becomes impractical.

HNSW provides approximate results with tunable accuracy-speed trade-offs, making it suitable for real-time recommendation scenarios.` },
      { id: "04", title: "Hybrid over Vector-Only", description: `Pure vector search can return results that are semantically similar but contextually inappropriate.

Hybrid retrieval ensures results satisfy both semantic similarity and business constraints.` },
      { id: "05", title: "CLI over Web Interface", description: `The CLI was chosen to focus engineering effort on backend vector operations rather than frontend development.

This allowed deeper exploration of vector database capabilities within the project scope.` }
    ],
    engineeringTakeaways: [
      "Learned how vector databases store and retrieve high-dimensional embeddings.",
      "Gained practical experience with HNSW indexing and ANN search algorithms.",
      "Developed understanding of embedding model selection and evaluation.",
      "Improved knowledge of hybrid retrieval patterns combining vector and structured search.",
      "Built benchmarking frameworks for performance measurement.",
      "Learned how to design CLI interfaces for data exploration.",
      "Developed experience with metadata filtering in vector search contexts."
    ],
    impactMetrics: [
      "5000+ Movie Dataset",
      "Semantic Retrieval Engine",
      "HNSW Indexing",
      "Hybrid Search Pipeline",
      "Query Benchmarking Framework",
      "Interactive CLI",
      "CRUD Operations",
      "Advanced Filtering"
    ],
    recruiterFocus: [
      "Vector Databases",
      "AI Infrastructure",
      "Retrieval Systems",
      "Search Systems",
      "Embedding Engineering",
      "Data Modeling",
      "Python Development",
      "Semantic Search"
    ],
    github: "https://github.com/likhith1253/Movie_Recommendation_System",
    demo: "",
  },
  {
    name: "MT-Dynamics",
    summary: "A modular pipeline combining classical image processing techniques with a fine-tuned U-Net segmentation model for automated microtubule tracing and dynamics analysis from fluorescence microscopy videos.",
    objective: "Build an automated analysis pipeline capable of extracting biological metrics such as growth velocity and catastrophe frequency from fluorescence microscopy videos, reducing manual analysis time for researchers.",
    problem: "Researchers often spend significant time manually analyzing microtubule dynamics from fluorescence microscopy videos. Low contrast, biological noise, complex filament structures, and tracking consistency make automated analysis challenging. Manual analysis is time-consuming and prone to human error.",
    solution: `Built a modular pipeline combining classical image processing techniques with a fine-tuned U-Net segmentation model for automated microtubule tracing and dynamics analysis.

The pipeline implements:
- Frangi filtering for vessel enhancement
- Otsu thresholding for binary segmentation
- Skeletonization for filament centerline extraction
- Pseudo-label generation for deep learning training
- U-Net segmentation for accurate boundary detection
- Biological metric extraction (growth velocity, catastrophe frequency)
- Interactive Streamlit dashboard for visualization`,
    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "scikit-image",
      "Streamlit",
      "NumPy"
    ],
    techStackDetails: [
      { category: "Core", items: "Python, NumPy" },
      { category: "Image Processing", items: "OpenCV, scikit-image" },
      { category: "Deep Learning", items: "PyTorch, U-Net" },
      { category: "Classical CV", items: "Frangi Filtering, Otsu Thresholding, Skeletonization" },
      { category: "Interface", items: "Streamlit Dashboard" }
    ],
    highlightSection: {
      title: "Computer Vision & Scientific Computing",
      content: "A major focus of this project was understanding how classical image processing techniques can be combined with deep learning to solve scientific problems in biological research.",
      list: [
        "Frangi Vessel Enhancement",
        "Otsu Thresholding",
        "Skeletonization",
        "Pseudo-Label Generation",
        "U-Net Segmentation",
        "Biological Metric Extraction",
        "Interactive Dashboard",
        "Pipeline Engineering"
      ],
    },
    keyFeatures: [
      "Automated microtubule tracing",
      "Growth velocity calculation",
      "Catastrophe frequency measurement",
      "Frangi filtering for low-contrast enhancement",
      "Otsu thresholding for segmentation",
      "Skeletonization for centerline extraction",
      "Pseudo-label generation workflow",
      "U-Net deep learning segmentation",
      "Interactive Streamlit dashboard",
      "Biological metric visualization",
      "Noise reduction techniques",
      "Feature extraction from microscopy data"
    ],
    technicalChallenges: [
      { id: "01", title: "Low Contrast Microscopy", description: `Fluorescence microscopy images often have low signal-to-noise ratios and poor contrast.

Implemented Frangi filtering to enhance tubular structures and improve filament visibility before segmentation.` },
      { id: "02", title: "Segmentation Accuracy", description: `Accurate microtubule boundary detection is critical for reliable metric extraction.

Combined classical thresholding with deep learning segmentation to improve accuracy over single-method approaches.` },
      { id: "03", title: "Biological Noise Reduction", description: `Microscopy images contain various noise sources including background fluorescence and imaging artifacts.

Applied preprocessing techniques including Gaussian filtering and morphological operations to reduce noise while preserving filament structures.` },
      { id: "04", title: "Pseudo-Label Generation", description: `Deep learning models require labeled training data, but manual annotation of microscopy images is time-consuming.

Developed a pseudo-label generation pipeline using classical image processing to create training data for the U-Net model.` },
      { id: "05", title: "Tracking Consistency", description: `Microtubules change over time, requiring consistent tracking across video frames.

Implemented tracking algorithms that maintain filament identity and handle appearance/disappearance events.` }
    ],
    architectureDecisions: [
      { id: "01", title: "Hybrid Classical + Deep Learning", description: `Rather than relying solely on deep learning, combined classical image processing with neural networks.

Classical methods provide robust preprocessing and pseudo-labeling, while deep learning improves final segmentation accuracy.` },
      { id: "02", title: "Modular Pipeline Architecture", description: `The pipeline was designed as modular components that can be independently tested and optimized.

This allows individual algorithm improvements without requiring complete pipeline rewrites.` },
      { id: "03", title: "U-Net for Segmentation", description: `U-Net architecture was selected for its effectiveness in biomedical image segmentation tasks.

The encoder-decoder structure preserves spatial information while learning hierarchical features.` },
      { id: "04", title: "Streamlit for Visualization", description: `Streamlit was chosen for rapid dashboard development without requiring frontend expertise.

This allowed focus on computer vision algorithms rather than web application development.` },
      { id: "05", title: "Pseudo-Label Workflow", description: `Instead of requiring manual annotation, built a pipeline to generate training labels using classical methods.

This enabled deep learning integration without extensive manual labeling effort.` }
    ],
    engineeringTakeaways: [
      "Learned how classical image processing techniques complement deep learning.",
      "Gained practical experience with U-Net architecture for biomedical segmentation.",
      "Developed understanding of pseudo-label generation workflows.",
      "Improved knowledge of noise reduction techniques in scientific imaging.",
      "Built modular pipelines for scientific computing applications.",
      "Learned how to extract meaningful biological metrics from image data.",
      "Developed experience with interactive dashboard development using Streamlit."
    ],
    impactMetrics: [
      "Automated Analysis Pipeline",
      "Hybrid Classical + Deep Learning Workflow",
      "Interactive Dashboard",
      "Biological Metric Extraction",
      "Growth Velocity Calculation",
      "Catastrophe Frequency Measurement",
      "Streamlit Visualization",
      "Noise Reduction Pipeline"
    ],
    recruiterFocus: [
      "Computer Vision",
      "Deep Learning",
      "Scientific ML",
      "Data Processing",
      "Pipeline Engineering",
      "Image Processing",
      "PyTorch",
      "OpenCV"
    ],
    github: "https://github.com/likhith1253/MT-Dynamics",
    demo: "",
  },
  {
    name: "ESUA",
    summary: "A real-time spatial reasoning assistant that analyzes webcam feeds, performs object detection using YOLOv8, and evaluates proximity relationships between objects.",
    objective: "Create a system capable of understanding spatial relationships between detected objects and proactively identifying hazards.",
    problem: "Object detection alone does not provide contextual awareness.",
    solution: "Built a real-time spatial reasoning assistant that analyzes webcam feeds, performs object detection using YOLOv8, and evaluates proximity relationships between objects.",
    technologies: [
      "Python",
      "YOLOv8",
      "OpenCV"
    ],
    challenges: "Implemented temporal aggregation, spatial reasoning, risk heuristics, and human-readable warning generation to detect situations such as liquids placed near electronics and other safety risks.",
    results: "Successfully detected situations such as liquids placed near electronics and other safety risks.",
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
];
