import { lazy, Suspense } from 'react'
import { Monogram } from '@/components/brand/Monogram'
import { useMedia } from '@/lib/hooks'

// motion is only needed for the mouse tilt: load it on fine pointers only, out of the Studio chunk (DEC-033)
const TiltedCard = lazy(() => import('@/components/reactbits/TiltedCard'))

type Person = { name: string; role: string; led: string[] }

// Portrait placeholder: monogram on a near-black panel inside the ink Equipe section (MED-T1 option B, CNT-007, DEC-032)
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#16171A"/><g transform="translate(125 178) scale(.3)" fill="none" stroke="#55585C" stroke-width="26" stroke-linejoin="miter"><path d="M140 410V94L360 240.66667V410"/><path d="M190 410V178L310 258V410M190 258L310 338"/></g></svg>`,
  )

/** Studio team — React Bits Tilted Card (motion), 5° max, mouse only; static on touch (MOTION_DIRECTION). */
export function TeamCard({ person }: { person: Person }) {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const still = (
    <div className="aspect-[4/5] w-full bg-[#16171A] p-[30%] text-[#55585C]">
      <Monogram className="h-full w-full" />
    </div>
  )
  return (
    <figure>
      {fine ? (
        <div className="aspect-[4/5] w-full">
          <Suspense fallback={still}>
            <TiltedCard
              imageSrc={PLACEHOLDER}
              altText=""
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={5}
              scaleOnHover={1.02}
              showMobileWarning={false}
              showTooltip={false}
            />
          </Suspense>
        </div>
      ) : (
        still
      )}
      <figcaption className="mt-3">
        <span className="block font-display text-[13px]">{person.name}</span>
        <span className="t-caption block text-muted">{person.role}</span>
        <span className="t-label mt-1 block text-muted">{person.led.join(' · ')}</span>
      </figcaption>
    </figure>
  )
}
