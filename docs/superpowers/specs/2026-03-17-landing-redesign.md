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
- Implementation: add Lora via `@import` in `index.css`, extend `tailwind.config.js`:
  ```js
  theme: {
    extend: {
      fontFamily: { serif: ['Lora', 'Georgia', 'serif'] },
      colors: {
        canvas: '#FAF8F5',      // bg-canvas
        surface: '#F0EDE8',     // bg-surface
        accent: '#A8522A',      // text-accent, bg-accent
        ink: '#1C1917',         // bg-ink (dark sections)
      }
    }
  }
  ```
  Use these tokens (`bg-canvas`, `bg-surface`, `bg-ink`, `text-accent`) throughout components instead of arbitrary hex values.

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
- Transparent when overlapping Hero (`bg-transparent`, text white)
- Transitions to `bg-white shadow-sm` when `scrollY > 10` — use `useEffect` + `window.addEventListener('scroll', ...)` in App.tsx
- Color transition: `transition-colors duration-200` on all text/background elements, including logo, all nav links, and share button
- Logo/name: white at top → `text-stone-900` after threshold
- Nav links (Frentes, Diário, Apoio): white at top → `text-stone-500 hover:text-stone-900` after threshold
- **Compartilhar button:** triggers Web Share API (`navigator.share`) with title, text, and current URL; clipboard fallback if not supported. Uses the inline SVG share icon already present in `SupportSection.tsx` (no external icon library). White at top → `text-stone-500` after threshold.
- **Mobile:** nav links hidden on mobile (same as current). Name + share icon button only. No hamburger menu.

### Hero
- Full viewport height (`min-h-screen`)
- Container: `relative overflow-hidden bg-[#1C1917]` — dark fallback if image fails to load
- Background image: `<img>` with `absolute inset-0 w-full h-full object-cover object-center`
- Overlay: `absolute inset-0 bg-gradient-to-t from-black/65 to-transparent`
- Content: `absolute bottom-0 left-0 right-0`, inner `max-w-5xl mx-auto px-6 pb-16`
- Elements top-to-bottom in DOM (rendered bottom-to-top visually due to flex-col-reverse or natural flow):
  1. Location label: `text-xs font-medium tracking-widest uppercase text-white/50`
  2. Name "Wellington e Dyanna Nascimento": Lora, `text-5xl md:text-6xl font-bold text-white leading-tight`
  3. Mission statement `family.mission`: Inter, `text-lg text-white/80 mt-3`
  4. CTAs: `mt-8 flex flex-wrap gap-6`
     - "↓ Conheça o trabalho": `<a href="#frentes">`, `text-sm text-white/90 hover:text-white transition-colors`
     - "Como apoiar →": `<a href="#como-ajudar">`, `text-sm text-white/60 hover:text-white/90 transition-colors`
     - No background, no border — plain links
- Photo needed: **família — retrato amplo, horizontal, boa iluminação natural** (see Photos section)

### Stats Strip
- 4 columns with `divide-x divide-stone-200` on md+, 2×2 grid on mobile
- **Col 1:** value `5`, label `filhos`
- **Col 2:** value `3`, label `frentes`
- **Col 3:** single centered text `Igreja · Escola · Casa` — Lora, `text-base font-semibold text-stone-900`. No label row. This column uses a smaller font than cols 1/2/4 because the string is longer. The absent label row is replaced by empty space to maintain vertical alignment with neighbors.
- **Col 4:** value `Gurinhém`, label `Paraíba`
- Value style: Lora, `text-2xl font-semibold text-stone-900`
- Label style: Inter, `text-[11px] uppercase tracking-widest text-stone-400 mt-1`

### Frentes de trabalho
- Background: `#F0EDE8`
- 5 initiatives total (Igreja Comum, Retornar, BEMA, Lumine, Ministério itinerante)
- Layout: single column on mobile, 2-col on desktop (`grid md:grid-cols-2 gap-8`)
- Orphan card (5th): rendered full-width (`md:col-span-2`) with a narrower max-width (`max-w-2xl`) to avoid stretching
- Each card:
  - Large numeral: Lora, `text-8xl font-bold text-[#A8522A]/20` — decorative, positioned absolutely behind title
  - Label: Inter, uppercase, text-xs, tracking-widest, `text-[#A8522A]`
  - Title: Lora, `text-xl font-semibold text-stone-900`
  - Body: Inter, `text-[15px] text-stone-600 leading-relaxed`
  - Optional link: same style as current (`text-xs text-stone-400 underline`)

### Citação tipográfica
- Background: `#1C1917`
- Quote body (`family.pullQuote`): Lora, `text-3xl md:text-5xl font-semibold text-white leading-snug max-w-3xl mx-auto text-center`
- Opening/closing quotation marks rendered as part of the string: `"Vida, ministério e rotina — no mesmo lugar."`
- Attribution: `— Wellington e Dyanna Nascimento` — Inter, `text-xs uppercase tracking-widest text-stone-500 mt-6 text-center`

### Diário / Updates
- Background: `bg-canvas`
- Preserve existing card structure, date format, and body text exactly
- Only changes: section `<h2>` → Lora font; update card `<h3>` titles → Lora font
- No layout, spacing, or content shape changes

### Apoio
- Background: `bg-surface`
- Section header same structure, Lora for `<h2>`
- **Pix block** (dominant): full-width `bg-ink` block, `p-10 md:p-14`
  - QR value: `pixPayload(campaign.pixKey, campaign.pixName)` from `src/utils/pix.ts` (existing utility). `QRCodeSVG` from `qrcode.react` (existing dependency). Size 180, bgColor `#1C1917`, fgColor `#FAF8F5`
  - Chave label: `text-xs uppercase tracking-widest text-stone-500`
  - Key value (`campaign.pixKey`): Lora, `text-2xl font-semibold text-white`
  - Name (`campaign.pixName`): Inter, `text-sm text-stone-400`
  - "Copiar chave Pix" button: `bg-white text-stone-900 text-sm font-medium px-5 py-2.5` (no border)
    - Interaction: copies `campaign.pixKey` to clipboard; label → "✓ Copiado!" for 2s then resets
- **Secondary row**: two equal white-bg cards (`bg-white border border-stone-200`) — WhatsApp and Compartilhar
  - WhatsApp: existing logic and SVG icon
  - Compartilhar: Web Share API with `{ title, text, url: window.location.href }`; clipboard fallback; label → "Link copiado!" for 2s

### Footer
- Background: `bg-ink`
- Name (`campaign.coupleName`): Lora, `text-lg font-semibold text-white`
- Location (`campaign.location`): Inter, `text-sm text-stone-400`
- Links row: `campaign.instagram1` (Wellington) + `campaign.instagram2` (Dyanna) + `campaign.email` — two separate Instagram accounts — `text-sm text-stone-400 hover:text-white transition-colors`
- `border-t border-stone-800 mt-8 pt-8` then `family.closing` and `family.signature` (from `src/content/family.ts`, existing file with `closing` and `signature` string fields)

---

## Photos Needed

| # | Description | Used in | Required? |
|---|-------------|---------|-----------|
| 1 | Família — retrato amplo, horizontal, boa iluminação natural, rostos visíveis | Hero full-bleed | **Required** |
| 2 | Wellington pregando ou ensinando — ambiente de igreja, luz ambiente | Frentes (Igreja Comum) | Optional |
| 3 | Dyanna com crianças / sala de aula — Lumine | Frentes (Lumine) | Optional |
| 4 | Família em Gurinhém — rua, casa, cotidiano | Apoio ou Quote section | Optional |

Photos 2–4 are optional and can be added later. Photo 1 is required for the Hero to work — without it the Hero renders a dark `#1C1917` fallback.

**File placement:** `public/images/` (same as current `familia.jpeg`)

---

## Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Import Lora from Google Fonts |
| `tailwind.config.js` | Extend with `fontFamily.serif: ['Lora', 'Georgia', 'serif']` and custom color tokens |
| `src/App.tsx` | Nav scroll-aware transparency behavior, updated section order |
| `src/components/HeroSection.tsx` | Full-bleed photo, gradient overlay, repositioned content |
| `src/components/StatsStrip.tsx` | Warm palette, Lora values, correct rendering for col 3 |
| `src/components/InitiativesSection.tsx` | Warm bg, editorial layout, terracota numerals, orphan rule |
| `src/components/QuoteSection.tsx` | Lora, larger text, attribution with family name |
| `src/components/UpdatesSection.tsx` | Warm palette, Lora titles |
| `src/components/SupportSection.tsx` | Warm bg, Pix block dominant, copy interaction |
| `src/components/Footer.tsx` | Dark bg, Lora name, consolidate closing |

---

## Out of Scope

- Content changes beyond `family.pullQuote`, `family.mission`, and photo additions
- New sections not listed above
- Animation or scroll effects beyond the nav transparency transition
- Mobile hamburger menu
