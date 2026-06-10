# IDEA: "The Collection" — A Portfolio as a Natural History Catalog

> Working title: **CATALOG OF WORK — R. POUDEL, COLLECTOR**
> One sentence: Your portfolio becomes a museum specimen collection, and every project,
> photo, and job is a cataloged specimen with an accession number, a typeset label,
> and a paper trail — because you literally build collections software for a living.

---

## 1. The Thesis

Every student portfolio in 2026 looks the same: serif hero name, two-sentence bio,
three project cards with gradient covers, a skills row of colored icons, dark mode
toggle. Yours currently is a *tasteful* version of that — but tasteful-generic is
still generic. A recruiter who sees 200 portfolios a week cannot tell yours from the
other 40 built with the same minimal-editorial aesthetic.

The only durable way to be different is to build the site around something **true
about you that nobody else has**. You have three such things:

1. **You write software for the Specify Collections Consortium** — the team at the
   KU Biodiversity Institute that builds collection-management software used by
   natural history museums worldwide. Specimen catalogs, accession numbers,
   taxonomy, label data. This is your day job.
2. **You're a working photographer** (Crafteako) — you have real visual assets and
   a trained eye, which most CS students do not.
3. **You're from Kathmandu** and your projects carry Nepali names (Aawaj = voice,
   Didi = older sister). You have a bilingual identity you've never used visually.

The concept: **present your work the way a natural history museum presents
specimens.** Not as a gimmick skin — as the actual information architecture. Each
project is a *specimen*: collected at a specific event, on a specific date, at a
specific locality, identified by an accession number, documented with a typeset
label, annotated over time as it evolves.

Why this wins:

- **It's self-demonstrating.** The site's entire design language proves you
  understand the domain you work in. When the Specify team sees it, it reads as
  love for the craft. When any other employer sees it, it reads as "this person
  thinks in data models and information design."
- **It's uncopyable.** Anyone can steal a layout. Nobody else can credibly present
  their work as a collections catalog, because nobody else works at a collections
  consortium.
- **It's not a metaphor pasted on top — it's a schema.** Specimens have fields:
  catalog number, collector, date, locality, determination history. Projects map
  onto those fields *perfectly* (see §4). The metaphor does real IA work.
- **It photographs well.** This is a site people screenshot and share. That's how
  portfolios travel.

---

## 2. Autopsy of the Current Site (honest)

What exists: warm paper background, Instrument Serif italic hero, orange accent,
project cards with CSS gradients, skill chips with brand-colored icons, timeline.

- Instrument Serif + cream background + single warm accent is *the* default
  AI-generated aesthetic of 2025–26. v0, Lovable, and Claude artifacts all emit it.
  Reviewers now pattern-match it to "prompted, not designed."
- Gradient placeholder covers say "I had no real imagery" — fatal for someone who
  is *a photographer*.
- Skill chips with rainbow brand icons are the #1 student-portfolio cliché and
  communicate nothing (everyone lists React, Git, Docker).
- The content underneath is actually good — `data/projects.ts` already has
  thought-process, architecture, and learnings sections that are far deeper than
  most portfolios. The problem is packaging, not substance. **Keep the data,
  replace the world it lives in.**

---

## 3. The Concept, Walked Through

Imagine a recruiter lands on the site. Instead of a hero section, they see the
cover sheet of an archival catalog:

```
─────────────────────────────────────────────────────────────
                    UNIVERSITY OF KANSAS · LAWRENCE
                CATALOG OF WORK, SOFTWARE & OBSERVATIONS

                         RIJUL POUDEL
                      collector & engineer
                       काठमाडौँ → Lawrence, KS

           Software Developer, Specify Collections Consortium
                  B.S. Computer Science, KU — 2027

   ACCESSIONS: 14        LAST FIELD ACTIVITY: 3 days ago
─────────────────────────────────────────────────────────────
   [ Open the Ledger ↓ ]        [ Résumé (PDF) ]   [ GitHub ]
─────────────────────────────────────────────────────────────
```

Scrolling opens the **Accession Ledger** — the heart of the site. Not project
cards: a dense, beautiful, monospace *table*, like a museum's accession book:

```
 ACC. NO.        SPECIMEN          COLLECTED AT             DATE      LOCALITY        STATUS
 ────────────────────────────────────────────────────────────────────────────────────────────
 RP-2026-0007 ●  Aawaj · आवाज      Midwest Blockathon       Feb 2026  St. Louis, MO   ★ WINNER
 RP-2026-0006    Lucid AI          DevFest WashU            Feb 2026  St. Louis, MO   exhibited
 RP-2026-0005    Didi · दिदी       NLN Hackathon            Jan 2026  remote          exhibited
 RP-2025-0004    Lost & Found      HackKU                   Apr 2025  Lawrence, KS    exhibited
 RP-2025-0003    Bizboard          CodePath Web 102         Aug 2025  remote          live
 RP-2024-0002    Crafteako         field work, self         2024–     Lawrence, KS    live
 RP-2024-0001    bimarshapoudel    first specimen           2024      Kathmandu       archived
```

Hovering a row lifts a small **specimen label** preview (the typeset card from §6).
Clicking opens the full **Specimen Sheet** for that project.

The ledger is *faster to scan than cards* — a recruiter sees seven projects, their
contexts, and their dates in two seconds. The metaphor and the usability point the
same direction. That's the test every idea below has to pass.

One project — your best (currently **Aawaj**, the Blockathon winner) — is the
**holotype**: in real collections, the single specimen that defines a species gets
a red label. Aawaj's row gets the red dot; its sheet gets the red `HOLOTYPE` label
bar. One red thing on the entire site. That's your "look here first."

---

## 4. The Schema (why this isn't just a skin)

Map your existing `Project` type onto **Darwin Core** — the real-world data
standard for biodiversity specimens, the same standard Specify speaks. This is the
deepest flex available to you: your portfolio's data layer literally implements
your employer's domain standard.

| Darwin Core field   | Portfolio meaning                          | Source (already have) |
|---------------------|--------------------------------------------|------------------------|
| `catalogNumber`     | Accession no. (`RP-2026-0007`)             | new, derived           |
| `scientificName`    | Project name (+ Nepali name where real)    | `title`                |
| `recordedBy`        | "R. Poudel" + team size                    | `teamSize`             |
| `eventDate`         | When built                                 | `year` / `timeline`    |
| `samplingProtocol`  | "48-hour hackathon", "8-week course", etc. | `timeline`             |
| `locality`          | Where (HackKU → Lawrence, KS)              | new, small             |
| `identificationRemarks` | The thought-process narrative          | `thoughtProcess`       |
| `associatedReferences`  | GitHub / Devpost / live links          | existing URLs          |
| `dynamicProperties` | Tech stack, architecture                   | `techStack`, `architecture` |

Then ship **`/api/collection`** — a public JSON endpoint returning the whole
portfolio as Darwin-Core-flavored records. Put one line in the site footer:

> `curl rijulpoudel.com/api/collection` — this catalog is machine-readable.

Engineers will curl it. The Specify team will recognize it instantly. No student
portfolio on earth has this.

---

## 5. Visual Language

**Reference material (study these, steal from these):** herbarium sheets, KU
Biodiversity Institute specimen drawers, 19th-century accession ledgers, archival
finding aids, typed determination labels layered over engraved ones. Real specimen
labels are a *collage of eras* — engraved institutional header, typewriter body,
handwritten determination, rubber stamp. That layered-time texture is the look.

### Type (two families, three voices)
- **Institutional voice** — a sturdy text serif in letterspaced SMALL CAPS for
  headers and section titles. Use **Source Serif 4** (has true small caps via
  `font-variant-caps`). NOT Instrument Serif — retire it; it's the slop signature.
- **Typewriter voice** — **Courier Prime** for all label data, metadata, the
  ledger, accession numbers, dates. This replaces your current mono. It must look
  *typed*, not *coded*.
- **Reading voice** — Source Serif 4 regular, 1.05–1.125rem, line-height 1.7, for
  narrative passages (thought process, about, writings). No sans-serif anywhere.
  Paper documents don't use Inter.

### Color (semantic, not decorative)
```
--paper:        #F2EDE3   aged specimen-sheet off-white (warmer than current)
--paper-deep:   #E8E1D2   recessed surfaces, drawer interiors
--ink:          #26221E   iron-gall ink, all text
--ink-faded:    #6E6557   secondary text — faded typewriter ribbon, not gray
--rule:         #C9BFA8   ledger rules and label borders (lines are ALLOWED now —
                          ledgers are made of lines; thin 1px, always this color)
--type-red:     #A8231D   ONLY for the holotype + winner marks. Nothing else. Ever.
--stamp-violet: #5B4E8C   ONLY for rubber-stamp elements (old stamp-pad ink)
```
No dark mode toggle. Instead, an optional **"storage lighting"** mode: the same
paper at low amber illumination (`#171411` bg, warm dim text) — like collection
storage with the lights off. Label it `STORAGE` / `READING ROOM` in the footer,
typewriter caps. A dark mode that's in character beats a default one.

### Texture & depth
- Extremely subtle paper grain on `--paper` (a 2–3% noise SVG, NOT a parchment JPG).
- Specimen labels get a 1px `--rule` border and a soft 1–2px offset shadow — a
  card *lying on* paper, not floating in space. No blur-heavy "ambient" shadows.
- Rubber-stamp elements (status marks, the EXAMINED stamp) render slightly rotated
  (−2° to 1°, deterministic per item, e.g. hash of slug — not random) with a
  CSS mask for partial ink coverage.
- Photography is the *only* full-bleed imagery. Everything else lives in labels
  and ledgers. Contrast between dense typed matter and one huge photograph is the
  page rhythm.

---

## 6. Page-by-Page

### `/` — Cover sheet + Accession Ledger
As in §3. Below the ledger, two short strips:
- **CURRENT DEPOSIT** — a single wide label for the Specify job (see Experience).
- **RECENT FIELD ACTIVITY** — last 3 GitHub events pulled at build time
  ("2026-06-06 — 3 commits to specify7", typewriter, one line each). Proof of life
  without a contribution graph (which is also now a cliché).

### `/specimen/[slug]` — the Specimen Sheet (replaces project pages)
The page IS a sheet. Layout mimics a herbarium mount:
- Top-left: engraved-style institutional header ("CATALOG OF WORK — R. POUDEL").
- Body: screenshots/demo video mounted like a pressed specimen — straight,
  generous margins, thin rule frame. (Take REAL screenshots. Gradient covers die.)
- Bottom-right (herbarium convention): the **determination label** —

```
┌──────────────────────────────────────────────┐
│  CATALOG OF WORK · R. POUDEL, COLLECTOR      │
│                                              │
│  No. RP-2026-0007            ★ HOLOTYPE      │
│                                              │
│  Aawaj — आवाज  ("voice")                     │
│  civic issue reporting, on-chain             │
│                                              │
│  Collected:  Midwest Blockathon, Feb 2026    │
│  Locality:   St. Louis, MO                   │
│  Collectors: R. Poudel et al. (team of 4)    │
│  Method:     36-hr hackathon                 │
│  Substrate:  React · Solidity · Polygon ·    │
│              IPFS (Pinata) · ethers.js       │
│                                              │
│  det. Best Beginner Track — WINNER           │
│  det. Best Hack Built with Antigravity       │
└──────────────────────────────────────────────┘
```

- Your existing `thoughtProcess` → **"Field Notes"** section (reading voice, the
  long-form narrative — this content is already strong).
- `architecture` → **"Dissection"** — keep your component breakdown, retitle it.
- `keyLearnings` → **annotation labels**: small dated slips appended below the
  main label, exactly like re-determination slips on old sheets. When you update
  a project, you don't edit history — you *add an annotation*. ("ann. 2026-05:
  migrated storage to IPFS pinning service. — R.P.") This makes maintenance a
  feature: the sheet accumulates history.

### `/experience` — Deposits & Determinations
Each role as a wide ledger entry. **Specify Collections Consortium goes first and
biggest** — and here's the second uncopyable asset: **Specify 7 is open source.**
Link your actual merged PRs on `github.com/specify/specify7` as they accumulate:

```
DEPOSIT — Specify Collections Consortium, KU Biodiversity Institute
Software Developer · Jun 2026 –
Collections-management software used by natural history museums in 50+ countries.
Django/Python · React/TypeScript · MySQL
  ann. PR #xxxx — <merged contribution>          [link]
  ann. PR #xxxx — <merged contribution>          [link]
```

A student whose experience section contains *merged PRs into 20-year-old
production scientific software* needs no skill chips. Delete the skills section
entirely; the substrate lines on every label already enumerate your stack in
context.

### `/observations` — photography (replaces generic gallery thinking)
Crafteako work presented as **field observations**: full-bleed photo, then a
typed observation label — date, locality, camera body, lens, exposure (pull EXIF
at build time: that's collection data you already own). This is where the site
breathes; the ledger is dense, this page is air. Link out to Crafteako as the
"complete field archive."

### `/field-notes` — writings
Your existing writings page, restyled as a notebook: numbered entries, dateline
first ("Lawrence, KS — 2026-06-09 —"), reading voice. Writing about Specify
domain problems (taxonomy trees, label data, scientific data modeling) would be
the highest-leverage blog content a museum-software developer can produce.

### `/about` — the Collector's Biography
Written as an archival finding-aid biography, third-person small-caps header,
first-person body:

> **POUDEL, RIJUL** (b. Kathmandu, Nepal). Collector active Lawrence, Kansas,
> 2023–. Fields: web systems, collections software, photography.
>
> I build software for the people who keep the world's natural history…

Include the shelf/cinema content here as **"Specimens kept for personal study"** —
one compact ledger of books & films (fold `/shelf` and `/cinema` into this; see
§9 cuts).

### `404` — "SPECIMEN NOT FOUND. Possibly out on loan. → Return to ledger."

---

## 7. Signature Details (the screenshot-bait, ranked)

1. **The EXAMINED stamp.** First time a visitor opens any specimen sheet, a
   violet rubber stamp thunks onto the label: `EXAMINED — 09 JUN 2026` (their
   date, localStorage). One 250ms scale+settle animation, slight rotation, ink
   bleed. Revisits show it already stamped. People will share this.
2. **The holotype.** One red label in the whole site. Restraint reads as taste.
3. **`/api/collection`** + the curl line in the footer. (§4)
4. **Print stylesheet.** `Cmd+P` on any specimen sheet outputs a perfectly
   typeset 4×6 catalog card. Footer: "This catalog is designed to be printed."
   Recruiters can print your projects as index cards. Nobody does this.
5. **Annotation slips** as the update mechanism. (§6)
6. **Accession numbers everywhere** — even the colophon and the résumé PDF link
   get one. Consistency makes the world believable.
7. **Devanagari subtitles** where real (Aawaj · आवाज, Didi · दिदी, Kathmandu ·
   काठमाडौँ). Never decorative — only where the name is actually Nepali.
8. **Works without JavaScript.** It's a paper archive; paper doesn't need JS.
   RSC + plain HTML, the stamp being the only progressive enhancement. State it
   in the colophon. (Also: Lighthouse 100s, sub-50KB JS — put the numbers there.)

## 8. Motion Rules (anti-slop enforcement)

Paper doesn't animate. Allowed, in full:
- Ledger row hover: background warms to `--paper-deep`, label preview fades in 120ms.
- The stamp (once per page, ever).
- Drawer-style slide for the mobile nav (a drawer is in-world).

Banned outright: parallax, scroll-jacking, cursor followers, particle fields,
typing effects, skeleton shimmer, gradient meshes, glassmorphism, tilt-on-hover,
spring physics, page-transition wipes, AOS-style fade-up-on-scroll for every
section. If a motion idea isn't something paper or a stamp can do, it's out.

## 9. What to Cut (subtraction is the credential)

- Skill chips/icons section — gone (stack lives on labels, in context).
- Gradient project covers — gone, replaced by real screenshots and photos.
- `/shelf`, `/cinema`, `/random`, `/side-projects` as separate routes — folded
  into About; seven nav items is a student tell. Nav becomes:
  **Ledger · Experience · Observations · Field Notes · About** (5 max).
- Dark-mode toggle in header → footer "storage lighting" line.
- The hero photo-beside-name layout — the cover sheet replaces it.
- Instrument Serif, the orange accent, lucide icons — all retired.

## 10. The 10-Second Recruiter Path (reality check)

The metaphor must never tax a skimmer. Verify this path survives every design
decision: land → cover sheet states *name, role at Specify, KU CS '27* in plain
words above the fold → one scroll shows the full ledger (all projects + dates +
a red WINNER mark) → résumé PDF is one click, top-right, always. If any in-world
flourish obscures those four beats, the flourish loses. The theme is the reward
for people who stay; the facts are free for people who don't.

## 11. Build Order

1. **Foundation** — retire old tokens; new palette, Source Serif 4 + Courier
   Prime, paper grain, rule system. Extend `Project` with `accessionNumber`,
   `locality`, `collectedAt`, `nepaliName?`, `annotations[]`.
2. **Ledger homepage** — cover sheet + accession table + Specify deposit strip.
   (The site is already 70% transformed at this step.)
3. **Specimen sheets** — label component, annotation slips, real screenshots
   (do the screenshot/demo-capture work; it's the most valuable grunt task).
4. **Experience page** with Specify + PR links; regenerate résumé PDF to include
   Specify, swap `/public/resume.pdf`.
5. **Signatures** — stamp, print stylesheet, `/api/collection`, 404, colophon.
6. **Observations** page with EXIF labels.
7. Polish pass against §8 bans and §10 path. Ship.

## 12. Rejected Alternatives (and why)

- **Darkroom/contact-sheet concept** (photography-first): beautiful, but it leads
  with the hobby instead of the engineering, and 50 photographer-dev portfolios
  already do contact sheets. The collection concept *contains* your photography
  as observations without leading with it.
- **Terminal/IDE portfolio**: the most common "creative dev" cliché there is.
- **IT ticketing-system theme** (your KU IT job): funny, memorable, but frames
  you as support, not engineer. Wrong story to lead with.
- **Brutalist/anti-design**: differentiates but signals taste-as-rebellion;
  museum-archival differentiates while signaling care and domain depth — better
  fit for someone whose actual job is stewarding scientific data.

---

### The one-line pitch you'll get to deliver

*"I build collections software for natural history museums — so I cataloged my
own work the same way. Every project has an accession number. You can curl the
catalog. You can print it on index cards."*

That sentence does not exist in anyone else's interview.
