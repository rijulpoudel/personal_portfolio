/**
 * PROJECTS
 * Every project Rijul has shipped: described, credited, annotated.
 * IDs are chronological and never reused.
 */

export interface ArchitectureComponent {
  name: string;
  role: string;
}

export interface ProjectNote {
  date: string; // year or YYYY-MM, when the note was added
  text: string;
}

export interface Project {
  id: string; // e.g. "RP-2026-0006"
  slug: string;
  title: string;
  nepali?: { script: string; meaning: string };
  tagline: string;
  description: string; // one line, for cards + metadata
  builtAt: string; // where it was built
  eventDate: string; // display date
  year: number;
  location: string;
  team: string;
  format: string; // hackathon, course capstone, self-directed, ...
  stack: string[]; // tech stack
  status: "live" | "shipped" | "in-progress" | "archived";
  featured?: boolean;
  awards?: { text: string; winner?: boolean }[];
  links: { github?: string; devpost?: string; live?: string };
  story: string[]; // the narrative
  architecture?: {
    description: string;
    components: ArchitectureComponent[];
  };
  notes: ProjectNote[];
}

export const projects: Project[] = [
  /* Aawaj */
  {
    id: "RP-2026-0006",
    slug: "aawaj",
    title: "Aawaj",
    nepali: { script: "आवाज", meaning: "voice" },
    tagline: "civic issue reporting, tamper-proof and on-chain",
    description:
      "A blockchain dApp on Polygon Amoy for tamper-proof civic issue reporting, with a 5-tier government escalation system and IPFS photo evidence.",
    builtAt: "Midwest Blockathon",
    eventDate: "2026",
    year: 2026,
    location: "Midwest, USA",
    team: "R. Poudel et al.",
    format: "hackathon, weekend build",
    stack: ["React", "Solidity", "Polygon Amoy", "ethers.js", "Pinata IPFS", "MetaMask"],
    status: "shipped",
    featured: true,
    awards: [
      { text: "Best Beginner Track, winner", winner: true },
      { text: "Best Hack Built with Antigravity, winner", winner: true },
    ],
    links: {
      github: "https://github.com/rijulpoudel/midwest_blockathon_awaj",
    },
    story: [
      "Aawaj is Nepali for “voice.” The premise comes from watching civic complaints disappear into bureaucracy back home: a pothole gets reported, the report sits in a drawer, and there is no way to prove it was ever filed or who ignored it. We wanted the paper trail itself to be incorruptible.",
      "Reports are written to a smart contract on Polygon Amoy, which makes them permanent and publicly auditable. The interesting design problem was escalation; a report shouldn't just sit on-chain, it should move. We built a five-tier ladder (Ward to Municipality to District to Province to Federal) with on-chain confirmation at each level and dispute logic when a citizen contests a resolution.",
      "Photo evidence is too large and too expensive for the chain, so images go to IPFS via Pinata and the contract stores the content hash. Officials work from a wallet-gated dashboard and authenticate with MetaMask, so their confirmations are themselves on-chain transactions. The audit trail covers the responders too, not just the reporters.",
    ],
    architecture: {
      description:
        "A React frontend talks to a Solidity contract on Polygon Amoy via ethers.js. Pinata pins photo evidence to IPFS; the chain stores hashes and the full escalation state machine.",
      components: [
        {
          name: "Solidity contract (Polygon Amoy)",
          role: "Stores reports, escalation state, confirmations, and disputes. The 5-tier ladder is a state machine enforced on-chain; escalation rules cannot be bypassed by any party.",
        },
        {
          name: "React frontend",
          role: "Citizen-facing reporting flow and public feed. Reads contract state via ethers.js; writing a report is a signed transaction.",
        },
        {
          name: "Pinata / IPFS",
          role: "Decentralized photo storage. The contract keeps only content hashes, so evidence is verifiable without bloating chain state.",
        },
        {
          name: "Wallet-gated dashboard",
          role: "Government view, authenticated with MetaMask. Official actions (confirm, resolve, respond to dispute) are on-chain transactions tied to a known wallet.",
        },
      ],
    },
    notes: [
      {
        date: "2026",
        text: "Putting the escalation logic on-chain, not just the reports, was the idea judges responded to. Accountability for the responders, not only a complaint box.",
      },
      {
        date: "2026",
        text: "Polygon Amoy testnet kept gas free for the demo. A production version would keep content hashes on-chain and add an indexer for fast feed reads.",
      },
    ],
  },

  /* Lucid AI */
  {
    id: "RP-2026-0005",
    slug: "lucid-ai",
    title: "Lucid AI",
    tagline: "ambient prediction of dementia sundowning",
    description:
      "An ambient AI platform that predicts dementia sundowning episodes 20 to 40 minutes early via continuous audio analysis, streaming to a caregiver dashboard.",
    builtAt: "DevFest WashU",
    eventDate: "2026",
    year: 2026,
    location: "St. Louis, MO",
    team: "R. Poudel et al.",
    format: "hackathon, weekend build",
    stack: ["Next.js", "Firebase", "Gemini API", "ElevenLabs", "Twilio"],
    status: "shipped",
    links: {
      github: "https://github.com/rijulpoudel",
    },
    story: [
      "Sundowning, the late-afternoon agitation common in dementia, usually catches caregivers off guard. The episodes have leading indicators in speech and ambient sound, but no human can monitor for them continuously. That is a machine's job.",
      "Lucid listens ambiently and runs continuous audio analysis through Gemini 1.5 Pro, looking for the early signatures of an episode. When the model's confidence shifts, state changes stream to a caregiver dashboard in real time. The goal is a 20 to 40 minute head start: enough time to adjust the environment, redirect, or simply be present before distress peaks.",
      "Two more pieces round it out. Daily cognitive assessments (clock drawing and word recall) are scored by Gemini Vision against an eight-week personal baseline, so decline is measured against the person rather than a population average. And the companion speaks in a familiar family voice cloned with ElevenLabs, because a known voice de-escalates where a synthetic one can agitate.",
    ],
    architecture: {
      description:
        "A Next.js app with Firebase as the real-time backbone. Gemini handles both continuous audio interpretation and vision-based scoring of cognitive assessments; ElevenLabs and Twilio handle the human-facing outputs.",
      components: [
        {
          name: "Continuous audio pipeline",
          role: "Streams ambient audio through Gemini 1.5 Pro for state classification; emits sundowning-risk state changes 20 to 40 minutes ahead of predicted onset.",
        },
        {
          name: "Caregiver dashboard (Next.js + Firebase)",
          role: "Real-time view of current state, risk trajectory, and assessment history. Firebase pushes state transitions to the dashboard instantly.",
        },
        {
          name: "Cognitive assessment scoring",
          role: "Daily clock-drawing and word-recall tasks scored with Gemini Vision against an 8-week rolling personal baseline.",
        },
        {
          name: "Voice companion (ElevenLabs + Twilio)",
          role: "Delivers personalized companion responses in cloned family voices; Twilio handles outbound alerts to caregivers.",
        },
      ],
    },
    notes: [
      {
        date: "2026",
        text: "Baseline-relative scoring matters more than absolute scores. An 8-week personal baseline catches drift that population norms hide.",
      },
      {
        date: "2026",
        text: "Familiar voices are not a gimmick. Caregiving literature consistently reports that known voices de-escalate dementia agitation where unfamiliar ones worsen it.",
      },
    ],
  },

  /* Didi */
  {
    id: "RP-2026-0004",
    slug: "didi",
    title: "Didi",
    nepali: { script: "दिदी", meaning: "older sister" },
    tagline: "a mental-health companion that checks on you",
    description:
      "A mental health companion app with mood-personalized AI guidance and an automated alert system that intervenes on consecutive low-mood patterns.",
    builtAt: "NLN Hackathon",
    eventDate: "2026",
    year: 2026,
    location: "remote",
    team: "R. Poudel et al.",
    format: "hackathon, weekend build",
    stack: ["React Native", "Node.js", "Express.js", "Supabase", "Gemini API"],
    status: "shipped",
    links: {
      github: "https://github.com/rijulpoudel",
    },
    story: [
      "Didi means “older sister” in Nepali: the person who notices you have been quiet for three days and shows up at your door. The app is named for the behavior we wanted to replicate. Not a chatbot you have to reach out to, but a companion that notices.",
      "Users do quick emotional check-ins, and Gemini generates guidance personalized to the mood, history, and goals behind each one rather than generic wellness copy. The check-in stream is also a signal: an automated alert system watches for consecutive low-mood patterns and triggers wellness interventions when a streak forms. The noticing is built into the architecture, not left to the user's initiative.",
      "The stack is React Native on the front, a Node/Express API in the middle, and Supabase for auth and storage. A deliberate choice: keep the mobile client thin and put the pattern detection server-side, where it runs whether or not the app is open.",
    ],
    architecture: {
      description:
        "A React Native client backed by a Node/Express API, with Supabase providing auth and persistence and Gemini generating mood-personalized guidance.",
      components: [
        {
          name: "React Native client",
          role: "Check-in flow, mood history, and companion conversation UI, cross-platform from one codebase.",
        },
        {
          name: "Node.js / Express API",
          role: "Owns the business logic: check-in processing, Gemini prompt construction with user context, and the low-mood pattern detector.",
        },
        {
          name: "Supabase",
          role: "Authentication and storage for users, check-ins, and intervention history.",
        },
        {
          name: "Alert system",
          role: "Watches for consecutive low-mood check-ins and triggers escalating wellness interventions automatically.",
        },
      ],
    },
    notes: [
      {
        date: "2026",
        text: "Personalized guidance lives or dies on context discipline. Sending mood history and goals with each request made responses specific instead of horoscope-vague.",
      },
    ],
  },

  /* Bizboard */
  {
    id: "RP-2025-0003",
    slug: "bizboard",
    title: "Bizboard",
    tagline: "a marketplace built for builders",
    description:
      "A full-stack service marketplace with real-time comments, upvotes, and row-level security. CodePath Web 102 final project.",
    builtAt: "CodePath Web 102",
    eventDate: "Aug 2025",
    year: 2025,
    location: "remote",
    team: "R. Poudel (solo)",
    format: "8-week course capstone",
    stack: ["React", "Supabase", "PostgreSQL", "CSS"],
    status: "live",
    links: {
      github: "https://github.com/rijulpoudel",
    },
    story: [
      "For the CodePath final I wanted something with real complexity, not a todo app. A service marketplace forces the full set: auth, ownership, real-time interaction, filtering, and per-user dashboards.",
      "Supabase was the right call for a solo build. PostgreSQL underneath meant proper relational modeling, with listings, users, comments, and upvotes as linked tables. Row-level security meant ownership rules are declared in SQL policy, not scattered through React components.",
      "The dashboard was the hardest piece: aggregating upvotes, comment counts, and activity per listing in near-real-time. I used Supabase's real-time subscriptions for live comment feeds and polling for dashboard metrics, a deliberate trade between freshness and complexity.",
    ],
    architecture: {
      description:
        "A React SPA communicating directly with Supabase. RLS policies in PostgreSQL enforce data ownership; real-time subscriptions power the comment feed.",
      components: [
        {
          name: "React SPA",
          role: "Listing creation, browsing, search, filtering, comments, and the personal activity dashboard.",
        },
        {
          name: "PostgreSQL via Supabase",
          role: "Relational schema: users, listings, comments, upvotes. Foreign keys and joins power the dashboard.",
        },
        {
          name: "Row-Level Security",
          role: "Declarative SQL policies scope every query to its owner. No auth checks in component code.",
        },
        {
          name: "Supabase Realtime",
          role: "WebSocket subscriptions on the comments table; new comments appear for all viewers without polling.",
        },
      ],
    },
    notes: [
      {
        date: "2025",
        text: "RLS takes a while to click. You are writing security as database policy, not application logic. Once it does, it's elegant.",
      },
      {
        date: "2025",
        text: "Designing for real-time from the start is far easier than retrofitting it. Adding live comments late forced a significant state refactor.",
      },
    ],
  },

  /* Lost & Found */
  {
    id: "RP-2025-0002",
    slug: "lost-and-found",
    title: "Lost & Found",
    tagline: "track what matters, find it fast",
    description:
      "A cross-platform mobile app built in 48 hours at HackKU 2025 to report, search, and claim lost items with location context.",
    builtAt: "HackKU",
    eventDate: "Apr 2025",
    year: 2025,
    location: "Lawrence, KS",
    team: "R. Poudel et al. (team of 3)",
    format: "48-hr hackathon",
    stack: ["React Native", "Expo", "Firebase", "Flask", "Python"],
    status: "shipped",
    links: {
      devpost: "https://devpost.com",
    },
    story: [
      "Campus lost-and-found runs on phone calls and bulletin boards. There is no way to search by location, time, or description; you just hope someone turned your thing in. We built the fix in 48 hours.",
      "Cross-platform was non-negotiable (lost items don't care about your phone OS), so React Native with Expo gave us one codebase. Firebase supplied real-time sync, which meant item status updates propagated to every client instantly.",
      "The Flask middleware was a deliberate architecture call: a clean REST surface we controlled, room for Python search and matching logic, and Firebase credentials kept server-side. We scoped ruthlessly. Auth, item creation, location tagging, and search were the four pillars; everything else was cut.",
    ],
    architecture: {
      description:
        "Three layers: React Native client, Flask REST API, Firebase. The Flask layer owns business logic and credentials; Firestore provides real-time document sync.",
      components: [
        {
          name: "React Native (Expo)",
          role: "Cross-platform UI: item listing, search, camera capture, and live updates via Firestore listeners.",
        },
        {
          name: "Flask REST API",
          role: "Python middleware exposing item CRUD and location-based search; validates input and holds the Firebase Admin SDK server-side.",
        },
        {
          name: "Firebase (Firestore, Storage, Auth)",
          role: "Real-time item documents, CDN-served item photos, and anonymous-to-full auth for reporting versus claiming.",
        },
      ],
    },
    notes: [
      {
        date: "2025",
        text: "Firestore listeners fire often. Debouncing UI updates was the difference between a live app and a flickering one.",
      },
      {
        date: "2025",
        text: "Ruthless scoping is a hackathon superpower. We cut a map view, chat, and push notifications, and shipped a tight working core instead.",
      },
    ],
  },

  /* Crafteako */
  {
    id: "RP-2024-0001",
    slug: "crafteako",
    title: "Crafteako",
    tagline: "where photography meets the web",
    description:
      "A hand-built photography and videography studio site. No frameworks, no build step, real client inquiries.",
    builtAt: "field work, self-directed",
    eventDate: "2024 –",
    year: 2024,
    location: "Lawrence, KS",
    team: "R. Poudel (solo)",
    format: "ongoing practice",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "live",
    links: {
      live: "https://crafteako.com",
      github: "https://github.com/rijulpoudel",
    },
    story: [
      "Crafteako is the home for my photography and videography. Every portfolio template I looked at felt generic (sliders, grids, lightboxes), so I built the site from scratch to give the work its own visual language.",
      "No framework, deliberately. I had been writing React for months and wanted to rediscover what frameworks actually abstract. CSS Grid, custom properties, and the animation API turned out to cover far more ground than expected.",
      "Photography sites are image-heavy by nature, so performance was a constraint from day one: lazy loading, responsive srcset sizing, and a Lightroom-to-Squoosh compression pipeline keep first load fast on slow connections.",
    ],
    architecture: {
      description:
        "A static site with no build step. Custom CSS for layout and theming; JavaScript only where paper can't do the job (lightbox, contact form, scroll observation).",
      components: [
        {
          name: "Hand-written HTML/CSS",
          role: "Custom grid layouts, hand-tuned design tokens via custom properties, zero utility classes.",
        },
        {
          name: "Vanilla JavaScript",
          role: "Gallery lightbox, Intersection Observer scroll reveals, and form handling. Nothing else.",
        },
        {
          name: "Image pipeline",
          role: "Lightroom exports compressed with Squoosh, served with responsive srcset so each viewport gets the right size.",
        },
      ],
    },
    notes: [
      {
        date: "2024",
        text: "Vanilla CSS is underrated. Grid, custom properties, and clamp() cover most of what a framework gives you, at zero runtime cost.",
      },
      {
        date: "2025",
        text: "Getting a photography site under 2MB first load while still looking right is a craft of its own. Every step of the pipeline is a decision.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((s) => s.slug === slug);
}

/** Newest first. */
export function newestFirst(): Project[] {
  return [...projects].sort((a, b) => b.id.localeCompare(a.id));
}
