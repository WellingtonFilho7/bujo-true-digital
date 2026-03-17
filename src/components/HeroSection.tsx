import { family } from "../content/family"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-6 border-b border-stone-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Foto */}
          <div className="w-full md:w-[38%] flex-shrink-0">
            <img
              src="/images/familia.jpeg"
              alt="Wellington e Dyanna Nascimento"
              className="w-full object-cover object-center"
              style={{ aspectRatio: "4/5" }}
            />
          </div>

          {/* Texto */}
          <div className="flex-1 md:pt-2">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">
              {family.location}
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 leading-snug mb-8">
              {family.names}
            </h1>
            <div className="space-y-4">
              {family.identityParagraphs.map((p, i) => (
                <p key={i} className="text-stone-600 leading-relaxed text-[15px]">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="#frentes"
                className="text-sm font-medium text-stone-900 border border-stone-300 px-4 py-2 hover:bg-stone-50 transition-colors"
              >
                Ver frentes de trabalho
              </a>
              <a
                href="#como-ajudar"
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Como apoiar →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
