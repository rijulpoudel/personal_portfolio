# Portfolio — Updated Spec (new_spec.md)

> Amendments on top of SPEC.md — document only what changes or is added.

---

## 1. Home Page Redesign (Single-Page Scrollable)

The home page (`/`) is now a full single-page experience. The dedicated `/about`, `/projects`, `/experience`, and `/skills` routes are kept as fallback URLs but the primary navigation scrolls within the home page.

### Sections (in order, separated by generous whitespace)

| Section ID    | Content                                         |
| ------------- | ----------------------------------------------- |
| `#hero`       | Name, title, tagline, photo, social + resume    |
| `#about`      | Extended bio, 2-3 paragraphs                    |
| `#projects`   | Project cards grid (reuses `<ProjectCard />`)   |
| `#skills`     | Skill icons grouped by category                 |
| `#experience` | Timeline (reuses `<TimelineEntry />`)           |

### Navigation Link Changes

| Label      | Old href      | New href      |
| ---------- | ------------- | ------------- |
| About      | `/about`      | `/#about`     |
| Projects   | `/projects`   | `/#projects`  |
| Skills     | *(new)*       | `/#skills`    |
| Experience | `/experience` | `/#experience`|
| Writings   | `/writings`   | `/writings`   |
| Shelf      | `/shelf`      | `/shelf`      |
| Cinema     | `/cinema`     | `/cinema`     |

Active state: links that start with `/#` are active when `pathname === "/"`.

---

## 2. Hero Section Layout

**Desktop:** Two-column flex row.
- Left (60%): Name (`text-hero`, Instrument Serif italic), title, 1-line tagline, social icon row, resume download button.
- Right (40%): Photo — `next/image` with `Image` component. Placeholder until real photo is provided. Drop `public/images/profile.jpg` to replace.

**Social row:** GitHub icon link, LinkedIn icon link, resume download link (`/resume.pdf`). Icons from `lucide-react`. Place a blank `resume.pdf` in `public/` to enable the download link.

**Mobile:** Stack vertically, photo above text, centered.

---

## 3. Dark / Light Mode Toggle

- Component: `components/layout/ThemeToggle.tsx`
- Uses `useTheme()` from `next-themes`
- Renders `<Sun />` in dark mode, `<Moon />` in light mode (Lucide icons)
- Mounted guard prevents hydration mismatch
- Placed at the far right of the Navbar, after all nav links
- Style: icon button, no border, background transparent, accent color on hover

---

## 4. Skills Section — Icons

- Package: `react-icons` (`react-icons/si` — Simple Icons set)
- **No** skill bars or percentages
- Each skill rendered as a pill card: icon (24px) + label
- Colors pulled from brand palette where meaningful; fallback `var(--text-primary)`

### Skill Groups

| Group    | Skills                                       |
| -------- | -------------------------------------------- |
| Frontend | React, Next.js, TypeScript, Tailwind CSS     |
| Backend  | Node.js, Python                              |
| Tools    | Git, GitHub, Linux, Bash                     |

---

## 5. Animated Grid Background

- Component: `components/ui/GridBackground.tsx`
- CSS-only, no JS animation library needed
- `position: absolute` within the home page wrapper, `z-index: 0`; all sections `z-index: 1`
- Grid: `linear-gradient` hairlines at 60×60 px, `opacity: 0.35`
- Animation: `gridDrift` keyframe — `translate(0,0)` → `translate(60px, 60px)` over 28s, linear, infinite
- Keyframe defined in `globals.css`

---

## 6. Favicon

To replace the default Vercel favicon:

1. Create or export your icon as a 32×32 (and optionally 16×16, 180×180) PNG/SVG.
2. Name the main file `icon.png` (or `icon.svg`) and place it at `app/icon.png`.
   Next.js App Router auto-detects `app/icon.*` and uses it as the favicon — no config needed.
3. For Apple touch icon, place `app/apple-icon.png` (180×180).
4. Optionally keep a legacy `public/favicon.ico` for older browser compatibility.
5. Redeploy — Vercel picks up the new asset automatically.

---

## 7. globals.css Additions

```css
html { scroll-behavior: smooth; }

@keyframes gridDrift {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}
```
