import { story } from '../content/story'

export function Transparency() {
  return (
    <section id="transparencia" className="py-20 px-6 bg-amber-50">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            Compromisso
          </p>
          <h2 className="text-stone-800 text-3xl md:text-4xl font-serif leading-snug">
            {story.transparencyTitle}
          </h2>
        </div>

        {/* Cards de compromissos */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            {
              icon: "📋",
              title: "Destino específico",
              desc: "100% dos recursos vão diretamente para a reforma. Nada para custeio pessoal.",
            },
            {
              icon: "📸",
              title: "Relatório com fotos",
              desc: "A cada etapa concluída, enviamos fotos e recibos para quem contribuiu.",
            },
            {
              icon: "💬",
              title: "Sempre disponíveis",
              desc: "Qualquer dúvida, é só chamar pelo WhatsApp. Sem robôs, somos nós.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 text-center">
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p className="text-stone-800 font-semibold text-sm mb-2">{item.title}</p>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Texto detalhado */}
        <div className="bg-white rounded-2xl p-8 border border-amber-100 shadow-sm mb-8">
          <p className="text-stone-600 text-base leading-relaxed mb-4">
            {story.transparencyText.trim()}
          </p>
          <div className="border-t border-stone-100 pt-4 mt-4">
            <p className="text-amber-700 text-sm font-medium">📅 {story.transparencyReport}</p>
          </div>
        </div>

        {/* Convite final */}
        <div className="text-center">
          <h3 className="text-stone-800 text-2xl font-serif mb-4">
            {story.finalCallTitle}
          </h3>
          <p className="text-stone-600 text-base leading-relaxed max-w-xl mx-auto">
            {story.finalCallText.trim()}
          </p>
        </div>
      </div>
    </section>
  )
}
