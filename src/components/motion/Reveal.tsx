import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useInView } from '@/lib/hooks'
import { cn } from '@/lib/cn'

/**
 * Diagonal reveal at the monogram's 33.7° roof angle, once (MOTION_DIRECTION → Image reveal).
 * --k = height / width × 1.5 keeps the leading edge at 33.7° for any aspect ratio.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  // observe an unclipped wrapper: a collapsed clip-path hides the target from IntersectionObserver
  const outer = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(outer, 0.2)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const set = () => {
      const r = el.getBoundingClientRect()
      if (r.width) el.style.setProperty('--k', `${((r.height / r.width) * 150).toFixed(1)}%`)
    }
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={outer} className={className}>
      <div ref={ref} className={cn('reveal', inView && 'is-in')}>
        {children}
      </div>
    </div>
  )
}
