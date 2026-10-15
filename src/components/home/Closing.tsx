import { Picture } from '@/components/ui/Picture'
import { bySlug, cardOf } from '@/content/projects'
import { home } from '@/content/site'
import { waLink } from '@/lib/whatsapp'

/**
 * Home closing (DEC-029, DEC-033 on white): the section asks "Por onde começamos?" and offers three real starting
 * points — build on a plot, renovate/interiors, landscape/commercial. Each row opens WhatsApp with its
 * own pre-filled message. A photo on the right is cut by the monogram's 33.7° roof.
 */
export function Closing() {
  const photo = bySlug(home.closing.image)!
  return (
    // on white since DEC-033: the home now alternates, and the ink footer follows after the bottom pause
    <section className="mt-[var(--sec-l)] overflow-hidden" aria-labelledby="convite">
      <div className="wrap grid-12 items-stretch gap-y-12">
        <div className="col-span-4 flex flex-col sm:col-span-8 lg:col-span-8">
          <h2 id="convite" className="closing-title">{home.closing.title}</h2>
          <p className="t-body mt-6 max-w-[48ch] text-muted">{home.closing.line}</p>

          <ul className="mt-12 border-t border-border lg:mt-16">
            {home.closing.paths.map((p) => (
              <li key={p.variant} className="border-b border-border">
                <a href={waLink(p.variant)} target="_blank" rel="noopener noreferrer" className="row-invert closing-row">
                  <span className="t-h3">{p.title}</span>
                  <span className="t-caption hidden text-muted sm:block">{p.hint}</span>
                  <span aria-hidden="true" className="t-nav">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative hidden lg:col-span-3 lg:col-start-10 lg:block" aria-hidden="true">
          <Picture img={cardOf(photo)} sizes="25vw" alt="" className="roof-wrap block h-full" imgClassName="roof-cut h-full min-h-[420px] w-full object-cover" />
        </figure>
      </div>
    </section>
  )
}
