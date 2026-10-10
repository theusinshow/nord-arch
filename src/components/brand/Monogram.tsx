// N + A monoline monogram with the 33.7° shed roof (DEC-008).
// Centreline trace of _input/logo/nord-arch-monograma.png — placeholder until the official SVG (CNT-001).
export const MONOGRAM_PATHS = [
  'M209.5 614 V140.5 L539.5 360.6 V614',
  'M284.5 614 V266.8 L464.5 386.3 V614',
  'M284.5 386.8 L464.5 506.3',
]

type Props = { className?: string; title?: string; draw?: boolean }

export function Monogram({ className, title, draw }: Props) {
  return (
    <svg
      viewBox="170 90 410 540"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth={39}
      strokeLinejoin="miter"
      strokeMiterlimit={10}
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
