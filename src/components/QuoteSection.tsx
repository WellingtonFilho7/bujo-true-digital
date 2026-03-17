import { family } from "../content/family"

export function QuoteSection() {
  return (
    <section className="bg-ink py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-3xl md:text-5xl font-semibold text-white leading-snug max-w-3xl mx-auto">
          "{family.pullQuote}"
        </p>
        <p className="text-xs uppercase tracking-widest text-stone-500 mt-6">
          — Wellington e Dyanna Nascimento
        </p>
      </div>
    </section>
  )
}
