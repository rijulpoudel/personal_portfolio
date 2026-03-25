# Personal Portfolio Website — SPEC.md

> **Owner:** Rijul
> **Role:** Software Engineering Student
> **Design Direction:** Editorial Minimal — extreme whitespace, typographic hierarchy, monochrome + one accent
> **Aesthetic Inspiration:** kimeu-johnn.vercel.app, Brittany Chiang, Maxime Bonhomme

---

## 1. Design Philosophy

The site should feel like a well-typeset magazine spread, not a typical developer portfolio. Every section breathes. Content earns its space through restraint. The personality comes through _what_ you choose to show and _how little_ else is on the page.

**Core Principles:**

- Whitespace is the primary design element (60%+ of any viewport should be empty)
- Typography does the heavy lifting (no hero images, no flashy gradients)
- Monochrome palette with a single warm accent color
- Micro-interactions on hover/scroll, never gratuitous animation
- Content-first: every pixel serves readability or navigation

---

## 2. Tech Stack

| Layer      | Technology                                     | Rationale                                               |
| ---------- | ---------------------------------------------- | ------------------------------------------------------- |
| Framework  | **Next.js 15 (App Router)**                    | SSR/SSG, file-based routing, image optimization         |
| Language   | **TypeScript**                                 | Type safety across components                           |
| Styling    | **Tailwind CSS v4**                            | Utility-first, rapid iteration, easy whitespace control |
| Animation  | **Framer Motion**                              | Declarative scroll/enter animations, layout transitions |
| Content    | **MDX** via `@next/mdx` or `contentlayer2`     | Writings/blog posts as markdown with component support  |
| Fonts      | **Google Fonts** (self-hosted via `next/font`) | See typography section                                  |
| Icons      | **Lucide React**                               | Clean, minimal line icons                               |
| Deployment | **Vercel**                                     | Zero-config Next.js hosting, preview deploys            |
| Domain     | **Porkbun** or existing domain                 | Custom domain via Vercel                                |
| Analytics  | **Vercel Analytics** (optional)                | Privacy-friendly, built-in                              |

---

## 3. Color System

### Light Mode (Default)

```
--bg-primary:    #FAFAF8    (warm off-white, entire page background)
--bg-secondary:  #F2F1ED    (card surfaces, code blocks)
--text-primary:  #1A1A1A    (headings, body)
--text-secondary:#6B6B6B    (meta info, dates, descriptions)
--text-tertiary: #9C9C9C    (placeholders, hints)
--accent:        #E8593C    (warm red-orange, links, highlights, hover states)
--accent-muted:  #E8593C12  (accent at 7% opacity, hover backgrounds)
--border:        #E8E8E4    (subtle dividers)
```

### Dark Mode

```
--bg-primary:    #0E0E0E    (near-black)
--bg-secondary:  #1A1A1A    (card surfaces)
--text-primary:  #EDEDED    (headings, body)
--text-secondary:#8A8A8A    (meta info)
--text-tertiary: #5A5A5A    (hints)
--accent:        #F07052    (slightly lighter warm red-orange for dark bg)
--accent-muted:  #F0705215  (accent at 8% opacity)
--border:        #2A2A2A    (dividers)
```

**Rule:** The accent color is used sparingly. Links, the cursor dot (optional), active nav indicator, and one highlight per section max.

---

## 4. Typography

### Font Pairing

- **Display / Headings:** `Instrument Serif` (Google Fonts) — elegant, editorial feel
- **Body / UI:** `Geist` or `Satoshi` — clean geometric sans-serif
- **Mono (code blocks):** `Geist Mono` or `JetBrains Mono`

### Scale

```
--text-hero:     clamp(3rem, 8vw, 6rem)     / leading: 1.0
--text-h1:       clamp(2rem, 4vw, 3.5rem)   / leading: 1.1
--text-h2:       clamp(1.5rem, 3vw, 2rem)   / leading: 1.2
--text-h3:       1.25rem                      / leading: 1.3
--text-body:     1rem (16px)                  / leading: 1.7
--text-small:    0.875rem (14px)              / leading: 1.5
--text-caption:  0.75rem (12px)               / leading: 1.4  (dates, tags)
```

### Usage Rules

- Hero text: Instrument Serif, italic optional for name
- Section headings: Instrument Serif
- Body text, navigation, UI labels: Geist/Satoshi
- All caps ONLY for tiny labels (e.g., "SECTION", "2024", "FEATURED") at 12px with letter-spacing: 0.1em

---

## 5. Layout & Grid

### Global Container

```
max-width: 1200px
padding-inline: clamp(1.5rem, 5vw, 6rem)
margin-inline: auto
```

### Spacing System

```
--space-xs:  0.5rem   (8px)
--space-sm:  1rem     (16px)
--space-md:  2rem     (32px)
--space-lg:  4rem     (64px)
--space-xl:  8rem     (128px)
--space-2xl: 12rem    (192px)
```

**Between major sections:** `--space-xl` to `--space-2xl`
**Between items within a section:** `--space-md` to `--space-lg`

### Grid

- 12-column grid for desktop, collapse to single column on mobile
- Content rarely spans full width. Main content occupies 7-8 columns. Metadata/sidebar occupies 3-4 columns.
- Asymmetric layouts encouraged (e.g., left-aligned heading at col 1-4, body text at col 5-10)

---

## 6. Site Structure & Routing

```
/                       — Home (hero + brief intro + featured work)
/about                  — Extended bio, photo, philosophy
/projects               — Technical projects grid
/experience             — Work experience timeline
/skills                 — Skills/technologies
/writings               — Blog/article listing (MDX)
/writings/[slug]        — Individual article
/shelf                  — Books I've read (list or grid)
/cinema                 — Movie rankings
/side-projects          — Fun/personal side projects
/random                 — Miscellaneous (hobbies, interests, links)
```

### Navigation

- **Desktop:** Horizontal nav, top-right, text-only links. No hamburger. Fixed on scroll with subtle backdrop blur.
- **Mobile:** Slide-out drawer or bottom sheet. Text links stacked vertically.
- **Active state:** Accent color underline (2px) or dot indicator
- **Theme toggle:** Sun/moon icon, top-right corner, subtle

---

## 7. Page-by-Page Specifications

### 7.1 Home Page (`/`)

**Hero Section**

- Your name in `--text-hero`, Instrument Serif
- One-line descriptor below: "Software Engineering Student" in sans-serif, `--text-secondary`
- Optional: a short, punchy tagline (1 sentence max)
- CTA: subtle text link "See my work >" or scroll indicator
- The hero takes up 80-100vh with extreme whitespace
- No hero image. The typography IS the visual.

**Featured Work (below fold)**

- 2-3 selected projects in a minimal card layout
- Each card: project name (serif heading), one-line description, tech tags, arrow link
- Cards have generous padding, subtle border or bg-secondary surface
- Hover: slight lift or accent border-left appears

**Currently Section (optional)**

- A small "Now" or "Currently" blurb: what you're working on, learning, reading
- Keeps the site feeling alive and personal

**Footer**

- Minimal: links to GitHub, LinkedIn, email
- Copyright line
- "Built with Next.js" or similar (optional, very small)

---

### 7.2 About (`/about`)

- Large serif heading: "About"
- 2-3 paragraphs of bio in body text, max-width: 640px for comfortable reading line length
- Optional photo: small, rounded or not, positioned asymmetrically (e.g., offset to the right in a larger whitespace area)
- Education mention: KU, CS/Engineering
- Interests: photography/videography (Crafteako), tech, etc.
- Links to relevant profiles inline

---

### 7.3 Projects (`/projects`)

**Layout:** Grid of project cards (2 columns desktop, 1 mobile)

**Each Project Card:**

- Project name (serif, h3)
- One-line description (sans, secondary color)
- Tech stack tags (small pills: "Next.js", "Python", "React")
- Status indicator: "Live" (green dot), "In Progress" (amber dot), "Archived" (gray)
- Links: GitHub repo, live demo (if applicable)
- Hover: subtle background change or border accent

**Project Detail (optional, could be expandable or separate page):**

- Problem statement
- Approach/solution
- Key learnings
- Screenshots or demo GIF (optional, minimal)

---

### 7.4 Experience (`/experience`)

**Layout:** Vertical timeline, left-aligned

**Each Entry:**

- Role title (serif, bold)
- Company/org name (sans, secondary)
- Date range (caption size, tertiary)
- 2-3 bullet descriptions
- Subtle connecting line between entries (1px, border color)

---

### 7.5 Skills (`/skills`)

**Approach:** Grouped by category, NO skill bars or percentages. Just clean lists.

**Categories:**

- Languages (Python, TypeScript, Java, C, SQL, etc.)
- Frameworks & Libraries (Next.js, React, Tailwind, etc.)
- Tools & Platforms (Git, Docker, Vercel, VS Code, etc.)
- Concepts (OS, Networking, Databases, Security, etc.)

**Visual:** Each category as a heading, technologies as inline tags/pills or a simple comma-separated list. Minimal, honest. No "95% proficiency" nonsense.

---

### 7.6 Writings (`/writings`)

**Layout:** Simple list, sorted by date (newest first)

**Each Entry:**

- Title (serif, linked)
- Date (caption, tertiary)
- Optional: 1-line excerpt or reading time
- No thumbnails. Text-only listing.

**Individual Post (`/writings/[slug]`):**

- MDX rendered with custom components
- max-width: 680px for body text (optimal reading width)
- Code blocks styled with syntax highlighting (Shiki or Prism)
- Table of contents (optional, floating sidebar on desktop)

---

### 7.7 Shelf / Books (`/shelf`)

**Layout:** Simple list or minimal grid

**Each Book:**

- Title (bold)
- Author (secondary)
- Optional: year read, one-line note/rating (star count or just "Loved it")
- Optional: group by year

**Data Source:** JSON/MDX file, easily editable

---

### 7.8 Cinema / Movies (`/cinema`)

**Layout:** Ranked list or tier-based grouping

**Options:**

- Simple numbered list (1. Movie Name — Year — one-line take)
- Tier grouping: "S Tier", "A Tier", "B Tier" etc. with movies listed under each
- Optional: genre tags

**Data Source:** JSON file, easily editable

---

### 7.9 Side Projects (`/side-projects`)

- Similar to projects but more casual tone
- Include fun/experimental stuff
- Each: name, one-liner, link if available
- Less structured than main projects

---

### 7.10 Random (`/random`)

- Freeform section for personality
- Could include: favorite tools, playlists, quotes, photos, links to things you like
- Think of it as a digital garden / link dump
- Low structure, high personality

---

## 8. Components Library

### Global Components

- `<Navbar />` — fixed top nav with theme toggle
- `<Footer />` — minimal footer with links
- `<PageHeader />` — consistent section title treatment
- `<ThemeProvider />` — dark/light mode context
- `<MDXComponents />` — custom renderers for MDX content

### Shared Components

- `<ProjectCard />` — reusable project display
- `<TimelineEntry />` — experience timeline item
- `<Tag />` — small pill for tech stack / categories
- `<ExternalLink />` — link with arrow icon, opens new tab
- `<BookEntry />` — shelf list item
- `<MovieEntry />` — cinema list item
- `<Divider />` — subtle horizontal rule (1px, border color, generous margin)

### Animation Patterns (Framer Motion)

- **Page enter:** fade-in + slight upward translate (y: 20 -> 0, opacity: 0 -> 1, duration: 0.5s)
- **Stagger children:** each child delays 0.05-0.1s after the previous
- **Scroll reveal:** elements animate in when they enter viewport (IntersectionObserver or Framer's `whileInView`)
- **Hover states:** scale(1.02) on cards, color transition on links
- **Page transitions:** crossfade between routes (via layout animations or Next.js view transitions)

---

## 9. Responsive Breakpoints

```
sm:  640px    (mobile landscape)
md:  768px    (tablet)
lg:  1024px   (desktop)
xl:  1280px   (large desktop)
```

**Mobile-first approach.** Default styles are mobile. Layer up with `md:` and `lg:` prefixes.

**Key responsive behaviors:**

- Navigation collapses to drawer/sheet below `md`
- Project grid goes from 1 col to 2 col at `md`
- Section spacing reduces by ~30% on mobile
- Hero font size scales via `clamp()`
- Reading width maxes out at 680px regardless of screen size

---

## 10. Performance Targets

- Lighthouse: 95+ across all categories
- First Contentful Paint: < 1.2s
- Total page weight: < 500KB (excluding images)
- Self-host fonts (next/font) to avoid layout shift
- Use `next/image` for any images with proper sizing
- Prefetch links on hover for instant navigation feel

---

## 11. Content Data Structure

### Projects (`/data/projects.ts`)

```typescript
interface Project {
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
```

### Experience (`/data/experience.ts`)

```typescript
interface Experience {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // undefined = "Present"
  description: string[];
  techStack?: string[];
}
```

### Books (`/data/books.ts`)

```typescript
interface Book {
  title: string;
  author: string;
  yearRead: number;
  note?: string;
  rating?: number; // 1-5
}
```

### Movies (`/data/movies.ts`)

```typescript
interface Movie {
  title: string;
  year: number;
  tier: "S" | "A" | "B" | "C" | "D";
  genre?: string[];
  note?: string;
}
```

---

## 12. SEO & Meta

- Dynamic `<title>` and `<meta description>` per page via Next.js Metadata API
- Open Graph images (auto-generated or custom per page)
- `robots.txt` and `sitemap.xml` via Next.js conventions
- Structured data (JSON-LD) for person schema on home page
- Canonical URLs on all pages

---

## 13. File Structure

```
├── app/
│   ├── layout.tsx              # Root layout (fonts, theme, nav, footer)
│   ├── page.tsx                # Home
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── skills/page.tsx
│   ├── writings/
│   │   ├── page.tsx            # Listing
│   │   └── [slug]/page.tsx     # Individual post
│   ├── shelf/page.tsx
│   ├── cinema/page.tsx
│   ├── side-projects/page.tsx
│   └── random/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageHeader.tsx
│   ├── ui/
│   │   ├── ProjectCard.tsx
│   │   ├── TimelineEntry.tsx
│   │   ├── Tag.tsx
│   │   ├── ExternalLink.tsx
│   │   ├── BookEntry.tsx
│   │   ├── MovieEntry.tsx
│   │   └── Divider.tsx
│   └── mdx/
│       └── MDXComponents.tsx
├── content/
│   └── writings/               # MDX files for blog posts
│       ├── my-first-post.mdx
│       └── ...
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   ├── books.ts
│   ├── movies.ts
│   └── siteConfig.ts           # Global site metadata
├── lib/
│   ├── mdx.ts                  # MDX processing utilities
│   └── utils.ts                # Shared helpers
├── styles/
│   └── globals.css             # Tailwind directives + CSS variables
├── public/
│   ├── fonts/                  # Self-hosted font files
│   └── og/                     # OG images
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 14. Deployment Checklist

- [ ] Vercel project linked to GitHub repo
- [ ] Custom domain configured (DNS via Porkbun or registrar)
- [ ] Environment variables set (if any)
- [ ] OG images generated for all pages
- [ ] Lighthouse audit passes (95+ all categories)
- [ ] Mobile testing on real devices
- [ ] Dark/light mode tested thoroughly
- [ ] All links working, no 404s
- [ ] RSS feed for writings (optional)
- [ ] Analytics enabled (optional)
