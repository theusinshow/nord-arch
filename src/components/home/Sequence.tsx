import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Caption } from '@/components/ui/Parts'
import { openingOf, type Project } from '@/content/projects'
import { cn } from '@/lib/cn'

const LAYOUT = ['seq-a', 'seq-b', 'seq-c', 'seq-d', 'seq-e'] as const

const SIZES = [
  '100vw',
  '(max-width: 767px) 78vw, 42vw',
  '(max-width: 767px) 100vw, 70vw',
  '(max-width: 767px) 78vw, 34vw',
  '(max-width: 767px) 100vw, 82vw',
]

/** Featured works as the main scroll: full-bleed frames alternate with smaller ones and open white. */
export function Sequence({ items }: { items: Project[] }) {
  return (
    <section className="seq" aria-label="Obras em destaque">
      {items.map((p, i) => {
        const kind = LAYOUT[i % LAYOUT.length]
        const bleed = kind === 'seq-a' || kind === 'seq-e'
        return (
          <ProjectLink key={p.slug} slug={p.slug} className={cn('seq-item group', kind)}>
            <Picture img={openingOf(p)} sizes={SIZES[i % SIZES.length]} imgClassName="w-full object-cover" />
            <Caption project={p} className={bleed ? 'seq-pad' : undefined} />
          </ProjectLink>
        )
      })}
    </section>
  )
}
