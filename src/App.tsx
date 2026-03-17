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
