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
  SiPostman,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiC,
  SiSqlite
} from "react-icons/si";

export interface TechIconConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const techIconMap: Record<string, TechIconConfig> = {
  // Frontend - Technologies with official logos
  "React": { icon: SiReact, label: "React" },
  "Next.js": { icon: SiNextdotjs, label: "Next.js" },
  "JavaScript": { icon: SiJavascript, label: "JavaScript" },
  "TypeScript": { icon: SiTypescript, label: "TypeScript" },
  "HTML": { icon: SiHtml5, label: "HTML" },
  "CSS": { icon: SiCss, label: "CSS" },
  "Tailwind CSS": { icon: SiTailwindcss, label: "Tailwind CSS" },
  
  // Backend - Technologies with official logos
  "Node.js": { icon: SiNodedotjs, label: "Node.js" },
  "Express.js": { icon: SiExpress, label: "Express.js" },
  "FastAPI": { icon: SiFastapi, label: "FastAPI" },
  "Django": { icon: SiDjango, label: "Django" },
  "Socket.io": { icon: SiSocketdotio, label: "Socket.io" },
  
  // Databases - Technologies with official logos
  "PostgreSQL": { icon: SiPostgresql, label: "PostgreSQL" },
  "MySQL": { icon: SiMysql, label: "MySQL" },
  "MongoDB": { icon: SiMongodb, label: "MongoDB" },
  "Prisma": { icon: SiPrisma, label: "Prisma" },
  "Firebase": { icon: SiFirebase, label: "Firebase" },
  "ChromaDB": { icon: SiMongodb, label: "ChromaDB" },
  "Redis": { icon: SiRedis, label: "Redis" },
  
  // Analytics & AI - Technologies with official logos
  "SQL": { icon: SiPostgresql, label: "SQL" },
  "Pandas": { icon: SiPandas, label: "Pandas" },
  "NumPy": { icon: SiPython, label: "NumPy" },
  "Scikit-learn": { icon: SiScikitlearn, label: "Scikit-learn" },
  "PyTorch": { icon: SiPytorch, label: "PyTorch" },
  "TensorFlow": { icon: SiTensorflow, label: "TensorFlow" },
  "OpenCV": { icon: SiOpencv, label: "OpenCV" },
  "Power BI": { icon: SiPython, label: "Power BI" },
  "Gemini API": { icon: SiPython, label: "Gemini API" },
  
  // Tools - Technologies with official logos
  "Git": { icon: SiGit, label: "Git" },
  "GitHub": { icon: SiGithub, label: "GitHub" },
  "GitHub Actions": { icon: SiGithub, label: "GitHub Actions" },
  "Docker": { icon: SiDocker, label: "Docker" },
  "Postman": { icon: SiPostman, label: "Postman" },
  "Vercel": { icon: SiVercel, label: "Vercel" },
  "Render": { icon: SiRender, label: "Render" },
  "Linux": { icon: SiLinux, label: "Linux" },
  
  // Languages - Technologies with official logos
  "C": { icon: SiC, label: "C" },
  "Java": { icon: SiPython, label: "Java" },
  
  // Concepts - NO ICONS (display as text-only tags)
  // Database Design, Schema Modeling, Normalization, Denormalization, 
  // JWT Authentication, RBAC, Microservices, System Design, 
  // Machine Learning, Vector Databases, etc. - intentionally left out
};

export function getTechIcon(techName: string): TechIconConfig | null {
  return techIconMap[techName] || null;
}
