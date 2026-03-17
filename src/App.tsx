import { HeroSection } from './components/HeroSection'
import { InitiativesSection } from './components/InitiativesSection'
import { UpdatesSection } from './components/UpdatesSection'
import { SupportSection } from './components/SupportSection'
import { Footer } from './components/Footer'
import { campaign } from './config/campaign'

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-stone-900">
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
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              {label}
            </a>
          ))}
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
        <InitiativesSection />
        <UpdatesSection />
        <SupportSection />
        <Footer />
      </main>
    </>
  )
}

export default App
