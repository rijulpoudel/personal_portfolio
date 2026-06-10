/**
 * THE COLLECTION
 * Every project is a specimen: accessioned, labeled, annotated.
 * Accession numbers are chronological by acquisition and never reused.
 */

export interface DissectionComponent {
  name: string;
  role: string;
}

export interface Annotation {
  date: string; // year or YYYY-MM — when the annotation was added
  text: string;
}

export interface Specimen {
  accession: string; // e.g. "RP-2026-0006"
  slug: string;
  title: string;
  nepali?: { script: string; meaning: string };
  commonName: string; // the vernacular tagline
  description: string; // one line, for the ledger + metadata
  collectedAt: string; // the event
  eventDate: string; // display date
  year: number;
  locality: string;
  collectors: string;
  method: string; // sampling protocol
  substrate: string[]; // tech stack
  status: "live" | "exhibited" | "in-progress" | "archived";
  holotype?: boolean;
  determinations?: { text: string; winner?: boolean }[];
  links: { github?: string; devpost?: string; live?: string };
  fieldNotes: string[]; // the narrative
  dissection?: {
    description: string;
    components: DissectionComponent[];
  };
  annotations: Annotation[];
}

export const COLLECTOR = "R. Poudel";

export const specimens: Specimen[] = [
  /* ── RP-2026-0006 · Aawaj — the holotype ───────────────────────── */
  {
    accession: "RP-2026-0006",
    slug: "aawaj",
    title: "Aawaj",
    nepali: { script: "आवाज", meaning: "voice" },
    commonName: "civic issue reporting, tamper-proof and on-chain",
    description:
      "A blockchain dApp on Polygon Amoy for tamper-proof civic issue reporting, with a 5-tier government escalation system and IPFS photo evidence.",
    collectedAt: "Midwest Blockathon",
    eventDate: "2026",
    year: 2026,
    locality: "Midwest, USA",
    collectors: "R. Poudel et al.",
    method: "hackathon, weekend build",
    substrate: ["React", "Solidity", "Polygon Amoy", "ethers.js", "Pinata IPFS", "MetaMask"],
    status: "exhibited",
    holotype: true,
    determinations: [
      { text: "Best Beginner Track — WINNER", winner: true },
      { text: "Best Hack Built with Antigravity — WINNER", winner: true },
    ],
    links: {
      github: "https://github.com/rijulpoudel/midwest_blockathon_awaj",
    },
    fieldNotes: [
      "Aawaj is Nepali for “voice.” The premise comes from watching civic complaints disappear into bureaucracy back home: a pothole gets reported, the report sits in a drawer, and there is no way to prove it was ever filed, who ignored it, or for how long. We wanted the paper trail itself to be incorruptible.",
      "Reports are written to a smart contract on Polygon Amoy, which makes them permanent and publicly auditable — nobody can quietly delete a complaint. The interesting design problem was escalation: a report shouldn't just sit on-chain, it should move. We engineered a five-tier escalation ladder (Ward → Municipality → District → Province → Federal) with on-chain confirmation at each level and dispute logic when a citizen contests a resolution.",
      "Photo evidence doesn't belong on-chain — it's too large and too expensive — so images go to IPFS via Pinata and the contract stores the content hash. The government side is a wallet-gated dashboard: officials authenticate with MetaMask, and their confirmations are themselves on-chain transactions, which means the audit trail covers the responders too, not just the reporters.",
    ],
    dissection: {
      description:
        "A React frontend talks to a Solidity contract on Polygon Amoy via ethers.js. Pinata pins photo evidence to IPFS; the chain stores hashes and the full escalation state machine.",
      components: [
        {
          name: "Solidity contract (Polygon Amoy)",
          role: "Stores reports, escalation state, confirmations, and disputes. The 5-tier ladder is a state machine enforced on-chain — escalation rules cannot be bypassed by any party.",
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
          role: "Government view, authenticated with MetaMask. Official actions (confirm, resolve, dispute response) are on-chain transactions tied to a known wallet.",
        },
      ],
    },
    annotations: [
      {
        date: "2026",
        text: "Putting the escalation logic on-chain, not just the reports, turned out to be the idea judges responded to — accountability for the responders, not only a complaint box.",
      },
      {
        date: "2026",
        text: "Polygon Amoy testnet kept gas free for the demo; a production version would need a hybrid model with content hashes on-chain and an indexer for fast feed reads.",
      },
    ],
  },

  /* ── RP-2026-0005 · Lucid AI ───────────────────────────────────── */
  {
    accession: "RP-2026-0005",
    slug: "lucid-ai",
    title: "Lucid AI",
    commonName: "ambient prediction of dementia sundowning",
    description:
      "An ambient AI platform that predicts dementia sundowning episodes 20–40 minutes early via continuous audio analysis, streaming to a caregiver dashboard.",
    collectedAt: "DevFest WashU",
    eventDate: "2026",
    year: 2026,
    locality: "St. Louis, MO",
    collectors: "R. Poudel et al.",
    method: "hackathon, weekend build",
    substrate: ["Next.js", "Firebase", "Gemini API", "ElevenLabs", "Twilio"],
    status: "exhibited",
    links: {
      github: "https://github.com/rijulpoudel",
    },
    fieldNotes: [
      "Sundowning — the late-afternoon agitation and confusion common in dementia — usually catches caregivers off guard. The episodes have leading indicators in speech and ambient sound, but no human can monitor for them continuously. That's a machine's job.",
      "Lucid listens ambiently and runs continuous audio analysis through Gemini 1.5 Pro, looking for the early signatures of an episode. When the model's confidence shifts, state changes stream to a caregiver dashboard in real time — the goal is a 20–40 minute head start, enough time to adjust the environment, redirect, or simply be present before distress peaks.",
      "Two more pieces round it out. Daily cognitive assessments — clock drawing and word recall — are scored by Gemini Vision against an eight-week personal baseline, so decline is measured against the person, not a population average. And when the companion speaks, it speaks in a familiar family voice cloned with ElevenLabs, because a known voice de-escalates where a synthetic one can agitate.",
    ],
    dissection: {
      description:
        "A Next.js app with Firebase as the real-time backbone. Gemini handles both continuous audio interpretation and vision-based scoring of cognitive assessments; ElevenLabs and Twilio handle the human-facing outputs.",
      components: [
        {
          name: "Continuous audio pipeline",
          role: "Streams ambient audio through Gemini 1.5 Pro for state classification; emits sundowning-risk state changes 20–40 minutes ahead of predicted onset.",
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
    annotations: [
      {
        date: "2026",
        text: "Baseline-relative scoring matters more than absolute scores in cognitive assessment — an 8-week personal baseline catches drift that population norms hide.",
      },
      {
        date: "2026",
        text: "Familiar voices are not a gimmick: caregiving literature consistently reports that known voices de-escalate dementia agitation where unfamiliar ones worsen it.",
      },
    ],
  },

  /* ── RP-2026-0004 · Didi ───────────────────────────────────────── */
  {
    accession: "RP-2026-0004",
    slug: "didi",
    title: "Didi",
    nepali: { script: "दिदी", meaning: "older sister" },
    commonName: "a mental-health companion that checks on you",
    description:
      "A mental health companion app with mood-personalized AI guidance and an automated alert system that intervenes on consecutive low-mood patterns.",
    collectedAt: "NLN Hackathon",
    eventDate: "2026",
    year: 2026,
    locality: "remote",
    collectors: "R. Poudel et al.",
    method: "hackathon, weekend build",
    substrate: ["React Native", "Node.js", "Express.js", "Supabase", "Gemini API"],
    status: "exhibited",
    links: {
      github: "https://github.com/rijulpoudel",
    },
    fieldNotes: [
      "Didi means “older sister” in Nepali — the person who notices you've been quiet for three days and shows up at your door. The app is named for the behavior we wanted to replicate: not a chatbot you have to reach out to, but a companion that notices.",
      "Users do quick emotional check-ins; Gemini generates guidance personalized to the mood, history, and goals behind each check-in rather than generic wellness copy. The check-in stream is also a signal: an automated alert system watches for consecutive low-mood patterns and triggers wellness interventions when a streak forms — the noticing is built into the architecture, not left to the user's initiative.",
      "The stack is React Native on the front, a Node/Express API in the middle, and Supabase for auth and storage — a deliberate choice to keep the mobile client thin and put the pattern-detection logic server-side where it can run regardless of whether the app is open.",
    ],
    dissection: {
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
    annotations: [
      {
        date: "2026",
        text: "Personalized guidance lives or dies on context window discipline — sending mood history and goals with each request made responses specific instead of horoscope-vague.",
      },
    ],
  },

  /* ── RP-2025-0003 · Bizboard ───────────────────────────────────── */
  {
    accession: "RP-2025-0003",
    slug: "bizboard",
    title: "Bizboard",
    commonName: "a marketplace built for builders",
    description:
      "A full-stack service marketplace with real-time comments, upvotes, and row-level security — CodePath Web 102 final project.",
    collectedAt: "CodePath Web 102",
    eventDate: "Aug 2025",
    year: 2025,
    locality: "remote",
    collectors: "R. Poudel (solo)",
    method: "8-week course capstone",
    substrate: ["React", "Supabase", "PostgreSQL", "CSS"],
    status: "live",
    links: {
      github: "https://github.com/rijulpoudel",
    },
    fieldNotes: [
      "For the CodePath final I wanted something with real complexity, not a todo app. A service marketplace forces the full set: auth, ownership, real-time interaction, filtering, and per-user dashboards.",
      "Supabase was the right call for a solo build. PostgreSQL underneath meant proper relational modeling — listings, users, comments, and upvotes as linked tables. Row-level security meant ownership rules are declared in SQL policy, not scattered through React components.",
      "The dashboard was the hardest piece: aggregating upvotes, comment counts, and activity per listing in near-real-time. I used Supabase's real-time subscriptions for live comment feeds and polling for dashboard metrics — a deliberate trade between freshness and complexity.",
    ],
    dissection: {
      description:
        "A React SPA communicating directly with Supabase. RLS policies in PostgreSQL enforce data ownership; real-time subscriptions power the comment feed.",
      components: [
        {
          name: "React SPA",
          role: "Listing creation, browsing, search, filtering, comments, and the personal activity dashboard.",
        },
        {
          name: "PostgreSQL via Supabase",
          role: "Relational schema: users → listings → comments + upvotes, with foreign keys and joins powering the dashboard.",
        },
        {
          name: "Row-Level Security",
          role: "Declarative SQL policies scope every query to its owner — no auth checks in component code.",
        },
        {
          name: "Supabase Realtime",
          role: "WebSocket subscriptions on the comments table; new comments appear for all viewers without polling.",
        },
      ],
    },
    annotations: [
      {
        date: "2025",
        text: "RLS takes a while to click — you're writing security as database policy, not application logic. Once it does, it's elegant.",
      },
      {
        date: "2025",
        text: "Designing for real-time from the start is far easier than retrofitting it; adding live comments late forced a significant state refactor.",
      },
    ],
  },

  /* ── RP-2025-0002 · Lost & Found ───────────────────────────────── */
  {
    accession: "RP-2025-0002",
    slug: "lost-and-found",
    title: "Lost & Found",
    commonName: "track what matters, find it fast",
    description:
      "A cross-platform mobile app built in 48 hours at HackKU 2025 to report, search, and claim lost items with location context.",
    collectedAt: "HackKU",
    eventDate: "Apr 2025",
    year: 2025,
    locality: "Lawrence, KS",
    collectors: "R. Poudel et al. (team of 3)",
    method: "48-hr hackathon",
    substrate: ["React Native", "Expo", "Firebase", "Flask", "Python"],
    status: "exhibited",
    links: {
      devpost: "https://devpost.com",
    },
    fieldNotes: [
      "Campus lost-and-found runs on phone calls and bulletin boards. There's no way to search by location, time, or description — you just hope someone turned your thing in. We built the fix in 48 hours.",
      "Cross-platform was non-negotiable (lost items don't care about your phone OS), so React Native with Expo gave us one codebase. Firebase supplied real-time sync, which meant item status updates propagated to every client instantly.",
      "The Flask middleware was a deliberate architecture call: a clean REST surface we controlled, room for Python search and matching logic, and Firebase credentials kept server-side. We scoped ruthlessly — auth, item creation, location tagging, and search were the four pillars; everything else was cut.",
    ],
    dissection: {
      description:
        "Three layers: React Native client → Flask REST API → Firebase. The Flask layer owns business logic and credentials; Firestore provides real-time document sync.",
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
    annotations: [
      {
        date: "2025",
        text: "Firestore listeners fire often; debouncing UI updates was the difference between a live app and a flickering one.",
      },
      {
        date: "2025",
        text: "Ruthless scoping is a hackathon superpower — we cut a map view, chat, and push notifications, and shipped a tight working core instead.",
      },
    ],
  },

  /* ── RP-2024-0001 · Crafteako ──────────────────────────────────── */
  {
    accession: "RP-2024-0001",
    slug: "crafteako",
    title: "Crafteako",
    commonName: "where photography meets the web",
    description:
      "A hand-built photography and videography studio site — no frameworks, no build step, real client inquiries.",
    collectedAt: "field work, self-directed",
    eventDate: "2024 –",
    year: 2024,
    locality: "Lawrence, KS",
    collectors: "R. Poudel (solo)",
    method: "ongoing practice",
    substrate: ["HTML", "CSS", "JavaScript"],
    status: "live",
    links: {
      live: "https://crafteako.com",
      github: "https://github.com/rijulpoudel",
    },
    fieldNotes: [
      "Crafteako is the home for my photography and videography. Every portfolio template I looked at felt generic — sliders, grids, lightboxes — so I built the site from scratch to give the work its own visual language.",
      "No framework, deliberately. I'd been writing React for months and wanted to rediscover what frameworks actually abstract. CSS Grid, custom properties, and the animation API turned out to cover far more ground than expected.",
      "Photography sites are image-heavy by nature, so performance was a constraint from day one: lazy loading, responsive srcset sizing, and a Lightroom-to-Squoosh compression pipeline keep first load fast on slow connections.",
    ],
    dissection: {
      description:
        "A static site with no build step. Custom CSS for layout and theming; JavaScript only where paper can't do the job — lightbox, contact form, scroll observation.",
      components: [
        {
          name: "Hand-written HTML/CSS",
          role: "Custom grid layouts, hand-tuned design tokens via custom properties, zero utility classes.",
        },
        {
          name: "Vanilla JavaScript",
          role: "Gallery lightbox, Intersection Observer scroll reveals, and form handling — nothing else.",
        },
        {
          name: "Image pipeline",
          role: "Lightroom exports compressed with Squoosh, served with responsive srcset so each viewport gets the right size.",
        },
      ],
    },
    annotations: [
      {
        date: "2024",
        text: "Vanilla CSS is underrated: Grid, custom properties, and clamp() cover most of what a framework gives you, at zero runtime cost.",
      },
      {
        date: "2025",
        text: "Getting a photography site under 2MB first load while still looking right is a craft of its own — every step of the pipeline is a decision.",
      },
    ],
  },
];

export function getSpecimen(slug: string): Specimen | undefined {
  return specimens.find((s) => s.slug === slug);
}

/** Ledger order: newest accession first. */
export function ledgerOrder(): Specimen[] {
  return [...specimens].sort((a, b) => b.accession.localeCompare(a.accession));
}
