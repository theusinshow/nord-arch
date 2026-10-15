import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/hooks'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>'

/**
 * Character shuffle (navbar labels, after flexis-mobility.com): random glyphs settle left to right.
 * Runs on mount and whenever `trigger` changes (hover). The real text stays available to assistive tech.
 */
export function Shuffle({ text, trigger = 0, className }: { text: string; trigger?: number; className?: string }) {
  const [out, setOut] = useState(text)
  const raf = useRef(0)

  const run = useCallback(() => {
    if (prefersReducedMotion()) {
      setOut(text)
      return
    }
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const dur = 380 + text.length * 22
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur)
      const settled = Math.floor(k * text.length)
      setOut(
        text
          .split('')
          .map((c, i) => (i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(''),
      )
      if (k < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [text])

  useEffect(() => {
    run()
    return () => cancelAnimationFrame(raf.current)
  }, [run, trigger])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}
