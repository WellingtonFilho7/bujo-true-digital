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
