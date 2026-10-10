import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Lockup } from '@/components/brand/Monogram'
import { waLink } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'
import { useSite, WipeLink } from './Site'

const NAV = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/estudio', label: 'Estúdio' },
]

export function Header() {
  const { headerLight } = useSite()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const light = headerLight && !open
  const current = (to: string) => (pathname.startsWith(to) ? 'page' : undefined)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-[var(--dur-ui)] ease-[var(--ease-out)]',
        light ? 'text-white on-photo' : 'bg-bg text-text',
      )}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <WipeLink to="/" aria-label="Nord Arch — início" className="-m-2 p-2">
          <Lockup />
        </WipeLink>

        <nav aria-label="Principal" className="hidden items-center gap-8 sm:flex">
          {NAV.map((n) => (
            <WipeLink key={n.to} to={n.to} className="t-nav link py-3" aria-current={current(n.to)}>
              {n.label}
            </WipeLink>
          ))}
          <a href={waLink('nav')} target="_blank" rel="noopener noreferrer" className="t-nav link py-3">
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-5 sm:hidden">
          <a href={waLink('nav')} target="_blank" rel="noopener noreferrer" className="t-nav hidden py-3 min-[400px]:inline">
            WhatsApp
          </a>
          <button type="button" className="t-nav min-h-11 py-3" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu" aria-label="Menu" className="fixed inset-0 top-[76px] z-30 bg-bg text-text">
          <ul className="wrap flex flex-col gap-6 pt-12">
            {[...NAV, { to: '/contato', label: 'Contato' }].map((n) => (
              <li key={n.to}>
                <WipeLink to={n.to} className="t-h2 link" aria-current={current(n.to)}>
                  {n.label}
                </WipeLink>
              </li>
            ))}
            <li>
              <a href={waLink('nav')} target="_blank" rel="noopener noreferrer" className="t-h2 link">
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
