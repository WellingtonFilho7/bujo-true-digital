import { story } from '../content/story'

export function TheHouse() {
  return (
    <section id="a-casa" className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            A nova fase
          </p>
          <h2 className="text-stone-800 text-3xl md:text-4xl font-serif leading-snug">
            {story.houseTitle}
          </h2>
        </div>

        {/* Fotos da casa — coloque em public/images/casa-1.jpg e casa-2.jpg */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-stone-200 h-52 md:h-72">
              <img
                src={`/images/casa-${i}.jpg`}
                alt={`Foto da casa ${i}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  if (t.parentElement) {
                    t.parentElement.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center gap-2"><span class="text-3xl">🏠</span><p class="text-stone-400 text-xs">casa-${i}.jpg</p></div>`
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Texto sobre a casa */}
        <p className="text-stone-600 text-lg leading-relaxed mb-6 font-serif italic text-center">
          {story.houseText.trim()}
        </p>

        {/* Destaque: por que a reforma importa */}
        <div className="bg-stone-800 text-stone-100 rounded-2xl p-8 mt-10">
          <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-3">
            Por que a reforma importa
          </p>
          <p className="text-stone-200 text-base leading-relaxed">
            {story.houseWhy.trim()}
          </p>
        </div>
      </div>
    </section>
  )
}
