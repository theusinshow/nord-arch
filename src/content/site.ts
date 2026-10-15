// Site-wide copy and fictional studio data — Nord Arch is a concept study (DEC-011).
// Copy drafted and refined with the copywriting skill in the PRODUCT.md voice (CNT-002…CNT-018, DEC-030).

export const contact = {
  phone: '5548999916638', // Coded by M's WhatsApp (DEC-033: the CTAs reach the author), E.164 without "+"
  email: 'contato@nordarch.example',
  instagram: '@nordarch.estudio',
  instagramUrl: 'https://www.instagram.com/',
  city: 'Florianópolis, SC',
} as const

export const hero = {
  labels: ['Santa Catarina', 'Arquitetura'] as const, // CNT-008
  cue: 'Role a página', // CNT-015 — "Role" alone read as a noun (DEC-033)
}

export const home = {
  manifesto: 'Primeiro o lugar. Depois o projeto.', // CNT-002 — refined with the copywriting skill (DEC-030)
  highlightsLabel: 'Destaques',
  ctaButton: 'Conversar no WhatsApp',
  // "Sobre" section under the hero (DEC-028, DEC-030) — fictional studio facts (DEC-011)
  intro: {
    text: 'Somos um escritório de arquitetura em Florianópolis. Desenhamos casas, interiores, jardins e espaços comerciais em Santa Catarina.',
    text2: 'Quem faz o projeto acompanha a obra, da primeira visita ao terreno até a entrega das chaves.',
    link: 'Conheça o estúdio',
    image: 'steppe-house',
  },
  // "Serviços" section (DEC-030); "Como trabalhamos" moved to the Estúdio page (DEC-033)
  services: {
    title: 'Da implantação no terreno ao desenho da marcenaria.',
    items: [
      { title: 'Arquitetura', text: 'Casas e espaços comerciais, do estudo de implantação ao projeto executivo e às aprovações na prefeitura.', slug: 'pleat-house' },
      { title: 'Interiores', text: 'Layout, marcenaria, iluminação e materiais, em obra nova ou em reforma.', slug: 'celeiro-testo-alto' },
      { title: 'Paisagismo', text: 'Jardins com espécies nativas da região, desenhados junto com a arquitetura.', slug: 'mound-pavilion' },
      { title: 'Acompanhamento de obra', text: 'Visitas ao canteiro, conversa com fornecedores e decisões de detalhe até a entrega.', slug: 'casa-pedra-furada' },
    ],
  },
  // Closing (DEC-029, DEC-033): three real starting points, each with its own WhatsApp message
  closing: {
    title: 'Por onde começamos?',
    line: 'Escolha o ponto de partida e a mensagem abre pronta no WhatsApp. Na primeira conversa falamos do lugar, do programa e do prazo.',
    image: 'firn-house',
    paths: [
      { variant: 'build', title: 'Tenho um terreno e quero construir', hint: 'Casa, do terreno à obra' },
      { variant: 'renovate', title: 'Quero reformar ou fazer os interiores', hint: 'Imóvel existente' },
      { variant: 'other', title: 'Paisagismo ou espaço comercial', hint: 'Jardim, ateliê, loja' },
    ] as const,
  },
}

// "Lugares" (DEC-025) — the twelve sites by region of Santa Catarina (fictional placements, DEC-012)
export const places = {
  title: 'Doze lugares, do litoral à serra.',
  regions: [
    { name: 'Litoral', slugs: ['marram-house', 'casas-ferrugem', 'mound-pavilion', 'atelie-saco-dos-limoes'] },
    { name: 'Serra', slugs: ['casa-pedra-furada', 'casa-campo-dos-padres', 'five-gables', 'firn-house', 'steppe-house'] },
    { name: 'Vales e planalto', slugs: ['pleat-house', 'casa-treze-tilias', 'celeiro-testo-alto'] },
  ],
}

// Black CTA blocks with a standard button (DEC-025, DEC-027) — replaced the Tear Ticket everywhere
export const cta = {
  project: {
    title: (name: string) => `Conversar sobre a ${name}`,
    line: (code: string) => `A mensagem já vai com o nome e o código do projeto (${code}).`,
  },
  contact: {
    title: 'Marque a primeira conversa',
    line: 'A mensagem abre pronta no WhatsApp. Conte a cidade, o tipo de projeto e uma referência de que você goste.',
  },
}

export const studio = {
  // CNT-003 — rewritten as one paragraph (DEC-032): the four separate claims repeated the home and the Linguagem blocks
  manifesto: 'Um estúdio pequeno em Florianópolis. As mesmas quatro pessoas desenham a casa, o interior e o jardim, e estão no canteiro até a entrega.',
  manifestoImage: 'five-gables',
  language: [
    // CNT-006 — each block cites a project from the roster
    { title: 'Materiais', text: 'Madeira queimada, reboco claro, concreto e pinho. Poucos materiais por casa, sempre aparentes.', slug: 'casa-pedra-furada' },
    { title: 'Luz', text: 'As aberturas são pensadas para a luz baixa do sul. O sol de inverno entra, e o beiral segura o sol de verão.', slug: 'firn-house' },
    { title: 'Lugar', text: 'A implantação vem antes da planta. No Ferrugem, as duas casas desviam de uma pedra que já estava no terreno.', slug: 'casas-ferrugem' },
  ],
  steps: {
    title: 'Como trabalhamos',
    items: [
      { title: 'Conversa', text: 'Programa, prazo e orçamento.' },
      { title: 'Visita', text: 'Vamos ao terreno ou ao imóvel.' },
      { title: 'Estudo', text: 'Implantação, volumes e primeiras plantas.' },
      { title: 'Projeto', text: 'Executivo, interiores e aprovações.' },
      { title: 'Obra', text: 'Acompanhamento até a entrega.' },
    ],
  },
  scope: {
    title: 'Escopo por obra',
    text: 'Nem toda casa pede tudo. Em cada obra, o que ficou com o estúdio.',
  },
  team: [
    // CNT-007 — fictional people; portraits = monogram placeholder (MED-T1 option B)
    { name: 'Helena Marquardt', role: 'Arquitetura · sócia', led: ['NA—01', 'NA—03', 'NA—06'] },
    { name: 'Tomás Brandt', role: 'Arquitetura e obra · sócio', led: ['NA—02', 'NA—05', 'NA—07'] },
    { name: 'Lia Castanho', role: 'Interiores', led: ['NA—10', 'NA—12'] },
    { name: 'Rafael Kuhn', role: 'Paisagismo', led: ['NA—11', 'NA—08'] },
  ],
  closing: 'Ver os projetos',
}

export const contactPage = {
  intro: 'Conte onde fica o lugar e o que o projeto precisa ter.', // CNT-012
}

export const notFound = { message: 'Esta página não existe.', link: 'Ver os projetos' } // CNT-017

export const footer = { notice: 'Estudo conceitual de Coded by M. Não publicado.' } // CNT-018

export const privacy = [
  // CNT-013
  'Este site é um estudo conceitual e não coleta dados pessoais.',
  'Não usamos cookies, ferramentas de análise ou formulários.',
  'Os links de WhatsApp abrem um serviço de terceiros. O que você enviar por lá segue a política do próprio WhatsApp.',
  'O navegador guarda apenas uma marcação local (sessionStorage) para não repetir a animação de abertura na mesma visita.',
]

export const credits = {
  notice:
    'Nord Arch é um estudo conceitual de Coded by M. O escritório, os nomes dos projetos, as fichas técnicas e a equipe são fictícios. As fotografias pertencem aos seus autores e foram publicadas originalmente no Divisare.',
  fonts: 'Tipografia: Michroma (SIL Open Font License) e Aktiv Grotesk (Dalton Maag, uso local para estudo).',
  components: 'Componentes de interação baseados em React Bits.',
}
