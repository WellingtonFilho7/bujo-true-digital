import { QRCodeSVG } from 'qrcode.react'
import { campaign } from '../config/campaign'

export function HowToSupport() {
  const { pixKey, pixName, whatsappNumber, whatsappMessage, donationPlatformUrl, donationPlatformName } = campaign

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Payload Pix estático (formato BR Code simplificado para exibição)
  const pixPayload = `PIX: ${pixKey}`

  return (
    <section id="como-apoiar" className="py-20 px-6 bg-stone-800 text-white">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-3">
            Como apoiar
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-serif leading-snug">
            Formas de contribuir
          </h2>
          <p className="text-stone-400 mt-4 text-base">
            Escolha a forma que for mais fácil para você.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Pix */}
          <div className="bg-stone-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-xl">⚡</span>
              </div>
              <div>
                <p className="text-white font-semibold">Pix</p>
                <p className="text-stone-400 text-xs">Transferência instantânea</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-xl p-4 flex justify-center mb-4">
              <QRCodeSVG
                value={pixPayload}
                size={160}
                level="M"
                includeMargin={false}
              />
            </div>

            {/* Chave copiável */}
            <div className="bg-stone-600 rounded-lg p-3 text-center">
              <p className="text-stone-400 text-xs mb-1">Chave Pix</p>
              <p className="text-white font-mono text-sm break-all">{pixKey}</p>
            </div>
            <p className="text-stone-400 text-xs text-center mt-2">
              Favorecido: {pixName}
            </p>
          </div>

          {/* WhatsApp + Plataforma */}
          <div className="flex flex-col gap-4">
            {/* WhatsApp */}
            <div className="bg-stone-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">WhatsApp</p>
                  <p className="text-stone-400 text-xs">Conversa direta com a gente</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors text-sm"
              >
                Abrir conversa
              </a>
            </div>

            {/* Plataforma de donatívos (se configurada) */}
            {donationPlatformUrl && (
              <div className="bg-stone-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 text-xl">🔗</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{donationPlatformName}</p>
                    <p className="text-stone-400 text-xs">Plataforma de donatívos</p>
                  </div>
                </div>
                <a
                  href={donationPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  Acessar {donationPlatformName}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Aviso de transparência */}
        <div className="border border-stone-600 rounded-xl p-5 text-center">
          <p className="text-stone-400 text-sm">
            🔒 Após sua contribuição, enviaremos uma confirmação e um relatório do progresso diretamente pelo WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
}
