export interface Initiative {
  id: string
  label: string
  title: string
  paragraphs: string[]
  image?: string
  link?: {
    text: string
    url?: string // Adicione a URL quando disponível
  }
}

export const initiatives: Initiative[] = [
  {
    id: "igreja-local",
    label: "Igreja local",
    title: "Igreja Comum — Gurinhém",
    image: '/images/frente-igreja.jpg',
    paragraphs: [
      "Wellington serve como pastor na Igreja Comum, uma comunidade na cidade de Gurinhém, no interior da Paraíba.",
      "O trabalho envolve ensino das Escrituras, cuidado próximo das pessoas e a formação de uma vida compartilhada, onde a fé é vivida no cotidiano.",
      "A igreja se constrói na perseverança na doutrina, na comunhão, no partir do pão e nas orações.",
    ],
  },
  {
    id: "retornar",
    label: "Movimento cristão",
    title: "Iniciativa Retornar",
    paragraphs: [
      "A Iniciativa Retornar é um movimento cristão dedicado a reconstruir a relação entre a Igreja e o povo judeu.",
      "Atuamos no ensino bíblico sobre Israel, na conscientização sobre o antissemitismo — inclusive dentro da própria história cristã — e no chamado ao arrependimento, à verdade e à reconciliação.",
      "Nosso objetivo é ajudar cristãos a compreenderem sua fé a partir das Escrituras, reconhecendo as raízes judaicas do evangelho e o lugar de Israel no plano de Deus.",
    ],
    link: {
      text: "iniciativaretornar.org",
      // url: "https://iniciativaretornar.org",
    },
  },
  {
    id: "bema",
    label: "Plataforma de ensino",
    title: "Bema Education",
    paragraphs: [
      "O bema é uma plataforma de formação que apoia famílias no ensino dos filhos.",
      "Seus materiais são instrumentos simples para o dia a dia, que ajudam pais a conduzir a formação com mais clareza, trabalhando virtudes, hábitos e leitura da realidade.",
      "Não é um currículo fechado, nem substitui a família. É um apoio para educar com intenção.",
    ],
    link: {
      text: "bemaeducation.com.br",
      // url: "https://bemaeducation.com.br",
    },
  },
  {
    id: "lumine",
    label: "Educação",
    title: "Lumine",
    image: '/images/frente-lumine.jpg',
    paragraphs: [
      "O Lumine é um projeto educacional voltado para crianças em situação de vulnerabilidade social. Funciona como um contraturno escolar, com foco em pré-alfabetização, alfabetização e literatura.",
      "Mais do que reforço escolar, o trabalho busca formar crianças com base em uma visão cristã do mundo, cuidando não só do aprendizado, mas também do caráter. Esse cuidado naturalmente alcança as famílias, à medida que as crianças crescem e levam isso para dentro de casa.",
    ],
    link: {
      text: "institutolumine.org",
      // url: "https://institutolumine.org",
    },
  },
  {
    id: "ministerio",
    label: "Ensino e música",
    title: "Ministério itinerante",
    paragraphs: [
      "Wellington viaja ministrando, ensinando e servindo igrejas e comunidades. Participa de conferências, cursos e encontros, no Brasil e fora, com foco no ensino das Escrituras, formação espiritual e fortalecimento da igreja local. A música também faz parte desse ministério.",
    ],
  },
]
