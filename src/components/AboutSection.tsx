import type { AboutContent } from '../content/site'

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="quem-somos" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm text-accent">{content.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-serif text-3xl leading-tight font-semibold text-stone-900 md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 max-w-3xl text-pretty text-[15px] leading-7 text-stone-600 md:text-base">
            {content.lede}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {content.blocks.map((block) => (
            <article key={block.title} className="rounded-[28px] border border-stone-200 bg-canvas p-6 shadow-sm">
              <h3 className="text-balance font-serif text-xl font-semibold text-stone-900">
                {block.title}
              </h3>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-stone-600">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
