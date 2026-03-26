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
    role: "Advanced IT Technician",
    company: "KU Information Technology",
    location: "Lawrence, KS",
    startDate: "June 2024",
    description: [
      "Reduced ticket resolution time to 4.5 minutes for standard tickets by enhancing the knowledge base.",
      "Managed 85 tickets weekly, resolving technical issues across Android, iOS, macOS & Windows platforms.",
      "Supported tools like Active Directory, Microsoft 365 & Cisco VPN, complying with FERPA and KU policies.",
    ],
    techStack: ["Active Directory", "Microsoft 365", "Cisco VPN"],
  },
  {
    role: "Front-End Developer & Graphics Lead",
    company: "Mathematics Initiatives in Nepal (MIN)",
    location: "Kathmandu, Nepal",
    startDate: "June 2022",
    endDate: "Aug 2023",
    description: [
      "Redesigned and optimized MIN's website using HTML, CSS, and JavaScript, improving page load times by 25%.",
      "Led a 6-person team for JMOC campaigns, boosting engagement by 30% and promoting Math olympiads.",
      "Designed graphics in Figma, creating content that reached 1,400+ students across web and social channels.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Figma"],
  },
  {
    role: "Student Research Scholar",
    company: "Student Research Council Nepal (SRCN)",
    location: "Kathmandu, Nepal",
    startDate: "May 2022",
    endDate: "Aug 2022",
    description: [
      "Selected as 1 of 5 students (from 1,000+ applicants) for the computational biology research program.",
      "Validated penicillin as a drug candidate via protein docking & binding, presenting findings to researchers.",
      "Analyzed bacterial proteins with PyMOL and PyRx in a 4-person team mentored by UPenn colleagues.",
    ],
    techStack: ["PyMOL", "PyRx", "Python"],
  },
];
