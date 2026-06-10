export interface Certification {
  title: string;
  issuer: string;
  academicPartner?: string;
  instructor?: string;
  completionDate: string;
  category: string;
  description: string;
  keyTopicsCovered: string[];
  skillsDemonstrated: string[];
  credentialUrl: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "planned";
}

export const certifications: Certification[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    academicPartner: "Stanford University",
    instructor: "Andrew Ng",
    completionDate: "June 2026",
    category: "Machine Learning",
    description: "Completed foundational machine learning training focused on supervised learning, regression models, classification algorithms, model evaluation techniques, and practical machine learning workflows.",
    keyTopicsCovered: [
      "Supervised Learning",
      "Linear Regression",
      "Logistic Regression",
      "Classification",
      "Model Evaluation",
      "Machine Learning Fundamentals",
      "Scikit-Learn Workflows",
      "Data-Driven Decision Making"
    ],
    skillsDemonstrated: [
      "Machine Learning",
      "Regression",
      "Classification",
      "Model Evaluation",
      "Data Analysis",
      "AI Fundamentals"
    ],
    credentialUrl: "https://coursera.org/verify/BWX0FSNP3FWS",
    featured: true,
    status: "completed"
  },
  {
    title: "Foundations of Data Science",
    issuer: "Google",
    completionDate: "May 2026",
    category: "Data Science",
    description: "Studied foundational concepts in data science including analytical thinking, statistical reasoning, data preparation, data interpretation, and structured approaches to extracting insights from data.",
    keyTopicsCovered: [
      "Data Analysis",
      "Data Preparation",
      "Statistical Thinking",
      "Data Interpretation",
      "Data-Driven Problem Solving"
    ],
    skillsDemonstrated: [
      "Data Analysis",
      "Data Cleaning",
      "Statistics Fundamentals",
      "Analytical Thinking",
      "Data Interpretation"
    ],
    credentialUrl: "https://coursera.org/verify/A9OJ5UE2UJ4R",
    status: "completed"
  }
];
