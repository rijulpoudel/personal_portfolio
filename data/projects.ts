export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  status: "live" | "in-progress" | "archived";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    description: "This site. Editorial minimal design built with Next.js 15 and Tailwind CSS v4.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "in-progress",
    githubUrl: "https://github.com/rijulpoudel/personal-portfolio",
    featured: true,
    year: 2026,
  },
  {
    slug: "placeholder-project",
    title: "Placeholder Project",
    description: "A placeholder for a real project. Replace this with your actual work.",
    techStack: ["Python", "React", "PostgreSQL"],
    status: "archived",
    featured: true,
    year: 2025,
  },
];
