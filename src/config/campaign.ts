// =============================================================
// ARQUIVO DE CONFIGURAÇÃO DA CAMPANHA
// Este é o único arquivo que você precisa editar para manter
// a campanha atualizada.
// =============================================================

export const campaign = {
  // ----------------------------------------------------------
  // IDENTIDADE
  // ----------------------------------------------------------

  // EDITE: Nomes do casal como aparecerão na página
  coupleName: "João e Maria",

  // EDITE: Nome do projeto / localidade de destino
  projectName: "Nova Casa no Interior",

  // EDITE: Cidade ou região para onde estão indo
  location: "Interior do [Estado]",

  // EDITE: Frase curta que resume o chamado (aparece no hero)
  tagline: "Deixando tudo para levar esperança onde poucos chegam.",

  // ----------------------------------------------------------
  // META E PROGRESSO — ATUALIZE AQUI A CADA CONTRIBUIÇÃO
  // ----------------------------------------------------------

  // EDITE: Meta total em reais
  goal: 20000,

  // EDITE: Quanto já foi arrecadado (atualize manualmente)
  raised: 0,

  // ----------------------------------------------------------
  // CONTATO E PAGAMENTO
  // ----------------------------------------------------------

  // EDITE: Número de WhatsApp com DDI (sem espaços ou traços)
  // Exemplo: "5511987654321"
  whatsappNumber: "5511999999999",

  // EDITE: Mensagem padrão que abre no WhatsApp
  whatsappMessage: "Olá! Vi a campanha de vocês e gostaria de saber mais sobre como apoiar.",

  // EDITE: Chave Pix (pode ser CPF, e-mail, telefone ou chave aleatória)
  pixKey: "seu-email@exemplo.com",

  // EDITE: Nome que aparece no recibo do Pix
  pixName: "João da Silva",

  // EDITE: Link da plataforma de donatívos (Apoiase, Catarse, etc.)
  // Deixe como string vazia ("") para ocultar esse botão
  donationPlatformUrl: "",
  donationPlatformName: "Apoiase",

  // ----------------------------------------------------------
  // COTAS DA REFORMA — LISTA DE ITENS ESPECÍFICOS
  // Adicione, remova ou edite os itens conforme o orçamento.
  // "sponsored: true" quando o item já foi coberto.
  // ----------------------------------------------------------
  cotas: [
    // EDITE: Substitua pelos itens reais do orçamento
    { id: 1, item: "Telhado e telhas",          value: 4000,  sponsored: false },
    { id: 2, item: "Fiação elétrica",            value: 2500,  sponsored: false },
    { id: 3, item: "Encanamento e hidráulica",   value: 2000,  sponsored: false },
    { id: 4, item: "Pintura completa",           value: 2500,  sponsored: false },
    { id: 5, item: "Piso e revestimento",        value: 3000,  sponsored: false },
    { id: 6, item: "Porta e janelas",            value: 2000,  sponsored: false },
    { id: 7, item: "Cozinha (pia e armários)",   value: 2000,  sponsored: false },
    { id: 8, item: "Banheiro",                   value: 1500,  sponsored: false },
  ],

  // ----------------------------------------------------------
  // REDES SOCIAIS
  // ----------------------------------------------------------

  // EDITE: Deixe como "" para ocultar
  instagram: "@usuario",
  email: "seuemail@exemplo.com",
}
