import type { QuoteContent } from '../content/site'

export function QuoteSection({ content }: { content: QuoteContent }) {
  return (
    <section className="bg-ink py-20 text-white md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mx-auto max-w-4xl text-balance font-serif text-3xl leading-tight font-semibold md:text-5xl">
          “{content.text}”
        </p>
        <p className="mt-6 text-sm text-stone-400">{content.attribution}</p>
      </div>
    </section>
  )
}
