import { useParams } from 'react-router'
import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Ficha } from '@/components/ui/Parts'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBand } from '@/components/home/CtaBand'
import { cta } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { bySlug, cardOf, galleryOf, nextOf, openingOf, scopeLabel, type Img } from '@/content/projects'
import { usePageMeta } from '@/lib/hooks'
import NotFound from './NotFound'

// Editorial rhythm by aspect: landscapes take wide spans, portraits narrow ones, alternating sides,
// so the same size never repeats twice in a row (PAGE_BLUEPRINTS → Projeto → Gallery)
const WIDE = [
  { c: 'col-span-4 sm:col-span-8 lg:col-span-8', s: '(max-width: 1024px) 100vw, 66vw' },
  { c: 'col-span-4 sm:col-span-7 sm:col-start-2 lg:col-span-7 lg:col-start-5', s: '(max-width: 1024px) 90vw, 58vw' },
  { c: 'col-span-4 sm:col-span-8 lg:col-span-10 lg:col-start-2', s: '(max-width: 1024px) 100vw, 83vw' },
  { c: 'col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-1', s: '(max-width: 1024px) 75vw, 50vw' },
]
const TALL = [
  { c: 'col-span-3 col-start-2 sm:col-span-4 sm:col-start-5 lg:col-span-4 lg:col-start-9', s: '(max-width: 640px) 75vw, 33vw' },
  { c: 'col-span-3 sm:col-span-4 lg:col-span-4 lg:col-start-2', s: '(max-width: 640px) 75vw, 33vw' },
  { c: 'col-span-3 col-start-2 sm:col-span-4 sm:col-start-3 lg:col-span-5 lg:col-start-6', s: '(max-width: 640px) 75vw, 42vw' },
]
function layout(gallery: Img[]) {
  let w = 0
  let t = 0
  return gallery.map((img) => (img.h > img.w * 0.85 ? TALL[t++ % TALL.length] : WIDE[w++ % WIDE.length]))
}

export default function Project() {
  const { slug } = useParams()
  const p = bySlug(slug)

  usePageMeta(
    p ? `${p.name} — ${p.city}, SC — Nord Arch` : 'Página não encontrada — Nord Arch',
    p ? `${p.program} em ${p.city}, SC. ${p.areaLabel ?? `${p.area} m²`}, ${p.year}. Projeto Nord Arch.` : undefined,
  )

  if (!p) return <NotFound />
  const next = nextOf(p)
  const gallery = galleryOf(p)

  return (
    <article>
      <div className="relative mt-[76px] h-[calc(92svh-76px)] min-h-[420px] overflow-hidden bg-border">
        <Picture
          img={openingOf(p)}
          sizes="100vw"
          priority
          className="block h-full w-full"
          imgClassName="h-full w-full object-cover"
          imgStyle={{ viewTransitionName: 'project-image' }}
        />
      </div>

      <header className="wrap mt-[var(--sec-s)]">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
            <p className="t-label text-muted">{p.code}</p>
            <h1 className="t-display mt-4">{p.name}</h1>
            <p className="t-caption mt-4 text-muted">
              {p.place === p.city ? p.city : `${p.place}, ${p.city}`}, SC · {p.year} · {p.category}
            </p>
          </div>
          <Ficha
            className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9"
            rows={[
              ['Área', p.areaLabel ?? `${p.area} m²`],
              ['Programa', p.program],
              ['Escopo', p.scope.map((s) => scopeLabel[s]).join(' · ')],
              ['Equipe', p.team.join(', ')],
              ['Ano', p.year],
              ['Local', `${p.city}, SC`],
              ['Fotografia', p.credit.photographer],
            ]}
          />
        </div>
      </header>

      <section className="wrap mt-[var(--sec-m)]" aria-label="Conceito">
        <div className="grid-12">
          <p className="t-body col-span-4 sm:col-span-7 lg:col-span-6 lg:col-start-2">{p.concept}</p>
        </div>
      </section>

      <section className="wrap mt-[var(--sec-l)]" aria-label="Galeria">
        <div className="grid-12 gap-y-[var(--sec-s)] lg:gap-y-24">
          {layout(gallery).map((l, i) => (
            <figure key={gallery[i].src} className={l.c}>
              <Reveal>
                <Picture img={gallery[i]} sizes={l.s} imgClassName="w-full object-cover" />
              </Reveal>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand id="conversar" title={cta.project.title(p.name)} line={cta.project.line(p.code)} href={waLink('project', p)} />

      <nav className="wrap mt-[var(--sec-m)]" aria-label="Próximo projeto">
        <ProjectLink slug={next.slug} className="group grid-12 items-end gap-y-6 border-t border-border pt-4">
          <span className="col-span-4 sm:col-span-4 lg:col-span-6">
            <span className="t-label block text-muted">Próximo · {next.code}</span>
            <span className="t-h2 mt-3 block group-hover:underline group-hover:underline-offset-4">{next.name}</span>
          </span>
          <span className="col-span-4 sm:col-span-4 lg:col-span-4 lg:col-start-9">
            <Picture img={cardOf(next)} sizes="(max-width: 640px) 100vw, 33vw" imgClassName="aspect-[3/2] w-full object-cover" />
          </span>
        </ProjectLink>
      </nav>
    </article>
  )
}
