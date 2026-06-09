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
    items: ["Node.js", "Express.js", "FastAPI", "Django", "REST APIs", "WebSockets"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Firebase", "ChromaDB"],
  },
  {
    category: "Analytics & AI",
    items: ["SQL", "Pandas", "NumPy", "Power BI", "Gemini API"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "GitHub Actions", "Postman", "Vercel", "Render"],
  },
  {
    category: "Concepts",
    items: [
      "Database Design",
      "Schema Modeling",
      "Normalization",
      "Denormalization",
      "JWT Authentication",
      "RBAC",
      "Microservices",
    ],
  },
  {
    category: "Currently Exploring",
    items: ["System Design", "Machine Learning", "Vector Databases"],
    highlighted: true,
  },
];
