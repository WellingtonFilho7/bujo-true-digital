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
