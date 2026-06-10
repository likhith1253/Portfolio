import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiFirebase,
  SiRedis,
  SiPython,
  SiPandas,
  SiGit,
  SiDocker,
  SiGithub,
  SiLinux,
  SiSocketdotio,
  SiVercel,
  SiRender,
  SiPostman
} from "react-icons/si";

export interface TechIconConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const techIconMap: Record<string, TechIconConfig> = {
  // Frontend
  "React": { icon: SiReact, label: "React" },
  "Next.js": { icon: SiNextdotjs, label: "Next.js" },
  "JavaScript": { icon: SiJavascript, label: "JavaScript" },
  "TypeScript": { icon: SiTypescript, label: "TypeScript" },
  "HTML": { icon: SiHtml5, label: "HTML" },
  "CSS": { icon: SiCss, label: "CSS" },
  "Tailwind CSS": { icon: SiTailwindcss, label: "Tailwind CSS" },
  
  // Backend
  "Node.js": { icon: SiNodedotjs, label: "Node.js" },
  "Express.js": { icon: SiExpress, label: "Express.js" },
  "FastAPI": { icon: SiFastapi, label: "FastAPI" },
  "Django": { icon: SiDjango, label: "Django" },
  "REST APIs": { icon: SiNodedotjs, label: "REST APIs" },
  "WebSockets": { icon: SiSocketdotio, label: "WebSockets" },
  
  // Databases
  "PostgreSQL": { icon: SiPostgresql, label: "PostgreSQL" },
  "MySQL": { icon: SiMysql, label: "MySQL" },
  "MongoDB": { icon: SiMongodb, label: "MongoDB" },
  "Prisma": { icon: SiPrisma, label: "Prisma" },
  "Firebase": { icon: SiFirebase, label: "Firebase" },
  "ChromaDB": { icon: SiMongodb, label: "ChromaDB" },
  "Redis": { icon: SiRedis, label: "Redis" },
  
  // Analytics & AI
  "SQL": { icon: SiPostgresql, label: "SQL" },
  "Pandas": { icon: SiPandas, label: "Pandas" },
  "NumPy": { icon: SiPython, label: "NumPy" },
  "Power BI": { icon: SiPython, label: "Power BI" },
  "Gemini API": { icon: SiPython, label: "Gemini API" },
  "Machine Learning": { icon: SiPython, label: "Machine Learning" },
  
  // Tools
  "Git": { icon: SiGit, label: "Git" },
  "Docker": { icon: SiDocker, label: "Docker" },
  "GitHub Actions": { icon: SiGithub, label: "GitHub Actions" },
  "Postman": { icon: SiPostman, label: "Postman" },
  "Vercel": { icon: SiVercel, label: "Vercel" },
  "Render": { icon: SiRender, label: "Render" },
  "Linux": { icon: SiLinux, label: "Linux" },
  
  // Concepts - using generic icons for concepts
  "Database Design": { icon: SiPostgresql, label: "Database Design" },
  "Schema Modeling": { icon: SiPrisma, label: "Schema Modeling" },
  "Normalization": { icon: SiPostgresql, label: "Normalization" },
  "Denormalization": { icon: SiMongodb, label: "Denormalization" },
  "JWT Authentication": { icon: SiFastapi, label: "JWT Authentication" },
  "RBAC": { icon: SiDjango, label: "RBAC" },
  "Microservices": { icon: SiNodedotjs, label: "Microservices" },
  "System Design": { icon: SiNodedotjs, label: "System Design" },
  "Vector Databases": { icon: SiMongodb, label: "Vector Databases" },
  "AI-Powered Applications": { icon: SiPython, label: "AI-Powered Applications" },
  "Full Stack Engineering": { icon: SiReact, label: "Full Stack Engineering" },
  "Database Architecture": { icon: SiPostgresql, label: "Database Architecture" },
  
  // Additional technologies
  "Socket.io": { icon: SiSocketdotio, label: "Socket.io" },
};

export function getTechIcon(techName: string): TechIconConfig | null {
  return techIconMap[techName] || null;
}
