import { home } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'

type Props = {
  title: string
  line: string
  href: string
  button?: string
  id?: string
  /** `band` = full-bleed closing section; `panel` = a black block inside the grid (Contato). */
  variant?: 'band' | 'panel'
  className?: string
}

/**
 * The one black block of a page (DEC-025, DEC-027): ink background, white type and a standard
 * rectangular button (radius 0). Replaces every Tear Ticket. Black is used sparingly, only for a CTA.
 */
export function CtaBand({ title, line, href, button = home.ctaButton, id = 'convite', variant = 'band', className }: Props) {
  const body = (
    <>
      <div className={variant === 'band' ? 'col-span-4 sm:col-span-8 lg:col-span-7' : ''}>
        <h2 id={id} className="t-h2">{title}</h2>
        <p className="t-body mt-4 text-white/70">{line}</p>
      </div>
      <div className={variant === 'band' ? 'col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:justify-self-end' : 'mt-10'}>
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-invert">
          {button}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  )

  if (variant === 'panel') {
    return (
      <section className={cn('cta-band bg-text p-8 text-white sm:p-12', className)} aria-labelledby={id}>
        {body}
      </section>
    )
  }
  return (
    <section className={cn('cta-band mt-[var(--sec-l)] bg-text text-white', className)} aria-labelledby={id}>
      <div className="wrap grid-12 items-end gap-y-10 py-[var(--sec-m)]">{body}</div>
    </section>
  )
}

export function HomeCta() {
  return <CtaBand title={home.invitation} line={home.ctaLine} href={waLink('home')} />
}
