import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { ProjectCard } from '@/components/ui/Parts'
import { cardOf, categories, projects, type Category, type Project } from '@/content/projects'
import { useMedia, usePageMeta, useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'

const slugOf = (c: Category) => c.toLowerCase()

/** Índice (/projetos): filter + Lista (Bilbao-like, cursor preview) / Grade (masonry). State lives in the query string. */
export default function Projects() {
  usePageMeta('Projetos — Nord Arch', 'Doze obras da Nord Arch em Santa Catarina: casas, interiores, paisagismo e um ateliê.')
  const [params, setParams] = useSearchParams()
  const cat = categories.find((c) => slugOf(c) === params.get('categoria')) ?? null
  const view = params.get('vista') === 'grade' ? 'grade' : 'lista'
  const list = cat ? projects.filter((p) => p.category === cat) : projects

  const set = (k: string, v: string | null) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <div className="wrap pt-[calc(73px+var(--sec-m))]">
      <div className="flex items-baseline justify-between gap-6">
        <h1 className="t-h1">Projetos</h1>
        <span className="t-label text-muted">{list.length}</span>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-border pt-4">
        <div role="tablist" aria-label="Categoria" className="flex flex-wrap gap-x-6 gap-y-2">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? 'todas'}
              role="tab"
              aria-selected={c === cat}
              className="t-label link min-h-11"
              onClick={() => set('categoria', c ? slugOf(c) : null)}
            >
              {c ?? 'Todas'}
            </button>
          ))}
        </div>
        <div className="flex gap-6" aria-label="Visualização">
          {(['lista', 'grade'] as const).map((v) => (
            <button key={v} aria-pressed={view === v} className="t-label link min-h-11 capitalize" onClick={() => set('vista', v === 'lista' ? null : v)}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">{view === 'lista' ? <IndexList items={list} /> : <Grade items={list} />}</div>
    </div>
  )
}

function IndexList({ items }: { items: Project[] }) {
  const hover = useMedia('(hover: hover) and (pointer: fine)')
  const reduced = useReducedMotion()
  const peek = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)

  // cursor-follow preview: lerp 0.12, rAF only while a row is hovered (MOTION_DIRECTION)
  useEffect(() => {
    if (!hover || !active) return
    let x = -999, y = -999, tx = x, ty = y, raf = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX + 28
      ty = e.clientY - 120
      if (x === -999) { x = tx; y = ty }
    }
    const loop = () => {
      x += (tx - x) * (reduced ? 1 : 0.12)
      y += (ty - y) * (reduced ? 1 : 0.12)
      if (peek.current) peek.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [hover, active, reduced])

  return (
    <>
      <ul className="border-t border-border" onPointerLeave={() => setActive(null)}>
        {items.map((p) => (
          <li key={p.slug} onPointerEnter={() => hover && setActive(p)}>
            <ProjectLink
              slug={p.slug}
              className="group grid grid-cols-[64px_1fr_auto] items-center gap-x-4 border-b border-border py-4 sm:grid-cols-[5em_1fr_12em_5em] sm:items-baseline sm:py-5"
              onFocus={() => hover && setActive(p)}
            >
              <span className="hidden t-label text-muted sm:block">{p.code}</span>
              <Picture img={cardOf(p)} sizes="64px" alt="" className="block sm:hidden" imgClassName="aspect-[4/5] w-16 object-cover" />
              <span className="t-h3 group-hover:underline group-hover:underline-offset-4">
                {p.name}
                <span className="t-label mt-1 block text-muted sm:hidden">{p.code} · {p.city}</span>
              </span>
              <span className="t-caption hidden text-muted sm:block">{p.city}</span>
              <span className="t-caption text-right text-muted">{p.year}</span>
            </ProjectLink>
          </li>
        ))}
      </ul>
      {hover && (
        <div ref={peek} aria-hidden="true" className={cn('peek pointer-events-none fixed left-0 top-0 z-30 w-[300px]', active && 'is-on')}>
          {active && <Picture key={active.slug} img={cardOf(active)} sizes="300px" alt="" priority imgClassName="aspect-[3/2] w-full object-cover" />}
        </div>
      )}
    </>
  )
}

function Grade({ items }: { items: Project[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((p, i) => (
        <div key={p.slug} className="mb-[var(--sec-s)] break-inside-avoid">
          <ProjectCard project={p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" ratio={i % 3 === 1 ? '4/5' : '3/2'} />
        </div>
      ))}
    </div>
  )
}
