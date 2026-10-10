# Content Pending

## Status
**Update 2026-10-10 (execution):** CNT-002…CNT-018 are written in `src/content/site.ts` and `src/content/projects.ts`. All 132 image alts are in `src/content/alts.json`. Still open: **CNT-001** (official SVG logo) and the **CNT-007 portrait** decision (the placeholder is in use).

Nord Arch is a fictional study (DEC-011). Every item below is something **we** write or define. Nothing is waited on from a client.

Rules for all copy:

- Drafted with the `copywriting` skill (DEC-021).
- Follows the voice in `/PRODUCT.md`.
- Passes the anti-slop copy rules: no contrast reveals, no negation lists, no stock openers, no em dashes in headlines.
- Fictional facts are stored with `fictional: true` and never presented as verified claims.

The dynamic tokens used in the copy (`{name}`, `{code}`, `{city}`, `{area}`, `{program}`, `{year}`) come from `src/content/projects.ts`.

## Items

### CNT-001 — Logo as vector SVG
**Type:** brand asset
**Status:** Not received (only the PNG `_input/logo/nord-arch-monograma.png`, 750 px)
**Impact:**
- the preloader draws the monogram stroke by stroke, so it needs a stroke-based SVG;
- the favicon needs a 16 px legibility test;
- the OG image.

**Used in:** `<Monogram />`, preloader, header, 404, favicon.
**Current placeholder:** the centreline trace from the prototype (`_explore/motion/index.html`, `#mono` symbol: 3 paths, stroke-width 39, viewBox `170 90 410 540`). It is approximate.
**Requirements:** a stroke-based SVG (paths, not outlined fills) faithful to the PNG, plus an optional simplified favicon mark.

### CNT-002 — Home manifesto (short)
**Type:** copy · **Status:** to write
**Used in:** `/` section 2
**Current placeholder:** "Casas que pertencem ao lugar antes de pertencerem a nós." (prototype draft)
**Requirements:** 1–2 sentences, ≤ 30ch per line in Michroma; conveys "the house is born from the place".

### CNT-003 — Estúdio manifesto (long)
**Type:** copy · **Status:** to write
**Used in:** `/estudio` section 1
**Requirements:** 3–5 short sentences in Michroma; authorship plus place; no claims of awards or numbers.

### CNT-004 — Project data ×12 (fictional)
**Type:** data · **Status:** to define
**Used in:** ficha técnica, meta descriptions, list and grid.
**Requirements:** per project:
- area (m², plausible for the photos);
- program (for example "Residência unifamiliar, 4 suítes");
- scope (arquitetura · interiores · paisagismo · obra);
- team (fictional names from CNT-007).

Everything is flagged `fictional: true`. Keep names, places and years from DEC-012.

### CNT-005 — Project concepts ×12
**Type:** copy · **Status:** to write
**Used in:** `/projetos/:slug` concept.
**Requirements:**
- 1 paragraph each, 50–90 words, ≤ 62ch measure.
- States the key decision of the house, tied to what is visible in the photos: the roof, the material, the relation to the plot.
- No superlatives.

### CNT-006 — Estúdio "Linguagem" (Materiais · Luz · Lugar) and "Escopo"
**Type:** copy · **Status:** to write
**Used in:** `/estudio` sections 2–3.
**Requirements:**
- 3 blocks of 2–3 lines, each citing a real project from the roster with an image.
- Scope: 4 key/value items plus 2 lines on having a single interlocutor from project to construction.

### CNT-007 — Team (fictional) and portraits decision
**Type:** copy + media decision · **Status:** to define
**Used in:** `/estudio` section 4.
**Requirements:**
- 3–4 fictional people: name and role (arquitetura, interiores, paisagismo, obra).
- Portraits: decide between generated portraits (MED-T1 option A) and a monogram placeholder (option B).

### CNT-008 — Hero labels confirmation
**Type:** copy · **Status:** draft in use
**Used in:** `/` hero.
**Current placeholder:** "SANTA CATARINA" and "ARQUITETURA".
**Requirements:** confirm or refine during the phase 05 polish (DEC-010 "vamos apenas refinar").

### CNT-009 — Image alt texts
**Type:** copy · **Status:** to write during curation (phase 01b)
**Requirements:** pt-BR. Describe the material, form, light and place. Never "foto 1".

### CNT-010 — Contact data (placeholders)
**Type:** data · **Status:** to define
**Used in:** `whatsapp.ts`, footer, `/contato`.
**Requirements:** a placeholder phone (E.164 format, clearly fake, for example `5548900000000`), e-mail `contato@nordarch.example`, an Instagram handle (fictional), and the HQ city in SC (fictional, for example Florianópolis).

### CNT-011 — Tear Ticket texts and WhatsApp messages ×3
**Type:** copy · **Status:** draft in `PAGE_BLUEPRINTS.md` → Component spec
**Requirements:** refine the `home` / `project` / `contact` texts and messages with the copywriting skill; keep `{name}` and `{code}` in the project message.

### CNT-012 — Contato intro line
**Type:** copy · **Status:** to write · **Used in:** `/contato`
**Requirements:** 1 line under the h1.

### CNT-013 — Privacidade text
**Type:** copy · **Status:** to write · **Used in:** `/privacidade`
**Requirements:** ≤ 200 words, factual: no cookies, no analytics, no forms, a WhatsApp third-party note, and `sessionStorage` for the preloader.

### CNT-015 — Hero scroll cue
**Type:** copy · **Status:** to write · **Used in:** `/` hero, right side
**Requirements:** one short word in the hero-label style (uppercase is allowed here, as a hero label). The prototype used "ROLE". Optional; it can be dropped in polish.

### CNT-016 — Drift Wall plate copy
**Type:** copy · **Status:** to write · **Used in:** `/` Drift Wall band plate
**Requirements:** h2 (≤ 6 words), 1 supporting line, and the link "Ver os 12 projetos".

### CNT-017 — 404 message
**Type:** copy · **Status:** to write · **Used in:** 404
**Requirements:** one line in Michroma h2, quiet in tone, plus the link "Ver os projetos".

### CNT-018 — Footer study notice
**Type:** copy · **Status:** draft "Estudo conceitual de Coded by M — não publicado." · **Used in:** footer (all pages)
**Requirements:** confirm the wording and link it to `/creditos`.

### CNT-014 — Créditos page text
**Type:** copy · **Status:** draft in `PAGE_BLUEPRINTS.md`
**Requirements:** the study notice plus the credits table generated from `projects.ts`. Include the reserve images used in the Drift Wall.
