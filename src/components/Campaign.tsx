import { campaign } from '../config/campaign'

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

export function Campaign() {
  const { goal, raised, cotas } = campaign
  const percent = Math.min(Math.round((raised / goal) * 100), 100)
  const remaining = goal - raised
  const whatsappUrl = `https://wa.me/${campaign.whatsappNumber}?text=${encodeURIComponent(campaign.whatsappMessage)}`

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

  const totalCotas = cotas.reduce((s, c) => s + c.value, 0)

  return (
    <section id="campanha" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <p className="text-amber-700 text-sm font-medium tracking-widest uppercase mb-3">
            A campanha
          </p>
          <h2 className="text-stone-800 text-3xl md:text-4xl font-serif leading-snug">
            Reforma da nova casa
          </h2>
          <p className="text-stone-500 mt-4 text-base">
            Meta: <strong className="text-stone-700">{fmt(goal)}</strong>
            {totalCotas !== goal && (
              <span className="text-stone-400 text-sm ml-2">(cotas listadas: {fmt(totalCotas)})</span>
            )}
          </p>
        </div>

        {/* Termômetro de progresso */}
        <div className="mb-12 bg-stone-50 rounded-2xl p-6 border border-stone-100">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-stone-600 font-medium">Arrecadado</span>
            <span className="text-stone-500">{percent}%</span>
          </div>

          {/* Barra */}
          <div className="relative h-5 bg-stone-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-amber-700">{fmt(raised)}</p>
              <p className="text-stone-500 text-xs mt-0.5">de {fmt(goal)}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-stone-700">{fmt(remaining)}</p>
              <p className="text-stone-500 text-xs mt-0.5">faltam</p>
            </div>
          </div>
        </div>

        {/* Lista de cotas */}
        <div className="mb-10">
          <h3 className="text-stone-700 font-semibold text-base mb-4">
            Itens da reforma
          </h3>
          <div className="space-y-3">
            {cotas.map((cota) => (
              <div
                key={cota.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  cota.sponsored
                    ? 'bg-green-50 border-green-200'
                    : 'bg-stone-50 border-stone-100 hover:border-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    cota.sponsored ? 'bg-green-100' : 'bg-stone-100'
                  }`}>
                    {cota.sponsored ? <CheckIcon /> : <LockIcon />}
                  </div>
                  <span className={`text-sm font-medium ${
                    cota.sponsored ? 'text-green-700 line-through' : 'text-stone-700'
                  }`}>
                    {cota.item}
                  </span>
                </div>
                <span className={`text-sm font-semibold ${
                  cota.sponsored ? 'text-green-600' : 'text-amber-700'
                }`}>
                  {fmt(cota.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <p className="text-stone-700 text-base mb-6 leading-relaxed">
            Quer cobrir um item específico ou contribuir com qualquer valor?
            <br />
            <strong>Entre em contato pelo WhatsApp</strong> e vamos conversar.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-full transition-colors text-base"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero apoiar
          </a>
        </div>
      </div>
    </section>
  )
}
