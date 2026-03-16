import { useState } from 'react'
import { story } from '../content/story'

export function HouseSection() {
  const [photos, setPhotos] = useState([true, true])

  function hide(i: number) {
    setPhotos(p => p.map((x, j) => (j === i ? false : x)))
  }

  const anyPhoto = photos.some(Boolean)

  return (
    <section id="a-casa" className="py-14 px-6 border-t border-stone-100">
      <div className="max-w-2xl mx-auto">

        <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
          A mudança
        </p>
        <h2 className="text-stone-800 text-2xl md:text-3xl font-serif leading-snug mb-9">
          {story.houseTitle}
        </h2>

        <div className="space-y-5 mb-10">
          {story.houseParagraphs.map((p, i) => (
            <p key={i} className="text-stone-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {anyPhoto && (
          <div className="grid grid-cols-2 gap-3 mb-12">
            {[0, 1].map((i) =>
              photos[i] ? (
                <div key={i} className="rounded-lg overflow-hidden bg-stone-200 aspect-[4/3]">
                  <img
                    src={`/images/casa-${i + 1}.jpeg`}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => hide(i)}
                  />
                </div>
              ) : null
            )}
          </div>
        )}

        <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
          O que precisamos
        </p>
        <p className="text-stone-600 leading-relaxed">
          {story.needsText}
        </p>

      </div>
    </section>
  )
}
