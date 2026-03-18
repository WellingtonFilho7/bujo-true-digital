import { initiatives as baseInitiatives } from './initiatives'
import { updates as baseUpdates } from './updates'

export interface SeoMeta {
  title: string
  description: string
  canonicalUrl: string
  image: string
  locale: string
  siteName: string
  twitterCard: 'summary_large_image'
}

export interface LinkAction {
  label: string
  href?: string
  external?: boolean
}

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  mobileSrc?: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  mission: string
  primaryAction: LinkAction
  secondaryAction: LinkAction
  image: ImageAsset
}

export interface StatsItem {
  value: string
  label?: string
}

export interface AboutBlock {
  title: string
  body: string
}

export interface AboutContent {
  eyebrow: string
  title: string
  lede: string
  blocks: AboutBlock[]
}

export interface InitiativeItem {
  id: string
  label: string
  title: string
  paragraphs: string[]
  image?: ImageAsset
  link?: LinkAction
}

export interface QuoteContent {
  text: string
  attribution: string
}

export interface UpdateItem {
  date: string
  title: string
  paragraphs: string[]
}

export interface UpdatesContent {
  eyebrow: string
  title: string
  featuredImage: ImageAsset
  items: UpdateItem[]
}

export interface SupportContent {
  eyebrow: string
  title: string
  intro: string
  impact: string
  pixLabel: string
  pixKeyLabel: string
  pixKey: string
  pixName: string
  copyLabel: string
  copiedLabel: string
  copyErrorMessage: string
  whatsapp: {
    title: string
    body: string
    url: string
    label: string
  }
  share: {
    title: string
    body: string
    label: string
    copiedLabel: string
    errorLabel: string
    errorMessage: string
  }
  stickyBar: {
    copyLabel: string
    copiedLabel: string
    copyErrorLabel: string
    whatsappLabel: string
  }
}

export interface FooterContent {
  title: string
  location: string
  links: LinkAction[]
  closing: string
  signature: string
}

export interface SiteConfig {
  seo: SeoMeta
  sharePayload: {
    title: string
    text: string
    url: string
  }
  nav: {
    brand: string
    links: LinkAction[]
    supportAction: LinkAction
    shareLabel: string
    shareCopiedLabel: string
    shareErrorLabel: string
  }
  hero: HeroContent
  stats: StatsItem[]
  about: AboutContent
  initiatives: {
    eyebrow: string
    title: string
    items: InitiativeItem[]
  }
  quote: QuoteContent
  updates: UpdatesContent
  support: SupportContent
  footer: FooterContent
}

const brandName = 'Wellington e Dyanna Nascimento'
const canonicalUrl = 'https://familia-nascimento.vercel.app/'
const ogImage = new URL('/images/og-cover.jpg', canonicalUrl).toString()
const shareText = 'Conheça o trabalho de Wellington e Dyanna em Gurinhém, no Agreste da Paraíba.'

const initiativeLinks: Record<string, string> = {
  retornar: 'https://iniciativaretornar.org',
  bema: 'https://bemaeducation.com.br',
  lumine: 'https://institutolumine.org',
}

const optimizedImages: Record<string, string> = {
  '/images/frente-igreja.jpg': '/images/frente-igreja-card.jpg',
  '/images/frente-lumine.jpg': '/images/frente-lumine-card.jpg',
  '/images/cotidiano.jpg': '/images/cotidiano-optimized.jpg',
  '/images/familia.jpeg': '/images/familia-optimized.jpg',
}

function toImageAsset(src: string, alt: string, width: number, height: number): ImageAsset {
  return {
    src: optimizedImages[src] ?? src,
    alt,
    width,
    height,
  }
}

export const siteConfig: SiteConfig = {
  seo: {
    title: brandName,
    description:
      'Pastores, educadores e pais de cinco filhos, servindo igrejas, famílias e crianças a partir de Gurinhém, no Agreste da Paraíba.',
    canonicalUrl,
    image: ogImage,
    locale: 'pt_BR',
    siteName: brandName,
    twitterCard: 'summary_large_image',
  },
  sharePayload: {
    title: brandName,
    text: shareText,
    url: canonicalUrl,
  },
  nav: {
    brand: brandName,
    links: [
      { label: 'Quem somos', href: '#quem-somos' },
      { label: 'Frentes', href: '#frentes' },
      { label: 'Diário', href: '#diario' },
    ],
    supportAction: {
      label: 'Apoiar',
      href: '#como-ajudar',
    },
    shareLabel: 'Compartilhar',
    shareCopiedLabel: 'Link copiado',
    shareErrorLabel: 'Copie o link',
  },
  hero: {
    eyebrow: 'Gurinhém, Agreste da Paraíba',
    title: brandName,
    mission:
      'Uma família se mudando pra perto da igreja, investindo em formação cristã e servindo crianças, famílias e irmãos no interior da Paraíba.',
    primaryAction: {
      label: 'Conheça o trabalho',
      href: '#frentes',
    },
    secondaryAction: {
      label: 'Como apoiar',
      href: '#como-ajudar',
    },
    image: {
      src: '/images/hero-desktop.jpg',
      mobileSrc: '/images/hero-mobile.jpg',
      alt: 'Wellington e Dyanna Nascimento com a família em frente à nova casa em Gurinhém',
      width: 1280,
      height: 1706,
    },
  },
  stats: [
    { value: '5', label: 'filhos' },
    { value: '5', label: 'frentes' },
    { value: 'Igreja · Escola · Casa' },
    { value: 'Gurinhém', label: 'Paraíba' },
  ],
  about: {
    eyebrow: 'Quem somos',
    title: 'Uma casa se abrindo pra igreja, pras crianças e pra mesa.',
    lede:
      'Depois de mais de dois anos na estrada toda semana, Wellington e Dyanna estão se mudando pra perto da comunidade que pastoreiam. O objetivo é simples: aproximar casa, igreja e rotina no mesmo lugar.',
    blocks: [
      {
        title: 'Uma família se enraizando',
        body:
          'Eles são pais de cinco filhos e estão reorganizando a vida inteira pra servir a partir de Gurinhém, com menos deslocamento e mais presença no cotidiano da igreja e da cidade.',
      },
      {
        title: 'Dyanna e a formação das crianças',
        body:
          'Dyanna conduz o Lumine, trabalha com literatura e alfabetização, educa os filhos em casa e acompanha de perto famílias que precisam de direção e constância.',
      },
      {
        title: 'Wellington e o cuidado da igreja',
        body:
          'Wellington serve na Igreja Comum, ensina as Escrituras e continua viajando quando necessário pra fortalecer irmãos, iniciativas e comunidades que pedem ajuda.',
      },
    ],
  },
  initiatives: {
    eyebrow: 'Frentes de trabalho',
    title: 'O que fazemos hoje',
    items: baseInitiatives.map((item) => ({
      id: item.id,
      label: item.label,
      title: item.title,
      paragraphs: item.paragraphs,
      image: item.image ? toImageAsset(item.image, item.title, 1280, 960) : undefined,
      link: (() => {
        if (!item.link) return undefined
        const href = item.link.url ?? initiativeLinks[item.id]
        return href
          ? {
              label: item.link.text,
              href,
              external: true,
            }
          : {
              label: item.link.text,
              href: undefined,
              external: false,
            }
      })(),
    })),
  },
  quote: {
    text: 'Não estamos construindo um projeto. Estamos vivendo uma vida.',
    attribution: 'Wellington e Dyanna Nascimento',
  },
  updates: {
    eyebrow: 'Diário de campo',
    title: 'Atualizações',
    featuredImage: {
      src: '/images/casa-1-optimized.jpg',
      alt: 'A casa em Gurinhém onde a família está se estabelecendo',
      width: 960,
      height: 1280,
    },
    items: baseUpdates,
  },
  support: {
    eyebrow: 'Como ajudar',
    title: 'Caminhar junto',
    intro:
      'Se você deseja se envolver com essa mudança e com o trabalho que está nascendo em Gurinhém, há formas simples de caminhar com a gente agora.',
    impact:
      'O apoio sustenta a mudança, os reparos básicos da casa, os deslocamentos ministeriais, as reuniões com a igreja e a rotina de uma família que está se estabelecendo no interior.',
    pixLabel: 'Apoio financeiro — Pix',
    pixKeyLabel: 'Chave CPF',
    pixKey: '056.758.164-02',
    pixName: 'José Wellington do Nascimento Filho',
    copyLabel: 'Copiar chave Pix',
    copiedLabel: 'Pix copiado',
    copyErrorMessage: 'Não foi possível copiar agora. Use a chave manualmente.',
    whatsapp: {
      title: 'WhatsApp',
      body: 'Pra conversar, fazer perguntas ou entender melhor a mudança, é só chamar.',
      url: 'https://wa.me/5583999943792?text=Ol%C3%A1!%20Vi%20a%20p%C3%A1gina%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais.',
      label: 'Falar no WhatsApp',
    },
    share: {
      title: 'Compartilhar',
      body: 'Se essa página fizer sentido pra alguém que pode orar, apoiar ou se aproximar, envie o link.',
      label: 'Compartilhar página',
      copiedLabel: 'Link copiado',
      errorLabel: 'Copie o endereço',
      errorMessage: 'Não foi possível compartilhar agora. Copie o endereço manualmente.',
    },
    stickyBar: {
      copyLabel: 'Copiar Pix',
      copiedLabel: 'Pix copiado',
      copyErrorLabel: 'Use a chave manualmente',
      whatsappLabel: 'WhatsApp',
    },
  },
  footer: {
    title: brandName,
    location: 'Gurinhém, Agreste da Paraíba',
    links: [
      {
        label: '@wellingtonfilho',
        href: 'https://instagram.com/wellingtonfilho',
        external: true,
      },
      {
        label: '@dyannabrandao',
        href: 'https://instagram.com/dyannabrandao',
        external: true,
      },
      {
        label: 'wellingtonfilho7@gmail.com',
        href: 'mailto:wellingtonfilho7@gmail.com',
      },
    ],
    closing: 'Obrigado por caminhar com a gente até aqui.',
    signature: 'Em Cristo, Wellington e Dyanna',
  },
}

export function buildStructuredData(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: config.hero.title,
        description: config.hero.mission,
        image: config.seo.image,
        homeLocation: config.footer.location,
        sameAs: config.footer.links
          .map((link) => link.href)
          .filter((href): href is string => Boolean(href && href.startsWith('https://instagram.com/'))),
        email: 'wellingtonfilho7@gmail.com',
      },
      {
        '@type': 'WebPage',
        name: config.seo.title,
        description: config.seo.description,
        url: config.seo.canonicalUrl,
        inLanguage: 'pt-BR',
        primaryImageOfPage: config.seo.image,
      },
    ],
  }
}
