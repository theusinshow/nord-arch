import { useState } from 'react'
import AccordionGallery from '@/components/reactbits/AccordionGallery'
import { useSite, ProjectLink } from '@/components/layout/Site'
import { Picture, srcSet, fallbackSrc } from '@/components/ui/Picture'
import { cardOf, caption, type Project } from '@/content/projects'
import { useMedia, useReducedMotion } from '@/lib/hooks'

/**
 * Home highlights — React Bits Accordion Gallery (gsap), loaded lazily on approach (DEC-019).
 * Captions live BELOW the panels in Michroma (no dark gradient). Mobile: vertical stack.
 */
export default function Highlights({ items }: { items: Project[] }) {
  const { openProject } = useSite()
  const [active, setActive] = useState(0)
  const narrow = useMedia('(max-width: 767px)')
  const reduced = useReducedMotion()

  if (narrow) {
    return (
      <ul className="flex flex-col gap-10">
        {items.map((p) => (
          <li key={p.slug}>
            <ProjectLink slug={p.slug} className="group block">
              <Picture img={cardOf(p)} sizes="100vw" imgClassName="aspect-[3/2] w-full object-cover" />
              <p className="mt-3 flex items-baseline justify-between gap-4">
                <span className="t-h3 group-hover:underline group-hover:underline-offset-4">{p.name}</span>
                <span className="t-caption text-muted">{caption(p)}</span>
              </p>
            </ProjectLink>
          </li>
        ))}
      </ul>
    )
  }

  const p = items[active]
  return (
    <div>
      <div
        onMouseOver={(e) => {
          const el = (e.target as HTMLElement).closest('[role="listitem"]')
          const idx = el ? Array.from(el.parentElement!.children).indexOf(el) : -1
          if (idx >= 0 && idx !== active) setActive(idx)
        }}
        onFocus={(e) => {
          const el = (e.target as HTMLElement).closest('[role="listitem"]')
          const idx = el ? Array.from(el.parentElement!.children).indexOf(el) : -1
          if (idx >= 0) setActive(idx)
        }}
      >
        <AccordionGallery
          items={items.map((it) => {
            const img = cardOf(it)
            return { image: fallbackSrc(img), srcSet: srcSet(img, 'webp'), sizes: '60vw', label: it.name, alt: img.alt, link: `/projetos/${it.slug}` }
          })}
          defaultIndex={0}
          height={Math.round(Math.min(680, window.innerHeight * 0.72))}
          gap={10}
          radius={0}
          expandRatio={0.55}
          duration={reduced ? 0 : 1.2}
          ease="power3.out"
          parallax={0.4}
          tilt={0}
          stagger={0}
          trigger="hover"
          showLabels={false}
          grayscale={false}
          overlayColor="transparent"
          onOpen={(i, img) => openProject(items[i].slug, img)}
        />
      </div>
      <p className="mt-4 flex items-baseline justify-between gap-6" aria-live="polite">
        <span className="t-h3">
          <span className="t-label mr-4 text-muted">{p.code}</span>
          {p.name}
        </span>
        <span className="t-caption text-muted">{caption(p)}</span>
      </p>
    </div>
  )
}
