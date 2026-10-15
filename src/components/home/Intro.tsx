import { WipeLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Reveal } from '@/components/motion/Reveal'
import { bySlug, cardOf } from '@/content/projects'
import { home } from '@/content/site'

/**
 * "Sobre" (DEC-028, DEC-030): manifesto + who the studio is + a photo cut by the monogram's
 * 33.7° roof (left high, falling to the right — the "shed" of the logo).
 */
export function Intro() {
  const p = bySlug(home.intro.image)!
  return (
    <section className="wrap mt-[var(--sec-l)]" aria-labelledby="sobre">
      <div className="grid-12 items-end gap-y-14">
        <div className="col-span-4 sm:col-span-8 lg:col-span-7">
          <p className="t-label text-muted">{home.intro.label}</p>
          <h2 id="sobre" className="t-manifesto mt-6">{home.manifesto}</h2>
          <p className="t-body mt-10 max-w-[52ch]">{home.intro.text}</p>
          <p className="t-body mt-4 max-w-[52ch]">{home.intro.text2}</p>
          <WipeLink to="/estudio" className="t-nav link mt-10 inline-block">{home.intro.link} →</WipeLink>
        </div>
        <figure className="col-span-3 col-start-2 sm:col-span-4 sm:col-start-5 lg:col-span-4 lg:col-start-9">
          <Reveal>
            <Picture img={cardOf(p)} sizes="(max-width: 640px) 75vw, 33vw" className="roof-wrap block" imgClassName="roof-cut aspect-[4/5] w-full object-cover" />
          </Reveal>
          <figcaption className="t-caption mt-3 text-muted">
            <span className="font-medium text-text">{p.name}</span> · {p.city}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
