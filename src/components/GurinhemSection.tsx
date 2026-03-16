import { useState } from 'react'
import { story } from '../content/story'

export function GurinhemSection() {
  const [visible, setVisible] = useState([true, true, true])

  function hide(i: number) {
    setVisible(v => v.map((x, j) => (j === i ? false : x)))
  }

  const anyVisible = visible.some(Boolean)

  return (
    <section id="gurinhém" className="py-14 px-6 border-t border-stone-100">
      <div className="max-w-2xl mx-auto">

        <p className="text-amber-700 text-xs font-medium tracking-widest uppercase mb-3">
          O trabalho
        </p>
        <h2 className="text-stone-800 text-2xl md:text-3xl font-serif leading-snug mb-9">
          {story.gurinhemTitle}
        </h2>

        <div className="space-y-5">
          {story.gurinhemParagraphs.map((p, i) => (
            <p key={i} className="text-stone-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {anyVisible && (
          <div className="mt-12 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) =>
              visible[i] ? (
                <div key={i} className="rounded-lg overflow-hidden bg-stone-200 aspect-square">
                  <img
                    src={`/images/comunidade-${i + 1}.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => hide(i)}
                  />
                </div>
              ) : null
            )}
          </div>
        )}

      </div>
    </section>
  )
}
