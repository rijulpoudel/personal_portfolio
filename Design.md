# Rijul Poudel Portfolio Redesign

Status: approved working direction
Branch: `redesign/portfolio-overhaul`
Reference model: `https://arjunr.dev/#projects`

## 1. North star

### Signal, not spectacle

The portfolio should feel precise, human, and alive without making visitors decode a concept first.

A visitor should understand this within one screen:

- Rijul is a software developer and Computer Science student.
- He works on production software at the Specify Collections Consortium.
- He builds across backend, frontend, and data-heavy systems.
- He cares about usefulness and interaction quality.

The primary message is:

> I build software for people doing work that matters.

This is a **Decide / Learn** surface. It is not a dashboard, museum simulation, résumé dump, or freelance-services funnel.

## 2. Audience and visitor jobs

Primary audiences:

1. New-grad and internship recruiters
2. Software engineers and hiring managers
3. Graduate-school faculty and research collaborators
4. Hackathon peers and potential collaborators

The homepage must let them:

- identify Rijul and his current work in under ten seconds;
- inspect one strong project without hunting;
- scan the rest of his work and experience quickly;
- verify technical depth through decisions, not technology badges;
- open the résumé, GitHub, LinkedIn, or email in one step.

## 3. What survives the overhaul

Preserve the facts, not the old presentation.

### Publish prominently

- Six real projects in `data/collection.ts`
- Four experience entries in `data/experience.ts`
- Aawaj award results and architecture details
- Specify Collections Consortium role and context
- University of Kansas, class of 2027, and Nepal-to-Kansas background
- GitHub, LinkedIn, email, résumé, and working project links
- Nepali names and translations where they add meaning

### Preserve but do not promote yet

- `/field-notes` and its MDX infrastructure, because the only post is placeholder content
- `/observations`, because the collection is empty
- books and films, because each list contains a placeholder item
- the API route and old project URLs

No source content is deleted merely because it is not in the primary navigation.

## 4. Reference translation

### Principles worth adapting

- A clear narrative chapter for each section
- One memorable interaction per chapter
- Strong visual hierarchy through composition
- Responsive behavior designed separately for desktop and mobile
- Project browsing that feels authored rather than templated
- A personal detail that makes the developer memorable

### Distinctive reference elements we will not copy

- scrapbook, paper, corkboard, Polaroid, ticket, pin, string, or clothesline motifs;
- handwritten type;
- cream paper and red accent palette;
- the exact horizontal pinned-project wall;
- custom cursor, fixed canvas particles, or decorative infinite animation;
- its section order, copy, assets, or physical compositions.

The reference uses 120 Web Animations after load, 11 of which continue running. It also creates a desktop body wider than the viewport. This redesign must achieve character with materially less runtime motion and no document overflow.

## 5. Original concept: a live engineering field guide

The visual language combines:

- Linear's luminance discipline;
- Apple's product-first restraint;
- Vercel's crisp type and structural precision;
- Rijul's own mix of software, collections work, civic systems, and Nepal-to-Kansas perspective.

The signature motif is a **signal trace**: a thin mint rule that connects section indices, system diagrams, active navigation, and focus states. It represents information moving through a system. It is not a decorative waveform and never becomes a gradient or neon glow.

Each section has one job:

1. **Identity**: the person and the current role
2. **Proof**: one featured case study
3. **Range**: the remaining project index
4. **Practice**: experience and engineering posture
5. **Origin**: a concise personal story
6. **Contact**: one direct invitation

## 6. Homepage information architecture

### Header

- Left: `RIJUL POUDEL` wordmark or compact `RP` mark with full accessible name
- Center/right: Work, Experience, About
- Utility: Résumé
- Primary action: Email
- Sticky after the hero starts leaving the viewport
- Solid near-black surface with a quiet bottom rule
- No glass blur and no oversized floating pill

Mobile:

- Name/mark on the left
- One 44px menu button on the right
- Full-width menu panel with large text links
- Escape closes; focus is trapped and restored

### Hero: Identity

Draft copy:

- Eyebrow: `SOFTWARE DEVELOPER · DESIGN-MINDED ENGINEER`
- Heading: `I build software for people doing work that matters.`
- Body: `I'm Rijul Poudel, a Computer Science student at the University of Kansas and a software developer at the Specify Collections Consortium. I work across Django, React, TypeScript, and data-heavy systems.`
- Context line: `Based in Lawrence, Kansas · From Bharatpur, Nepal`
- Actions: `View selected work` and `Résumé`

Composition:

- Asymmetric two-column grid, approximately 7/5
- Copy owns the larger column
- Portrait appears as a restrained editorial crop, not a floating ID card
- Current role and availability sit beside the portrait as plain metadata
- Minimum hero height is content-driven, not blindly `100vh`

Motion:

- One staged entrance: eyebrow, heading lines, body, actions, portrait
- 420 to 640ms total
- No bounce, magnetic pointer effect, or looping decoration
- Static immediately under reduced motion

### Featured work: Proof

Feature Aawaj first because it has the strongest evidence:

- two awards;
- a clear civic problem;
- a non-trivial escalation state machine;
- verifiable architecture choices;
- public source code.

Desktop composition:

- Left third: sticky project identity and section progress
- Right two-thirds: three reading states
  1. Problem
  2. System
  3. Outcome and tradeoffs
- A factual CSS architecture diagram:
  - Citizen interface to React
  - React to Solidity contract on Polygon Amoy
  - Photo evidence to Pinata/IPFS
  - Government actions back to the on-chain audit trail
- Existing purple concept art may appear only as secondary media and at reduced saturation. It must not substitute for working-product proof.

Mobile composition:

- Normal document flow
- All three states visible in order
- No sticky scroll lock or gesture hijacking

### Project index: Range

A compact, full-width project index for the other five projects.

Each row shows:

- sequence/year;
- project title;
- one-line purpose;
- role or build context;
- selected technologies;
- status and destination.

Desktop interaction:

- Hover or keyboard focus reveals one anchored preview area when a real asset exists
- The row remains readable without the preview
- No cursor-following image and no full-page horizontal track

Mobile interaction:

- Each row becomes a compact stacked link
- Metadata wraps naturally
- Preview media appears inline only when useful

### Experience: Practice

- Lead with the current Specify role
- Explain what Specify is before listing implementation details
- Show the remaining roles as a clean chronology
- Put dates and location in a stable metadata column
- Tech stacks are secondary, not a cloud of pills
- Link public merged work when those links exist

### About: Origin

- Keep this short on the homepage
- Connect Bharatpur, Lawrence, collections software, design, and photography
- Use the real portrait once across the page, not repeatedly
- Link to `/about` only if the internal page contains additional value
- Do not surface placeholder book or film entries

### Contact

- Heading: a direct invitation, not a generic “Let's connect” cliché
- Primary action: email
- Secondary links: GitHub, LinkedIn, résumé
- Include current location and copyright/year as low-priority metadata
- No contact form unless there is a real backend and spam strategy

## 7. Visual system

### Color

Dark mode is the product, not a toggle.

| Token | Value | Role |
|---|---:|---|
| `--canvas` | `#080b0a` | page background |
| `--surface-1` | `#0d110f` | quiet section surface |
| `--surface-2` | `#121814` | elevated media or disclosure |
| `--surface-3` | `#18201b` | hover and selected state |
| `--ink` | `#f2f6f3` | primary text |
| `--ink-secondary` | `#a5aea8` | body and secondary text |
| `--ink-muted` | `#707a74` | metadata only |
| `--rule` | `rgba(242, 246, 243, 0.12)` | structure |
| `--rule-strong` | `rgba(242, 246, 243, 0.22)` | active structure |
| `--accent` | `#5eead4` | links, focus, active state, trace |
| `--accent-ink` | `#052e2b` | text on a filled accent control |

Rules:

- No gradients.
- No neon glow.
- No rainbow or project-specific UI palette.
- Accent is functional, not confetti.
- Important content never depends on mint alone for meaning.
- Images retain their own color but sit inside neutral chrome.

### Typography

Use existing dependencies and font loading:

- Primary: Geist Sans
- Technical metadata: Geist Mono
- Optional editorial accent: Source Serif 4 italic for one human sentence or quotation only
- Devanagari: Noto Serif Devanagari where Nepali script appears

Scale:

| Role | Desktop | Mobile | Weight | Leading |
|---|---:|---:|---:|---:|
| Hero | `clamp(4.5rem, 7vw, 7rem)` | `clamp(3rem, 13vw, 4.5rem)` | 520 to 600 | 0.94 |
| Section title | `clamp(2.5rem, 4vw, 4.5rem)` | `2.25rem` | 520 to 600 | 1.0 |
| Project title | `clamp(1.5rem, 2.4vw, 2.5rem)` | `1.5rem` | 520 | 1.1 |
| Body large | `1.125rem` | `1.0625rem` | 400 | 1.6 |
| Body | `1rem` | `1rem` | 400 | 1.6 |
| Metadata | `0.75rem` to `0.8125rem` | minimum `0.75rem` | 500 | 1.4 |

Rules:

- Large type uses restrained negative tracking.
- Body copy never exceeds 68 characters per line.
- Monospace is for indices, dates, code, and system labels only.
- Essential project content is never set at 12px on desktop.

### Layout

- Maximum shell: `1280px`
- Reading width: `680px`
- Outer gutter: `clamp(1rem, 4vw, 4rem)`
- Twelve-column desktop grid
- Four-column mobile grid
- Section block spacing: `clamp(6rem, 11vw, 11rem)`
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144

Use asymmetry for hierarchy, not random offsets.

### Radius and depth

- Controls: 8px
- Content panels: 12px
- Featured media: 16px
- Pills only for true status or compact filters
- Default surfaces are flat
- Use luminance and a quiet rule before shadow
- A shadow is allowed only for a mobile menu or true overlay

## 8. Components and code boundaries

Proposed structure:

```text
components/portfolio/
  SiteHeader.tsx
  Hero.tsx
  FeaturedCaseStudy.tsx
  SystemDiagram.tsx
  ProjectIndex.tsx
  ExperienceTimeline.tsx
  AboutSection.tsx
  ContactSection.tsx
  SectionLabel.tsx
  Reveal.tsx
```

Rules:

- Components are server components by default.
- `Reveal.tsx` is the smallest client-side motion boundary.
- Any project preview interaction is isolated from the row content.
- Data remains in `data/`; view-model mapping happens close to the consuming server component.
- Do not add a state library, animation library, carousel, icon set, or smooth-scroll package.
- Framer Motion may be used because it already exists, but CSS and native observers are preferred when simpler.

## 9. Motion and interaction

### Motion posture

Motion should show continuity and state. It should never ask the visitor to wait.

| Interaction | Duration | Curve | Behavior |
|---|---:|---|---|
| Link/color state | 140ms | ease-out | immediate feedback |
| Row hover/focus | 180ms | ease-out | surface and trace shift |
| Reveal | 420ms | cubic-bezier(.22,1,.36,1) | opacity plus max 16px translation |
| Menu open | 240ms | cubic-bezier(.22,1,.36,1) | opacity and clipped vertical reveal |
| Project state change | 300ms | ease-out | content crossfade/translate |

Hard limits:

- No custom cursor.
- No canvas layer.
- No perpetual decorative animation.
- No bounce physics by default.
- No horizontal document overflow.
- After entrance motion settles, the homepage should have zero decorative animations running.
- Scroll progress must use one passive listener or one observer, not listeners per card.

### Reduced motion

Under `prefers-reduced-motion: reduce`:

- remove transform-based reveals;
- disable smooth scrolling;
- unstick narrative panels if needed;
- show all project states in normal flow;
- keep focus, hover, and visibility changes instantaneous.

## 10. Responsive behavior

### Mobile, below 700px

- Single-column narrative
- 16px minimum outer gutter
- 44px minimum interactive targets
- Hero portrait follows the primary action, not the heading
- Project evidence appears in document order
- Experience metadata moves above each role
- No essential hover-only content

### Tablet, 700px to 1023px

- Two-column hero when space permits
- Project index remains text-first
- Featured project uses a light sticky treatment only if viewport height is sufficient

### Desktop, 1024px and above

- Full asymmetric grid
- Featured Aawaj narrative may become sticky
- Project preview may appear in a fixed grid column
- Header links remain visible

Sticky behavior must be disabled on short landscape viewports where it would trap or clip content.

## 11. Accessibility and performance budgets

Required:

- Semantic landmarks and heading order
- Skip link
- Visible `:focus-visible` state using `#5eead4`
- Descriptive project-link labels
- 44px mobile hit targets
- No content conveyed only by motion, color, or hover
- Images use `next/image`, explicit dimensions, useful alt text, and appropriate priority
- No autoplaying media with sound
- No layout shift from fonts or hero media
- No console errors or hydration warnings
- No page-level horizontal overflow at 320px, 390px, 768px, 1024px, or 1440px

Performance posture:

- Prefer server-rendered content
- Keep client components narrow
- Lazy-load below-fold media
- Avoid remote image proxies when local assets are available
- Do not ship concept art at full resolution when displayed small
- Record baseline and post-redesign Lighthouse results before final approval

## 12. Route strategy

Phase one keeps every working route stable:

- `/` gets the new homepage
- `/specimen/[slug]` remains valid but is visually reframed as a project case study
- `/experience` and `/about` receive the same system
- `/field-notes` and `/observations` remain reachable but leave the primary nav until they contain real content
- `/api/collection` remains unchanged

A later route migration to `/work/[slug]` is optional. If introduced, old specimen URLs must redirect permanently and canonical metadata must be explicit.

## 13. Implementation sequence

### Slice 1: foundation

- Load Geist and remove homepage body-style side effects
- Add the new dark tokens and reset
- Build header, section shell, focus states, motion primitives
- Verify the unchanged data and routes still build

### Slice 2: identity

- Replace the existing landing composition
- Build hero, portrait treatment, navigation, and primary actions
- Verify desktop and mobile before proceeding

### Slice 3: proof and range

- Build Aawaj's featured decision narrative and system diagram
- Build the remaining project index from `data/collection.ts`
- Keep content accessible without motion or imagery

### Slice 4: practice, origin, contact

- Add experience, concise about section, and contact footer
- Remove services and generic portfolio filler

### Slice 5: project details

- Redesign `/specimen/[slug]` around problem, decisions, architecture, tradeoffs, and links
- Preserve static generation and metadata

### Slice 6: supporting routes and polish

- Bring `/experience` and `/about` into the system
- Give placeholder/empty routes honest states
- Test links, focus, reduced motion, overflow, and performance

Every slice must pass:

```bash
git diff --check
npm run lint
npm run build
```

It must also be inspected after motion settles at desktop and mobile widths.

## 14. Pre-launch blockers

- Update `public/resume.pdf`. The current PDF omits the Specify role and the 2026 projects, and still presents KU IT as the current role.
- Replace placeholder GitHub and Devpost destinations in project records with exact project URLs where available.
- Capture real working-product screenshots for Aawaj and the other featured projects. Current Aawaj images are concept art, not interface proof.
- Keep Field Notes, Observations, books, and films out of primary navigation until placeholder content is removed.

## 15. Anti-slop gate

Target score: **0/10**.

Reject the implementation if it contains any of these:

- blue-purple tech gradient;
- generic indigo accent;
- equal-weight icon-and-copy feature grid;
- decorative accent rails masquerading as structure;
- unearned glass blur;
- fake metrics;
- icon toppers;
- center-stacked page composition;
- default Inter chosen without intent;
- a composition that obscures the Decide / Learn job.

The mint signal trace is structural and interactive. If it turns into decoration everywhere, remove it.
