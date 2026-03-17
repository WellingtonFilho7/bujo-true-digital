import { updates } from '../content/updates'

export function UpdatesSection() {
  if (updates.length === 0) return null

  const [latest, ...rest] = updates

  return (
    <section id="diario" className="bg-canvas py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
            Diário de campo
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
            Atualizações
          </h2>
        </div>

        {/* Entrada mais recente — layout com foto */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-16 pb-16 border-b border-stone-100">
          <div className="flex-1 order-2 md:order-1">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
              {latest.date}
            </p>
            <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug mb-6">
              {latest.title}
            </h3>
            <div className="space-y-4">
              {latest.paragraphs.map((p, i) => (
                <p key={i} className="text-stone-600 text-[15px] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[36%] flex-shrink-0 order-1 md:order-2">
            <img
              src="/images/casa-1.jpeg"
              alt="A casa em Gurinhém"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>

        {/* Entradas anteriores */}
        {rest.length > 0 && (
          <div className="space-y-12">
            {rest.map((update, index) => (
              <div key={index} className="flex gap-8 md:gap-12">
                <div className="w-20 flex-shrink-0 pt-0.5">
                  <p className="text-xs font-medium text-stone-400 leading-snug">
                    {update.date}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    {update.title}
                  </h3>
                  <div className="space-y-3">
                    {update.paragraphs.map((p, i) => (
                      <p key={i} className="text-stone-600 text-[15px] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
