# Design System Specification: Terminal-Chic Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Sovereign Architect**
This design system rejects the "template" aesthetic of modern blogging in favor of a high-end, technical editorial experience. It is designed to feel like a high-end command center—where brutalist efficiency meets premium digital craftsmanship. We move beyond the "hacker" cliché by using intentional asymmetry, overlapping "glass" layers, and a sophisticated typography scale that treats code with the same reverence as prose.

The experience is defined by **Tonal Depth** and **Vapor-Thin Glass**. We do not use borders to define space; we use light and shadow to imply structure. The goal is a "Ghost-in-the-Shell" elegance: precise, mathematical, yet deeply atmospheric.

---

## 2. Colors & Surface Logic

### The "No-Line" Rule
**Strict Mandate:** Traditional 1px solid borders are prohibited for sectioning. 
Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` code block should sit atop a `surface` background. To create separation, use the Spacing Scale (specifically `spacing.8` to `spacing.16`) to let the negative space act as the divider.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of tinted glass. 
- **Base Layer:** `surface` (#0e0e10).
- **Secondary Content/Sidebars:** `surface-container-low` (#131315).
- **Interactive Cards/Code Blocks:** `surface-container-highest` (#262528).
- **Floating Modals/Command Palettes:** Use `surface-bright` (#2c2c2f) with a `backdrop-filter: blur(12px)` and 80% opacity to create "Glassmorphism" depth.

### The "Glass & Gradient" Rule
To prevent the UI from feeling flat or "stale," use subtle linear gradients for primary actions.
- **Primary CTA:** A gradient from `primary` (#9cff93) to `primary-container` (#00fc40) at a 135-degree angle.
- **Accents:** Use `secondary` (#00d2fd) sparingly for data visualization or "Cyber-blue" highlights in technical diagrams.

---

## 3. Typography
The system uses a high-contrast pairing to distinguish between "Machine Instructions" (UI/Headings) and "Human Narrative" (Body).

*   **Display & Headlines (Space Grotesk):** These are our "Terminal" elements. Use `display-lg` for article titles with a `-0.04em` letter spacing to feel dense and engineered.
*   **Body (Inter):** All long-form reading uses Inter. It provides the necessary "Editorial" breathability against the high-energy monospace accents.
*   **Labels & UI (Space Grotesk):** Small metadata (tags, timestamps, file paths) should always be in `label-md` or `label-sm` to maintain the technical "nerdy" aesthetic.

**Signature Styling:**
Headings (h1-h3) should be preceded by a "line number" or "bracket" prefix in `primary` color (e.g., `01_` or `[#]`) to reinforce the coder-nerdy identity.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved via **Tonal Stacking**. Instead of shadows, we "lift" elements by increasing their surface brightness.
- **Lowest:** `surface-container-lowest` (#000000) for deep-set backgrounds or inset code editors.
- **Highest:** `surface-container-highest` (#262528) for interactive elements that need to feel "closer" to the user.

### Ambient Shadows
For floating elements (Tooltips/Modals), use an ultra-diffused shadow:
- `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(156, 255, 147, 0.05);` 
The subtle green tint in the shadow mimics the glow of a phosphor monitor.

### The "Ghost Border" Fallback
If a visual edge is required for accessibility, use the `outline-variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** No rounded corners (`0px`). Solid `primary` background. Text in `on-primary` (#006413). Hover state: 10% brightness increase + a subtle `primary` outer glow.
- **Tertiary (Ghost):** No background. Text in `primary`. On hover, apply a `surface-container-high` background shift.

### Code Blocks & Syntax Highlighting
- **Container:** `surface-container-lowest` with a "Scanline" overlay (a repeating linear gradient of 2px transparent, 1px `rgba(255,255,255,0.02)`).
- **Highlighting:** Use `primary` for functions, `secondary` for strings, and `tertiary` (#ff58e7) for keywords. 
- **LaTeX:** Mathematical symbols should be rendered in `secondary-dim` (#00c3eb) to distinguish them from standard prose.

### Cards & Lists
**Forbidden:** Dividers or lines.
**The Solution:** Use `surface-container-low` for card backgrounds. For lists, use a 0.5rem "notch" on the left side of the active item using the `secondary` color token to indicate focus.

### Inputs
- **Text Fields:** Underline only. Use `outline-variant` for the default state and `secondary` for focus. The cursor should be a solid `primary` block, mimicking a terminal prompt.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Align headings to the left while keeping the body text centered with wide margins (`spacing.24`).
- **Use "Terminal" Micro-copy:** Instead of "Submit," use "Execute"; instead of "Search," use "Query."
- **Layer with Purpose:** Place a glassmorphic sidebar (`surface-bright` + blur) over a background with a subtle grain texture.

### Don't:
- **Never Use Border-Radius:** This system is strictly `0px` (Square). Roundness dilutes the technical, "nerdy" precision.
- **Avoid Flat Grays:** Every neutral should have a hint of the charcoal/blue depth of `surface`. 
- **No Heavy Shadows:** Do not use standard Material Design drop shadows. If an element isn't "glowing" or "layering," it shouldn't be elevated.
- **Don't Overuse the Accent:** If everything is "Matrix-green," nothing is. Reserve `primary` for the most critical interactive paths and `secondary` for technical data.

---

## 7. Spacing & Rhythm
The system uses a strict **0.2rem base (2px)**. 
- Use `spacing.12` (2.75rem) for vertical rhythm between paragraphs.
- Use `spacing.20` (4.5rem) to separate major content sections. 
This generous whitespace is what transforms a "tech blog" into a "High-End Editorial Experience."