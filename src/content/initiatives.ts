export interface Initiative {
  id: string
  label: string
  title: string
  paragraphs: string[]
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
    paragraphs: [
      "Wellington serve como pastor na Igreja Comum, uma comunidade na cidade de Gurinhém, no interior da Paraíba. O trabalho envolve ensino das Escrituras, acompanhamento próximo de pessoas e formação de uma vida comunitária real, marcada por cuidado mútuo e responsabilidade.",
      "Depois de mais de dois anos viajando toda semana — mais de 120 viagens, 80 km de ida e 80 km de volta — a família está se mudando para Gurinhém. O objetivo sempre foi simples: estar mais perto da comunidade que pastoreiam ali.",
    ],
  },
  {
    id: "retornar",
    label: "Movimento cristão",
    title: "Iniciativa Retornar",
    paragraphs: [
      "A Iniciativa Retornar é um movimento cristão voltado ao relacionamento com o povo judeu, à conscientização sobre o antissemitismo e ao ensino da Igreja sobre Israel. O foco é ajudar cristãos a compreenderem sua fé com mais profundidade bíblica, reconhecendo as raízes da fé e o lugar de Israel na história de Deus.",
    ],
    link: {
      text: "iniciativaretornar.com.br",
      // url: "https://iniciativaretornar.com.br",
    },
  },
  {
    id: "bema",
    label: "Plataforma de ensino",
    title: "BEMA",
    paragraphs: [
      "O BEMA é uma plataforma de ensino que ajuda famílias a discipular seus filhos com mais intencionalidade. Criamos materiais simples, visuais e aplicáveis no dia a dia, que auxiliam pais na formação de virtudes, na leitura da realidade e na construção de uma cultura de aprendizado dentro de casa.",
    ],
    link: {
      text: "bema.com.br",
      // url: "https://bema.com.br",
    },
  },
  {
    id: "lumine",
    label: "Educação",
    title: "Lumine",
    paragraphs: [
      "O Lumine é um projeto educacional voltado para crianças em situação de vulnerabilidade social. Funciona como um contraturno escolar, com foco em pré-alfabetização, alfabetização e literatura.",
      "Mais do que reforço escolar, o trabalho busca formar crianças com base em uma visão cristã do mundo, cuidando não só do aprendizado, mas também do caráter. Esse cuidado naturalmente alcança as famílias, à medida que as crianças crescem e levam isso para dentro de casa.",
    ],
    link: {
      text: "lumine.org.br",
      // url: "https://lumine.org.br",
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
