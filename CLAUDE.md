# Claude Project Instructions — Nord Arch

Nord Arch is a **fictional** architecture studio. This site is a personal concept study by Coded by M: it runs locally, is never deployed, and is `noindex`. The photos are third-party (Divisare) and their credits are kept.

Before making changes, read:

1. `/docs/ai/MASTER_CONTEXT.md`
2. `/docs/ai/PROJECT.md`
3. `/docs/ai/SITE_ARCHITECTURE.md`
4. `/docs/ai/PAGE_BLUEPRINTS.md`
5. `/docs/ai/DESIGN_SYSTEM.md` (and `/DESIGN.md`, `/PRODUCT.md`)
6. `/docs/ai/MOTION_DIRECTION.md`
7. `/docs/ai/MEDIA_PLAN.md` and `/docs/ai/CONTENT_PENDING.md`
8. `/docs/ai/EXECUTION_PLAN.md`
9. `/docs/ai/QA_CHECKLIST.md`
10. `/docs/ai/DECISIONS_LOG.md`

(Same order as `MASTER_CONTEXT.md` and `EXECUTION_PLAN.md`.)

**Living reference:** `_explore/motion/index.html`, the approved motion prototype. Serve it from that folder with `python -m http.server 8765`.

## Rules
- Do not implement before reading the architecture docs. Work one phase at a time from `EXECUTION_PLAN.md`.
- Do not change the visual direction without checking `DESIGN.md`:
  - no accent colour, radius 0, no shadows;
  - no scrim, gradient or text-shadow over photos;
  - Michroma and Aktiv only;
  - uppercase only in the wordmark and hero.
- Do not invent facts, testimonials, awards or numbers. Fictional project data goes only where `CONTENT_PENDING.md` allows it, flagged `fictional: true`.
- Preserve documented decisions (DEC-001…DEC-021) unless the developer approves a change. Log new decisions with Why + Affects.
- Never commit the licensed Aktiv Grotesk files or the Divisare originals. Both are gitignored.
- Verify in the browser (dev server + screenshot) before claiming a UI phase is done.
- Report changed files and pending issues after each phase.
