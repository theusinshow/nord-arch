import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ProjectLink, WipeLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { SectionLabel } from '@/components/ui/Parts'
import { Reveal } from '@/components/motion/Reveal'
import { TeamCard } from '@/components/motion/TeamCard'
import { bySlug, cardOf, projects, scopeLabel, type Scope } from '@/content/projects'
import { studio } from '@/content/site'
import { usePageMeta } from '@/lib/hooks'
import { cn } from '@/lib/cn'

// Flex Carousel pulls ogl/WebGL — imported only when the section approaches (DEC-019, DEC-031)
const Works = lazy(() => import('@/components/motion/Works'))
const worksFallback = <div className="h-[min(70svh,720px)] min-h-[440px]" aria-hidden="true" />

const SCOPES: Scope[] = ['arquitetura', 'interiores', 'paisagismo', 'obra']
const SHORT: Record<Scope, string> = { arquitetura: 'Arq.', interiores: 'Int.', paisagismo: 'Pais.', obra: 'Obra' }

// Linguagem: same row structure, the photo changes size and ratio so no two rows repeat (DESIGN.md → Images)
const LANG_IMG = [
  { c: 'lg:col-span-5 lg:col-start-8', r: 'aspect-[3/2]', s: '(max-width: 1024px) 100vw, 40vw' },
  { c: 'lg:col-span-3 lg:col-start-9', r: 'aspect-[4/5]', s: '(max-width: 1024px) 60vw, 25vw' },
  { c: 'lg:col-span-6 lg:col-start-7', r: 'aspect-[3/2]', s: '(max-width: 1024px) 100vw, 50vw' },
]

export default function Studio() {
  usePageMeta('Estúdio — Nord Arch', 'Linguagem, escopo e equipe da Nord Arch, escritório de arquitetura em Florianópolis.')
  const near = useRef<HTMLElement>(null)
  const [load, setLoad] = useState(false)
  const opening = bySlug(studio.manifestoImage)!

  useEffect(() => {
    const el = near.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: '600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* opening on ink, under the solid bar: who the studio is, one photo (DEC-032) */}
      <section className="ink" aria-labelledby="estudio">
        <div className="wrap grid-12 items-end gap-y-12 pb-[var(--sec-m)] pt-[calc(73px+var(--sec-m))]">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
            <h1 id="estudio" className="sr-only">Estúdio</h1>
            <p className="t-manifesto">{studio.manifesto}</p>
          </div>
          <figure className="col-span-3 col-start-2 sm:col-span-4 sm:col-start-5 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <Picture img={cardOf(opening)} sizes="(max-width: 640px) 75vw, 33vw" priority imgClassName="aspect-[4/5] w-full object-cover" />
            </Reveal>
            <figcaption className="t-caption mt-3 text-muted">
              <span className="font-medium text-text">{opening.name}</span> · {opening.city}
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap">
        <section className="mt-[var(--sec-l)]" aria-labelledby="linguagem">
          <SectionLabel id="linguagem">Linguagem</SectionLabel>
          <ul>
            {studio.language.map((b, i) => {
              const p = bySlug(b.slug)!
              const l = LANG_IMG[i % LANG_IMG.length]
              return (
                <li key={b.title} className={cn('grid-12 items-start gap-y-6', i > 0 && 'mt-[var(--sec-m)]')}>
                  <h3 className="t-h2 col-span-4 sm:col-span-3 lg:col-span-3">{b.title}</h3>
                  <p className="t-body col-span-4 sm:col-span-5 lg:col-span-3">{b.text}</p>
                  <div className={cn('col-span-4 sm:col-span-6 sm:col-start-3', l.c)}>
                    <ProjectLink slug={p.slug} className="group block">
                      <Reveal>
                        <Picture img={cardOf(p)} sizes={l.s} imgClassName={cn(l.r, 'w-full object-cover')} />
                      </Reveal>
                      <span className="t-caption mt-3 block text-muted">
                        <span className="font-medium text-text group-hover:underline group-hover:underline-offset-4">{p.name}</span> · {p.code}
                      </span>
                    </ProjectLink>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* scope schedule: every work against the four services, like a sheet in a drawing set */}
      <section className="ink mt-[var(--sec-l)]" aria-labelledby="escopo">
        <div className="wrap grid-12 gap-y-10 py-[var(--sec-m)]">
          <div className="col-span-4 sm:col-span-8 lg:col-span-4">
            <h2 id="escopo" className="t-h2">{studio.scope.title}</h2>
            <p className="t-body mt-4 text-muted">{studio.scope.text}</p>
          </div>
          <table className="t-caption col-span-4 w-full max-w-none border-collapse text-left sm:col-span-8 lg:col-span-8 lg:col-start-5">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="t-label py-3 pr-4 font-normal text-muted">Projeto</th>
                <th scope="col" className="t-label hidden py-3 pr-4 font-normal text-muted sm:table-cell">Cidade</th>
                {SCOPES.map((s) => (
                  <th key={s} scope="col" className="t-label w-[3.25rem] whitespace-nowrap py-3 text-center font-normal text-muted lg:w-[6.75rem]">
                    <abbr title={scopeLabel[s]} className="no-underline lg:hidden">{SHORT[s]}</abbr>
                    <span className="hidden lg:inline">{scopeLabel[s]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.slug} className="border-b border-border">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    <span className="t-label block whitespace-nowrap text-muted sm:mr-3 sm:inline">{p.code}</span>
                    <ProjectLink slug={p.slug} className="link -my-3.5 inline-block py-3.5 font-medium">{p.name}</ProjectLink>
                  </th>
                  <td className="hidden py-3 pr-4 text-muted sm:table-cell">{p.city}</td>
                  {SCOPES.map((s) => (
                    <td key={s} className="py-3 text-center">
                      {p.scope.includes(s) ? (
                        <span className="mark" role="img" aria-label="sim" />
                      ) : (
                        <>
                          <span className="sr-only">não</span>
                          <span className="text-muted" aria-hidden="true">—</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* "Como trabalhamos" (moved from the home, DEC-033): order is the information, so the steps keep their numbers */}
          <div className="col-span-4 mt-[var(--sec-s)] sm:col-span-8 lg:col-span-4">
            <h2 id="como-trabalhamos" className="t-h2">{studio.steps.title}</h2>
          </div>
          <ol className="col-span-4 border-t border-border sm:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-[var(--sec-s)]">
            {studio.steps.items.map((st, i) => (
              <li key={st.title} className="grid grid-cols-[2em_7em_1fr] items-baseline gap-x-4 border-b border-border py-4">
                <span className="t-label text-muted">{i + 1}</span>
                <span className="t-label">{st.title}</span>
                <span className="t-caption max-w-none text-muted">{st.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="wrap">
        <section ref={near} className="mt-[var(--sec-l)]" aria-labelledby="obras">
          <SectionLabel id="obras" aside={`${projects.length} projetos`}>Obras</SectionLabel>
          {load ? <Suspense fallback={worksFallback}><Works items={projects} /></Suspense> : worksFallback}
        </section>
      </div>

      <section className="ink ink-end mt-[var(--sec-m)]" aria-labelledby="equipe">
        <div className="wrap pb-[var(--sec-m)] pt-[var(--sec-m)]">
          <SectionLabel id="equipe" aside="Equipe fictícia">Equipe</SectionLabel>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {studio.team.map((t) => (
              <TeamCard key={t.name} person={t} />
            ))}
          </div>
          <p className="mt-[var(--sec-s)]">
            <WipeLink to="/projetos" className="t-nav link">{studio.closing} →</WipeLink>
          </p>
        </div>
      </section>
    </>
  )
}
