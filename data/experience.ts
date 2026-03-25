export interface Experience {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string[];
  techStack?: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Placeholder Company",
    location: "Remote",
    startDate: "May 2025",
    endDate: "Aug 2025",
    description: [
      "Placeholder description — replace with your actual experience.",
      "Built something meaningful that shipped to real users.",
    ],
    techStack: ["TypeScript", "React", "PostgreSQL"],
  },
];
