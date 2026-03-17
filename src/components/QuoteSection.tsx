import { family } from "../content/family"

export function QuoteSection() {
  return (
    <section className="bg-stone-900 py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-2xl md:text-4xl font-semibold text-white leading-snug tracking-tight">
          "{family.pullQuote}"
        </p>
        <p className="mt-6 text-xs font-medium tracking-widest uppercase text-stone-500">
          Wellington e Dyanna Nascimento
        </p>
      </div>
    </section>
  )
}
