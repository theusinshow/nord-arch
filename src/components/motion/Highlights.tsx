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
  const [active, setActive] = useState(-1)
  const narrow = useMedia('(max-width: 767px)')
  const reduced = useReducedMotion()

  if (narrow) {
    return (
      <ul className="flex flex-col gap-10">
        {items.map((p) => (
          <li key={p.slug}>
            <ProjectLink slug={p.slug} className="group block">
              <Picture img={cardOf(p)} sizes="100vw" imgClassName="aspect-[3/2] w-full object-cover grayscale transition-[filter] duration-[var(--dur-ui)] group-hover:grayscale-0 group-focus-visible:grayscale-0" />
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

  const p = active >= 0 ? items[active] : null
  return (
    <div>
      <AccordionGallery
        items={items.map((it) => {
          const img = cardOf(it)
          return { image: fallbackSrc(img), srcSet: srcSet(img, 'webp'), sizes: '60vw', label: it.name, alt: img.alt, link: `/projetos/${it.slug}` }
        })}
        defaultIndex={-1}
        onActiveChange={setActive}
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
        grayscale
        overlayColor="transparent"
        onOpen={(i, img) => openProject(items[i].slug, img)}
      />
      <p className="mt-4 flex min-h-[1.5em] items-baseline justify-between gap-6" aria-live="polite">
        {p ? (
          <>
            <span className="t-h3">
              <span className="t-label mr-4 text-muted">{p.code}</span>
              {p.name}
            </span>
            <span className="t-caption text-muted">{caption(p)}</span>
          </>
        ) : (
          <span className="t-label text-muted">{items.map((i) => i.code).join(' · ')}</span>
        )}
      </p>
    </div>
  )
}
