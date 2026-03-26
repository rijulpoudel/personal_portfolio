export interface ArchitectureComponent {
  name: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tagline?: string;
  overview?: string;
  coverGradient: string;
  techStack: string[];
  status: "live" | "in-progress" | "archived";
  githubUrl?: string;
  liveUrl?: string;
  devpostUrl?: string;
  featured: boolean;
  year: number;
  timeline?: string;
  teamSize?: number;
  thoughtProcess?: string[];
  architecture?: {
    description: string;
    components: ArchitectureComponent[];
  };
  keyLearnings?: string[];
}

export const projects: Project[] = [
  {
    slug: "lost-and-found",
    title: "Lost & Found",
    tagline: "Track what matters, find it fast.",
    description:
      "A cross-platform mobile app built in 48 hours at HackKU 2025 to track lost items by name and location.",
    overview:
      "Lost & Found solves a real, frustrating problem — campus lost-and-found systems are manual, slow, and location-unaware. We built a full-stack cross-platform app in 48 hours that lets anyone report, search, and claim items with location context. Shipped as a functional MVP with a 3-person team.",
    coverGradient:
      "linear-gradient(145deg, #1a0a06 0%, #4d1e0d 55%, #8b3520 100%)",
    techStack: ["React Native", "Expo", "Firebase", "Flask", "Python"],
    status: "in-progress",
    devpostUrl: "https://devpost.com",
    featured: true,
    year: 2025,
    timeline: "48 hours — HackKU 2025",
    teamSize: 3,
    thoughtProcess: [
      "The idea started from a genuine pain point: campus lost-and-found offices rely on phone calls and bulletin boards. There's no way to search by location, time, or description — you just hope someone turned it in. We wanted to fix that.",
      "We decided early on to go cross-platform (iOS + Android) because lost items don't care about your phone OS. React Native with Expo let us move fast without maintaining two codebases. Firebase gave us real-time sync out of the box, which meant multiple people could update item status and see changes immediately.",
      "The Flask middleware layer was a deliberate architectural choice. It gave us a clean REST API surface we controlled, let us add Python-powered search/matching logic without coupling it to the client, and kept Firebase credentials server-side only. We scoped ruthlessly — auth, item creation, location tagging, and search were the four pillars. Everything else was cut.",
    ],
    architecture: {
      description:
        "A three-layer architecture: React Native client → Flask REST API → Firebase backend. The Flask layer handles business logic and keeps Firebase credentials off the client; Firestore provides real-time document sync; Firebase Storage holds item photos.",
      components: [
        {
          name: "React Native (Expo)",
          role: "Cross-platform mobile UI. Handles item listing, search UI, camera capture, and real-time updates via Firestore listeners.",
        },
        {
          name: "Flask REST API",
          role: "Python middleware that exposes clean endpoints for item CRUD and location-based search. Validates inputs and manages Firebase Admin SDK calls server-side.",
        },
        {
          name: "Firebase Firestore",
          role: "NoSQL real-time database storing item documents (name, description, location, status, timestamps). Real-time listeners push updates to all clients instantly.",
        },
        {
          name: "Firebase Storage",
          role: "Stores item photos uploaded from the mobile app. URLs are saved in Firestore documents and served via CDN.",
        },
        {
          name: "Firebase Auth",
          role: "Handles user authentication. Anonymous auth for quick item reporting; full auth for claiming and managing your reported items.",
        },
      ],
    },
    keyLearnings: [
      "Real-time sync with React Native requires disciplined state management — Firestore listeners can fire frequently and you need to debounce UI updates or you get jarring re-renders.",
      "The Flask middleware added ~50ms latency per request but the tradeoff was worth it: server-side validation, clean API contract, and the ability to add Python ML logic without touching the mobile client.",
      "Scoping ruthlessly is a hackathon superpower. We cut a map view, chat between users, and push notifications. Shipping a tight, working core beats a sprawling half-built product every time.",
      "Expo's OTA updates meant we could push fixes during the demo period without going through the App Store — a genuine competitive advantage at a hackathon.",
    ],
  },

  {
    slug: "bizboard",
    title: "Bizboard",
    tagline: "A marketplace built for builders.",
    description:
      "A full-stack marketplace where entrepreneurs create, discover, and engage with service listings — built as a CodePath Web 102 final project.",
    overview:
      "Bizboard is a service marketplace for entrepreneurs and freelancers. Users can list services, browse offerings by category, leave comments, upvote listings they find valuable, and track activity through a personal dashboard. Built with React and Supabase, it demonstrates real-time CRUD, row-level security, and full responsive design.",
    coverGradient:
      "linear-gradient(145deg, #060f0a 0%, #0e2d1a 55%, #1a4a2e 100%)",
    techStack: ["React", "Supabase", "CSS", "PostgreSQL"],
    status: "live",
    githubUrl: "https://github.com/rijulpoudel",
    featured: true,
    year: 2025,
    timeline: "8 weeks — CodePath Web 102",
    teamSize: 1,
    thoughtProcess: [
      "For the CodePath final project I wanted to build something I'd actually use, not a todo app. Service marketplaces have real complexity: auth, ownership, real-time interactions, filtering, and activity tracking. That made it a good forcing function for everything the course covered.",
      "Supabase was the right call for a solo project. PostgreSQL under the hood meant proper relational modeling — listings, users, comments, and upvotes as linked tables, not a flat NoSQL blob. Row-level security (RLS) meant I could write security policies declaratively in SQL rather than scattering auth checks through my React components.",
      "The dashboard was the hardest piece. Aggregating upvotes, comment counts, and view activity per listing in real time required careful query design. I ended up using Supabase's real-time subscriptions for live comment feeds and polling for dashboard metrics — a deliberate tradeoff between freshness and complexity.",
    ],
    architecture: {
      description:
        "A React single-page application communicating directly with Supabase. Row-level security policies in PostgreSQL enforce data ownership. Real-time subscriptions power the comment feed.",
      components: [
        {
          name: "React SPA",
          role: "Component-based UI covering listing creation, browsing, search, filtering, comments, and the personal activity dashboard.",
        },
        {
          name: "Supabase Auth",
          role: "Email/password authentication with session management. User identity flows through to RLS policies so every DB query is automatically scoped to the right owner.",
        },
        {
          name: "PostgreSQL (via Supabase)",
          role: "Relational schema: users → listings → comments + upvotes. Foreign key constraints and join queries power the activity dashboard.",
        },
        {
          name: "Row-Level Security (RLS)",
          role: "Declarative SQL policies that ensure users can only modify their own listings and comments — no auth logic in React components.",
        },
        {
          name: "Supabase Realtime",
          role: "WebSocket-based subscriptions on the comments table. New comments appear instantly for all viewers of a listing without polling.",
        },
      ],
    },
    keyLearnings: [
      "Supabase RLS is genuinely powerful but the mental model takes time — you're writing security as database policy, not application logic. Once it clicks, it's elegant.",
      "Good filter UX is harder than it looks. Combining search text, category, price range, and sort order in a way that feels instant required debouncing inputs and pre-computing filter combinations.",
      "Designing for real-time from the start is easier than retrofitting it. I added real-time comments late and had to refactor my state management significantly.",
      "Solo full-stack projects clarify how much product surface area a single person can realistically own. Scope decisions become very concrete when you're the designer, developer, and tester.",
    ],
  },

  {
    slug: "aawaj",
    title: "Aawaj",
    tagline: "Social media owned by no one.",
    description:
      "A decentralized social media platform where posts are immutable on-chain — built with Next.js and Solidity at the Midwest Blockathon.",
    overview:
      "Aawaj (Nepali for 'voice') is a proof-of-concept for censorship-resistant social media. Posts are written to a Solidity smart contract on an Ethereum testnet, making them permanently readable by anyone and modifiable by no one. Users authenticate with MetaMask instead of a password. Built at the Midwest Blockathon.",
    coverGradient:
      "linear-gradient(145deg, #0d0d1a 0%, #1a1040 55%, #2d1b69 100%)",
    techStack: ["Next.js", "Solidity", "Tailwind CSS", "Ethereum", "MetaMask"],
    status: "live",
    githubUrl: "https://github.com/rijulpoudel/midwest_blockathon_awaj",
    featured: true,
    year: 2026,
    timeline: "Hackathon",
    thoughtProcess: [
      "The premise is simple and uncomfortable: every social media platform that exists today can delete your posts, ban your account, or shut down entirely. We wanted to explore what it looks like if that's architecturally impossible.",
      "We chose Solidity + Ethereum testnet because it gave us a real, decentralized execution environment without real money at stake. MetaMask as the auth layer was a natural fit — your wallet IS your identity, no email or password required.",
      "The biggest design question was what to put on-chain. Writing every post directly to the contract is expensive in gas. For the hackathon we kept it simple — posts go on-chain, media is an optional IPFS link. A production version would use a hybrid model: on-chain identity and content hashes, off-chain content storage.",
    ],
    architecture: {
      description:
        "A Next.js frontend talks to a Solidity smart contract via ethers.js. MetaMask handles wallet connection and transaction signing. All post data lives on the Ethereum testnet.",
      components: [
        {
          name: "Next.js Frontend",
          role: "Renders the feed, post creation form, and user profiles. Reads contract state directly via ethers.js provider. No traditional backend.",
        },
        {
          name: "Solidity Smart Contract",
          role: "Stores posts as structs (author address, content, timestamp) in a mapping. Emits events on new posts. Deployed to Sepolia testnet.",
        },
        {
          name: "ethers.js",
          role: "JavaScript library bridging the Next.js app to the Ethereum node. Handles ABI encoding, transaction construction, and event listening.",
        },
        {
          name: "MetaMask",
          role: "Browser wallet that acts as both the auth layer (connect wallet = log in) and the transaction signer. Users pay testnet gas to post.",
        },
      ],
    },
    keyLearnings: [
      "Gas costs make frequent writes prohibitive on mainnet. A hybrid model — on-chain identity + off-chain content with an on-chain content hash — is the practical architecture for a real product.",
      "Wallet UX is still a significant barrier to adoption. MetaMask is familiar to crypto users but intimidating to everyone else. Walletconnect and embedded wallets are improving this.",
      "Reading blockchain state is free and fast; writing is slow and costs money. Design patterns that minimize writes and batch operations where possible are essential.",
      "Smart contracts are immutable once deployed. This is the feature — but it means you need to design upgrade paths carefully, or accept that bugs are permanent.",
    ],
  },

  {
    slug: "crafteako",
    title: "Crafteako",
    tagline: "Where photography meets the web.",
    description:
      "A hand-crafted photography and videography portfolio site — built from scratch with vanilla HTML, CSS, and JavaScript.",
    overview:
      "Crafteako is my creative outlet for photography and videography work. I built the site entirely from scratch — no frameworks, no build tools — to deeply understand how the web works at the fundamentals level. The result is a fast, visually distinctive site that attracted real client inquiries.",
    coverGradient:
      "linear-gradient(145deg, #0f0a04 0%, #2e1f0a 55%, #4a3014 100%)",
    techStack: ["HTML", "CSS", "JavaScript"],
    status: "live",
    githubUrl: "https://github.com/rijulpoudel",
    featured: false,
    year: 2024,
    timeline: "Ongoing",
    teamSize: 1,
    thoughtProcess: [
      "I wanted a home for my photography that felt as intentional as the photos themselves. Every portfolio template I looked at felt generic — sliders, grids, lightboxes. I wanted something that had its own visual language.",
      "I deliberately chose not to use a framework. I'd been writing React for months and wanted to rebuild my understanding of what frameworks actually abstract away. Vanilla HTML and CSS turned out to be more capable than I expected — CSS Grid, custom properties, and the animation API go a long way.",
      "Performance was a core constraint from the start. Photography sites are image-heavy. I spent significant time on lazy loading, responsive image sizing, and compression pipelines so the site loads fast even on slower connections.",
    ],
    architecture: {
      description:
        "A static site with no build step. Custom CSS handles layout, animations, and theming. JavaScript is used sparingly — only for the gallery lightbox, contact form, and scroll-triggered animations.",
      components: [
        {
          name: "HTML/CSS Layout",
          role: "Custom grid-based layouts for the gallery and project pages. CSS custom properties for theming. No utility classes — all design tokens are hand-tuned.",
        },
        {
          name: "JavaScript (Vanilla)",
          role: "Minimal JS for gallery lightbox, smooth scroll, intersection observer for scroll animations, and form submission handling.",
        },
        {
          name: "Image Pipeline",
          role: "Photos exported from Lightroom at specific dimensions and compressed with Squoosh. Responsive srcset attributes ensure the right image size loads for each viewport.",
        },
        {
          name: "Contact System",
          role: "Form submission handled via a simple serverless endpoint. Replies land in email without exposing the address to scrapers.",
        },
      ],
    },
    keyLearnings: [
      "Vanilla CSS is genuinely underrated. CSS Grid, custom properties, and clamp() cover the vast majority of what a CSS framework gives you, with zero overhead.",
      "Intersection Observer is the right tool for scroll animations — performant, declarative-ish, and no scroll event listeners thrashing the main thread.",
      "Image optimization is a craft. Getting a photography site under 2MB on first load while still looking stunning requires intentional decisions at every step of the pipeline.",
      "Building without a framework is a great exercise even if you wouldn't do it for a production app. It revealed exactly what React is solving and why.",
    ],
  },
];
