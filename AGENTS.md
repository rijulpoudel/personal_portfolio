# Portfolio Redesign Agent Contract

## Project

Rijul Poudel's personal portfolio. This repository is undergoing a complete visual and UX redesign on `redesign/portfolio-overhaul`.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Framer Motion
- `next/font`

## Commands

```bash
npm run dev
npm run lint
npm run build
```

Use port `3010` for local redesign review when port `3000` is occupied.

## Decision ownership

- The prime orchestrator owns information architecture, art direction, UX, design tokens, motion language, integration, and final approval.
- The default bounded-worker route for this redesign is OpenCode Go / `deepseek-v4-flash`.
- Delegated workers handle bounded inventory, research, isolated implementation, tests, accessibility checks, and mechanical cleanup.
- Workers must not invent a visual direction, broaden scope, add dependencies, commit, push, or rewrite unrelated files unless their task explicitly authorizes it.
- Worker output is evidence, not final authority. The orchestrator verifies it before integration.

## Preservation contract

Treat this as a design replacement, not a content purge.

Preserve by default:

- `data/` facts, project records, work history, links, and route slugs
- `content/` writing
- `public/images/` project/profile assets
- `public/resume.pdf`
- SEO metadata, external links, and working routes

The museum/specimen vocabulary was fully purged per explicit decision (2026-09-04): routes /specimen→/projects, /field-notes→/writing, /observations→/photos, /api/collection→/api/projects, data/collection→data/projects, data/observations→data/photos. Do not reintroduce catalog metaphors (specimens, plates, accessions, deposits, field notes). Factual Specify/collections job copy stays truthful but unthemed.

The working tree contained user-owned changes before this branch was created:

- deleted: `SPEC.md`, `idea.md`, `new_spec.md`
- untracked: `public/images/projects/`

Do not restore, delete, stage, or otherwise alter those changes unless explicitly assigned.

## Design posture

This is primarily a **Decide / Learn** surface. A visitor should quickly understand who Rijul is, what he builds, the quality of his work, and how to contact him.

Reference site: `https://arjunr.dev/#projects`

- Use the reference as evidence and inspiration, not as permission for a pixel-perfect clone.
- Transform its strongest principles into an original system that fits Rijul's content and identity.
- Avoid generic AI portfolio patterns: blue-purple gradients, glass everywhere, equal-weight card grids, icon toppers, fake metrics, excessive pills, and animation without purpose.
- Typography, composition, spacing, and image direction come before decorative effects.
- Motion must clarify hierarchy or continuity, remain responsive, and respect `prefers-reduced-motion`.
- Do not use monospace globally.
- Do not hide weak hierarchy behind giant type, empty space, or novelty interactions.

## Implementation rules

- Inspect the live page and source before editing.
- Work in reviewable slices: foundation, navigation, hero, project index, project detail, supporting pages, polish.
- Keep server components by default. Add `"use client"` only at the smallest interaction boundary.
- Reuse existing dependencies unless a new package has a clear, approved need.
- Keep semantic HTML, visible focus states, keyboard access, and 44px mobile targets.
- Never make desktop-only motion the only way to access content.
- Avoid hard-coded document/body styling in effects. Theme through tokens and layout classes.
- Keep every change narrow enough to review and revert.

## Verification gate

Before calling any implementation slice complete:

1. Run `git diff --check`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Review the rendered result at desktop and mobile widths after motion settles.
5. Check overflow, navigation, focus behavior, reduced motion, missing assets, console errors, and broken links.
6. Inspect `git status` and confirm only intended files changed.

Do not claim visual verification from code inspection alone.

## Git

- Never work directly on `main`.
- Current redesign branch: `redesign/portfolio-overhaul`.
- One logical change per conventional commit.
- Do not commit or push unless Rijul or the orchestrator explicitly requests it.
- Never reset, clean, stash, or discard user-owned work to make the tree look tidy.
