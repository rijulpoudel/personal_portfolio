export interface DepositAnnotation {
  text: string;
  url?: string;
}

export interface Experience {
  accession: string;
  role: string;
  company: string;
  context?: string; // one-line description of the institution
  location?: string;
  startDate: string;
  endDate?: string;
  description: string[];
  techStack?: string[];
  /** Dated slips appended over time, e.g. merged PRs. */
  annotations?: DepositAnnotation[];
}

export const experiences: Experience[] = [
  {
    accession: "DEP-2026-004",
    role: "Software Developer",
    company: "Specify Collections Consortium",
    context:
      "KU Biodiversity Institute: open-source collections-management software used by natural history museums and herbaria worldwide.",
    location: "Lawrence, KS",
    startDate: "2026", // TODO(rijul): confirm exact start month
    description: [
      "Developing Specify 7, the open-source platform natural history collections use to catalog, manage, and publish specimen data.",
      "Working across a Django/Python backend and a React/TypeScript frontend backed by MySQL, in a production codebase serving institutions in dozens of countries.",
      "Contributions are public; merged pull requests appear below as they land.",
    ],
    techStack: ["Django", "Python", "React", "TypeScript", "MySQL"],
    annotations: [
      // TODO(rijul): add merged PRs as they land, e.g.:
      // { text: "PR #1234: short description of the change", url: "https://github.com/specify/specify7/pull/1234" },
    ],
  },
  {
    accession: "DEP-2024-003",
    role: "Advanced IT Technician",
    company: "KU Information Technology",
    location: "Lawrence, KS",
    startDate: "June 2024",
    description: [
      "Mentor new hires on IT processes and ticketing procedures, improving team consistency.",
      "Manage 85+ tickets weekly, resolving technical issues across Android, iOS, macOS & Windows platforms.",
      "Administer Active Directory, Microsoft 365, & Cisco VPN in full compliance with FERPA and KU IT policy.",
    ],
    techStack: ["Active Directory", "Microsoft 365", "Cisco VPN"],
  },
  {
    accession: "DEP-2022-002",
    role: "Front-End Developer & Graphics Lead",
    company: "Mathematics Initiatives in Nepal (MIN)",
    location: "Kathmandu, Nepal",
    startDate: "June 2022",
    endDate: "Aug 2023",
    description: [
      "Redesigned and optimized MIN's website with HTML, CSS, and JavaScript, improving page load times by 25%.",
      "Led a 6-person team for Olympiad campaigns, boosting engagement by 30%.",
      "Designed Figma graphics reaching 1,400+ students across web and social channels.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Figma"],
  },
  {
    accession: "DEP-2022-001",
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
