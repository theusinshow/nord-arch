import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Hero } from '@/components/hero/Hero'
import { DriftBand } from '@/components/motion/DriftBand'
import { SectionLabel } from '@/components/ui/Parts'
import { WipeLink } from '@/components/layout/Site'
import { projects } from '@/content/projects'
import { home } from '@/content/site'
import { usePageMeta } from '@/lib/hooks'

// Accordion Gallery pulls gsap — imported only when the section approaches (DEC-019)
const Highlights = lazy(() => import('@/components/motion/Highlights'))
// Tear Ticket pulls `motion` — below the fold, so it stays out of the initial chunk
const Ticket = lazy(() => import('@/components/motion/Ticket').then((m) => ({ default: m.Ticket })))

function HighlightsFallback({ count }: { count: number }) {
  return <div style={{ height: 'min(72vh, 680px)' }} className="bg-border" aria-hidden="true" data-count={count} />
}

export default function Home() {
  usePageMeta(
    'Nord Arch — Arquitetura residencial em Santa Catarina',
    'Casas autorais em Santa Catarina: arquitetura, interiores e paisagismo, do projeto à obra.',
  )
  const featured = projects.filter((p) => p.featured)
  const near = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = near.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: '600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Hero project={projects[0]} />

      <section className="wrap mt-[var(--sec-l)]" aria-label="Manifesto">
        <div className="grid-12">
          <p className="t-manifesto col-span-4 sm:col-span-6 lg:col-span-7">{home.manifesto}</p>
        </div>
      </section>

      <div className="mt-[var(--sec-m)]">
        <DriftBand />
      </div>

      <section ref={near} className="wrap mt-[var(--sec-l)]" aria-labelledby="destaques">
        <SectionLabel id="destaques" aside={`${featured.length} de ${projects.length}`}>
          {home.highlightsLabel}
        </SectionLabel>
        {load ? (
          <Suspense fallback={<HighlightsFallback count={featured.length} />}>
            <Highlights items={featured} />
          </Suspense>
        ) : (
          <HighlightsFallback count={featured.length} />
        )}
        <p className="mt-[var(--sec-s)]">
          <WipeLink to="/projetos" className="t-nav link">
            {projects.length} obras · NA—01 → NA—{String(projects.length).padStart(2, '0')}
          </WipeLink>
        </p>
      </section>

      <section className="wrap mt-[var(--sec-l)]" aria-labelledby="convite">
        <div className="grid-12 items-center gap-y-10">
          <h2 id="convite" className="t-h2 col-span-4 sm:col-span-8 lg:col-span-5">{home.invitation}</h2>
          <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7">
            {load && (
              <Suspense fallback={<div className="h-[200px] border border-text" />}>
                <Ticket variant="home" />
              </Suspense>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
