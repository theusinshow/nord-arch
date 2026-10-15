import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Picture } from '@/components/ui/Picture'
import { useSite } from '@/components/layout/Site'
import type { Project } from '@/content/projects'
import { hero as copy } from '@/content/site'
import { useMedia, useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'

const ROOF_AT = 0.235 // the roof lands at ~23.5% of the viewport height (DEC-010, MOTION_DIRECTION → Hero framing)

/**
 * Hero (DEC-010): full-bleed photo + "N O R D" behind the house cutout + "A R C H" in front.
 * Entrance starts when the preloader exits (introReady) and both layers are decoded (800ms timeout).
 */
export function Hero({ project }: { project: Project }) {
  const h = project.hero!
  const root = useRef<HTMLElement>(null)
  const photo = useRef<HTMLImageElement>(null)
  const fg = useRef<HTMLImageElement>(null)
  const layers = useRef<HTMLDivElement[]>([])
  const top = useRef<HTMLDivElement>(null)
  const bot = useRef<HTMLDivElement>(null)
  const { introReady, setHeaderLight } = useSite()
  const reduced = useReducedMotion()
  const desktop = useMedia('(min-width: 768px)')
  const [decoded, setDecoded] = useState(false)
  const [pos, setPos] = useState('50% 100%')
  const [rowTop, setRowTop] = useState<number | null>(null)
  const [rowK, setRowK] = useState(1)
  const rowKRef = useRef(1)

  // framing: keep the roof at ROOF_AT of the viewport for any aspect ratio
  useLayoutEffect(() => {
    const frame = () => {
      const el = root.current
      if (!el) return
      const vw = el.clientWidth
      const vh = el.clientHeight
      const s = Math.max(vw / h.photo.w, vh / h.photo.h)
      const off = Math.min(0, Math.max(vh - h.photo.h * s, ROOF_AT * vh - h.roofLine * h.photo.h * s))
      setPos(`50% ${off.toFixed(1)}px`)
      // the NORD row dips ~14% of its height behind the roof. At 28% the tall volume hid the leg of the R and the
      // word read "NOPD" (DEC-033). When the roof sits high (e.g. 1440×900) the row cannot rise past the header,
      // so it scales down until only that 14% is behind the roof.
      const roofPx = off + h.roofLine * h.photo.h * s
      const natural = (top.current?.offsetHeight ?? 0) / rowKRef.current
      const k = natural ? Math.max(0.7, Math.min(1, (roofPx - 92) / (natural * 0.86))) : 1
      rowKRef.current = k
      setRowK(k)
      setRowTop(Math.max(92, roofPx - natural * k * 0.86))
    }
    frame()
    void document.fonts?.ready.then(frame) // row height changes once Michroma swaps in
    window.addEventListener('resize', frame)
    return () => window.removeEventListener('resize', frame)
  }, [h])

  useEffect(() => {
    const imgs = [photo.current, fg.current].filter(Boolean) as HTMLImageElement[]
    const timeout = new Promise((r) => setTimeout(r, 800))
    Promise.race([Promise.all(imgs.map((i) => i.decode().catch(() => undefined))), timeout]).then(() => setDecoded(true))
  }, [])

  // header tone + layered parallax (desktop only, transform only, paused past the hero)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      setHeaderLight(y < vh - 70)
      if (reduced || !desktop || y > vh) return
      layers.current.forEach((l) => (l.style.transform = `translate3d(0, ${y * 0.3}px, 0)`))
      if (top.current) top.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`
      if (bot.current) bot.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      setHeaderLight(false)
    }
  }, [reduced, desktop, setHeaderLight])

  const go = introReady && decoded
  const letter = (ch: string, i: number) => (
    <span key={`${ch}${i}`} className="hero-mask">
      <span className="hero-letter" style={{ transitionDelay: `${i * 80}ms` }}>
        {ch}
      </span>
    </span>
  )
  const img = 'h-full w-full object-cover'
  const sizes = 'max(100vw, 104vh)' // object-fit: cover on a ~1:1 photo: portrait screens crop by height

  return (
    <section ref={root} className={cn('hero relative h-[100svh] min-h-[560px] overflow-hidden bg-[#2a2f45] text-white', go && 'is-go')} aria-label="Nord Arch — arquitetura em Santa Catarina">
      <div ref={(el) => { if (el) layers.current[0] = el }} className="absolute inset-0 z-[1] will-change-transform">
        <div className="hero-zoom h-full w-full">
          <Picture ref={photo} img={h.photo} sizes={sizes} priority className="block h-full w-full" imgClassName={img} imgStyle={{ objectPosition: pos }} />
        </div>
      </div>

      <h1 className="sr-only">Nord Arch — arquitetura residencial em Santa Catarina</h1>
      <div ref={top} className="hero-row t-hero absolute inset-x-[var(--margin)] top-[max(96px,11vh)] z-[2] flex items-center justify-between" style={{ ...(rowTop !== null && { top: rowTop }), ...(rowK < 1 && { fontSize: `calc(clamp(56px, 14vw, 224px) * ${rowK.toFixed(3)})` }) }} aria-hidden="true">
        {letter('N', 0)}
        <span className="t-hero-label hero-label hidden lg:block">{copy.labels[0]}</span>
        {letter('O', 1)}
        {letter('R', 2)}
        <span className="t-hero-label hero-label hidden lg:block">{copy.labels[1]}</span>
        {letter('D', 3)}
      </div>

      <div ref={(el) => { if (el) layers.current[1] = el }} className="pointer-events-none absolute inset-0 z-[3] will-change-transform">
        <div className="hero-zoom h-full w-full">
          <Picture ref={fg} img={h.fg} sizes={sizes} priority alt="" className="block h-full w-full" imgClassName={img} imgStyle={{ objectPosition: pos }} />
        </div>
      </div>

      <div ref={bot} className="hero-row t-hero absolute inset-x-[var(--margin)] bottom-[5vh] z-[4] flex items-end justify-between !text-[clamp(44px,10vw,180px)]" aria-hidden="true">
        {['A', 'R', 'C', 'H'].map((c, i) => letter(c, i + 4))}
      </div>
      <p className="t-hero-label hero-label absolute bottom-[calc(5vh+clamp(44px,10vw,180px)+24px)] right-[var(--margin)] z-[5] hidden sm:block" aria-hidden="true">
        {copy.cue}
      </p>
    </section>
  )
}
