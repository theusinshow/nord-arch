import { useState } from 'react'
import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { bySlug, cardOf, type Project } from '@/content/projects'
import { places } from '@/content/site'
import { useMedia } from '@/lib/hooks'
import { cn } from '@/lib/cn'

/**
 * "Lugares" (DEC-025): follows the manifesto ("Cada casa nasce do lugar onde vai ficar") with the
 * twelve sites grouped by region of Santa Catarina. Hovering/focusing a place swaps the photo.
 */
export function Places() {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const groups = places.regions.map((r) => ({ ...r, items: r.slugs.map((s) => bySlug(s)!) }))
  const [current, setCurrent] = useState<Project>(groups[0].items[0])

  return (
    <section className="wrap mt-[var(--sec-l)]" aria-labelledby="lugares">
      <div className="grid-12 gap-y-12">
        <div className="col-span-4 sm:col-span-8 lg:col-span-5">
          <h2 id="lugares" className="t-h2">{places.title}</h2>
          {fine && (
            <div className="mt-10 hidden lg:block" aria-hidden="true">
              <Picture key={current.slug} img={cardOf(current)} sizes="40vw" alt="" imgClassName="places-img aspect-[4/5] w-full object-cover" />
              <p className="t-label mt-3 text-muted">{current.name}</p>
            </div>
          )}
        </div>

        <div className="col-span-4 flex flex-col gap-12 sm:col-span-8 lg:col-span-6 lg:col-start-7">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="t-label border-b border-border pb-3 text-muted">{g.name}</h3>
              <ul>
                {g.items.map((p) => (
                  <li key={p.slug}>
                    <ProjectLink
                      slug={p.slug}
                      className="group grid grid-cols-[56px_1fr] items-center gap-x-4 gap-y-1 border-b border-border py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6"
                      onPointerEnter={() => setCurrent(p)}
                      onFocus={() => setCurrent(p)}
                    >
                      {/* touch screens get no hover photo: each place carries its own thumbnail instead */}
                      <Picture img={cardOf(p)} sizes="56px" alt="" className="row-span-2 block sm:hidden" imgClassName="aspect-[4/5] w-14 object-cover" />
                      <span className={cn('t-h3 group-hover:underline group-hover:underline-offset-4', current.slug === p.slug && fine && 'lg:underline lg:underline-offset-4')}>
                        {p.place === p.city ? p.city : `${p.place}, ${p.city}`}
                      </span>
                      <span className="t-caption text-muted sm:text-right">
                        {p.name}
                      </span>
                    </ProjectLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
