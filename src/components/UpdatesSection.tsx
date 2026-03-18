import type { UpdatesContent } from '../content/site'

export function UpdatesSection({ content }: { content: UpdatesContent }) {
  if (content.items.length === 0) return null

  const [latest, ...rest] = content.items

  return (
    <section id="diario" className="bg-canvas py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm text-stone-500">{content.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-stone-900 md:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="grid gap-8 border-b border-stone-200 pb-14 md:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] md:items-start md:gap-14">
          <div>
            <p className="text-sm text-stone-500">{latest.date}</p>
            <h3 className="mt-3 max-w-2xl text-balance font-serif text-2xl font-semibold text-stone-900 md:text-3xl">
              {latest.title}
            </h3>
            <div className="mt-5 space-y-4">
              {latest.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-pretty text-[15px] leading-7 text-stone-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <img
            src={content.featuredImage.src}
            alt={content.featuredImage.alt}
            width={content.featuredImage.width}
            height={content.featuredImage.height}
            loading="lazy"
            decoding="async"
            className="w-full rounded-[28px] object-cover shadow-sm"
          />
        </div>

        {rest.length > 0 ? (
          <div className="mt-10 space-y-10">
            {rest.map((update) => (
              <article key={`${update.date}-${update.title}`} className="grid gap-4 md:grid-cols-[140px_minmax(0,1fr)]">
                <p className="pt-1 text-sm text-stone-500">{update.date}</p>
                <div>
                  <h3 className="text-balance font-serif text-xl font-semibold text-stone-900">
                    {update.title}
                  </h3>
                  <div className="mt-3 space-y-3">
                    {update.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-pretty text-[15px] leading-7 text-stone-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
