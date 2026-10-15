import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { bySlug, cardOf } from '@/content/projects'
import { home } from '@/content/site'

/**
 * "Serviços" (DEC-030, DEC-032, DEC-033): an ink section. Each service is one row that names the work and the
 * project that shows it; the whole row links there and inverts to white on hover/focus.
 */
export function Services() {
  const s = home.services
  return (
    <section id="servicos" className="ink mt-[var(--sec-m)]" aria-labelledby="servicos-title">
      <div className="wrap py-[var(--sec-m)]">
        <h2 id="servicos-title" className="t-h2 max-w-[20ch]">{s.title}</h2>

        <ul className="mt-[var(--sec-s)] border-t border-border">
          {s.items.map((it) => {
            const p = bySlug(it.slug)!
            return (
              <li key={it.title} className="border-b border-border">
                <ProjectLink slug={p.slug} className="row-invert group grid-12 items-center gap-y-3 py-6 lg:py-7">
                  <span className="t-service col-span-4 sm:col-span-8 lg:col-span-4">{it.title}</span>
                  <span className="t-body col-span-4 text-muted sm:col-span-5 lg:col-span-5">{it.text}</span>
                  <span className="col-span-4 flex items-center gap-4 sm:col-span-3 sm:justify-end lg:col-span-3">
                    <span className="t-caption sm:text-right">
                      <span className="font-medium">{p.name}</span>
                      <span className="block text-muted">{p.code}</span>
                    </span>
                    <Picture
                      img={cardOf(p)}
                      sizes="96px"
                      alt=""
                      className="hidden shrink-0 sm:block"
                      imgClassName="aspect-[3/2] w-24 object-cover grayscale transition-[filter] duration-[var(--dur-ui)] group-hover:grayscale-0 group-focus-visible:grayscale-0"
                    />
                  </span>
                </ProjectLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
