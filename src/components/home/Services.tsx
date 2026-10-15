import { ProjectLink } from '@/components/layout/Site'
import { SectionLabel } from '@/components/ui/Parts'
import { bySlug } from '@/content/projects'
import { home } from '@/content/site'

/**
 * "Serviços" (DEC-030): four services as columns divided by hairlines, each pointing to one
 * project that shows it, then "Como trabalhamos" as a five-step line. Static: text never animates.
 */
export function Services() {
  const s = home.services
  return (
    <section id="servicos" className="wrap mt-[var(--sec-l)]" aria-labelledby="servicos-title">
      <SectionLabel as="p" aside={`${s.items.length} frentes`}>{s.label}</SectionLabel>
      <h2 id="servicos-title" className="t-h2 max-w-[22ch]">{s.title}</h2>

      <ol className="mt-[var(--sec-s)] grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((it, i) => {
          const p = bySlug(it.slug)!
          return (
            <li key={it.title} className="flex flex-col border-b border-border py-8 sm:px-6 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0">
              <span className="t-label text-muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h3 mt-6">{it.title}</h3>
              <p className="t-body mt-4 flex-1 text-[15px]">{it.text}</p>
              <ProjectLink slug={p.slug} className="t-caption link mt-6 self-start text-muted hover:text-text">
                Ver {p.name}
              </ProjectLink>
            </li>
          )
        })}
      </ol>

      <div className="mt-[var(--sec-m)]">
        <p className="t-label text-muted">{s.stepsLabel}</p>
        <ol className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-5 sm:gap-x-6">
          {s.steps.map((st, i) => (
            <li key={st.title} className="border-t border-text pt-4">
              <span className="t-label text-muted">{i + 1}</span>
              <p className="t-h3 mt-3">{st.title}</p>
              <p className="t-caption mt-2 text-muted">{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
