import { initiatives } from '../content/initiatives'

export function InitiativesSection() {
  return (
    <section id="frentes" className="py-14 px-6 border-t border-stone-100">
      <div className="max-w-2xl mx-auto">

        <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
          O que fazemos
        </p>
        <h2 className="text-stone-800 text-2xl md:text-3xl font-serif leading-snug mb-12">
          Frentes de trabalho
        </h2>

        <div className="divide-y divide-stone-100">
          {initiatives.map((initiative) => (
            <div key={initiative.id} className="py-10 first:pt-0">
              <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
                {initiative.label}
              </p>
              <h3 className="text-stone-800 text-xl md:text-2xl font-serif leading-snug mb-5">
                {initiative.title}
              </h3>
              <div className="space-y-4">
                {initiative.paragraphs.map((p, i) => (
                  <p key={i} className="text-stone-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {initiative.link && (
                <div className="mt-5">
                  {initiative.link.url ? (
                    <a
                      href={initiative.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
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
          ))}
        </div>

      </div>
    </section>
  )
}
