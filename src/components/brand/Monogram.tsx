// N + A monoline monogram with the 33.7° shed roof (DEC-008).
// Official vector: _input/logo/Nord-Arch-final.svg (CNT-001, DEC-026) — stroke 26, miter joins.
export const MONOGRAM_PATHS = [
  'M140 410V94L360 240.66667V410', // closed frame
  'M190 410V178L310 258V410M190 258L310 338', // inner A
]
export const MONOGRAM_VIEWBOX = '124 66 252 348' // tight box incl. the miter tips
export const MONOGRAM_STROKE = 26

type Props = { className?: string; title?: string; draw?: boolean }

export function Monogram({ className, title, draw }: Props) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth={MONOGRAM_STROKE}
      strokeLinejoin="miter"
      strokeMiterlimit={4}
      strokeLinecap="butt"
    >
      {MONOGRAM_PATHS.map((d, i) => (
        <path key={d} d={d} pathLength={1} className={draw ? 'mono-draw' : undefined} style={draw ? { animationDelay: `${i * 150}ms` } : undefined} />
      ))}
    </svg>
  )
}

export function Lockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <Monogram className="h-9 w-7" />
      <span className="t-wordmark whitespace-nowrap">Nord Arch</span>
    </span>
  )
}
