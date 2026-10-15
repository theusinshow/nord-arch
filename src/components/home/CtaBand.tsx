import { home } from '@/content/site'
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
 * Black CTA block (DEC-025, DEC-027, DEC-032): ink background, white type and a standard
 * rectangular button (radius 0). Replaces every Tear Ticket.
 */
export function CtaBand({ title, line, href, button = home.ctaButton, id = 'convite', variant = 'band', className }: Props) {
  const body = (
    <>
      <div className={variant === 'band' ? 'col-span-4 sm:col-span-8 lg:col-span-7' : ''}>
        <h2 id={id} className="t-h2">{title}</h2>
        <p className="t-body mt-4 text-muted">{line}</p>
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
      <section className={cn('ink p-8 sm:p-12', className)} aria-labelledby={id}>
        {body}
      </section>
    )
  }
  return (
    <section className={cn('ink', className)} aria-labelledby={id}>
      <div className="wrap grid-12 items-end gap-y-10 py-[var(--sec-m)]">{body}</div>
    </section>
  )
}
