import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ProjectLink, WipeLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Ficha, SectionLabel } from '@/components/ui/Parts'
import { Reveal } from '@/components/motion/Reveal'
import { TeamCard } from '@/components/motion/TeamCard'
import { bySlug, cardOf, projects, scopeLabel, type Scope } from '@/content/projects'
import { studio } from '@/content/site'
import { usePageMeta } from '@/lib/hooks'
import { cn } from '@/lib/cn'

// Flex Carousel pulls ogl/WebGL — imported only when the section approaches (DEC-019, DEC-031)
const Works = lazy(() => import('@/components/motion/Works'))
const worksFallback = <div className="h-[min(70svh,720px)] min-h-[440px]" aria-hidden="true" />

const codesFor = (s: Scope) => projects.filter((p) => p.scope.includes(s)).map((p) => p.code).join(' · ')

export default function Studio() {
  usePageMeta('Estúdio — Nord Arch', 'Linguagem, escopo e equipe da Nord Arch, escritório de arquitetura em Florianópolis.')
  const near = useRef<HTMLElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = near.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: '600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="wrap pt-[calc(73px+var(--sec-m))]">
      <h1 className="t-label text-muted">Estúdio</h1>
      <div className="mt-8 flex flex-col gap-4">
        {studio.manifesto.map((s) => (
          <p key={s} className="t-manifesto">{s}</p>
        ))}
      </div>

      <section className="mt-[var(--sec-l)]" aria-labelledby="linguagem">
        <SectionLabel id="linguagem">Linguagem</SectionLabel>
        <div className="flex flex-col gap-[var(--sec-m)]">
          {studio.language.map((b, i) => {
            const p = bySlug(b.slug)!
            return (
              <div key={b.title} className="grid-12 items-end gap-y-6">
                <div className={cn('col-span-4 sm:col-span-5 lg:col-span-6', i % 2 ? 'lg:order-2 lg:col-start-7' : '')}>
                  <ProjectLink slug={p.slug} className="group block">
                    <Reveal>
                      <Picture img={cardOf(p)} sizes="(max-width: 640px) 100vw, 50vw" imgClassName="aspect-[3/2] w-full object-cover" />
                    </Reveal>
                    <span className="t-label mt-3 block text-muted group-hover:text-text">{p.code} · {p.name}</span>
                  </ProjectLink>
                </div>
                <div className={cn('col-span-4 sm:col-span-3 lg:col-span-4', i % 2 ? 'lg:order-1 lg:col-start-2' : 'lg:col-start-8')}>
                  <h2 className="t-h2">{b.title}</h2>
                  <p className="t-body mt-4">{b.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-[var(--sec-l)]" aria-labelledby="escopo">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 sm:col-span-8 lg:col-span-5">
            <h2 id="escopo" className="t-h2">{studio.scope.title}</h2>
            <p className="t-body mt-4">{studio.scope.text}</p>
          </div>
          <Ficha
            className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7"
            rows={(['arquitetura', 'interiores', 'paisagismo', 'obra'] as Scope[]).map((s) => [scopeLabel[s], codesFor(s)])}
          />
        </div>
      </section>

      <section ref={near} className="mt-[var(--sec-m)]" aria-labelledby="obras">
        <SectionLabel id="obras" aside={`${projects.length} projetos`}>Obras</SectionLabel>
        {load ? <Suspense fallback={worksFallback}><Works items={projects} /></Suspense> : worksFallback}
      </section>

      <section className="mt-[var(--sec-l)]" aria-labelledby="equipe">
        <SectionLabel id="equipe" aside="Equipe fictícia">Equipe</SectionLabel>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {studio.team.map((t) => (
            <TeamCard key={t.name} person={t} />
          ))}
        </div>
      </section>

      <p className="mt-[var(--sec-m)]">
        <WipeLink to="/projetos" className="t-nav link">{studio.closing} →</WipeLink>
      </p>
    </div>
  )
}
