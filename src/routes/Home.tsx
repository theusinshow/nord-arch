import { Hero } from '@/components/hero/Hero'
import { Sequence } from '@/components/home/Sequence'
import { Services } from '@/components/home/Services'
import { TextCta } from '@/components/home/TextCta'
import { projects } from '@/content/projects'
import { home } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { usePageMeta } from '@/lib/hooks'

export default function Home() {
  usePageMeta(
    'Nord Arch — Arquitetura residencial em Santa Catarina',
    'Escritório de arquitetura em Florianópolis. Casas, interiores, paisagismo e espaços comerciais em Santa Catarina, do estudo à obra.',
  )
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <Hero items={featured} />
      <p className="t-manifesto wrap home-manifesto">{home.manifesto}</p>
      <Sequence items={featured} />
      <Services />
      <TextCta id="conversar" title={home.close.title} line={home.close.line} href={waLink('nav')} />
    </>
  )
}
