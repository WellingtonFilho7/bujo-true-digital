export interface Update {
  date: string
  title: string
  paragraphs: string[]
}

// Para adicionar uma nova entrada, basta incluir um objeto no início do array.
export const updates: Update[] = [
  {
    date: "Março 2026",
    title: "Nos mudando para Gurinhém",
    paragraphs: [
      "Depois de mais de dois anos viajando toda semana — mais de 120 viagens, 80 km de ida e 80 km de volta, com três filhos pequenos — estamos nos mudando para perto da comunidade que pastoreamos.",
      "Encontramos a casa depois de oito meses procurando. Estava fechada há mais de 18 meses, com terreno tomado por mato, pintura antiga, elétrica e hidráulica a revisar. Mas quando entramos, tivemos a mesma impressão: é uma casa boa. Só precisa de cuidado.",
      "O custo da mudança e dos reparos essenciais fica entre R$ 4 mil e R$ 6 mil. Para a construção de uma sala adicional de 25 m² — que vai servir de escritório, sala de reuniões e quarto de hóspedes — entre R$ 14 mil e R$ 17 mil. Se você quiser participar desse momento, é só entrar em contato.",
    ],
  },
]
