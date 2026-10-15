import { cn } from '@/lib/cn'

type Props = {
  title: string
  line: string
  href: string
  link?: string
  id?: string
  /** Inside an existing column: no page wrap, no extra section margin. */
  embedded?: boolean
  className?: string
}

/** WhatsApp as a text link on white. The message is pre-filled by the href. */
export function TextCta({ title, line, href, link = 'WhatsApp', id = 'convite', embedded, className }: Props) {
  return (
    <section className={cn(!embedded && 'wrap mt-[var(--sec-l)]', className)} aria-labelledby={id}>
      <h2 id={id} className="t-h2">{title}</h2>
      <p className="t-body mt-4 text-muted">{line}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="t-nav link mt-6 inline-flex min-h-[44px] items-center">
        {link}
        <span aria-hidden="true"> ↗</span>
      </a>
    </section>
  )
}
