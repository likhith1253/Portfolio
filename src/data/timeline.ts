export type TimelineType =
  | "Education"
  | "Certification"
  | "Internship"
  | "Project"
  | "Hackathon"
  | "Achievement";

export interface TimelineEntry {
  type: TimelineType;
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
}

export const timeline: TimelineEntry[] = [
  {
    type: "Internship",
    title: "Bluestock Fintech",
    subtitle: "Data Analytics Intern",
    date: "[ Duration ]",
    description: "[ Brief summary of what you did and what you built during this internship ]",
  },
  {
    type: "Education",
    title: "[ University Name ]",
    subtitle: "[ Degree ] in [ Major ]",
    date: "[ Start Year ] – Present",
    description: "[ Optional: relevant coursework, GPA, or notable academic achievement ]",
  },
  {
    type: "Certification",
    title: "[ Certification Name ]",
    subtitle: "[ Issuer ]",
    date: "[ Month Year ]",
    description: "",
  },
  {
    type: "Project",
    title: "[ Notable Project Name ]",
    subtitle: "",
    date: "[ Month Year ]",
    description: "[ One-line description of what it does and what makes it interesting ]",
  },
  {
    type: "Hackathon",
    title: "[ Hackathon Name ]",
    subtitle: "[ Result — e.g. Finalist, Winner ]",
    date: "[ Month Year ]",
    description: "",
  },
];
