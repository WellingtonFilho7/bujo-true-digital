import { campaign } from '../config/campaign'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Hero() {
  const whatsappUrl = `https://wa.me/${campaign.whatsappNumber}?text=${encodeURIComponent(campaign.whatsappMessage)}`

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Foto de fundo — coloque sua foto em public/images/hero.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Tag de contexto */}
        <p className="inline-block text-amber-300 text-sm font-medium tracking-widest uppercase mb-6">
          Uma Nova Fase
        </p>

        {/* Título principal */}
        <h1 className="text-white text-4xl md:text-6xl font-serif leading-tight mb-6">
          {campaign.coupleName}
        </h1>

        {/* Tagline */}
        <p className="text-stone-200 text-lg md:text-xl font-serif italic leading-relaxed mb-8 max-w-xl mx-auto">
          "{campaign.tagline}"
        </p>

        {/* Destino */}
        <p className="text-amber-200 text-base mb-10">
          📍 {campaign.location}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#campanha"
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-4 rounded-full transition-colors text-base"
          >
            Ver a campanha
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-full transition-colors text-base"
          >
            <WhatsAppIcon />
            Fale conosco
          </a>
        </div>
      </div>

      {/* Seta de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
