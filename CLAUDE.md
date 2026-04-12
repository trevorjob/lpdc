# Luli Properties — Project Instructions

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

## Key paths
- Design tokens: `tailwind.config.ts`
- Global styles / component classes: `src/app/globals.css`
- Fonts: `src/lib/fonts.ts` — Cormorant Garamond (display) + DM Sans (body)
- Types: `src/types/index.ts`
- Placeholder data: `src/data/properties.ts`
- Scroll reveal hook: `src/hooks/useScrollReveal.ts`
- Button component: `src/components/ui/Button.tsx`
- Navbar / Footer: `src/components/layout/`

## Pages to build
1. `/` — Home
2. `/about` — About Us
3. `/portfolio` — Investment Portfolio (property grid)
4. `/portfolio/[slug]` — Single Property (dynamic template)
5. `/services` — Services overview + Investment sub-section + Build Your Portfolio sub-section
6. `/contact` — Contact Us

Each page blueprint is in `luli_properties_site_blueprint.html`.

## Partners section
Prepped but hidden by default — toggle visibility when partners are confirmed. Do not remove.

---

## Design Context

### Users
High-net-worth UK and international investors. Arrive informed. Make decisions on trust and track record. Also clients seeking bespoke portfolio building. Desktop browsing, considered sessions. They've seen a dozen generic property sites — this one needs to stop them.

### Brand Personality
**Three words:** Cinematic. Precise. Unforgettable.

The site should feel like a design agency that's been doing this for 20 years — not an estate agent, not a developer portfolio. Every interaction feels inevitable. First reaction: "who made this website?"

### Aesthetic
Cinematic Editorial — luxury print magazine come to life. Architectural use of space, extreme typographic scale, drama through proportion rather than colour. Left-aligned, asymmetric, structurally bold.

**Dark sections:** Permitted and encouraged mid-page (deep sage `#2E4330`). One or two per page maximum. Creates cinematic rhythm.

**Anti-references:** No estate agent red/blue CTAs. No property portal grid clutter. No glassmorphism, no neon, no bounce animations, no centered-everything, no repeating rounded cards.

### Palette
| Token | Hex | Use |
|---|---|---|
| `sage-500` | `#4E7050` | Primary CTAs, location tags, accents |
| `gold-400` | `#C9A24A` | Secondary CTAs, thin rules, structural gold lines |
| `neutral-50` | `#FAF8F5` | Page background (warm off-white) |
| `neutral-100` | `#F2EDE6` | Section tints |
| `sage-700` | `#2E4330` | Footer, strategic dark sections |
| `white` | `#FFFFFF` | Cards, modals |

### Typography
- **Display (H1–H3, hero):** Cormorant Garamond — `font-display`. Extreme scale: `clamp(3.25rem, 7.5vw, 7.5rem)` for H1.
- **Body / UI:** DM Sans — `font-body`
- Use italic Cormorant for key editorial phrases
- Section numbers (01, 02...) as oversized ghost typographic furniture
- Headline-to-label scale contrast: 4x–6x minimum

### Signature Interactions (from reference)
- **Numbered hover list** — portfolio properties listed as large uppercase rows (01, 02, 03...). Hovering a row reveals a floating photo preview that tracks the cursor. The standout interaction on the portfolio page.
- **Staggered photo grid** — 4 images offset/overlapping with 01–04 numbering and ghost watermark type behind
- **Custom cursor** — dot + spring-lagged ring, HOVER/DRAG states. Desktop-only. (Built)
- **Horizontal drag carousel** — `useMotionValue` + progress bar, `isDragging` link guard. (Built)
- **Phrase-by-phrase hero entrances** — deliberate sequence, not scattered reveals. (Built)
- **Full-viewport-width gold rules** — draw left→right after headings settle. (Built)

### Motion Principles
- Orchestrated entrances — things arrive in deliberate sequence, not scattered
- Easing: `cubic-bezier(0.19, 1, 0.22, 1)` (expo out) for structural. `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for content
- Duration: 700–1200ms entrances, 300ms max micro-interactions
- Never bounce or elastic. `prefers-reduced-motion` always respected (jump to final state)

### Design Principles
1. **Make them stop scrolling** — every section has one element that earns a moment of attention
2. **Drama through proportion, not decoration** — extreme scale and asymmetry over visual effects
3. **Dark sections are editorial punctuation** — use strategically for cinematic rhythm
4. **Everything converges on contact** — every page, section, CTA arcs toward `/contact`
5. **Interactions reveal craft** — cursor, drag, hover list — each feels inevitable, not decorative
6. **Structure over decoration** — numbered systems, ghost type, full-bleed rules carry their own visual weight

### Quality Bar
- **Homepage:** Flagship. Full Cinematic Editorial treatment.
- **Portfolio page:** The numbered hover list is a flagship interaction — implement fully.
- **Inner pages:** Clean, on-brand, functional. Same type/palette. Scroll reveals apply, lighter interaction load.

### Accessibility
WCAG 2.1 AA. Min 4.5:1 body contrast, 3:1 large text. Keyboard navigable. `prefers-reduced-motion` respected — always jump to final state, never disable functionality.
