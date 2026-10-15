import { useState } from 'react'
import FlexCarousel from '@/components/reactbits/FlexCarousel'
import { ProjectLink } from '@/components/layout/Site'
import { fallbackSrc } from '@/components/ui/Picture'
import { caption, cardOf, type Project } from '@/content/projects'
import { useMedia } from '@/lib/hooks'

/**
 * Studio "Obras" — React Bits Flex Carousel (WebGL, ogl), loaded lazily on approach like Highlights (DEC-019).
 * Flat cards (radius 0), no wheel capture (no scroll-jacking), captions below the card, never over the photo.
 * Click zooms the card; the text link below opens the active project.
 */
export default function Works({ items }: { items: Project[] }) {
  const [active, setActive] = useState(0)
  const p = items[active] ?? items[0]
  const narrow = useMedia('(max-width: 767px)')

  return (
    <div>
      <div className="-mx-[var(--margin)] h-[min(70svh,720px)] min-h-[440px]">
        <FlexCarousel
          items={items.map((it) => {
            const img = cardOf(it)
            return { src: fallbackSrc(img, 1200), alt: img.alt, title: it.name, subtitle: `${it.code} · ${caption(it)}` }
          })}
          preset="arch"
          intro="rise"
          cardHeight={narrow ? 0.5 : 0.56}
          gap={24}
          radius={0}
          fit={narrow ? 'portrait' : 'landscape'}
          dispersion={0.15}
          captureWheel={false}
          ariaLabel="Obras do estúdio"
          onChange={(i) => setActive(i)}
        />
      </div>
      <p className="mt-2 flex justify-center">
        <ProjectLink slug={p.slug} className="t-nav link">
          {p.code} · {p.name} →
        </ProjectLink>
      </p>
    </div>
  )
}
