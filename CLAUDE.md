# Luli Properties — Project Instructions

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

## Key paths
- Design tokens: `tailwind.config.ts`
- Global styles / component classes: `src/app/globals.css`
- Fonts: `src/lib/fonts.ts` — Cormorant Garamond (display) + DM Sans (body)
- Types: `src/types/index.ts`
- Placeholder data: `src/data/properties.ts`
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
High-net-worth UK and international investors researching residential property investment. They arrive informed, make decisions on trust and momentum. Also clients seeking bespoke portfolio building. Desktop browsing, considered sessions. They've seen a dozen generic property sites — this one needs to feel like a different category.

### Brand Personality
**Three words:** Modern. Ambitious. Sharp.

**Emotional goal:** Within 5 seconds the visitor feels "This firm is going places. I want in." Confident momentum — not precious luxury, not estate-agent generic.

**References:** OliviaHarperHomes (primary — scroll-driven narrative, character-split text, stacking cards, restrained warm palette). FindRealEstate (professional baseline — clarity, structure).

### Aesthetic
Cinematic editorial with contemporary ambition. Asymmetric, extreme typographic scale, full-bleed sections, photography as architecture. Left-aligned compositions. Not centered. Not symmetric. Not rounded card grids.

**Dark sections:** Strategic use mid-page in deep sage (`#2E4330`). One to two per page for cinematic rhythm.

**Anti-references:** Estate agent CTAs. Property portal grid clutter. Glassmorphism. Gradient text. Bounce/elastic animations. Centered everything. Repeating card grids. Prop-tech startup feel.

**Copy style:** No em dashes anywhere. Not in UI copy, headings, labels, or code comments. Use a comma, period, or rewrite instead.

**Theme:** Light dominant. Warm off-white base (`#FAF8F5`). Deep sage for dramatic full-section moments.

### Palette
| Token | Hex | Use |
|---|---|---|
| `sage-500` | `#4E7050` | Primary CTAs, location tags, accents |
| `gold-400` | `#C9A24A` | Secondary CTAs, thin rules, structural lines |
| `neutral-50` | `#FAF8F5` | Page background (warm off-white) |
| `neutral-100` | `#F2EDE6` | Section tints |
| `sage-700` | `#2E4330` | Footer, strategic dark sections |
| `white` | `#FFFFFF` | Cards, modals |

Never pure gray or pure black. Always tinted warm.

### Typography
- **Display (H1–H3, hero):** Cormorant Garamond — `font-display`. Extreme scale: `clamp(3.25rem, 7.5vw, 7.5rem)` for H1. Italic for key editorial phrases.
- **Body / UI:** DM Sans — `font-body`. Clean, geometric, sharp.
- Section numbers (01, 02...) as oversized ghost typographic furniture
- Headline-to-label scale contrast: 4x–6x minimum

### Signature Interactions (priority order)
1. **Character-split text animations** — headlines animate word-by-word or letter-by-letter on load/scroll. Staggered, deliberate. Framer Motion `motion.span`.
2. **Video background hero** — full-screen atmospheric video behind the hero. Text overlaid with subtle veil. Paused on `prefers-reduced-motion`.
3. **Stacking scroll cards** — portfolio cards layer and scale on scroll, creating layered depth.
4. **Numbered hover list** — large uppercase property rows (01, 02, 03...) with floating photo preview tracking the cursor. Flagship portfolio interaction.

### Motion Principles
- Orchestrated entrances — deliberate sequence, never scattered
- Easing: `cubic-bezier(0.19, 1, 0.22, 1)` (expo out) for structural. `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for content
- Duration: 700–1200ms entrances, 300ms max micro-interactions
- Never bounce or elastic. `prefers-reduced-motion` always respected — jump to final state instantly
- Stagger delays: 80–120ms between related elements

### Design Principles
1. **Make them stop** — every section has one element that earns attention. One hero moment per section.
2. **Momentum through proportion** — dramatic type scale and asymmetry do more than any effect.
3. **Dark sections are editorial punctuation** — one or two per page for cinematic rhythm.
4. **Everything converges on contact** — every page, section, CTA arcs toward `/contact`.
5. **Interactions reveal craft** — cursor, stacking cards, character splits — each feels inevitable, not decorative.
6. **Ambitious, not precious** — this firm is going places. The design should feel like momentum.

### Quality Bar
- **Homepage:** Flagship. Video hero, character-split headline, stacking portfolio preview, all signature interactions.
- **Portfolio page:** The numbered hover list is a flagship interaction — implement fully.
- **Inner pages:** Clean, on-brand, functional. Same type/palette. Scroll reveals, lighter interaction load.

### Accessibility
WCAG 2.1 AA. Min 4.5:1 body contrast, 3:1 large text. Keyboard navigable. Custom cursor additive (default still functional). `prefers-reduced-motion`: jump to final state instantly. Video hero: no autoplay audio.
