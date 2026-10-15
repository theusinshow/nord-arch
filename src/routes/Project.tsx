import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ProjectLink, clearProjectMask, projectMaskPending } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Ficha } from '@/components/ui/Parts'
import { TextCta } from '@/components/home/TextCta'
import { cta } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { bySlug, cardOf, galleryOf, nextOf, openingOf, scopeLabel, type Img, type Project } from '@/content/projects'
import { usePageMeta, useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'
import NotFound from './NotFound'

const DRAWINGS: { id: 'planta' | 'corte' | 'implantacao'; label: string; ratio: string }[] = [
  { id: 'planta', label: 'Planta', ratio: '3 / 2' },
  { id: 'corte', label: 'Corte', ratio: '4 / 5' },
  { id: 'implantacao', label: 'Implantação', ratio: '3 / 2' },
]

function useEntryMask() {
  const reduced = useReducedMotion()
  const [mask] = useState(() => !reduced && projectMaskPending())
  useEffect(() => {
    const t = window.setTimeout(clearProjectMask, 0)
    return () => window.clearTimeout(t)
  }, [])
  return mask
}

function DrawingSlot({ project, slot }: { project: Project; slot: (typeof DRAWINGS)[number] }) {
  const img = project.drawings?.[slot.id]
  return (
    <figure>
      {img ? (
        <Picture img={img} sizes="(max-width: 1024px) 100vw, 40vw" imgClassName="w-full object-contain" imgStyle={{ aspectRatio: slot.ratio }} />
      ) : (
        <div className="drawing-frame" style={{ aspectRatio: slot.ratio }}>
          <span className="t-label">{slot.label}</span>
        </div>
      )}
      {img ? <figcaption className="t-caption mt-3 text-muted">{slot.label}</figcaption> : null}
    </figure>
  )
}

function galleryClass(img: Img, index: number) {
  const tall = img.h > img.w * 0.85
  if (tall) return cn('g-tall', index % 2 ? 'is-end' : 'is-start')
  return index % 3 === 2 ? 'g-mid' : 'g-wide'
}

export default function Project() {
  const { slug } = useParams()
  const p = bySlug(slug)
  const mask = useEntryMask()

  usePageMeta(
    p ? `${p.name} — ${p.city}, SC — Nord Arch` : 'Página não encontrada — Nord Arch',
    p ? `${p.program} em ${p.city}, SC. ${p.areaLabel ?? `${p.area} m²`}, ${p.year}. Projeto Nord Arch.` : undefined,
  )

  if (!p) return <NotFound />
  const next = nextOf(p)
  const gallery = galleryOf(p)
  const place = p.place === p.city ? p.city : `${p.place}, ${p.city}`

  return (
    <article>
      <div className={cn('project-open', mask && 'is-mask')}>
        <Picture
          img={openingOf(p)}
          sizes="100vw"
          priority
          className="block h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
      </div>

      <header className="wrap mt-[var(--sec-s)]">
        <p className="t-label text-muted">{p.code}</p>
        <h1 className="t-display mt-4">{p.name}</h1>
        <p className="t-caption mt-4 text-muted">
          {place}, SC · {p.year} · {p.category}
        </p>
      </header>

      <div className="wrap mt-[var(--sec-m)] grid-12 items-start gap-y-16">
        <p className="t-concept col-span-4 sm:col-span-8 lg:col-span-6">{p.concept}</p>
        <Ficha
          caption={`Ficha técnica, ${p.name}`}
          className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8"
          rows={[
            ['Área', p.areaLabel ?? `${p.area} m²`],
            ['Programa', p.program],
            ['Escopo', p.scope.map((s) => scopeLabel[s]).join(' · ')],
            ['Ano', String(p.year)],
            ['Local', `${place}, SC`],
            ['Equipe', p.team.join(', ')],
            ['Fotografia', p.credit.photographer],
          ]}
        />
      </div>

      <section className="wrap mt-[var(--sec-l)]" aria-labelledby="desenhos">
        <h2 id="desenhos" className="t-label text-muted">Desenhos</h2>
        <div className="drawings">
          {DRAWINGS.map((slot) => (
            <DrawingSlot key={slot.id} project={p} slot={slot} />
          ))}
        </div>
      </section>

      <section className="gallery mt-[var(--sec-l)]" aria-label="Fotografias">
        {gallery.map((img, i) => (
          <figure key={img.src} className={galleryClass(img, i)}>
            <Picture img={img} sizes={img.h > img.w * 0.85 ? '(max-width: 767px) 80vw, 38vw' : '100vw'} imgClassName="w-full object-cover" />
          </figure>
        ))}
      </section>

      <TextCta id="conversar" title={cta.project.title(p.name)} line={cta.project.line(p.code)} href={waLink('project', p)} />

      <nav className="wrap mt-[var(--sec-m)]" aria-label="Próximo projeto">
        <ProjectLink slug={next.slug} className="group grid-12 items-end gap-y-6 border-t border-border pt-6">
          <span className="col-span-4 sm:col-span-4 lg:col-span-6">
            <span className="t-label block text-muted">Próximo · {next.code}</span>
            <span className="t-display mt-3 block text-[clamp(28px,3vw,48px)] group-hover:underline group-hover:underline-offset-[6px]">{next.name}</span>
          </span>
          <span className="col-span-4 sm:col-span-4 lg:col-span-4 lg:col-start-9">
            <Picture img={cardOf(next)} sizes="(max-width: 640px) 100vw, 33vw" imgClassName="aspect-[3/2] w-full object-cover" />
          </span>
        </ProjectLink>
      </nav>
    </article>
  )
}
