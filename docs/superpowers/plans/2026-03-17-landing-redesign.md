# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the missionary family landing page with a warm, photo-first aesthetic — full-bleed hero, Lora serif, terracota accent, dark/light section rhythm.

**Architecture:** All changes are in-place rewrites of existing components. The only structural change is removing the closing/signature block from `SupportSection` and moving it to `Footer`. No new files are created except `public/images/hero.jpg` (placeholder for user-provided photo). Navigation gains scroll-aware transparency via a `useEffect` hook added to the existing `Nav` function in `App.tsx`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4 (`@theme` blocks in CSS, no `tailwind.config.js`), Vite, `qrcode.react`, Google Fonts (Lora)

---

## File Map

| File | Change |
|------|--------|
| `src/index.css` | Add Lora Google Fonts import + `--font-serif` and color tokens to `@theme` block; update body background |
| `src/content/family.ts` | Update `pullQuote` string |
| `src/App.tsx` | Add `useEffect` import; give `ShareButton` a `scrolled` prop; add scroll state + listener to `Nav` |
| `src/components/HeroSection.tsx` | Complete rewrite: full-bleed photo, gradient overlay, content at bottom |
| `src/components/StatsStrip.tsx` | Complete rewrite: Lora values, `5` frentes, col 3 label-less rendering, warm bg |
| `src/components/InitiativesSection.tsx` | Complete rewrite: editorial cards with decorative terracota numerals |
| `src/components/QuoteSection.tsx` | Rewrite: Lora, larger text, em-dash attribution |
| `src/components/UpdatesSection.tsx` | Targeted edits: bg-canvas, `font-serif` on `h2` and `h3` only |
| `src/components/SupportSection.tsx` | Targeted edits: bg-surface, Lora on Pix key, Pix block padding, fgColor, feedback strings; remove closing block |
| `src/components/Footer.tsx` | Rewrite: Lora name, import `family`, add closing/signature block |

---

## Verification command (run after each task)

```bash
npm run build
```

Expected: `✓ built in Xs` with no TypeScript errors. If this fails, fix before committing.

---

## Task 1: Foundation — CSS tokens, Lora, pullQuote

**Files:**
- Modify: `src/index.css`
- Modify: `src/content/family.ts`

- [ ] **Step 1: Update `src/index.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');

@theme {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-serif: "Lora", "Georgia", serif;

  --color-canvas: #FAF8F5;
  --color-surface: #F0EDE8;
  --color-ink: #1C1917;
  --color-accent: #A8522A;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-canvas);
  color: var(--color-ink);
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  width: 100%;
}

section[id] {
  scroll-margin-top: 60px;
}
```

- [ ] **Step 2: Update `src/content/family.ts` — pullQuote**

Change only the `pullQuote` line (line 17):

```diff
-  pullQuote: "Vida, ministério e rotina — no mesmo lugar.",
+  pullQuote: "Não estamos construindo um projeto. Estamos vivendo uma vida.",
```

- [ ] **Step 3: Verify build**

```bash
cd /home/user/bujo-true-digital && npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/content/family.ts
git commit -m "feat: add Lora font, color tokens, update pullQuote"
```

---

## Task 2: Nav — scroll-aware transparency

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite `src/App.tsx`**

Replace the entire file:

```tsx
import { useState, useEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { StatsStrip } from './components/StatsStrip'
import { InitiativesSection } from './components/InitiativesSection'
import { QuoteSection } from './components/QuoteSection'
import { UpdatesSection } from './components/UpdatesSection'
import { SupportSection } from './components/SupportSection'
import { Footer } from './components/Footer'
import { campaign } from './config/campaign'

function ShareButton({ scrolled }: { scrolled: boolean }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: `${campaign.coupleName} — ${campaign.location}`,
        text: "Conheça o trabalho de Wellington e Dyanna em Gurinhém, PB.",
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`text-sm transition-colors duration-200 flex items-center gap-1.5 ${
        scrolled ? 'text-stone-500 hover:text-stone-900' : 'text-white/80 hover:text-white'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? 'Link copiado' : 'Compartilhar'}
    </button>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
          scrolled ? 'text-stone-900' : 'text-white'
        }`}>
          {campaign.coupleName}
        </span>
        <nav className="hidden sm:flex items-center gap-6">
          {[
            { label: "Frentes", href: "#frentes" },
            { label: "Diário", href: "#diario" },
            { label: "Apoio", href: "#como-ajudar" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-sm transition-colors duration-200 ${
                scrolled ? 'text-stone-500 hover:text-stone-900' : 'text-white/80 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
          <ShareButton scrolled={scrolled} />
        </nav>
      </div>
    </header>
  )
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <StatsStrip />
        <InitiativesSection />
        <QuoteSection />
        <UpdatesSection />
        <SupportSection />
        <Footer />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: nav transparent over hero, transitions on scroll"
```

---

## Task 3: Hero — full-bleed photo layout

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Note on hero image:** The component references `/images/hero.jpg`. During development, create a placeholder by copying the existing family photo:
```bash
cp public/images/familia.jpeg public/images/hero.jpg
```
The user will replace this with the final photo.

- [ ] **Step 1: Create placeholder hero image**

```bash
cp public/images/familia.jpeg public/images/hero.jpg
```

- [ ] **Step 2: Rewrite `src/components/HeroSection.tsx`**

```tsx
import { family } from "../content/family"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink">
      <img
        src="/images/hero.jpg"
        alt="Wellington e Dyanna Nascimento"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
            {family.location}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            {family.names}
          </h1>
          <p className="text-lg text-white/80 mt-3">
            {family.mission}
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href="#frentes"
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              ↓ Conheça o trabalho
            </a>
            <a
              href="#como-ajudar"
              className="text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              Como apoiar →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add public/images/hero.jpg src/components/HeroSection.tsx
git commit -m "feat: hero full-bleed photo layout with gradient overlay"
```

---

## Task 4: Stats Strip — Lora, 5 frentes, col 3 label-less

**Files:**
- Modify: `src/components/StatsStrip.tsx`

- [ ] **Step 1: Rewrite `src/components/StatsStrip.tsx`**

Col 3 (`Igreja · Escola · Casa`) is rendered without a label row. Cols 1, 2, 4 follow the standard value+label pattern.

```tsx
export function StatsStrip() {
  return (
    <section className="bg-canvas py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-stone-200">

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-2xl font-semibold text-stone-900">5</span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">filhos</span>
          </div>

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-2xl font-semibold text-stone-900">5</span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">frentes</span>
          </div>

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-base font-semibold text-stone-900">Igreja · Escola · Casa</span>
          </div>

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-2xl font-semibold text-stone-900">Gurinhém</span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">Paraíba</span>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/StatsStrip.tsx
git commit -m "feat: stats strip — Lora values, 5 frentes, warm bg"
```

---

## Task 5: Initiatives — editorial cards with decorative numerals

**Files:**
- Modify: `src/components/InitiativesSection.tsx`

The decorative numeral is `aria-hidden` and `absolute` positioned behind the card content. The 5th card (odd count) spans both columns on desktop with `max-w-2xl` to avoid stretching.

- [ ] **Step 1: Rewrite `src/components/InitiativesSection.tsx`**

```tsx
import { initiatives } from '../content/initiatives'

export function InitiativesSection() {
  return (
    <section id="frentes" className="bg-surface py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Frentes de trabalho</p>
          <h2 className="font-serif text-3xl font-bold text-stone-900">O que fazemos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {initiatives.map((item, i) => (
            <div
              key={item.id}
              className={`relative bg-canvas p-8 overflow-hidden ${
                i === initiatives.length - 1 && initiatives.length % 2 !== 0
                  ? 'md:col-span-2 max-w-2xl'
                  : ''
              }`}
            >
              <span
                aria-hidden
                className="absolute -top-4 -left-2 font-serif text-8xl font-bold text-accent/20 select-none leading-none pointer-events-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative">
                <p className="text-xs uppercase tracking-widest text-accent mb-2">{item.label}</p>
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">{item.title}</h3>
                {item.paragraphs.map((p, j) => (
                  <p key={j} className="text-[15px] text-stone-600 leading-relaxed mb-2 last:mb-0">{p}</p>
                ))}
                {item.link && (
                  <a
                    href={item.link.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-stone-400 underline hover:text-stone-600 transition-colors"
                  >
                    {item.link.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/InitiativesSection.tsx
git commit -m "feat: initiatives editorial layout with decorative numerals"
```

---

## Task 6: Quote Section — Lora, larger text, em-dash attribution

**Files:**
- Modify: `src/components/QuoteSection.tsx`

- [ ] **Step 1: Rewrite `src/components/QuoteSection.tsx`**

```tsx
import { family } from "../content/family"

export function QuoteSection() {
  return (
    <section className="bg-ink py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-3xl md:text-5xl font-semibold text-white leading-snug max-w-3xl mx-auto">
          "{family.pullQuote}"
        </p>
        <p className="text-xs uppercase tracking-widest text-stone-500 mt-6">
          — Wellington e Dyanna Nascimento
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/QuoteSection.tsx
git commit -m "feat: quote section — Lora, larger text, em-dash attribution"
```

---

## Task 7: Updates Section — bg-canvas, Lora headings

**Files:**
- Modify: `src/components/UpdatesSection.tsx`

Only three changes: add `bg-canvas px-6` to the section, add `font-serif` to the `h2`, add `font-serif` to the `h3`. Everything else stays identical.

- [ ] **Step 1: Edit `src/components/UpdatesSection.tsx` — section background**

Change line 9:
```diff
-    <section id="diario" className="py-16 md:py-24 px-6">
+    <section id="diario" className="bg-canvas py-16 md:py-24 px-6">
```

- [ ] **Step 2: Edit — h2 font**

Change line 16:
```diff
-          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
+          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
```

- [ ] **Step 3: Edit — featured update h3 font**

Change line 27:
```diff
-            <h3 className="text-xl font-semibold text-stone-900 leading-snug mb-6">
+            <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug mb-6">
```

- [ ] **Step 4: Edit — previous updates h3 font**

Change line 60:
```diff
-                  <h3 className="text-base font-semibold text-stone-900 mb-3">
+                  <h3 className="font-serif text-base font-semibold text-stone-900 mb-3">
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/UpdatesSection.tsx
git commit -m "feat: updates section — bg-canvas, Lora headings"
```

---

## Task 8: Support Section — warm bg, Pix block, Lora key

**Files:**
- Modify: `src/components/SupportSection.tsx`

Changes:
1. Section background: `bg-stone-50 border-t border-stone-100` → `bg-surface`
2. `h2` → add `font-serif`
3. Pix block: `bg-stone-900 p-8 md:p-12` → `bg-ink p-10 md:p-14`
4. QR border removed (was `border-2 border-stone-700 p-3`)
5. QR `fgColor`: `#f5f5f4` → `#FAF8F5`
6. QR size: `160` → `180`
7. Pix key font: `font-mono text-xl md:text-2xl tracking-tight` → `font-serif text-2xl`
8. Copy confirmation: `'✓ Chave copiada'` → `'✓ Copiado!'`
9. Remove the closing/signature block at the bottom (lines 127–130) — it moves to Footer

- [ ] **Step 1: Edit section opening tag**

```diff
-    <section id="como-ajudar" className="py-16 md:py-24 px-6 bg-stone-50 border-t border-stone-100">
+    <section id="como-ajudar" className="py-16 md:py-24 px-6 bg-surface">
```

- [ ] **Step 2: Edit h2 — add font-serif**

```diff
-          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-5">
+          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-5">
```

- [ ] **Step 3: Edit Pix block container**

```diff
-        <div className="bg-stone-900 p-8 md:p-12 mb-6">
+        <div className="bg-ink p-10 md:p-14 mb-6">
```

- [ ] **Step 4: Edit QR code — remove wrapper border div, update size and fgColor**

Replace:
```tsx
            <div className="border-2 border-stone-700 p-3 shrink-0">
              <QRCodeSVG value={qr} size={160} level="M" bgColor="#1c1917" fgColor="#f5f5f4" />
            </div>
```

With:
```tsx
            <div className="shrink-0">
              <QRCodeSVG value={qr} size={180} level="M" bgColor="#1C1917" fgColor="#FAF8F5" />
            </div>
```

- [ ] **Step 5: Edit Pix key typography**

```diff
-                <p className="font-mono text-xl md:text-2xl font-semibold text-white tracking-tight">
+                <p className="font-serif text-2xl font-semibold text-white">
```

- [ ] **Step 6: Edit copy confirmation string**

```diff
-                {copied ? '✓ Chave copiada' : 'Copiar chave Pix'}
+                {copied ? '✓ Copiado!' : 'Copiar chave Pix'}
```

- [ ] **Step 7: Remove closing block from SupportSection**

Delete the closing/signature block. It moves to Footer in the next task.

Find and remove:
```tsx
        <div className="mt-14 pt-10 border-t border-stone-200">
          <p className="text-stone-500 text-[15px]">{family.closing}</p>
          <p className="text-stone-700 text-[15px] mt-1 italic">{family.signature}</p>
        </div>
```

After removal, the file should end with `</div>` (closing `max-w-5xl` wrapper), then `</section>`, then `}`.

- [ ] **Step 8: Verify build**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add src/components/SupportSection.tsx
git commit -m "feat: support section — bg-surface, Lora Pix key, updated Pix block"
```

---

## Task 9: Footer — bg-ink, Lora name, closing block

**Files:**
- Modify: `src/components/Footer.tsx`

Changes:
1. Import `family`
2. `bg-stone-900` → `bg-ink` (same color, but uses the token)
3. Name: `text-sm font-medium text-stone-100` → `font-serif text-lg font-semibold text-white`
4. Add closing/signature block below the links row

- [ ] **Step 1: Rewrite `src/components/Footer.tsx`**

```tsx
import { campaign } from '../config/campaign'
import { family } from '../content/family'

export function Footer() {
  return (
    <footer className="bg-ink py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="font-serif text-lg font-semibold text-white">{campaign.coupleName}</p>
            <p className="text-sm text-stone-400 mt-0.5">{campaign.location}</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-stone-400">
            <a
              href={`https://instagram.com/${campaign.instagram1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @{campaign.instagram1}
            </a>
            <a
              href={`https://instagram.com/${campaign.instagram2}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @{campaign.instagram2}
            </a>
            <a
              href={`mailto:${campaign.email}`}
              className="hover:text-white transition-colors"
            >
              {campaign.email}
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8">
          <p className="text-stone-500 text-[15px]">{family.closing}</p>
          <p className="text-stone-400 text-[15px] mt-1 italic">{family.signature}</p>
        </div>

      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: footer — Lora name, closing/signature block"
```

---

## Task 10: Final verification and push

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: clean build, no errors or warnings.

- [ ] **Step 2: Visual check in dev server**

```bash
npm run dev
```

Open the local URL and verify:
- [ ] Nav is transparent over Hero, white with shadow after scrolling past top
- [ ] Hero fills the viewport with photo, gradient, family name in Lora
- [ ] Stats show `5 filhos`, `5 frentes`, `Igreja · Escola · Casa`, `Gurinhém`
- [ ] Initiatives cards have terracota decorative numerals
- [ ] Quote section shows the new pullQuote in large Lora
- [ ] Updates section has warm background
- [ ] Support section Pix key is in Lora (not monospace)
- [ ] Footer has closing/signature block

- [ ] **Step 3: Push**

```bash
git push -u origin claude/clear-repo-fresh-start-n1Sug
```

---

## Photos — list for the user

Once the redesign is live, swap in the final photos by placing them in `public/images/`:

| Filename | Description | Used in |
|----------|-------------|---------|
| `hero.jpg` | **Família — retrato amplo, horizontal, boa iluminação natural, rostos visíveis** | Hero full-bleed background |
| `frente-igreja.jpg` | Wellington pregando ou ensinando, ambiente de igreja | Cards de frentes (opcional) |
| `frente-lumine.jpg` | Dyanna com crianças / sala de aula | Cards de frentes (opcional) |
| `cotidiano.jpg` | Família em Gurinhém — rua, casa, cotidiano | Seção Apoio (opcional) |

Photo 1 (`hero.jpg`) is the only required photo — the others are optional enhancements. Current placeholder: `familia.jpeg` (copied in Task 3).
