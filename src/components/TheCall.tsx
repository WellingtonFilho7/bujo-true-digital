import { story } from '../content/story'
import { campaign } from '../config/campaign'

export function TheCall() {
  return (
    <section id="chamado" className="py-20 px-6 bg-amber-50">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            Por que o interior
          </p>
          <h2 className="text-stone-800 text-3xl md:text-4xl font-serif leading-snug">
            {story.callTitle}
          </h2>
        </div>

        {/* Destaque de localidade */}
        <div className="bg-amber-100 border border-amber-200 rounded-2xl p-8 mb-10 text-center">
          <span className="text-4xl mb-3 block">🗺️</span>
          <p className="text-amber-900 text-xl font-serif font-semibold">{campaign.location}</p>
          <p className="text-amber-700 text-sm mt-1">Nosso próximo destino</p>
        </div>

        {/* Texto do chamado */}
        <p className="text-stone-600 text-lg leading-relaxed mb-8 font-serif italic text-center">
          {story.callText.trim()}
        </p>

        <div className="h-px bg-amber-200 my-10 w-24 mx-auto" />

        <p className="text-stone-600 text-base leading-relaxed text-center">
          {story.callVision.trim()}
        </p>

        {/* Elementos visuais de impacto */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🏘️", label: "Comunidades carentes", desc: "Onde construímos relacionamentos" },
            { icon: "✝️",  label: "Presença constante",   desc: "Não somos de passagem" },
            { icon: "🌱",  label: "Visão de longo prazo",  desc: "Raízes, não só resultados" },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-amber-100">
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p className="text-stone-800 font-semibold text-sm mb-1">{item.label}</p>
              <p className="text-stone-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
