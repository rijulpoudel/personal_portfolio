# The Design System: A High-End Editorial Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Silent Curator"**

This design system is built upon the philosophy of extreme reduction. It moves away from the "functionalist" clutter of standard SaaS interfaces and toward the "intentional" layout of high-end editorial print. The goal is to treat the digital screen like a gallery wall—where the white space (negative space) is as much a part of the content as the images and text.

We break the "template" look by utilizing **intentional asymmetry** and **tonal depth**. Rather than centering everything or following a rigid 12-column grid blindly, we use the spacing scale to create rhythmic "breathing rooms." Hierarchy is not shouted through bold colors; it is whispered through refined typography and subtle shifts in surface luminosity.

---

## 2. Colors & Surface Philosophy

The palette is a monochromatic study in sophisticated warmth. We avoid pure white (#FFFFFF) in favor of a "Paper" base (`#fcf9f3`) and "Ink" primary (`#1e1e1e`).

### The "No-Line" Rule
Designers are strictly prohibited from using 1px solid borders to section off content. In this system, boundaries are invisible. They must be defined through:
1. **Background Shifts:** Using `surface-container-low` vs. `surface` to denote a new section.
2. **Vertical Rhythm:** Utilizing the `20` (7rem) or `24` (8.5rem) spacing tokens to signal a transition in narrative.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper.
* **Base Layer:** `surface` (#fcf9f3)
* **Nested Elements:** Place a `surface-container-lowest` card on a `surface-container-low` background to create a "recessed" or "elevated" feel without a single drop shadow.
* **The Glass Rule:** For floating navigation or modal overlays, use a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. This allows the underlying content to bleed through, softening the interface.

### Signature Textures
While monochromatic, the system is not flat. Use a subtle linear gradient from `primary` (#1e1e1e) to `primary_container` (#333333) for high-impact CTA buttons to give them a "machined" satin finish.

---

## 3. Typography: Editorial Authority

The soul of this system lies in the juxtaposition of a heritage-inspired Serif and a utilitarian Sans-Serif.

* **Display & Headlines (Newsreader Variable):** Used for storytelling, names, and large impact statements. It should feel literary. Increase letter spacing slightly for a more "airy" feel in display sizes.
* **Title & Body (Inter Variable):** Used for navigation, descriptions, and functional labels. Inter provides a modernist, neutral counterpoint to the romance of Newsreader.
* **Metadata (ui-monospace):** Use for dates, technical specs, or "labels." This adds a layer of "curatorial precision," as if looking at a catalog entry.

**Scale Philosophy:**
* `display-lg` is your "Hero Statement."
* `body-md` is your "Gallery Description."
* Always favor `line-height: 1.6` for body text to ensure the "whitespace" exists between lines, not just around containers.

---

## 4. Elevation & Depth

We achieve depth through **Tonal Layering**, not structural scaffolding.

* **The Layering Principle:** To "lift" a component (like a project card), change the background token to `surface_container_highest` rather than adding a stroke.
* **Ambient Shadows:** If a floating element (like a popover) is required, use a shadow with a 40px–60px blur at 4% opacity, using the `on_surface` color as the shadow tint. It should look like a soft glow, not a dark smudge.
* **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use the `outline_variant` token at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden.

---

## 5. Components

### Buttons
* **Primary:** Background: `primary`; Text: `on_primary`. Shape: `DEFAULT` (0.25rem) for a sharp, architectural look.
* **Secondary:** Background: `transparent`; Border: Ghost Border (15% `outline_variant`).
* **Tertiary:** No background or border. `label-md` Inter, uppercase with 0.05em letter spacing.

### Cards & Lists
* **No Dividers:** Never use `
` tags or border-bottoms. Use `10` (3.5rem) spacing to separate list items.

* **Interaction:** On hover, a card should shift from `surface` to `surface_container_low`. The change should be nearly imperceptible but felt by the user.

### Input Fields
* **Style:** Minimalist. Only a bottom border using `outline_variant` at 20% opacity.
* **Focus State:** The bottom border transitions to 100% `primary`. Labels should use `label-sm` in `ui-monospace`.

### Custom Component: The "Curator Tag"
* A small chip using `surface_container_high` background and `ui-monospace` text. Used for project categories or tech stacks. No border, `0.125rem` (sm) corner radius.

---

## 6. Do’s and Don’ts

### Do
* **Embrace the Void:** If a section feels empty, leave it. Whitespace is a deliberate choice.
* **Asymmetric Grids:** Align your text to the left but place your images on a 60/40 split to create visual tension.
* **Subtle Hover States:** Use opacity (0.8 to 1.0) for link hovers rather than color changes.

### Don’t
* **Don't use pure black:** Use `primary` (#1e1e1e) for text; it is softer on the eyes and feels more premium.
* **Don't use shadows for everything:** Reserve shadows for objects that literally "float" (modals). Everything else lives on the paper plane.
* **Don't use icons unless necessary:** Prefer text labels. If icons are used, they must be ultra-thin (0.5px or 1px stroke weight).

---

## 7. Token Reference Summary

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Surface** | `#fcf9f3` | Main background (The Paper) |
| **Primary** | `#1e1e1e` | Main text and dark elements (The Ink) |
| **Outline Variant** | `#c4c7c7` | For Ghost Borders (15% opacity only) |
| **Spacing 20** | `7rem` | Standard section vertical padding |
| **Rounded DEFAULT** | `0.25rem` | Standard subtle rounding for buttons/cards |