import { useEffect, useState } from 'react'

import { AboutSection } from './components/AboutSection'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { InitiativesSection } from './components/InitiativesSection'
import { QuoteSection } from './components/QuoteSection'
import { StatsStrip } from './components/StatsStrip'
import { SupportSection } from './components/SupportSection'
import { UpdatesSection } from './components/UpdatesSection'
import { siteConfig } from './content/site'
import { cn } from './utils/cn'
import { copyText, sharePage } from './utils/share'

function resetAfter(delay: number, callback: () => void) {
  window.setTimeout(callback, delay)
}

function ShareButton({ scrolled }: { scrolled: boolean }) {
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'error'>('idle')

  async function handleShare() {
    const result = await sharePage({ payload: siteConfig.sharePayload })

    if (result === 'cancelled' || result === 'shared') {
      return
    }

    if (result === 'copied') {
      setShareState('copied')
      resetAfter(2000, () => setShareState('idle'))
      return
    }

    setShareState('error')
    resetAfter(2000, () => setShareState('idle'))
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
        scrolled
          ? 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          : 'text-white hover:bg-white/10',
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span>
        {shareState === 'copied'
          ? siteConfig.nav.shareCopiedLabel
          : shareState === 'error'
            ? siteConfig.nav.shareErrorLabel
            : siteConfig.nav.shareLabel}
      </span>
    </button>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        scrolled ? 'border-stone-200 bg-white/96 text-stone-900' : 'border-transparent bg-transparent text-white',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="max-w-[12rem] text-balance font-serif text-base font-semibold sm:max-w-none sm:text-lg">
          {siteConfig.nav.brand}
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  scrolled ? 'text-stone-600 hover:bg-stone-100 hover:text-stone-900' : 'text-white/88 hover:bg-white/10 hover:text-white',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={siteConfig.nav.supportAction.href}
            className={cn(
              'inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors',
              scrolled ? 'bg-accent text-white hover:bg-[#934722]' : 'bg-white text-stone-900 hover:bg-stone-100',
            )}
          >
            {siteConfig.nav.supportAction.label}
          </a>
          <ShareButton scrolled={scrolled} />
        </div>
      </div>
    </header>
  )
}

function MobileSupportBar() {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleCopyPix() {
    const copied = await copyText(siteConfig.support.pixKey)

    if (!copied) {
      setCopyState('error')
      resetAfter(2000, () => setCopyState('idle'))
      return
    }

    setCopyState('success')
    resetAfter(2000, () => setCopyState('idle'))
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/96 px-4 py-3 shadow-lg md:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <button
          type="button"
          onClick={handleCopyPix}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800"
        >
          {copyState === 'success'
            ? siteConfig.support.stickyBar.copiedLabel
            : copyState === 'error'
              ? siteConfig.support.stickyBar.copyErrorLabel
              : siteConfig.support.stickyBar.copyLabel}
        </button>
        <a
          href={siteConfig.support.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-stone-900 px-4 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
        >
          {siteConfig.support.stickyBar.whatsappLabel}
        </a>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <Nav />
      <main className="pb-24 md:pb-0">
        <HeroSection content={siteConfig.hero} />
        <StatsStrip items={siteConfig.stats} />
        <AboutSection content={siteConfig.about} />
        <InitiativesSection eyebrow={siteConfig.initiatives.eyebrow} title={siteConfig.initiatives.title} items={siteConfig.initiatives.items} />
        <QuoteSection content={siteConfig.quote} />
        <UpdatesSection content={siteConfig.updates} />
        <SupportSection content={siteConfig.support} sharePayload={siteConfig.sharePayload} />
        <Footer content={siteConfig.footer} />
      </main>
      <MobileSupportBar />
    </>
  )
}

export default App
