export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  status?: string;
}

export const achievements: Achievement[] = [
  {
    title: "Special Mention",
    organization: "Hack 101 Hackathon",
    date: "",
    description: "Received Special Mention recognition for problem-solving, implementation quality, and technical execution during the hackathon.",
    status: "Achieved ✓"
  },
  {
    title: "Participant",
    organization: "Intel IoT Hackathon",
    date: "",
    description: "Participated in an Internet of Things focused hackathon involving hardware-software integration and real-world problem solving.",
    status: "Completed ✓"
  }
];