import { useEffect, useState } from 'react'
import { Monogram } from '@/components/brand/Monogram'
import { prefersReducedMotion } from '@/lib/hooks'
import { useSite } from './Site'

const KEY = 'na:seen'

/**
 * First visit only (sessionStorage). Timeline (MOTION_DIRECTION → Entrance timeline):
 * 0–750 strokes (3 × 450ms, +150 stagger) · 750 hero starts (introReady) · 750–1200 diagonal exit.
 */
export function Preloader() {
  const { setIntroReady } = useSite()
  const [state, setState] = useState<'draw' | 'out' | 'gone'>(() => {
    try {
      return sessionStorage.getItem(KEY) || prefersReducedMotion() ? 'gone' : 'draw'
    } catch {
      return 'gone'
    }
  })

  useEffect(() => {
    if (state === 'gone') {
      setIntroReady(true)
      return
    }
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode: preloader simply shows again */
    }
    const t1 = setTimeout(() => {
      setIntroReady(true)
      setState('out')
    }, 750)
    const t2 = setTimeout(() => setState('gone'), 1250)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state === 'gone') return null
  return (
    <div className="preloader" data-state={state} aria-hidden="true">
      <Monogram className="h-28 w-[86px]" draw />
    </div>
  )
}
