import type { StatsItem } from '../content/site'

export function StatsStrip({ items }: { items: StatsItem[] }) {
  return (
    <section className="border-y border-stone-200 bg-canvas py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 divide-y divide-stone-200 md:grid-cols-4 md:divide-x md:divide-y-0">
          {items.map((item) => (
            <div key={`${item.value}-${item.label ?? 'single'}`} className="flex min-h-28 flex-col items-center justify-center px-4 py-6 text-center">
              <span className="font-serif text-xl font-semibold text-stone-900 md:text-2xl">
                {item.value}
              </span>
              {item.label ? (
                <span className="mt-1 text-xs text-stone-500">{item.label}</span>
              ) : (
                <span className="mt-1 h-4" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
