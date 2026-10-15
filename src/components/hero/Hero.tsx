import { useEffect, useRef, useState } from 'react'
import { Picture } from '@/components/ui/Picture'
import { ProjectLink, useSite, type HeaderMode } from '@/components/layout/Site'
import { openingOf, type Project } from '@/content/projects'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'

const HOLD_MS = 8000

function line(p: Project) {
  return `${p.city}, ${p.year} · ${p.code}`
}

/**
 * One house at a time. Featured works crossfade slowly.
 * The caption sits on white, under the photograph: name — city, year · code.
 */
export function Hero({ items }: { items: Project[] }) {
  const reduced = useReducedMotion()
  const { setHeaderMode } = useSite()
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hold, setHold] = useState(false)
  const [over, setOver] = useState(true)
  const [status, setStatus] = useState<Record<string, 'ok' | 'miss'>>({})

  const current = items[index] ?? items[0]

  useEffect(() => {
    if (reduced || paused || hold || items.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), HOLD_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, hold, items.length])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setOver(e.isIntersecting && e.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.6] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let mode: HeaderMode = 'solid'
    if (over && current) {
      const st = status[current.slug]
      const dark = st === 'ok' && (current.hero?.luma ?? 1) <= 0.18
      mode = dark ? 'photo' : 'ghost'
    }
    setHeaderMode(mode)
    return () => setHeaderMode('solid')
  }, [over, current, status, setHeaderMode])

  if (!current) return null

  return (
    <section
      ref={root}
      className="hero"
      aria-roledescription="galeria"
      aria-label="Obra em destaque"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false)
      }}
    >
      <h1 className="sr-only">Nord Arch — arquitetura residencial em Santa Catarina</h1>
      <div className="hero-stage">
        {items.map((p, i) => {
          const img = p.hero?.photo ?? openingOf(p)
          const on = i === index || (reduced && i === 0)
          if (reduced && i > 0) return null
          return (
            <div key={p.slug} className={cn('hero-slide', on && 'is-on')} aria-hidden={!on}>
              <Picture
                img={img}
                sizes="100vw"
                priority={i === 0}
                alt=""
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover"
                onLoad={() => setStatus((s) => (s[p.slug] === 'ok' ? s : { ...s, [p.slug]: 'ok' }))}
                onError={() => setStatus((s) => (s[p.slug] === 'miss' ? s : { ...s, [p.slug]: 'miss' }))}
              />
            </div>
          )
        })}
      </div>
      <div className="hero-bar">
        <ProjectLink slug={current.slug} className="hero-caption">
          <span className="t-name-sm" aria-live="polite">{current.name}</span>
          <span className="t-caption text-muted">— {line(current)}</span>
        </ProjectLink>
        {!reduced && items.length > 1 && (
          <button type="button" className="hero-pause t-label link" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
            {paused ? 'Seguir' : 'Pausar'}
          </button>
        )}
      </div>
    </section>
  )
}
