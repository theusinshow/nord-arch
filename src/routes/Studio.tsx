import { ProjectLink, WipeLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Ficha, SectionLabel } from '@/components/ui/Parts'
import { Monogram } from '@/components/brand/Monogram'
import { bySlug, cardOf, projects, scopeLabel, type Scope } from '@/content/projects'
import { studio } from '@/content/site'
import { usePageMeta } from '@/lib/hooks'
import { cn } from '@/lib/cn'

const codesFor = (s: Scope) => projects.filter((p) => p.scope.includes(s)).map((p) => p.code).join(' · ')

export default function Studio() {
  usePageMeta('Estúdio — Nord Arch', 'Linguagem, escopo e equipe da Nord Arch, escritório de arquitetura em Florianópolis.')

  return (
    <div className="wrap page">
      <h1 className="t-h1">Estúdio</h1>
      <div className="mt-10 flex max-w-[34ch] flex-col gap-3">
        {studio.manifesto.map((s) => (
          <p key={s} className="t-concept max-w-none">{s}</p>
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
                    <Picture img={cardOf(p)} sizes="(max-width: 640px) 100vw, 50vw" imgClassName="aspect-[3/2] w-full object-cover" />
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
            caption="Escopo e projetos"
            className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7"
            rows={(['arquitetura', 'interiores', 'paisagismo', 'obra'] as Scope[]).map((s) => [scopeLabel[s], codesFor(s)])}
          />
        </div>
      </section>

      <section className="mt-[var(--sec-l)]" aria-labelledby="como">
        <h2 id="como" className="t-label text-muted">{studio.stepsLabel}</h2>
        <ol className="steps">
          {studio.steps.map((st, i) => (
            <li key={st.title}>
              <span className="t-label text-muted">{i + 1}</span>
              <div>
                <h3 className="t-h3">{st.title}</h3>
                <p className="t-body mt-1">{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-[var(--sec-l)]" aria-labelledby="equipe">
        <SectionLabel id="equipe" aside="Equipe fictícia">Equipe</SectionLabel>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {studio.team.map((t) => (
            <figure key={t.name}>
              <div className="grid aspect-[4/5] w-full place-items-center bg-border text-muted" aria-hidden="true">
                <Monogram className="h-16 w-12" />
              </div>
              <figcaption className="mt-3">
                <span className="t-h3 block">{t.name}</span>
                <span className="t-caption block text-muted">{t.role}</span>
                <span className="t-label mt-1 block text-muted">{t.led.join(' · ')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <p className="mt-[var(--sec-m)]">
        <WipeLink to="/projetos" className="t-nav link inline-flex min-h-[44px] items-center">{studio.closing}</WipeLink>
      </p>
    </div>
  )
}
