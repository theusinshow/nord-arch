import TiltedCard from '@/components/reactbits/TiltedCard'
import { Monogram } from '@/components/brand/Monogram'
import { useMedia } from '@/lib/hooks'

type Person = { name: string; role: string; led: string[] }

// Portrait placeholder: monogram on the hairline grey (MED-T1 option B, CNT-007) — rendered as an SVG data URI
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#E4E6E8"/><g transform="translate(150 175) scale(.25)" fill="none" stroke="#6B6E72" stroke-width="39"><path d="M209.5 614 V140.5 L539.5 360.6 V614"/><path d="M284.5 614 V266.8 L464.5 386.3 V614"/><path d="M284.5 386.8 L464.5 506.3"/></g></svg>`,
  )

/** Studio team — React Bits Tilted Card (motion), 5° max, mouse only; static on touch (MOTION_DIRECTION). */
export function TeamCard({ person }: { person: Person }) {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  return (
    <figure>
      {fine ? (
        <div className="aspect-[4/5] w-full">
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
        </div>
      ) : (
        <div className="aspect-[4/5] w-full bg-border p-[30%] text-muted">
          <Monogram className="h-full w-full" />
        </div>
      )}
      <figcaption className="mt-3">
        <span className="block font-display text-[13px]">{person.name}</span>
        <span className="t-caption block text-muted">{person.role}</span>
        <span className="t-label mt-1 block text-muted">{person.led.join(' · ')}</span>
      </figcaption>
    </figure>
  )
}
