// The 12 works of the (fictional) Nord Arch study — DEC-012. Schema: docs/ai/PROJECT.md → Content model.
// Names, places, years, areas, programs, teams and concepts are FICTIONAL (CNT-004, CNT-005).
// Photographs are real and credited to their authors (Divisare) — see /creditos.
import manifest from './images.manifest.json'
import alts from './alts.json'

export type Ratio = '3:2' | '4:5' | '16:9'
export type ImgRole = 'opening' | 'card' | 'gallery' | 'drawing' | 'drift'
export interface Img { src: string; w: number; h: number; ratio: Ratio; widths: number[]; alt: string; role: ImgRole }
export type Category = 'Residencial' | 'Interiores' | 'Paisagismo' | 'Comercial'
export type Scope = 'arquitetura' | 'interiores' | 'paisagismo' | 'obra'

export interface Project {
  slug: string
  code: `NA—${string}`
  order: number
  name: string
  place: string
  city: string
  state: 'SC'
  year: number
  category: Category
  area: number
  areaLabel?: string
  program: string
  scope: Scope[]
  team: string[]
  concept: string
  featured: boolean
  images: Img[]
  hero?: { photo: Img; fg: Img; roofLine: number; luma: number }
  fictional: true
  credit: { architect: string; photographer: string; source: 'Divisare'; sourceTitle: string }
}

type RawImg = { src: string; w: number; h: number; ratio: string; widths: number[] }
type AltSet = { opening?: string; card?: string; gallery?: string[] }
const M = manifest as unknown as {
  projects: Record<string, { opening: RawImg; card: RawImg; gallery: RawImg[] }>
  drift: RawImg[]
  hero: { photo: RawImg; fg: RawImg; roofLine: number; luma: number }
}
const A = alts as Record<string, AltSet>

const img = (r: RawImg, role: ImgRole, alt: string): Img => ({ ...r, ratio: r.ratio as Ratio, role, alt })

function images(slug: string, name: string): Img[] {
  const m = M.projects[slug]
  const a = A[slug] ?? {}
  return [
    img(m.opening, 'opening', a.opening ?? `${name}, vista principal`),
    img(m.card, 'card', a.card ?? `${name}, vista`),
    ...m.gallery.map((g, i) => img(g, 'gallery', a.gallery?.[i] ?? `${name}, detalhe da arquitetura`)),
  ]
}

type Seed = Omit<Project, 'images' | 'fictional' | 'state' | 'order' | 'code' | 'hero'>

const SEED: Seed[] = [
  {
    slug: 'marram-house', name: 'Marram House', place: 'Joaquina', city: 'Florianópolis', year: 2025, category: 'Residencial',
    area: 280, program: 'Casa de veraneio, 3 suítes', scope: ['arquitetura', 'interiores', 'paisagismo', 'obra'],
    team: ['Helena Marquardt', 'Lia Castanho', 'Rafael Kuhn'], featured: true,
    concept: 'A casa fica atrás da primeira linha de dunas, onde o vento perde força. Dois volumes de cedro sobre pilotis deixam a areia e o capim passarem por baixo, e uma passarela de madeira é o único caminho até a porta. Os caixilhos se abrem por inteiro para o leste. No fim da tarde, a luz de dentro é a única coisa acesa na paisagem.',
    credit: { architect: 'KLG Architects', photographer: 'Paris Brummer', source: 'Divisare', sourceTitle: 'Dune House' },
  },
  {
    slug: 'casa-pedra-furada', name: 'Casa Pedra Furada', place: 'Urubici', city: 'Urubici', year: 2024, category: 'Residencial',
    area: 340, program: 'Residência, 4 suítes', scope: ['arquitetura', 'interiores', 'obra'],
    team: ['Tomás Brandt', 'Lia Castanho'], featured: true,
    concept: 'A casa se apoia sobre o afloramento de rocha em vez de removê-lo. O volume longo, revestido de madeira queimada, segue a curva de nível e deixa a pedra aparecer no meio do pátio. Por dentro, paredes brancas e pé-direito alto devolvem a luz da serra que entra pelas janelas corridas.',
    credit: { architect: 'Desai Chia Architecture', photographer: 'Paul Warchol', source: 'Divisare', sourceTitle: 'Ledge House' },
  },
  {
    slug: 'pleat-house', name: 'Pleat House', place: 'Rancho Queimado', city: 'Rancho Queimado', year: 2024, category: 'Residencial',
    area: 410, program: 'Residência, 4 suítes e ateliê', scope: ['arquitetura', 'interiores', 'paisagismo', 'obra'],
    team: ['Helena Marquardt', 'Rafael Kuhn'], featured: false,
    concept: 'Quatro alas de madeira escura se dobram ao redor de um pátio com espelho d’água. Cada telhado muda de inclinação onde a ala muda de uso, e é desse movimento que vem o nome. A casa se abre para o pátio e fica fechada para a estrada, protegida do vento frio que desce do morro.',
    credit: { architect: 'Desai Chia Architecture', photographer: 'Paul Warchol', source: 'Divisare', sourceTitle: 'Roxbury House' },
  },
  {
    slug: 'casa-campo-dos-padres', name: 'Casa Campo dos Padres', place: 'Campo dos Padres', city: 'Bom Retiro', year: 2023, category: 'Residencial',
    area: 260, program: 'Casa de campo, 3 suítes', scope: ['arquitetura', 'interiores', 'obra'],
    team: ['Tomás Brandt'], featured: false,
    concept: 'Três volumes pretos e baixos ficam soltos no campo aberto, ligados por pátios. A escala pequena de cada um deixa a paisagem ser a maior coisa à vista. A piscina estreita prolonga o eixo da sala até o capinzal, e a cobertura metálica escura some contra a mata no inverno.',
    credit: { architect: 'Desai Chia Architecture', photographer: 'Paul Warchol', source: 'Divisare', sourceTitle: 'Stanfordville House' },
  },
  {
    slug: 'five-gables', name: 'Five Gables', place: 'Bom Jardim da Serra', city: 'Bom Jardim da Serra', year: 2023, category: 'Residencial',
    area: 300, program: 'Residência, 4 suítes', scope: ['arquitetura', 'interiores', 'paisagismo', 'obra'],
    team: ['Tomás Brandt', 'Lia Castanho', 'Rafael Kuhn'], featured: true,
    concept: 'Cinco empenas de alturas diferentes formam uma única casa no planalto. Cada uma abriga um cômodo e aponta para um trecho da paisagem: o vale, o cânion, a estrada de chegada. O revestimento de madeira tratada a fogo resiste à geada, e por dentro o pinho claro equilibra a luz baixa do inverno.',
    credit: { architect: 'Mork Ulnes Architects', photographer: 'Jeremy Bittermann', source: 'Divisare', sourceTitle: 'Octothorpe House' },
  },
  {
    slug: 'firn-house', name: 'Firn House', place: 'São Joaquim', city: 'São Joaquim', year: 2022, category: 'Residencial',
    area: 380, program: 'Residência e casa de hóspedes', scope: ['arquitetura', 'interiores', 'obra'],
    team: ['Helena Marquardt', 'Lia Castanho'], featured: true,
    concept: 'Uma casa longa de reboco branco e madeira, no ponto mais alto do terreno, onde a neve chega primeiro. O volume retoma a forma dos galpões da região e guarda por dentro uma escada de concreto pigmentado em vermelho, a única cor forte da casa. Os beirais curtos deixam a neve escorregar do telhado.',
    credit: { architect: 'Moser und Hager Architekten', photographer: 'Gregor Graf', source: 'Divisare', sourceTitle: 'Hof Thann' },
  },
  {
    slug: 'casa-treze-tilias', name: 'Casa Treze Tílias', place: 'Treze Tílias', city: 'Treze Tílias', year: 2022, category: 'Residencial',
    area: 220, program: 'Residência unifamiliar, 3 suítes', scope: ['arquitetura', 'interiores', 'obra'],
    team: ['Tomás Brandt', 'Lia Castanho'], featured: false,
    concept: 'A estrutura de madeira laminada fica aparente por dentro e marca a fachada em uma malha regular de pilares e vigas. A casa tem dois pavimentos e uma empena simples, como as construções da colonização austríaca ao redor. O revestimento de madeira vai acinzentar com os anos, e isso faz parte do projeto.',
    credit: { architect: 'unisono', photographer: 'David Schreyer', source: 'Divisare', sourceTitle: 'EFH Keiler' },
  },
  {
    slug: 'casas-ferrugem', name: 'Casas Ferrugem', place: 'Praia do Ferrugem', city: 'Garopaba', year: 2021, category: 'Residencial',
    area: 190, areaLabel: '2 × 95 m²', program: 'Duas casas de praia', scope: ['arquitetura', 'interiores', 'paisagismo', 'obra'],
    team: ['Rafael Kuhn', 'Helena Marquardt'], featured: true,
    concept: 'Duas casas pequenas no costão, separadas por uma pedra que a obra preservou. Cada uma tem uma empena, um quarto e uma sala que se abre para o mar. Foram pensadas para serem usadas juntas ou sozinhas, por uma família que muda de tamanho a cada verão.',
    credit: { architect: 'OPAL', photographer: 'Trent Bell', source: 'Divisare', sourceTitle: 'Little House on the Ferry' },
  },
  {
    slug: 'steppe-house', name: 'Steppe House', place: 'Coxilha Rica', city: 'Lages', year: 2021, category: 'Residencial',
    area: 240, program: 'Residência térrea, 3 suítes', scope: ['arquitetura', 'interiores', 'obra'],
    team: ['Helena Marquardt'], featured: false,
    concept: 'Uma laje de concreto claro, baixa e comprida, apoiada no campo da coxilha. A casa se organiza em uma linha só, com os quartos de um lado e a sala do outro, separados por um pátio de cascalho. Cortinas de linho fazem o papel das paredes internas e mudam a casa conforme a hora do dia.',
    credit: { architect: 'Skupaj arhitekti', photographer: 'Ana Skobe', source: 'Divisare', sourceTitle: 'House on the Edge of the Plain' },
  },
  {
    slug: 'celeiro-testo-alto', name: 'Celeiro Testo Alto', place: 'Testo Alto', city: 'Pomerode', year: 2020, category: 'Interiores',
    area: 180, program: 'Reforma de interiores em celeiro', scope: ['interiores', 'obra'],
    team: ['Lia Castanho'], featured: false,
    concept: 'Um celeiro da colonização alemã ganhou um forro de pinho e um mezanino, sem mexer na estrutura original. A marcenaria foi desenhada como um único móvel contínuo que organiza estudo, cozinha e escada. As janelas pequenas foram mantidas, e a luz entra por uma faixa de iluminação no alto da cumeeira.',
    credit: { architect: 'CoPa – Cordero Pardee', photographer: 'Naho Kubota', source: 'Divisare', sourceTitle: 'Barnard Barn' },
  },
  {
    slug: 'mound-pavilion', name: 'Mound Pavilion', place: 'Ratones', city: 'Florianópolis', year: 2020, category: 'Paisagismo',
    area: 1400, areaLabel: '1.400 m² de jardim', program: 'Paisagismo e pavilhão de convívio', scope: ['paisagismo', 'arquitetura', 'obra'],
    team: ['Rafael Kuhn'], featured: false,
    concept: 'O projeto começou pelo terreno: um monte de terra plantado com espécies nativas de restinga. O pavilhão de vidro e madeira fica no topo, com a cobertura fina suspensa sobre a vegetação. Por dentro, o forro de madeira continua para fora e desenha a sombra do terraço.',
    credit: { architect: 'NO Architecture', photographer: 'Iwan Baan', source: 'Divisare', sourceTitle: 'Flower House' },
  },
  {
    slug: 'atelie-saco-dos-limoes', name: 'Ateliê Saco dos Limões', place: 'Saco dos Limões', city: 'Florianópolis', year: 2019, category: 'Comercial',
    area: 210, program: 'Ateliê de cerâmica e loja', scope: ['arquitetura', 'interiores', 'obra'],
    team: ['Lia Castanho', 'Tomás Brandt'], featured: false,
    concept: 'Um ateliê de cerâmica numa rua residencial. A fachada de concreto e tijolo é fechada para a rua e se abre para um pátio interno com árvores, onde ficam o forno e a área de trabalho. A loja ocupa o térreo, e o ateliê fica no pavimento de cima, com luz que vem do pátio.',
    credit: { architect: 'messina | rivas', photographer: 'Federico Cairoli', source: 'Divisare', sourceTitle: 'Casa Jardim Paulista' },
  },
]

export const projects: Project[] = SEED.map((s, i) => {
  const p: Project = {
    ...s,
    code: `NA—${String(i + 1).padStart(2, '0')}`,
    order: i + 1,
    state: 'SC',
    fictional: true,
    images: images(s.slug, s.name),
  }
  if (s.slug === 'marram-house') {
    p.hero = {
      photo: img(M.hero.photo, 'opening', 'Casa de cedro sobre pilotis entre as dunas, com passarela de madeira iluminada ao entardecer'),
      fg: img(M.hero.fg, 'opening', ''),
      roofLine: M.hero.roofLine,
      luma: M.hero.luma,
    }
  }
  return p
})

export const bySlug = (slug: string | undefined) => projects.find((p) => p.slug === slug)
export const nextOf = (p: Project) => projects[p.order % projects.length]
export const openingOf = (p: Project) => p.images.find((i) => i.role === 'opening')!
export const cardOf = (p: Project) => p.images.find((i) => i.role === 'card')!
export const galleryOf = (p: Project) => p.images.filter((i) => i.role === 'gallery')
export const categories: Category[] = ['Residencial', 'Interiores', 'Paisagismo', 'Comercial']
export const driftTiles: Img[] = M.drift.map((d) => img(d, 'drift', ''))
export const scopeLabel: Record<Scope, string> = { arquitetura: 'Arquitetura', interiores: 'Interiores', paisagismo: 'Paisagismo', obra: 'Obra' }
export const caption = (p: Project) => `${p.place === p.city ? p.city : `${p.place}, ${p.city}`} · ${p.year}`
