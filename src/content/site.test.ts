import { describe, expect, it } from 'vitest'

import { buildStructuredData, siteConfig } from './site'

describe('siteConfig', () => {
  it('publishes the normalized full name and family count', () => {
    expect(siteConfig.hero.title).toBe('Wellington e Dyanna Nascimento')
    expect(siteConfig.stats[0]).toMatchObject({
      value: '5',
      label: 'filhos',
    })
  })

  it('uses the approved hero subtitle and first-person about copy', () => {
    expect(siteConfig.hero.mission).toBe('Ensino das Escrituras. Cuidado da Igreja. Formação de famílias.')
    expect(siteConfig.about.intro).toBe(
      'Somos uma família cristã dedicada ao ensino das Escrituras, ao cuidado da igreja e à formação de famílias.',
    )
    expect(siteConfig.about.paragraphs).toEqual([
      'Somos Wellington e Dyanna, casados e pais de cinco filhos. Nossa vida é marcada pela fé, pela rotina em família e pelo compromisso de viver aquilo que ensinamos. Dyanna serve na formação das crianças e no desenvolvimento das iniciativas educacionais que conduzimos. Wellington serve no ensino bíblico, no pastoreio e no cuidado de comunidades.',
      'Tudo o que fazemos nasce dessa vida. Servimos a igreja, acompanhamos pessoas de perto e desenvolvemos frentes voltadas à formação de crianças e famílias, procurando viver de forma coerente aquilo que cremos.',
    ])
  })

  it('builds structured data with the canonical URL and social profiles', () => {
    const data = buildStructuredData(siteConfig)

    expect(data['@graph'][0]).toMatchObject({
      '@type': 'Person',
      name: 'Wellington e Dyanna Nascimento',
    })
    expect(data['@graph'][1]).toMatchObject({
      '@type': 'WebPage',
      url: siteConfig.seo.canonicalUrl,
    })
    expect(data['@graph'][0].sameAs).toContain('https://instagram.com/wellingtonfilho')
  })
})
