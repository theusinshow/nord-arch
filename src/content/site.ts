// Site-wide copy and fictional studio data — Nord Arch is a concept study (DEC-011).
// Copy drafted with the copywriting skill in the PRODUCT.md voice (CNT-002…CNT-018).

export const contact = {
  phone: '5548900000000', // CNT-010 — fictional placeholder, E.164 without "+"
  email: 'contato@nordarch.example',
  instagram: '@nordarch.estudio',
  instagramUrl: 'https://www.instagram.com/',
  city: 'Florianópolis, SC',
} as const

export const hero = {
  labels: ['Santa Catarina', 'Arquitetura'] as const, // CNT-008
  cue: 'Role', // CNT-015
}

export const home = {
  manifesto: 'Cada casa nasce do lugar onde vai ficar.', // CNT-002
  drift: {
    title: 'Doze casas, uma mesma linguagem.', // CNT-016
    line: 'Madeira, pedra, luz difusa e espaço em volta.',
    link: 'Ver os 12 projetos',
  },
  highlightsLabel: 'Destaques',
  invitation: 'Tem um terreno e um programa em mente?',
}

export const ticket = {
  home: { label: 'Convite · WhatsApp', title: 'Comece pelo seu terreno', stub: 'Destaque aqui' },
  project: { label: 'Convite · WhatsApp', title: (name: string) => `Conversar sobre a ${name}`, stub: 'Destaque aqui' },
  contact: { label: 'Convite · WhatsApp', title: 'Agende a primeira conversa', stub: 'Destaque aqui' },
  done: 'Abrindo a conversa no WhatsApp…',
}

export const studio = {
  manifesto: [
    // CNT-003
    'Começamos pelo terreno.',
    'A casa vem depois, da luz, do vento e do que já estava lá.',
    'Usamos poucos materiais e deixamos cada um aparecer.',
    'Acompanhamos a obra até a última peça de marcenaria.',
  ],
  language: [
    // CNT-006 — each block cites a project from the roster
    { title: 'Materiais', text: 'Madeira queimada, reboco claro, concreto e pinho. Poucos materiais por casa, sempre aparentes.', slug: 'casa-pedra-furada' },
    { title: 'Luz', text: 'As janelas são desenhadas para a luz baixa do sul. A casa recebe o sol de inverno e se protege do sol de verão.', slug: 'firn-house' },
    { title: 'Lugar', text: 'A implantação vem antes da planta. No Ferrugem, as duas casas desviam de uma pedra que já estava no terreno.', slug: 'casas-ferrugem' },
  ],
  scope: {
    title: 'Do projeto à obra',
    text: 'Arquitetura, interiores, paisagismo e acompanhamento de obra no mesmo estúdio. Quem desenha a casa responde por ela no canteiro.',
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
  intro: 'Conte onde fica o terreno e o que a casa precisa ter.', // CNT-012
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
