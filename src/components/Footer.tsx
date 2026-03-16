import { campaign } from '../config/campaign'

export function Footer() {
  const year = new Date().getFullYear()
  const whatsappUrl = `https://wa.me/${campaign.whatsappNumber}?text=${encodeURIComponent(campaign.whatsappMessage)}`

  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white font-serif text-xl mb-2">{campaign.coupleName}</p>
        <p className="text-stone-500 text-sm mb-8">{campaign.location}</p>

        {/* Links de contato */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            WhatsApp
          </a>
          {campaign.instagram && (
            <a
              href={`https://instagram.com/${campaign.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          )}
          {campaign.email && (
            <a
              href={`mailto:${campaign.email}`}
              className="text-stone-400 hover:text-white transition-colors"
            >
              E-mail
            </a>
          )}
        </div>

        {/* Navegação */}
        <nav className="flex flex-wrap justify-center gap-5 mb-8 text-xs text-stone-500">
          <a href="#historia" className="hover:text-stone-300 transition-colors">Nossa história</a>
          <a href="#chamado" className="hover:text-stone-300 transition-colors">O chamado</a>
          <a href="#a-casa" className="hover:text-stone-300 transition-colors">A casa</a>
          <a href="#campanha" className="hover:text-stone-300 transition-colors">A campanha</a>
          <a href="#como-apoiar" className="hover:text-stone-300 transition-colors">Como apoiar</a>
          <a href="#transparencia" className="hover:text-stone-300 transition-colors">Transparência</a>
        </nav>

        <div className="h-px bg-stone-700 mb-6" />

        <p className="text-stone-600 text-xs">
          © {year} {campaign.coupleName} · Campanha {campaign.projectName}
        </p>
      </div>
    </footer>
  )
}
