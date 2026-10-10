import DriftWall from '@/components/reactbits/DriftWall'
import { WipeLink } from '@/components/layout/Site'
import { driftTiles } from '@/content/projects'
import { home } from '@/content/site'
import { fallbackSrc, srcSet } from '@/components/ui/Picture'
import { useMedia, useReducedMotion } from '@/lib/hooks'

/** Drift Wall band (88vh) below the manifesto — decorative tiles, the plate holds the only link. */
export function DriftBand() {
  const narrow = useMedia('(max-width: 639px)')
  const reduced = useReducedMotion()
  const items = driftTiles.map((t) => ({ image: fallbackSrc(t, 480), srcSet: srcSet(t, 'webp') }))

  return (
    <section aria-labelledby="drift-title" className="relative h-[88vh] min-h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        {reduced ? (
          <div className="grid h-full grid-cols-3 gap-4 overflow-hidden p-4 opacity-90 sm:grid-cols-6" aria-hidden="true">
            {items.slice(0, 12).map((it, i) => (
              <img key={i} src={it.image} alt="" className="aspect-[3/2] w-full object-cover" loading="lazy" />
            ))}
          </div>
        ) : (
          <DriftWall
            items={items}
            columns={narrow ? 3 : 6}
            tileWidth={narrow ? 150 : 230}
            tileHeight={narrow ? 100 : 154}
            gap={20}
            radius={0}
            tilt={narrow ? 8 : 14}
            turn={narrow ? 0 : -6}
            speed={16}
            variance={0.45}
            parallax={narrow ? 0 : 0.3}
            pauseOnHover={false}
            lift={0}
            fade={0.55}
            dim={1}
            grayscale={false}
            overlayColor="transparent"
          />
        )}
      </div>
      <div className="wrap relative flex h-full items-end pb-[clamp(32px,8vh,88px)]">
        <div className="bg-bg px-7 py-7 sm:px-8 sm:py-8">
          <h2 id="drift-title" className="t-h2">{home.drift.title}</h2>
          <p className="t-body mt-3 text-muted">{home.drift.line}</p>
          <WipeLink to="/projetos" className="t-nav link mt-5 inline-block">{home.drift.link} →</WipeLink>
        </div>
      </div>
    </section>
  )
}
