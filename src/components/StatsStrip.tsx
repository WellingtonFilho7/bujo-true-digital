const stats = [
  { value: "5", label: "filhos" },
  { value: "3", label: "frentes" },
  { value: "Igreja · Escola · Casa", label: "em um lugar" },
  { value: "Gurinhém", label: "Paraíba" },
]

export function StatsStrip() {
  return (
    <div className="border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-stone-100 md:divide-x">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center px-4 py-4 md:py-0">
            <span className="text-xl md:text-2xl font-semibold text-stone-900 tracking-tight">
              {s.value}
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase text-stone-400 mt-1">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
