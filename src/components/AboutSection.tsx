import type { AboutContent } from '../content/site'

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="quem-somos" aria-label={content.eyebrow} className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm text-accent">{content.eyebrow}</p>
          <p className="mt-3 max-w-3xl text-balance font-serif text-3xl leading-tight font-semibold text-stone-900 md:text-5xl">
            {content.intro}
          </p>
        </div>

        <div className="mt-8 max-w-3xl space-y-5">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-pretty text-[15px] leading-7 text-stone-600 md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
