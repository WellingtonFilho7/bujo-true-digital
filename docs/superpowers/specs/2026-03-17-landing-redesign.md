# Landing Page Redesign — Wellington e Dyanna Nascimento

**Date:** 2026-03-17
**Scope:** Full redesign — layout, colors, typography, structure

---

## Problem

The current page feels generic. It could belong to any ministry. There is no visual identity that reflects who Wellington and Dyanna are specifically, and the minimal stone/white palette with subtle borders creates no emotional anchor.

---

## Goal

A "missionário contemporâneo" aesthetic — warm, human, photographic. Comparable to Gospel Coalition or a high-quality Substack with visual personality. The page must make visitors feel who this family is before they read a single word.

---

## Visual Identity

### Palette
| Token | Value | Usage |
|-------|-------|-------|
| Background base | `#FAF8F5` | Page background (replaces pure white) |
| Background secondary | `#F0EDE8` | Alternate sections (replaces stone-50) |
| Text primary | `#1C1917` | Headlines, body |
| Dark surface | `#1C1917` | Dark sections (quote, footer) |
| Accent | `#A8522A` | Terracota — CTAs, section numbers, highlights |

### Typography
- **Headings:** Lora (serif, Google Fonts) — warm, readable, editorial feel
- **Body / labels:** Inter (sans-serif, already in use)
- Implementation: add Lora via `@import` in `index.css`, extend Tailwind config with `fontFamily.serif: ['Lora', 'Georgia', 'serif']`

### Design Principles
- Remove decorative `border-stone-100` dividers — use spatial rhythm instead
- High contrast between dark and light sections creates visual pulse
- Terracota accent used sparingly: numerals, primary CTA, active states only

---

## Page Structure

Rhythm: light → light → **dark** → light → light → **dark**

| Order | Section | Background | Status |
|-------|---------|-----------|--------|
| 1 | Nav (transparent → white on scroll) | transparent / white | redesign |
| 2 | Hero (full-bleed photo) | photo + overlay | redesign |
| 3 | Stats Strip | `#FAF8F5` | redesign |
| 4 | Frentes de trabalho | `#F0EDE8` | redesign |
| 5 | Citação tipográfica | `#1C1917` | redesign |
| 6 | Diário / Updates | `#FAF8F5` | redesign |
| 7 | Apoio | `#F0EDE8` | redesign |
| 8 | Footer | `#1C1917` | redesign |

---

## Section Specs

### Nav
- Transparent when overlapping Hero (position: sticky, bg-transparent)
- Transitions to `bg-white shadow-sm` on scroll (useEffect + scrollY listener)
- Logo/name text: white over hero, dark over white
- Items: Frentes · Diário · Apoio · Compartilhar button
- Mobile: hamburger or just the name + share icon

### Hero
- Full viewport height (`min-h-screen`)
- Background: `<img>` or CSS background-image with `object-fit: cover`, `object-position: center`
- Overlay: gradient from `rgba(0,0,0,0)` at top to `rgba(0,0,0,0.65)` at bottom
- Content positioned at bottom-left, inside `max-w-5xl mx-auto px-6 pb-16`
- Elements (bottom to top visually):
  - CTAs in text: "↓ Conheça o trabalho" and "Como apoiar →" (white, small)
  - Mission statement in Inter, white/80%, text-lg
  - Name "Wellington e Dyanna Nascimento" in Lora, white, text-5xl md:text-6xl
  - Location label: uppercase tracking-widest, white/50%, text-xs
- Photo needed: **família — retrato amplo, horizontal, boa luz natural**

### Stats Strip
- 4 columns, dividers between them
- Stats: `5 filhos` · `3 frentes` · `Igreja · Escola · Casa` · `Gurinhém — PB`
- Value: Lora, text-2xl, stone-900
- Label: Inter uppercase, text-xs, tracking-widest, stone-400

### Frentes de trabalho
- Background: `#F0EDE8`
- Remove current grid border style
- Each initiative: large terracota numeral (Lora, text-6xl, opacity-30) as background accent, title in Lora, body in Inter
- Layout: single column on mobile, 2-col on desktop — more breathing room than current tight grid

### Citação tipográfica
- Background: `#1C1917`
- Quote text: Lora, text-3xl md:text-5xl, white, max-w-3xl, centered
- Source: `family.pullQuote` = "Vida, ministério e rotina — no mesmo lugar."
- Attribution: Inter, uppercase, tracking-widest, stone-500, mt-6

### Diário / Updates
- Background: `#FAF8F5`
- Minimal restyling — warmer feel, Lora for update titles
- Photo placeholder if updates have images

### Apoio
- Background: `#F0EDE8`
- **Pix block** (dominant): full-width dark (`#1C1917`) block spanning section width
  - QR code: 180px, dark bg, light foreground
  - Key in Lora, text-2xl, white
  - "Copiar chave Pix" button: white bg, stone-900 text, no border
- **Secondary row** below: two equal cards (white bg, border) — WhatsApp and Compartilhar
- Share button uses Web Share API with clipboard fallback

### Footer
- Background: `#1C1917`
- Name, location, Instagram links, email
- Closing + signature from `family.ts`

---

## Photos Needed

| # | Description | Used in |
|---|-------------|---------|
| 1 | Família — retrato amplo, horizontal, boa iluminação natural, rosto visível | Hero full-bleed |
| 2 | Wellington pregando ou ensinando — ambiente de igreja | Frentes (Igreja Comum) |
| 3 | Dyanna com crianças / sala de aula — Lumine | Frentes (Lumine) |
| 4 | Família em Gurinhém — rua, casa, cotidiano | Stats Strip ou Quote section |

Photos 2–4 are optional enhancements. Photo 1 is required for the redesign to work.

---

## Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Import Lora from Google Fonts, set CSS vars for palette |
| `tailwind.config.js` / `vite.config.ts` | Extend with Lora font family and custom color tokens |
| `src/App.tsx` | Nav transparent/scroll behavior, updated structure |
| `src/components/HeroSection.tsx` | Full-bleed photo, overlay, repositioned text |
| `src/components/StatsStrip.tsx` | Warm palette, Lora numerals |
| `src/components/InitiativesSection.tsx` | Warm bg, editorial layout, terracota numerals |
| `src/components/QuoteSection.tsx` | Already dark; update to Lora, larger text |
| `src/components/UpdatesSection.tsx` | Warm palette, Lora titles |
| `src/components/SupportSection.tsx` | Warm bg, Pix block dominant |
| `src/components/Footer.tsx` | Dark bg, consolidate closing content |

---

## Out of Scope

- Content changes beyond `pullQuote` and photo additions
- New sections not listed above
- Animation or scroll effects beyond the nav transparency transition
- Mobile navigation menu (hamburger) — keep current behavior
