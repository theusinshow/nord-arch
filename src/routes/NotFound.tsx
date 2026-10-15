import { WipeLink } from '@/components/layout/Site'
import { Monogram } from '@/components/brand/Monogram'
import { notFound } from '@/content/site'
import { usePageMeta } from '@/lib/hooks'

export default function NotFound() {
  usePageMeta('Página não encontrada — Nord Arch')
  return (
    <div className="wrap flex min-h-[80svh] flex-col items-center justify-center pt-[var(--nav-h)] text-center">
      <Monogram className="h-24 w-[74px]" />
      <h1 className="t-h2 mt-10">{notFound.message}</h1>
      <WipeLink to="/projetos" className="t-nav link mt-8 inline-flex min-h-[44px] items-center">{notFound.link}</WipeLink>
    </div>
  )
}
