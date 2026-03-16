import { story } from '../content/story'

export function Story() {
  return (
    <section id="historia" className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            Quem somos
          </p>
          <h2 className="text-stone-800 text-3xl md:text-4xl font-serif leading-snug">
            Nossa história
          </h2>
        </div>

        {/* Foto do casal — coloque em public/images/casal.jpg */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/images/casal.jpg"
            alt="Foto do casal"
            className="w-full h-80 object-cover"
            onError={(e) => {
              // Placeholder se a foto não estiver disponível
              const target = e.currentTarget
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.className = 'mb-12 rounded-2xl overflow-hidden shadow-lg bg-stone-200 flex items-center justify-center h-80'
                parent.innerHTML = '<p class="text-stone-400 text-sm">[ Adicione a foto em public/images/casal.jpg ]</p>'
              }
            }}
          />
        </div>

        {/* Texto de introdução */}
        <div className="prose prose-stone max-w-none">
          <p className="text-stone-600 text-lg leading-relaxed mb-6 font-serif italic text-center">
            {story.intro.trim()}
          </p>

          <div className="h-px bg-amber-200 my-10 w-24 mx-auto" />

          <p className="text-stone-600 text-base leading-relaxed">
            {story.ministry.trim()}
          </p>
        </div>

        {/* Galeria do ministério — coloque fotos em public/images/ministerio-1.jpg, etc. */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-stone-200 h-40">
              <img
                src={`/images/ministerio-${i}.jpg`}
                alt={`Foto do ministério ${i}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  if (t.parentElement) {
                    t.parentElement.innerHTML = `<p class="text-stone-400 text-xs text-center p-4">ministerio-${i}.jpg</p>`
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
