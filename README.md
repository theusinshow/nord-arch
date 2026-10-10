# Nord Arch — estudo conceitual

Site de um escritório de arquitetura **fictício** em Santa Catarina. É um estudo pessoal de Coded by M que roda **só localmente** (`noindex`, nunca publicado). As fotografias são de terceiros (Divisare) e estão creditadas em `/creditos`.

Documentação de arquitetura: comece por [`docs/ai/MASTER_CONTEXT.md`](docs/ai/MASTER_CONTEXT.md).

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview   # build de produção em http://localhost:4173
```

## Pré-requisitos locais (não versionados)

Os arquivos abaixo ficam no `.gitignore`. Quem clonar o repositório precisa gerá-los:

| O quê | Onde fica | Como gerar |
|---|---|---|
| Fontes Aktiv Grotesk (licença comercial, uso local) | `public/fonts/AktivGrotesk-*.woff2` | subset para woff2 de `C:\Dev\webdesign\Fonts\Aktiv Grotesk\OTF` com `python -m fontTools.subset … --flavor=woff2` |
| Imagens otimizadas | `public/img/` | pipeline abaixo |

## Pipeline de imagens

As imagens originais ficam em `C:\Dev\webdesign\referencias\Projetos de arquitetura`, fora do repositório. Os scripts abaixo rodam em sequência:

| Ordem | Comando | O que faz |
|---|---|---|
| 1 | `python scripts/curate.py` | pré-seleção automática; grava `scripts/images.config.json` (revisado e editado à mão depois) |
| 2 | `python scripts/cutout.py` | hero: estende o céu, recorta a casa (rembg) e mede a linha do telhado e a luminância |
| 3 | `node scripts/images.mjs` | gera AVIF + WebP em várias larguras e `src/content/images.manifest.json` |
| 4 | `python scripts/patch-reactbits.py` | reaplica o retema nos componentes React Bits vendorizados, caso sejam reinstalados |

## Estrutura

- **`src/content/`** — os 12 projetos (`projects.ts`, dados fictícios marcados com `fictional: true`), os textos do site (`site.ts`) e os textos alternativos das imagens (`alts.json`).
- **`src/components/reactbits/`** — os componentes Tear Ticket, Accordion Gallery, Drift Wall e Tilted Card, vendorizados e retematizados.
- **`src/components/motion/`** — wrappers desses componentes (Ticket, Highlights, DriftBand, TeamCard) e o `Reveal` diagonal de 33,7°.
- **`src/components/layout/Site.tsx`** — as duas linguagens de navegação: o wipe diagonal (`go`) e a imagem compartilhada via View Transitions (`openProject`).
- **`_explore/`** (ignorado pelo Git) — os protótipos aprovados durante o discovery. O protótipo de motion é a referência viva.
