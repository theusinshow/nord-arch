---
status: approved         # in_progress | awaiting_validation | approved | outdated
step: 9                  # 1..9, see the routing table in SKILL.md
session_mode: A          # A (Completo) | B (Equilibrado) | C (Enxuto)
register: brand          # brand | product | unset
language: pt-BR          # site output language(s)
updated_at: 2026-10-10
---

# Project Discovery

> The frontmatter above is the machine-readable status the resume workflow reads.
> Keep it accurate on every edit.

## Identification
- Client: Nord Arch
- Project type: Site completo multipágina + premium/autoridade — escritório de arquitetura
- Started at: 2026-10-09

## Confirmed Decisions
<!-- Record each as: answer · interpretation · decision. Mirror important ones into DECISIONS_LOG.md. -->

### Triagem (2026-10-09)
1. **Situação:** A — sem código · repo vazio (só commit inicial) · projeto greenfield.
2. **Tipo:** C + D — site completo multipágina com posicionamento premium/autoridade · portfólio é o produto · páginas de case por projeto (`/projetos/[slug]`), CMS a avaliar no módulo técnico.
3. **Objetivo:** E — modernizar presença digital · existe presença atual (a levantar) · conversão secundária e discreta (contato elegante, sem CTA agressivo).
4. **Nível visual:** C — experimental/motion forte, sobre base branca predominante e "bem artística" · branco = calma de galeria; motion = camada artística · exige camada de motion dedicada, orçamento de performance e `prefers-reduced-motion` desde o início.
5. **Conteúdo:** B — muitas fotos de projetos disponíveis; textos não confirmados · pipeline de imagem (AVIF/WebP, responsivo, placeholders) + curadoria · textos faltantes → `CONTENT_PENDING.md`.
6. **Modo da sessão:** A — Completo.
7. **Idioma do site:** A — só português (pt-BR) · sem i18n.

### Metas
- **Q1 Objetivo nº 1:** E — modernizar presença (da triagem).
- **Q2 Conversão:** "chamar no zap" · WhatsApp é a ação única · CTA WhatsApp persistente porém discreto (link no header/menu + fechamento de cada página de projeto + contato); **sem bolha verde flutuante padrão** (quebra a estética de galeria) — candidato: Tear Ticket como gatilho do WhatsApp na página de contato/fechamento da home. Mensagem pré-preenchida com contexto (ex.: projeto de origem).
- **Q3 Secundários:** A — mostrar portfólio/cases (apenas) · portfólio é o eixo do site; páginas de Processo (MERSI) e programa de estágio (Bilbao) **não** viram páginas próprias por padrão — no máximo um bloco curto no Estúdio.
- **Q4 Sucesso:** "clientes chegando já citando um projeto específico" · cada projeto precisa ser memorável e nomeável · nomes de projeto fortes e visíveis, URL própria por projeto, CTA WhatsApp com nome do projeto pré-preenchido (rastreável na própria conversa).
- **Síntese meta → arquitetura:** modernizar presença + portfólio como eixo → as páginas de projeto são o coração do site; cada uma termina num WhatsApp contextualizado.

### Público
- **Q1 Público primário:** casal de alta renda construindo a casa própria · decisão a dois, emocional + patrimonial, navegação longa e repetida (compartilham o link entre si) · foco residencial no portfólio; experiência mobile impecável (compartilhamento por WhatsApp/Instagram); projetos residenciais na frente.
- **Q2 Familiaridade:** C — especialista (chegam com terreno, programa e referências) · não precisam ser educados; comparam linguagem e rigor · páginas de projeto com ficha técnica precisa (área, local, ano, programa, equipe, fotógrafo) e eventuais plantas/cortes; zero conteúdo didático; WhatsApp pode pedir terreno/programa logo na mensagem.
- **Q3 Objeção principal:** D — afinidade estética ("a linguagem deles combina com a nossa?") · o próprio site é a prova: precisa *ser* a linguagem da Nord Arch, não descrevê-la · consistência visual absoluta entre site e obras; motion e tipografia derivados da arquitetura do escritório (não do catálogo React Bits); manifesto/linguagem curto no Estúdio; índice que permita ver muitos projetos rápido (comparar linguagem).
- **Q4 Sinais de confiança confirmados** (estudo conceitual — continua valendo não fabricar prova social): A — portfólio/obras construídas (apenas) · prova = obra · **nenhuma** seção de depoimentos, prêmios, imprensa, logos ou números; se o cliente confirmar publicações/prêmios/fotógrafo depois → entram como `CNT-` e linha discreta na ficha do projeto, nunca como seção de "prova social".
- **Q5 Precisa entender antes de agir:** "que a Nord Arch faz casas com uma linguagem autoral clara" · reforça Q3 · a linguagem deve ser legível em ≤10s na home (hero + 1ª dobra de projetos), e consistente em todos os projetos.
- **Síntese público → arquitetura:** casal especialista, alta renda, objeção estética, prova = obra → home mostra linguagem antes de qualquer texto; projetos com ficha técnica rigorosa; nenhum conteúdo didático ou prova social fabricada.

### Negócio
- **Nome / tipo:** Nord Arch — escritório de arquitetura, foco residencial (alta renda).
- **Q1 Oferta:** "tudo" — arquitetura residencial, interiores, paisagismo, acompanhamento/gestão de obra, e comercial/corporativo (peso menor) · escritório full-service · índice de projetos com **categoria** como metadado/filtro (Residencial · Interiores · Paisagismo · Comercial); acompanhamento de obra não é categoria de projeto → aparece no Estúdio ("do projeto à obra") e na ficha técnica (escopo).
- **Q2 Diferencial/posicionamento:** B — linguagem autoral ("casas que só poderiam ser da Nord Arch") · casa diretamente com a objeção estética · voz e visual derivam da assinatura arquitetônica; o site precisa materializar essa assinatura (definir no módulo visual: materiais, luz, geometria das obras). Integração ponta a ponta permanece como fato de oferta, não como headline.
- **Q3 Região:** Santa Catarina · SEO local estadual (ex.: "arquiteto residencial [cidade] SC", "casa de alto padrão SC") · local do projeto (cidade, SC) na ficha e no índice; schema `LocalBusiness`/`ArchitecturalFirm` (tipo exato a definir no técnico); clima/paisagem catarinense (mata atlântica, litoral, serra) como contexto possível das obras. Pendente: cidade-sede do escritório.

### Conteúdo
- **Q1 Textos:** nada — só os nomes dos projetos · todo copy será redigido · estrutura de copy definida nos blueprints; redação via skill `copywriting` (coreyhaines31/marketingskills, instalada no projeto em `.agents/skills/copywriting`, symlink para Claude Code) **na fase de execução**, guiada por `PRODUCT.md` (voz) — calibrar: a skill é orientada a conversão/SaaS; para a Nord Arch o tom é editorial, contido, sem fórmulas de headline de conversão. **Regra:** fatos de projeto (área, ano, local, programa, equipe) nunca são inventados → `CNT-` em `CONTENT_PENDING.md`; manifesto/textos conceituais = rascunho para aprovação do cliente.
- **Q2 Imagens:** muitas fotos próprias de projetos (da triagem) — volume/qualidade a detalhar no módulo de mídia.
- **Q4 Provas:** apenas portfólio/obras (do módulo público).
- **Q3 Logo/identidade:** C — nada; usar **placeholder** por enquanto → **atualizado 2026-10-10: monograma fornecido (ver Logo)** · logotipo = wordmark tipográfico "Nord Arch" na fonte display escolhida, implementado como componente `<Logo>` substituível (SVG/texto) · `CNT-` para logo definitivo; favicon/OG provisórios derivados do wordmark; paleta e tipografia definidas nas propostas (design-foundations).

### Arquitetura do site (aprovada 2026-10-10)
| Rota | Objetivo | Keyword (provisória) | Title provisório | Meta description provisória | CTA |
|---|---|---|---|---|---|
| `/` | Linguagem legível em ≤10s | arquitetura residencial alto padrão SC | Nord Arch — Arquitetura residencial em Santa Catarina | Casas autorais em Santa Catarina: arquitetura, interiores e paisagismo do projeto à obra. | Tear Ticket → WhatsApp |
| `/projetos` | Comparar muitos projetos rápido | projetos de casas alto padrão SC | Projetos — Nord Arch | Índice de projetos residenciais, interiores, paisagismo e comerciais da Nord Arch em Santa Catarina. | Abrir projeto |
| `/projetos/[slug]` | Fazer o casal se apaixonar e citar o projeto | [nome do projeto] + casa + [cidade] SC | [Projeto] — [Cidade], SC — Nord Arch | [Programa] em [cidade], SC. [Área] m², [ano]. (CNT) | WhatsApp com nome do projeto |
| `/estudio` | Rosto e assinatura autoral | escritório de arquitetura [cidade] SC | Estúdio — Nord Arch | Manifesto, linguagem e equipe da Nord Arch. (rascunho) | WhatsApp (discreto) |
| `/contato` | Conversão | contato arquiteto residencial SC | Contato — Nord Arch | Converse com a Nord Arch pelo WhatsApp sobre o seu terreno e programa. | Tear Ticket → WhatsApp |
| `/privacidade` | LGPD | — | Privacidade — Nord Arch | — | — |
| 404 | Recuperar navegação | — | Página não encontrada — Nord Arch | — | Voltar a Projetos |

Seções por página (ordem):
- **Home:** hero parede de fotos em motion (Drift Wall *ou* Reel Gallery — decidir no motion) + wordmark → frase-manifesto (1 linha) → destaques (Accordion Gallery, 4–6 casas) → link índice → fechamento Tear Ticket/WhatsApp.
- **Índice:** filtro categoria (Residencial · Interiores · Paisagismo · Comercial) → toggle Lista (nome · local · ano + preview no hover, ref. Bilbao) / Grade (masonry, ref. MERSI).
- **Projeto:** imagem de abertura → nome + local/ano → ficha técnica (área, programa, escopo, equipe, fotografia) → conceito (1 parágrafo) → galeria editorial ritmo variado → desenhos técnicos (opcional) → WhatsApp contextual → próximo projeto.
- **Estúdio:** manifesto (3–5 frases) → linguagem (materiais, luz, lugar) → escopo projeto→obra → equipe (Tilted Card nos retratos).
- **Contato:** Tear Ticket → WhatsApp → e-mail, Instagram → cidade-sede SC.
- **Cortados (deliberado):** Blog/News, Processo, Cultura, Shop, depoimentos, prêmios.

### Direção visual
- **Q1 Personalidade:** C — experimental/autoral com motion forte, sobre base branca predominante e muito respiro (da triagem + brain dump).
- **Linguagem arquitetônica da Nord Arch:** E — "ver fotos" · **resolvido por análise** (ver Specialist Findings) — linguagem de referência: volumes arquetípicos silenciosos, polos escuro×claro, paisagem primeiro, luz difusa · sistema visual desenhado **neutro-estrutural** (branco, grid, tipografia) até a análise; ajustes de temperatura (cor de apoio, ease do motion) ficam parametrizados para calibrar depois. Ação: desenvolvedor colocar uma amostra de fotos em `_input/fotos/` para análise.
- **Q2 Refinamento:** C — premium de portfólio · cada detalhe importa: transições entre páginas, cursor, preloader, microinterações, estados de hover/foco · fase de polish dedicada no EXECUTION_PLAN; orçamento de performance explícito para compensar.
- **⟳ REVISÃO DE ESCOPO (2026-10-10, desenvolvedor):** "As fotos são as das pastas que te mandei, apenas conceitual, não vou publicar, é um estudo pessoal — pode usar todas as que julgar melhor." → **Nord Arch é um projeto conceitual/estudo pessoal do estúdio, não um cliente real e não será publicado.** Substitui a decisão anterior "A — cliente real". Consequências: (1) fotos Divisare = **conteúdo do estudo** (curadoria livre); (2) créditos originais (escritório + fotógrafo) mantidos nos dados de cada projeto e numa página/rodapé de créditos — boa prática mesmo sem publicar; (3) **guarda de publicação**: `noindex,nofollow` + aviso "estudo conceitual" no rodapé + checklist pré-deploy caso um dia vá ao ar (trocar fotos ou obter licenças); (4) bloqueio de lançamento por fotos próprias **removido**; (5) licenças comerciais (Aktiv Grotesk web, React Bits Pro) deixam de bloquear — uso local/estudo; (6) dados de projeto e textos podem ser ficcionais, mas **marcados como ficcionais** nos dados (`fictional: true`).
- **Fonte de fotos informada:** `C:\Dev\webdesign
eferencias\Projetos de arquitetura` — 29 pastas, 918 jpg, **todas de projetos de terceiros publicados no Divisare** (ex.: Desai Chia, Frank Lloyd Wright/Hollyhock House, Mork Ulnes, Worrell Yeung, Luiz Volpato), com créditos de fotógrafos (Iwan Baan, Paul Warchol…). ⚠ **Não são obras da Nord Arch.** · ~~Decisão (A): cliente real; fotos próprias virão depois.~~ (superada pela revisão de escopo acima) Fotos Divisare = **referência de linguagem + placeholder de desenvolvimento apenas**, nunca publicadas · `CNT-` bloqueante de lançamento: fotos próprias de todos os projetos; build deve marcar placeholders (ex.: flag `placeholder: true` no conteúdo + check de pré-deploy).
- **Q4 Evitar a todo custo:** "IA SLOP" · veto explícito → `references/anti-slop.md` aplicado em modo estrito; exceções só com justificativa forte e declaradas · riscos específicos deste projeto: (a) componentes React Bits com defaults de demo (teste de transplante — re-tematizar 100%: cor, raio, easing, grayscale); (b) U17 motion decorativo — com 5 componentes, cada efeito precisa de função; (c) T9 caixa-alta espaçada como "premium" — só em labels de ficha técnica; (d) T1 Inter/Geist como display; (e) U13 ritmo uniforme de seções; (f) U9–U11 prova fabricada (já vetada). Copy: skill copywriting já proíbe tells de IA; reforçar com tom editorial.
- **Q5 Tom:** B — calmo e espaçoso · silêncio de galeria; as fotos falam.
- **Visual direction statement (norte):** *(superado em parte: "branca-quente" → branco puro, DEC-007)* *Uma galeria branca e silenciosa onde a arquitetura da Nord Arch é a única coisa que fala. Grid rígido e assimétrico, tipografia contida, e motion lento e pesado — como luz se movendo sobre um volume — usado só onde revela, conecta ou convida.*
- **Tensão a gerir:** "motion forte/experimental" (triagem) × "calmo e espaçoso" (tom) → motion **intenso em poucos momentos-assinatura** (hero, transição entre páginas, convite Tear Ticket) e quase imóvel no resto. Intensidade por raridade, não por quantidade.

### Fundações — Layout (escolhido 2026-10-10)
- **Escolha:** A — **Parede de Galeria** (desenvolvedor pediu wireframes ASCII das 3 opções antes de decidir).
- **Personalidade estrutural:** fotos "penduradas" em escalas variadas num grid 12 col assimétrico; legendas tipo etiqueta de museu (nome · local · ano); hero Drift Wall full-bleed desacelerando sob o wordmark.
- **Tokens:** grid 12 col · gutter 24px · margens `clamp(20px, 5vw, 96px)` · container máx. 1600px (imagens podem sangrar) · espaçamento base 8 · gaps de seção **variáveis** 96 / 160 / 280px (pausas deliberadas, anti-U13) · proporções de imagem 3:2 e 4:5 (do acervo).
- **Mobile:** coluna única com ritmo variado (alternar largura 100% / 80% deslocada / 4:5 centralizada).
- **Tells:** risco U13 (ritmo uniforme) → **corrigido** por gaps variáveis e escalas de imagem não repetidas em sequência; risco U12 (bento sem motivo) → tamanhos de imagem codificam importância (abertura > destaque > apoio).

### Fundações — Tipografia (escolhida 2026-10-10)
- Desenvolvedor gosta de **Orbitron** → recusada como fonte de site (sci-fi/games; falha teste de transplante p/ arquitetura). Qualidade que atraía: **largura/estendida** (A) → rodada de 3 estendidas; specimen HTML local em `_explore/tipografia/index.html`.
- **Escolha:** B "Linha d'Água" **sem a serifa** → **Michroma 400** (títulos, nomes de projeto, nav, rótulos, wordmark) + **Aktiv Grotesk 400/500** (corpo, ficha, legendas, manifesto longo). Specimen: `_explore/tipografia/b-logo.html`.
- **Tokens provisórios:** títulos Michroma `clamp(28px, 4vw, 64px)` lh 1.1 tracking 0 · manifesto Michroma `clamp(22px, 2.6vw, 40px)` lh 1.3, ≤26ch · rótulos Michroma 11px tracking 0.02em (sem caixa-alta forçada) · wordmark Michroma caixa-alta tracking 0.08em · corpo Aktiv 16px/400 lh 1.6, 62ch · legendas Aktiv 14px muted · escala base 16, razão 1.25.
- **Tells:** T2 não acionado (estendida × neo-grotesca de largura normal — contraste de largura claro); T5 parcial — Michroma tem **um peso só** → hierarquia por tamanho/espaço/cor, declarado; T9 — caixa-alta + tracking só no wordmark (logotipo), não em títulos → exceção deliberada restrita ao lockup.
- **Restrições:** Aktiv Grotesk é comercial (Dalton Maag) — **confirmar licença web** (`CNT`/risco); fallback livre caso não haja licença: a definir (candidatos: Switzer, Hanken Grotesk). Michroma: Google Fonts, OFL; latin subset, `font-display: swap`, preload.
- **Revisão (2026-10-10):** desenvolvedor quer título **mais grosso** para casar com o peso do traço do logo (Michroma tem peso único, leve demais ao lado do monograma) → nova comparação em `_explore/tipografia/titulo-cor.html`: Michroma (ref.) · Panchang 600/700 · Lexend Zetta 600 · Syncopate 700 · Krona One. Corpo segue Aktiv Grotesk. **Decisão final (A):** **Michroma em wordmark, títulos, nav e rótulos** (o desenvolvedor reconsiderou o título mais grosso ao ver o lockup); corpo segue Aktiv Grotesk. Peso único da Michroma = exceção T5 declarada — hierarquia por tamanho, espaço e caixa.

### Fundações — Cor (em revisão 2026-10-10)
- Rodada A Só Tinta / B Madeira / C Campo (base off-white quente) mostrada em `_explore/tipografia/cor.html` → **desenvolvedor redirecionou:** "branco bem branco, preto, cinza; talvez um destaque azul-gelo".
- **Proposta derivada:** `#FFFFFF` fundo · `#0B0B0C` tinta (19,7:1) · `#6B6E72` cinza texto (5,1:1 AA) · `#E4E6E8` cinza linha · opcional **gelo** `#DCE9F0` (só superfície: ingresso, hover, seleção — nunca texto) + **gelo escuro** `#4A6B80` (5,7:1 — texto/foco quando o acento precisa ser lido).
- **Leitura:** branco-cubo de galeria + preto do monograma; o azul-gelo ecoa o "Nord" (norte/frio) do nome — motivo de marca, não decoração.
- **DIVERGÊNCIA registrada:** subagente recomendou off-white quente (acervo de madeira/luz quente); desenvolvedor prefere branco puro → decisão do desenvolvedor prevalece; mitigação: fotos com passe-partout zero (sangram no branco), cinzas neutros-frios para não brigar com a madeira.
- **Decisão final (2026-10-10):** **sem acento** — `#FFFFFF` fundo · `#0B0B0C` tinta · `#6B6E72` cinza texto · `#E4E6E8` cinza linha. Estados (hover/foco/ativo/CTA) por tinta: inversão preto↔branco, sublinhado, contorno 2px tinta. Azul-gelo rejeitado (fica registrado como opção futura se o cliente pedir). Só modo claro. Cor do site = fotos.

### Motion (aprovado 2026-10-10)
- Intensidade: forte/autoral por **raridade** (3 momentos-assinatura + apoio + silêncio). Personalidade: lento, pesado, sem elástico.
- **Mapa proposto:** (1) Hero Home = Drift Wall full-bleed (radius 0, cor real, ~16px/s ≈ ⅓ do default, tilt suave; mobile 3 col; reduced → grade estática) · (2) Transição de página = wipe diagonal 33,7° em tinta com monograma; card→projeto com imagem expandindo · (3) Tear Ticket = convite WhatsApp (fechamento Home/Projeto/Contato; rasgo até 33,7°; Enter rasga; reduced → botão) · (4) Accordion Gallery = destaques Home, legenda Michroma abaixo, sem gradiente escuro; mobile vertical · (5) Tilted Card = equipe no Estúdio, 4–6°, scale 1.02, só mouse, + reduced-motion adicionado · Silêncio: reveal de imagem diagonal 33,7° (uma vez), preview segue cursor no índice (desktop), preloader = monograma desenhado ≤1,2s só 1ª visita; texto/ficha/nav nunca animam; sem scroll-jacking.
- **Tokens:** 200 / 600 / 1200 / 1400ms · ease-out `cubic-bezier(.2,.7,.1,1)` · in-out página `cubic-bezier(.7,0,.2,1)`.
- **Hero revisado (desenvolvedor, 2026-10-10 — APROVADO como direção; "vamos apenas refinar"):** referência enviada = foto full-bleed + tipografia gigante distribuída ("ERA / RESIDENCE" com palavras pequenas espaçadas nos vãos). Adaptação Nord Arch: **"N O R D" no topo e "A R C H" embaixo em Michroma branca**, rótulos pequenos espaçados ("SANTA CATARINA", "ARQUITETURA") nos vãos; **efeito de profundidade** — fileira de cima passa **atrás** da casa (recorte do primeiro plano), fileira de baixo na frente da vegetação. Entrada: letras sobem de máscaras em stagger, foto 1.12→1 em 2,4s; scroll: camadas em parallax (foto+recorte juntos 0.3, letras de trás 0.15, da frente −0.1). Header branco sobre o hero, tinta no resto.
  - **Drift Wall** sai do hero → vira **faixa abaixo do manifesto** (88vh) levando ao índice.
  - **Requisitos de produção do hero:** (a) foto com **céu/respiro no terço superior** (direção de arte da sessão fotográfica — registrar em MEDIA_PLAN); (b) **recorte do primeiro plano** por foto de hero (rembg/isnet ou máscara manual) em WebP/AVIF com alfa; (c) metadado de enquadramento por imagem (linha do telhado → `at`) para manter a sobreposição em qualquer proporção de tela; (d) LCP: preload da foto + recorte, tamanhos responsivos; (e) contraste: letras brancas exigem céu de valor médio/escuro (entardecer ou céu azul) — céu branco nublado não serve.
  - Protótipo: foto placeholder Dune House (KLG/Paris Brummer, Divisare) com céu estendido artificialmente +700px; recorte gerado com rembg `isnet-general-use`.
- **Refinos do hero** (tamanho/tracking das letras, rótulos, grau de oclusão, velocidades) ficam para a fase de polish do EXECUTION_PLAN, sobre o protótipo `_explore/motion/index.html` como referência viva.
- **Reel Gallery:** fora (redundante com Drift Wall + licença Pro).
- **Protótipo vanilla** (recriação aproximada, não os componentes React Bits): `_explore/motion/index.html`. Logo vetorizado aproximado a partir do PNG (centerlines, stroke 39) — usado só no protótipo.

### Mídia — Acervo do estudo (v3 mesclada — APROVADO 2026-10-10)
- Histórico: v1 (Casa + topônimo SC, PT) → v2 (substantivo concreto + House, EN, locais internacionais) → desenvolvedor: **"mescle com os que tinha antes"**.
- **Regra v3 (mescla):** todos os projetos **em Santa Catarina** (geografia da v1, coerente com a paisagem de cada foto). Dois registros de nome, com lógica explícita:
  - **Nome de lugar (PT)** — `Casa/Celeiro/Ateliê + topônimo real` quando o **lugar** é o que define a obra.
  - **Nome de fato físico (EN)** — `[substantivo concreto] + House/Pavilion` quando um **material/forma/vegetação/clima** define a obra.
  - Proibido: abstratos, "tech-slop" (Nexus, Aura, Haven, Echo, Vista, Horizon, Essence), adjetivos, sinônimo óbvio do nome original.

| # | Nome | Registro | Local (SC) | Ano | Categoria | Referência (crédito) |
|---|---|---|---|---|---|---|
| NA—01 | **Marram House** *(hero)* | fato: capim das dunas | Joaquina, Florianópolis | 2025 | Residencial | KLG Architects · Paris Brummer — Dune House |
| NA—02 | Casa Pedra Furada | lugar | Urubici | 2024 | Residencial | Desai Chia · Paul Warchol — Ledge House |
| NA—03 | Pleat House | fato: telhados dobrados | Rancho Queimado | 2024 | Residencial | Desai Chia · Paul Warchol — Roxbury House |
| NA—04 | Casa Campo dos Padres | lugar | Bom Retiro | 2023 | Residencial | Desai Chia · Paul Warchol — Stanfordville House |
| NA—05 | Five Gables | fato: cinco empenas | Bom Jardim da Serra | 2023 | Residencial | Mork Ulnes · Jeremy Bittermann — Octothorpe House |
| NA—06 | Firn House | fato: neve antiga | São Joaquim | 2022 | Residencial | Moser und Hager · Gregor Graf — Hof Thann |
| NA—07 | Casa Treze Tílias | lugar | Treze Tílias | 2022 | Residencial | unisono · David Schreyer — EFH Keiler |
| NA—08 | Casas Ferrugem | lugar | Praia do Ferrugem, Garopaba | 2021 | Residencial | OPAL · Trent Bell — Little House on the Ferry |
| NA—09 | Steppe House | fato: laje baixa no campo | Coxilha Rica, Lages | 2021 | Residencial | Skupaj arhitekti · Ana Skobe — House on the Edge of the Plain |
| NA—10 | Celeiro Testo Alto | lugar | Pomerode | 2020 | Interiores | CoPa · Naho Kubota — Barnard Barn |
| NA—11 | Mound Pavilion | fato: monte plantado | Ratones, Florianópolis | 2020 | Paisagismo | NO Architecture · Iwan Baan — Flower House |
| NA—12 | Ateliê Saco dos Limões | lugar | Florianópolis | 2019 | Comercial | messina rivas · Federico Cairoli — Casa Jardim Paulista |

- **Reserva:** Frame House, House of Horns, Osprey, Pine Lane, Poplar Grove, Steeplechase, Dirnbergergut, Dorf Rieden, Forest Retreat, Descanso, Casa Bürgel. **Excluídos:** Hollyhock, Oak & Alder, Aperture, Coffered, Encinitas, Morgan Creek.
- Dados: `fictional: true` + `credit {architect, photographer, source}`; áreas/programas plausíveis definidos na geração de conteúdo.

### Técnico
- **Q1/Q2 Stack:** A — default do estúdio ajustado: **Vite + React + TypeScript + Tailwind**, `motion` (Tear Ticket, Tilted Card), `gsap` (Accordion Gallery, transições), **React Router** (SPA → transição diagonal + imagem compartilhada card→projeto sem reload). Componentes React Bits instalados via registry shadcn (`TS-TW`) e **retematizados** em `src/components/motion/`.
- **Conteúdo:** `src/content/projects.ts` tipado (12 projetos + reserva), sem CMS; campos `fictional`, `credit`, `hero { fg, roofLine }`.
- **Imagens:** pipeline de build (`vite-imagetools` ou script sharp) → AVIF/WebP em múltiplas larguras; recorte do hero com alfa (WebP/AVIF) gerado por script (rembg `isnet-general-use`) e versionado.
- **Scroll:** nativo (sem Lenis/scroll-jacking) — parallax por `requestAnimationFrame` com leitura de `scrollY`; reavaliar Lenis no polish só se o parallax travar.
- **Necessidades:** sem i18n; sem formulário (WhatsApp via `wa.me` com mensagem pré-preenchida por projeto — número placeholder); sem analytics; sem 3D/WebGL.
- **Deploy:** A — só local (`npm run dev` / `npm run preview`); nenhum deploy previsto. Se um dia publicar → checklist de publicação (trocar fotos/licenças, remover noindex).
- **Guarda de estudo:** `<meta name="robots" content="noindex,nofollow">`, aviso "estudo conceitual" no rodapé, página `/creditos`.

### Ferramentas
- **Agente executor:** A — Claude Code (prioriza `/CLAUDE.md` + `/docs/ai/CLAUDE.md`; `AGENTS.md`/`CODEX.md` gerados mesmo assim para portabilidade).
- **Skills:** modo A — sugerir por fase com permissão: `impeccable` (visual/polish), `frontend-design`, `copywriting` (instalada no projeto), `web-design-guidelines`/`design:accessibility-review` (QA), `webapp-testing` (verificação Playwright).

### Qualidade (aprovado)
- **A11y:** WCAG AA — contraste validado, teclado completo (Tear Ticket via Enter/Espaço), foco visível 2px tinta, alt em todas as fotos, `prefers-reduced-motion` em todos os efeitos (incl. Tilted Card).
- **Performance (crítica):** LCP < 2,5s · CLS < 0,05 · INP < 200ms · JS inicial ≤ 250KB gzip · hero (foto + recorte) ≤ 450KB AVIF · Drift Wall/animações 60fps em notebook médio.
- **SEO:** pouco relevante (estudo privado, `noindex`) — title/meta por página como boa prática.

### Logo (2026-10-10)
- **Fonte:** monograma fornecido pelo desenvolvedor → `_input/logo/nord-arch-monograma.png` (750×750 PNG; **precisa de SVG** → CNT).
- **Leitura:** N + A aninhados, traço monolinha uniforme, verticais + uma diagonal de **33,7°** (telhado de uma água / shed) — ecoa os volumes arquetípicos do acervo.
- **Combina com Michroma:** sim — ambos monolinha, quadrados, técnicos; Michroma no wordmark ao lado do monograma.
- **Motivo derivado:** o ângulo 33,7° vira assinatura de motion/forma (reveal diagonal de imagens, corte de telhado em máscaras, ângulo do rasgo do Tear Ticket). Usar com parcimônia.
- **Cuidados:** testar legibilidade em 16px (linhas internas podem fundir → favicon pode precisar de versão simplificada); ~~cor do logo = `#2A2826` no off-white~~ → cor do logo = `#0B0B0C` sobre `#FFFFFF` (DEC-007), versão branca sobre foto.

### Direção inicial do desenvolvedor (provisional)
- Nome: **Nord Arch**.
- "Mais focado no branco, bem artístico, com predominância branca."

### Raw Input — brain dump (2026-10-09)
> "Tenho como ref esses 3 sites: tatianabilbao.com, mersi-architecture.com, cargoarchitecture.ca — se basear neles. Quero uma estrutura completa de um site de escritório de arquitetura, quero foco no branco, quero respiro, e quero usar bastante motion, em particular: reactbits tear-ticket, accordion-gallery, drift-wall, tilted-card."

**Classificação (WISHES do desenvolvedor — não são fatos do cliente):**
- *Referências de arquitetura/estrutura (provisional):*
  - Tatiana Bilbao — índice de projetos como **lista de texto** (não grid), desenho/ilustração da cidade como hero ("City Map"), seções About / News / Contact / programa de estágio.
  - MERSI — hero com tagline curta + **grid masonry** de imagens + listagem com metadados (local · categoria · ano); páginas Projects / Agency / **Process** / Contact.
  - CARGO — cards com **ano + local** acima do título; páginas Projects / About / **Culture** / Contact; **formulário "Iniciar um projeto"** detalhado (escopo, orçamento, prazo) como conversão principal.
- *Visual (provisional):* branco predominante, muito respiro, monocromático; a cor vem das fotos.
- *Motion (provisional) — componentes React Bits pedidos:*
  - **Tear Ticket** (`motion`) — ingresso/cartão destacável com física de rasgo (arrastar → canhoto se solta), tilt e parallax. Uso candidato: interação de conversão/contato ou "convite" (ex.: agendar visita), uso pontual.
  - **Accordion Gallery** (`gsap`) — painéis de imagem que expandem no hover/click com parallax e labels. Uso candidato: projetos em destaque na home ou categorias.
  - **Drift Wall** (sem deps, CSS 3D + rAF) — parede 3D de tiles em colunas que derivam continuamente, com perspectiva. Uso candidato: hero da home ou página de índice com o volume de fotos.
  - **Reel Gallery** (React Bits **Pro — licença paga**, canvas) — faixas horizontais inclinadas de imagens que deslizam com scroll/drag/teclado, velocidades independentes, imagens dessaturadas com "spotlight" de cor sob o cursor, fades nas bordas, auto-drift e inércia. Uso candidato: hero da home ou índice de projetos. **Pendência: confirmar licença Pro** (ou recriar comportamento equivalente).
  - **Tilted Card** (`motion`) — card com tilt 3D seguindo o cursor + legenda. Uso candidato: cards de projeto / equipe.
- *Implicação técnica:* stack React (Next.js provável); deps `motion` + `gsap`; todos suportam `prefers-reduced-motion` em algum grau — validar o Tilted Card (não tem).
- *Alerta anti-slop:* defaults dos componentes são tema escuro (`overlayColor #060010`), `radius 14–16px`, grayscale — **precisam ser re-tematizados** para branco/arestas da Nord Arch, senão viram transplante direto do demo (teste de transplante). Tilted Card é tell U4-adjacente (cartão inclinado) — só usar com função.

## Open Questions
- Qual é a presença digital atual (site antigo, Instagram, PDF de portfólio)?
- Quais textos existem (manifesto, descrições de projetos, bio/equipe)?
- Quantos projetos e quantas fotos por projeto; qualidade/resolução das fotos?
- Onde exatamente cada componente React Bits entra (decidir em site-architecture/motion; risco de excesso de efeitos competindo com as fotos).
- Cidade-sede fictícia em SC (para contato/SEO do estudo)?
- Logo em SVG vetorial (só temos PNG 750px).
- Licença React Bits Pro (Reel Gallery): já tem / vai comprar / recriar?
- Desenho/ilustração própria da Nord Arch (como o City Map da Bilbao) existe?

## Rejected Options
<!-- What was proposed and NOT chosen, per decision. Useful context in later sessions. -->
- Acervo v2 puro (EN + locais internacionais) — substituído pela mescla v3 (2026-10-10).
- Acervo v1: nomes "Casa + topônimo de SC" em PT (Casa Joaquina, Casa Pedra Furada…) — rejeitado; preferência por nomes curtos estilo internacional (2026-10-10).
- Cor: paletas off-white quente (Só Tinta/Madeira `#8A6640`/Campo `#4F5A34`) e acento azul-gelo `#DCE9F0`/`#4A6B80` — rejeitados em favor de branco puro + preto + cinza sem acento. Título mais pesado (Panchang 600/700, Lexend Zetta 600, Syncopate 700, Krona One) — rejeitado; Michroma mantida (2026-10-10).
- Tipografia: Orbitron (sci-fi, desalinhada com arquitetura); rodada 1 (A Etiqueta de Museu/Aktiv só, B Editorial Quieto/Newsreader+Aktiv, C Prancha/Plex) substituída a pedido; rodada 2: A Horizonte (Panchang+Aktiv), C Monumento (Monument Extended+Plex) e a serifa Newsreader da B — rejeitadas (2026-10-10).
- Layout B "Arquivo/Índice" (lista tipográfica + imagem no hover, Reel Gallery em faixa) e C "Corte & Escala" (linguagem de prancha, galeria horizontal, régua de scroll) — rejeitados em favor de A "Parede de Galeria" (2026-10-10). Elementos de B (lista com preview no hover) seguem válidos para o toggle Lista em `/projetos`.
- Posicionamento A "Ponta a ponta" e C "Rigor e precisão" — rejeitados em favor de B "Linguagem autoral" (2026-10-09).

## Specialist Findings
<!-- Only when the architecture fan-out ran. One compact block per track + LACUNA/DIVERGÊNCIA lines. -->

### Fan-out de arquitetura (2026-10-10) — 5 trilhas
**Scout:** padrão SC (Suna, Dorini, Studio Bloco) = grade sem ano, WhatsApp genérico/widget, prova social empilhada; **lacuna = ligar projeto → conversa** (Tear Ticket com nome do projeto) + legenda completa + conceito por obra. Numeração pública do acervo é convenção (valida NA—NN). LACUNA: motion das referências não verificável (JS).
**Conteúdo:** jornada = chega com terreno buscando afinidade → reconhece linguagem → encontra "a casa dela" → entende alcance (projeto→obra) → age citando projeto. Mensagem central: "Cada casa da Nord Arch nasce do lugar e só poderia ser dela." (apoios: obra com nome/local/ano; linguagem material-luz-lugar; um escritório do projeto à obra). /projetos e /estudio **sem** Tear Ticket (anti-U14); /estudio termina em link p/ /projetos. Cards sem "Ver projeto →" (U15). CNT: manifestos curto/longo, 12 conceitos, 12 fichas fictícias, 3 textos de linguagem citando projetos, escopo, equipe fictícia + retratos, 3 mensagens WhatsApp, créditos.
**Visual:** tese = "a parede branca antes da foto" · mecanismo: espaço. Escala completa por papel (hero clamp(56px,14vw,224px) lh .9; display projeto clamp(39px,5.2vw,76px); h1 clamp(28,4vw,64); h2 clamp(25,2.8vw,39); nav 13px; rótulos 11px +.04em; wordmark 14px +.32em; corpo Aktiv 16/1.6/62ch; legenda Aktiv 13px). Cor: foco 2px tinta (anel duplo branco/tinta sobre foto), seleção tinta/branco, **texto branco sobre foto só se luminância média da área ≤0,18 (rótulos) / ≤0,30 (letras do hero) — proibido scrim/gradiente/text-shadow**. Espaço base 8; seções clamp 96/160/280; container 1/8/12 col por breakpoint, máx 1600. Radius 0, sem sombras. Exceções anti-slop: T5 (peso único), T9 (wordmark/hero), branco puro.
**Motion:** specs por interação (ver MOTION_DIRECTION na geração). Parallax do hero **desligado no mobile**; Tear Ticket rasga também por **tap/clique**; preloader só 1ª visita (sessionStorage); rAF pausado fora da tela; Accordion/lista sem animar propriedades de layout. Props de retema: Drift Wall speed 16/radius 0/overlay transparent/tilt 3; Accordion overlay transparent/radius 0/grayscale false; Tilted Card rotate 5/scale 1.02/sem tooltip e aviso mobile; Tear Ticket radius 0/tearAngle 33.7/borda tinta/fundo branco. Libs: motion via LazyMotion (~30KB) + gsap (~27KB) só em chunk lazy.
**Técnico:** Vite 6 + React 19 + TS strict + React Router 7 (`createBrowserRouter`), Tailwind v4 `@theme`; rotas lazy exceto Home; `scripts/images.mjs` (sharp: AVIF q50/WebP q72 em 640–2560 + manifest w/h) + `scripts/cutout.py` (rembg) — originais (364MB) ficam fora do repo; fontes: `@fontsource/michroma` + Aktiv convertida para woff2 subset (gitignored); `waLink(project?)`; React Bits via `npx shadcn@latest add https://reactbits.dev/r/<Name>-TS-TW` após `components.json`. Orçamento: rota lazy ≤60KB, foto hero ≤300KB + recorte ≤150KB, galeria ≤220KB @1440w, fontes ≤90KB.

**Colisões resolvidas (registrar no DECISIONS_LOG):**
- gsap: Accordion Gallery depende de gsap e está na Home → Accordion carregado por `import()` quando se aproxima da viewport; gsap fica fora do bundle inicial. Deps reais (registry): Tear Ticket/Tilted Card = motion; Accordion = gsap; Drift Wall = nenhuma.
- rembg: técnico disse "não instalado" → falso, rembg 2.0.69 + modelo isnet-general-use já usados no protótipo.
- Accordion: o componente anima largura ao hover (não scroll) — aceito; regra "sem layout no scroll" preservada.
- /estudio sem Tear Ticket (fecha com link para /projetos) — alinhado com anti-U14.

**Colisões em aberto — todas resolvidas pelo desenvolvedor (2026-10-10):**
1. ~~DIVERGÊNCIA visual: manifesto em Aktiv~~ → **RESOLVIDA (A): manifesto em Michroma** (home e estúdio); consequência: manifestos curtos (home 1–2 frases; estúdio 3–5 frases curtas), medida até ~30ch para não cair em 3 palavras/linha.
2. ~~Transição card→projeto~~ → **RESOLVIDA (A):** card/Accordion/índice → projeto = **imagem compartilhada expandindo** (motion `layoutId`, 1200ms in-out, sem wipe) = "entrar numa casa"; demais navegações (menu, estúdio, contato, voltar, próximo projeto?) = **wipe diagonal 33,7°** = "mudar de sala". "Próximo projeto" usa imagem compartilhada também (é um card).
3. ~~3 Tear Tickets idênticos~~ → **RESOLVIDA (A): um componente, três variantes** — `home`: horizontal médio, "Convite · comece pelo seu terreno", msg "Olá, conheci a Nord Arch e tenho um terreno em [cidade]…" · `project`: canhoto com miniatura da foto + código NA—NN (ingresso de exposição), "Conversar sobre a [Nome]", msg "Olá, vi a [Nome] ([NA—NN]) e gostaria de conversar." · `contact`: vertical grande, protagonista, "Agende a primeira conversa", msg-roteiro "Olá! Terreno em: __ · Programa: __ · Projeto de referência: __". (textos = rascunho, refinar com skill copywriting)
4. ~~Timing de entrada~~ → **RESOLVIDA (A):** wipe 600ms in + 600ms out; entrada do hero **sobreposta** à saída do preloader (hero completo ≈2,5s); preloader só na 1ª visita (sessionStorage); entrada aguarda `img.decode()` da foto e do recorte com timeout 800ms.

### Análise de linguagem — fotos de referência (subagente, 2026-10-10)
Amostra: 45 fotos de 29 projetos (Divisare; referência apenas — ver decisão de conteúdo).
- **Linguagem recorrente:** (1) volumes arquetípicos e silenciosos (empena, galpão, laje baixa), expressão por proporção e material, sem ornamento; (2) dois polos materiais — escuro (madeira queimada, metal preto) × claro (reboco branco, concreto claro, pinus cru); (3) paisagem primeiro — casa pequena no campo/mata, vegetação em primeiro plano; (4) luz difusa (nublado, névoa, sol baixo, golden hour); (5) interiores = parede branca + madeira crua quente + janelas emolduradas.
- **Clusters:** Monólito Rural Escuro (Ledge, Roxbury, Stanfordville, Steeplechase, Octothorpe, Dirnbergergut, House of Horns, Frame, Bürgel) · Calma Clara/Caixa Branca (Skupaj, Hof Thann, Aperture, Coffered, Encinitas, Flower House, Jardim Paulista, Barnard) · Madeira Vernacular Quente (Pine Lane, EFH Keiler, Dorf Rieden, Ferry, Poplar Grove, Descanso, Dune, Osprey, Forest Retreat) · Expressivo/Mid-century (Oak & Alder, Morgan Creek, Hollyhock).
- **Paleta (a olho):** `#F2F0EB` reboco quente · `#E9E4DA` gesso na sombra · `#D6B98E` pinus/compensado · `#BDB8AF` concreto claro · `#8A847A` cedro envelhecido · `#2A2826` madeira queimada/metal preto · `#7C8A4E` campo · `#B48A52` capim seco/ocre; céu `#DCE1E6`.
- **Fotografia:** frontal/levemente oblíqua, horizonte baixo, muito céu, quase nunca pessoas; ~69/31 paisagem/retrato no acervo (3:2 e 4:5 típicos).
- **Implicações:** grid rígido e ortogonal com divisão assimétrica e mix 3:2 + 4:5 como parede de galeria; motion lento e pesado (~900–1400ms, ease-out forte tipo `cubic-bezier(.2,.7,.1,1)`, reveals por máscara/clip, parallax leve, nada elástico); tipografia grotesca técnica contida (+ serifa discreta opcional para títulos de projeto); **off-white quente (~`#F4F2EE`) em vez de `#FFFFFF`** — branco puro só em passe-partout.
- **Excluir como referência:** Hollyhock (ornamental/histórico). Secundários: Oak & Alder, Morgan Creek; fracos para hero: Encinitas, Coffered.
- **Set de hero/destaques (placeholder dev):** Stanfordville #23, Roxbury #2, Skupaj #2, Flower House #2, Ledge #2, Hof Thann #2, Barnard Barn #33, EFH Keiler #4.
- **DIVERGÊNCIA:** "branco predominante" (desejo) × acervo dominado por madeira escura e paisagem → resolver como **moldura branca quente + fotos carregam o escuro/a cor**; nunca UI escura.
- Notas de acervo: duplicatas (Osprey 2/28, Dune 2/27, Hollyhock 7/34); pasta OPAL contém ~9 arquivos do CoPa; Bürgel #26 é planta.

## Suggested Research

## Change History
- 2026-10-10 — Execução fases 01–08 concluída pelo Claude Code; drift check feito e docs reconciliados (DEC-023, DEC-024); step 8 → 9.
- 2026-10-09 — DISCOVERY criado; triagem concluída (step 1 → 2).
- 2026-10-10 — Docs gerados (19 arquivos); validate_output sem bloqueios; doc-verifier: 6 bloqueadores corrigidos (DEC-022); step 6 → 7.
- 2026-10-10 — Fan-out de arquitetura (5 trilhas) + 4 colisões resolvidas; step 4 → 5, status awaiting_validation.
- 2026-10-10 — Discovery estruturado concluído (step 3 → 4).
- 2026-10-10 — Revisão de escopo: Nord Arch = estudo conceitual não publicado; fotos Divisare liberadas como conteúdo do estudo.
- 2026-10-09 — Brain dump processado (refs + componentes de motion); step 2 → 3.
