export function StatsStrip() {
  return (
    <section className="bg-canvas py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-stone-200">

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-2xl font-semibold text-stone-900">5</span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">filhos</span>
          </div>

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-2xl font-semibold text-stone-900">5</span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">frentes</span>
          </div>

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-base font-semibold text-stone-900">Igreja · Escola · Casa</span>
          </div>

          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span className="font-serif text-2xl font-semibold text-stone-900">Gurinhém</span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">Paraíba</span>
          </div>

        </div>
      </div>
    </section>
  )
}
