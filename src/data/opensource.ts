export interface OpenSourceContribution {
  project: string;
  repository: string;
  contribution: string;
  type: string;
  description: string;
  technologies: string[];
  link?: string;
  status: "Completed ✓" | "Merged ✓" | "Selected ✓";
}

export const opensource: OpenSourceContribution[] = [
  {
    project: "iCalendar",
    repository: "https://github.com/collective/icalendar",
    contribution: "RFC 5545 Compliance Improvements",
    type: "Merged Open Source Contribution",
    description: "Contributed to the Python iCalendar ecosystem by improving standards compliance and calendar interoperability through enhancements aligned with RFC 5545 specifications.",
    technologies: ["Python"],
    link: "https://github.com/collective/icalendar/pull/1116",
    status: "Merged ✓"
  },
  {
    project: "OpenAlgo",
    repository: "https://github.com/likhith1253/openalgo/tree/feature/webhook-api-python-strategies",
    contribution: "Webhook API & Python Strategy Integration",
    type: "Implementation",
    description: "Implemented webhook API enhancements and Python strategy integrations supporting algorithmic trading workflows and automation pipelines.",
    technologies: ["Python", "REST APIs", "Webhook Systems"],
    status: "Completed ✓"
  },
  {
    project: "GirlScript Summer of Code 2026",
    repository: "",
    contribution: "Selected Contributor",
    type: "Community Contribution",
    description: "Selected as a contributor for GirlScript Summer of Code 2026, participating in open-source collaboration, issue resolution, and community-driven software development.",
    technologies: [],
    status: "Selected ✓"
  }
];
