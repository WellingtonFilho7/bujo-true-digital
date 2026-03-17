import { initiatives } from '../content/initiatives'

export function InitiativesSection() {
  return (
    <section id="frentes" className="bg-surface py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Frentes de trabalho</p>
          <h2 className="font-serif text-3xl font-bold text-stone-900">O que fazemos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {initiatives.map((item, i) => (
            <div
              key={item.id}
              className={`relative bg-canvas overflow-hidden ${
                i === initiatives.length - 1 && initiatives.length % 2 !== 0
                  ? 'md:col-span-2 max-w-2xl'
                  : ''
              }`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-video object-cover"
                />
              )}

              <div className="relative p-8">
                <span
                  aria-hidden
                  className="absolute -top-4 -left-2 font-serif text-8xl font-bold text-accent/20 select-none leading-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative">
                  <p className="text-xs uppercase tracking-widest text-accent mb-2">{item.label}</p>
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">{item.title}</h3>
                  {item.paragraphs.map((p, j) => (
                    <p key={j} className="text-[15px] text-stone-600 leading-relaxed mb-2 last:mb-0">{p}</p>
                  ))}
                  {item.link && (
                    <a
                      href={item.link.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs text-stone-400 underline hover:text-stone-600 transition-colors"
                    >
                      {item.link.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
