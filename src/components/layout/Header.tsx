import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Monogram } from '@/components/brand/Monogram'
import { waLink } from '@/lib/whatsapp'
import { useMedia } from '@/lib/hooks'
import { cn } from '@/lib/cn'
import { useSite, WipeLink } from './Site'

const LINKS = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/estudio', label: 'Estúdio' },
] as const

/** Quiet bar: transparent over the hero, white on the rest of the page, ink type. No black block. */
export function Header() {
  const { headerMode } = useSite()
  const { pathname } = useLocation()
  const mobile = useMedia('(max-width: 767px)')
  const [open, setOpen] = useState(false)
  const panel = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('a')?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    toggle.current?.focus()
  }

  const overHero = !open && headerMode !== 'solid'
  const onPhoto = !open && headerMode === 'photo'

  return (
    <header className={cn('nav', overHero && onPhoto && 'is-photo', overHero && !onPhoto && 'is-ghost', onPhoto && 'on-photo')}>
      <WipeLink to="/" className="nav-logo" aria-label="Nord Arch — início">
        <Monogram className="h-8 w-6" />
        <span className="t-wordmark">Nord Arch</span>
      </WipeLink>

      <button
        ref={toggle}
        type="button"
        className="nav-menu t-nav"
        aria-expanded={open}
        aria-controls="nav-panel"
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? 'Fechar' : 'Menu'}
      </button>

      <nav
        ref={panel}
        id="nav-panel"
        className={cn('nav-links', open && 'is-open')}
        aria-label="Menu principal"
        inert={mobile && !open ? true : undefined}
      >
        {LINKS.map((l) => (
          <WipeLink key={l.to} to={l.to} className="nav-link t-nav link" onClick={() => setOpen(false)}>
            {l.label}
          </WipeLink>
        ))}
        <a href={waLink('nav')} target="_blank" rel="noopener noreferrer" className="nav-link t-nav link">
          WhatsApp
        </a>
      </nav>
    </header>
  )
}
