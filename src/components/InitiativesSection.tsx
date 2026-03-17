import { initiatives } from '../content/initiatives'

export function InitiativesSection() {
  return (
    <section id="frentes" className="py-16 md:py-24 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
            O que fazemos
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
            Frentes de trabalho
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-l border-stone-200">
          {initiatives.map((initiative, index) => (
            <div
              key={initiative.id}
              className="border-b border-r border-stone-200 p-8 md:p-10"
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="text-xs font-medium text-stone-300 mt-0.5 tabular-nums w-5 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-1">
                    {initiative.label}
                  </p>
                  <h3 className="text-base font-semibold text-stone-900 leading-snug">
                    {initiative.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 pl-9">
                {initiative.paragraphs.map((p, i) => (
                  <p key={i} className="text-stone-600 text-[15px] leading-relaxed">
                    {p}
                  </p>
                ))}
                {initiative.link && (
                  <div className="pt-2">
                    {initiative.link.url ? (
                      <a
                        href={initiative.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2"
                      >
                        {initiative.link.text} ↗
                      </a>
                    ) : (
                      <span className="text-xs text-stone-300">
                        {initiative.link.text}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
