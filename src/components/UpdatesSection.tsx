import { updates } from '../content/updates'

export function UpdatesSection() {
  if (updates.length === 0) return null

  return (
    <section id="diario" className="py-14 px-6 border-t border-stone-100">
      <div className="max-w-2xl mx-auto">

        <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
          Diário de campo
        </p>
        <h2 className="text-stone-800 text-2xl md:text-3xl font-serif leading-snug mb-12">
          Atualizações
        </h2>

        <div className="divide-y divide-stone-100">
          {updates.map((update, index) => (
            <div key={index} className="py-10 first:pt-0">
              <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
                {update.date}
              </p>
              <h3 className="text-stone-800 text-xl font-serif leading-snug mb-5">
                {update.title}
              </h3>
              <div className="space-y-4">
                {update.paragraphs.map((p, i) => (
                  <p key={i} className="text-stone-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
