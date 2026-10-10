import { Ticket } from '@/components/motion/Ticket'
import { contact, contactPage, credits, privacy } from '@/content/site'
import { driftTiles, projects } from '@/content/projects'
import { usePageMeta } from '@/lib/hooks'
import manifestCfg from '../../scripts/images.config.json'

export function Contact() {
  usePageMeta('Contato — Nord Arch', 'Converse com a Nord Arch pelo WhatsApp sobre o seu terreno e o seu programa.')
  return (
    <div className="wrap pt-[calc(76px+var(--sec-m))]">
      <div className="grid-12 items-start gap-y-12">
        <div className="col-span-4 sm:col-span-8 lg:col-span-5">
          <h1 className="t-h1">Contato</h1>
          <p className="t-body mt-6">{contactPage.intro}</p>
          <address className="t-caption mt-[var(--sec-s)] flex flex-col gap-2 not-italic">
            <a href={`mailto:${contact.email}`} className="link self-start">{contact.email}</a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="link self-start">{contact.instagram} ↗</a>
            <span className="text-muted">{contact.city}</span>
          </address>
        </div>
        <div className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-7">
          <Ticket variant="contact" />
        </div>
      </div>
    </div>
  )
}

export function Credits() {
  usePageMeta('Créditos — Nord Arch', 'Créditos das obras, fotografias e ferramentas usadas neste estudo conceitual.')
  const reserve = (manifestCfg as { drift: string[] }).drift
    .map((f) => f.split('/')[0].replace(/ · Divisare$/, ''))
    .filter((v, i, a) => a.indexOf(v) === i)
  return (
    <div className="wrap pt-[calc(76px+var(--sec-m))]">
      <h1 className="t-h1">Créditos</h1>
      <p className="t-body mt-6">{credits.notice}</p>
      <div className="mt-[var(--sec-m)] overflow-x-auto">
        <table className="t-caption w-full min-w-[720px] max-w-none border-t border-border text-left">
          <thead>
            <tr className="border-b border-border">
              {['Código', 'Nome no estudo', 'Projeto original', 'Arquitetura', 'Fotografia', 'Fonte'].map((h) => (
                <th key={h} scope="col" className="t-label py-3 pr-6 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug} className="border-b border-border">
                <td className="py-3 pr-6 text-muted">{p.code}</td>
                <td className="py-3 pr-6">{p.name}</td>
                <td className="py-3 pr-6">{p.credit.sourceTitle}</td>
                <td className="py-3 pr-6">{p.credit.architect}</td>
                <td className="py-3 pr-6">{p.credit.photographer}</td>
                <td className="py-3 pr-6">{p.credit.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="t-label mt-[var(--sec-m)]">Imagens de apoio (faixa da home, {driftTiles.length} imagens)</h2>
      <ul className="t-caption mt-4 max-w-none columns-1 gap-6 text-muted sm:columns-2">
        {reserve.map((r) => (
          <li key={r} className="mb-1">{r} — Divisare</li>
        ))}
      </ul>
      <p className="t-caption mt-[var(--sec-m)] text-muted">{credits.fonts}</p>
      <p className="t-caption mt-2 text-muted">{credits.components}</p>
    </div>
  )
}

export function Privacy() {
  usePageMeta('Privacidade — Nord Arch', 'Este estudo não usa cookies, rastreamento nem formulários.')
  return (
    <div className="wrap pt-[calc(76px+var(--sec-m))]">
      <h1 className="t-h1">Privacidade</h1>
      <div className="mt-8 flex flex-col gap-4">
        {privacy.map((p) => (
          <p key={p} className="t-body">{p}</p>
        ))}
      </div>
    </div>
  )
}
