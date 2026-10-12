import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Hero } from '@/components/hero/Hero'
import { Places } from '@/components/home/Places'
import { HomeCta } from '@/components/home/CtaBand'
import { SectionLabel } from '@/components/ui/Parts'
import { WipeLink } from '@/components/layout/Site'
import { projects } from '@/content/projects'
import { home } from '@/content/site'
import { usePageMeta } from '@/lib/hooks'

// Accordion Gallery pulls gsap — imported only when the section approaches (DEC-019)
const Highlights = lazy(() => import('@/components/motion/Highlights'))

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

      <Places />

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

      <HomeCta />
    </>
  )
}
