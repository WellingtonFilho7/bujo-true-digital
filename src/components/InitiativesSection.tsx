import { siteConfig, type InitiativeItem } from '../content/site'
import { cn } from '../utils/cn'

export function InitiativesSection({
  eyebrow = siteConfig.initiatives.eyebrow,
  title = siteConfig.initiatives.title,
  items = siteConfig.initiatives.items,
}: {
  eyebrow?: string
  title?: string
  items?: InitiativeItem[]
}) {
  return (
    <section id="frentes" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-stone-900 md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const isLastOdd = index === items.length - 1 && items.length % 2 !== 0

            return (
              <article
                key={item.id}
                className={cn(
                  'relative overflow-hidden rounded-[30px] border border-stone-200 bg-canvas shadow-sm',
                  isLastOdd && 'md:col-span-2 md:mx-auto md:max-w-3xl',
                )}
              >
                {item.image ? (
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : null}

                <div className="relative p-7 md:p-8">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-3 select-none font-serif text-7xl leading-none text-accent/14"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <p className="text-sm text-accent">{item.label}</p>
                  <h3 className="mt-3 max-w-xl text-balance font-serif text-2xl font-semibold text-stone-900">
                    {item.title}
                  </h3>

                  <div className="mt-4 space-y-3">
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-pretty text-[15px] leading-7 text-stone-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {item.link?.href ? (
                    <a
                      href={item.link.href}
                      target={item.link.external ? '_blank' : undefined}
                      rel={item.link.external ? 'noopener noreferrer' : undefined}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-stone-700 underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {item.link.label}
                    </a>
                  ) : item.link ? (
                    <p className="mt-5 text-sm font-medium text-stone-500">{item.link.label}</p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
