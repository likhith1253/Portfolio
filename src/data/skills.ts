export interface SkillCategory {
  category: string;
  items: string[];
  highlighted?: boolean;
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "Django", "REST APIs", "WebSockets", "Socket.io", "Yjs"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "ChromaDB", "SQL"],
  },
  {
    category: "Analytics & AI",
    items: ["Python", "Pandas", "NumPy", "Scikit-learn", "PyTorch", "TensorFlow", "OpenCV", "Power BI", "Gemini API"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Postman", "Vercel", "Render"],
  },
  {
    category: "Languages",
    items: ["Python", "JavaScript", "Java", "C", "TypeScript"],
  },
  {
    category: "Concepts",
    items: [
      "Database Design",
      "Schema Modeling",
      "Normalization",
      "Denormalization",
      "System Design",
      "Machine Learning",
      "Vector Databases",
      "RBAC",
      "JWT Authentication",
      "Microservices",
    ],
  },
  {
    category: "Currently Exploring",
    items: ["System Design", "Machine Learning", "Vector Databases"],
    highlighted: true,
  },
];
