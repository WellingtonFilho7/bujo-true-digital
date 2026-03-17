import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { campaign } from '../config/campaign'
import { family } from '../content/family'
import { pixPayload } from '../utils/pix'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function SupportSection() {
  const [copied, setCopied] = useState(false)
  const whatsappUrl = `https://wa.me/${campaign.whatsappNumber}?text=${encodeURIComponent(campaign.whatsappMessage)}`
  const qr = pixPayload(campaign.pixKey, campaign.pixName)

  async function copyKey() {
    await navigator.clipboard.writeText(campaign.pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="como-ajudar" className="py-16 md:py-24 px-6 bg-stone-50 border-t border-stone-100">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
            Como ajudar
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 leading-snug mb-5">
            Caminhar junto
          </h2>
          <p className="text-stone-600 text-[15px] leading-relaxed max-w-xl">
            {family.supportIntro}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">

          {/* Pix */}
          <div className="flex-1 bg-white border border-stone-200 p-8">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">Pix</p>

            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="border border-stone-100 p-2 shrink-0">
                <QRCodeSVG value={qr} size={120} level="M" />
              </div>
              <div className="flex flex-col justify-center gap-3">
                <div>
                  <p className="text-xs text-stone-400 mb-0.5">Chave CPF</p>
                  <p className="font-mono text-sm text-stone-800">{campaign.pixKey}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{campaign.pixName}</p>
                </div>
                <button
                  onClick={copyKey}
                  className="self-start text-xs border border-stone-300 hover:border-stone-600 text-stone-600 hover:text-stone-900 px-3 py-1.5 transition-colors"
                >
                  {copied ? '✓ Chave copiada' : 'Copiar chave'}
                </button>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex-1 bg-white border border-stone-200 p-8 flex flex-col">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">WhatsApp</p>
            <p className="text-stone-600 text-[15px] leading-relaxed mb-6 flex-1">
              Para conversar, tirar dúvidas ou se tornar um mantenedor — é só chamar.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 text-sm border border-stone-300 hover:border-stone-600 text-stone-700 hover:text-stone-900 px-4 py-2 transition-colors"
            >
              <WhatsAppIcon />
              Mandar mensagem
            </a>
          </div>

        </div>

        <div className="mt-14 pt-10 border-t border-stone-200">
          <p className="text-stone-500 text-[15px]">{family.closing}</p>
          <p className="text-stone-700 text-[15px] mt-1 italic">{family.signature}</p>
        </div>

      </div>
    </section>
  )
}
