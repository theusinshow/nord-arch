import { useEffect, useRef, useState } from 'react'
import { matchPath, useLocation } from 'react-router'
import { Monogram } from '@/components/brand/Monogram'
import { Picture } from '@/components/ui/Picture'
import { bySlug, cardOf } from '@/content/projects'
import { contact } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'
import { Shuffle } from './Shuffle'
import { useSite, WipeLink } from './Site'

// Menu entries — the photo on the left swaps with the hovered link
const LINKS = [
  { to: '/projetos', label: 'Projetos', image: 'pleat-house' },
  { to: '/estudio', label: 'Estúdio', image: 'firn-house' },
  { to: '/#servicos', label: 'Serviços', image: 'celeiro-testo-alto' },
  { to: '/contato', label: 'Contato', image: 'casas-ferrugem' },
]

/**
 * Navbar (DEC-030) — a 1:1 structural refactor of flexis-mobility.com's header, in Nord Arch tokens:
 * cells divided by hairlines (logo | MENU toggle | WhatsApp | Contato •), transparent over the hero and
 * solid ink once scrolled, bracket-corner hover on every cell, shuffling labels, a 1px scroll-progress line
 * and a menu panel that drops from the top (photo + large links + side buttons) over a dimmed page.
 */
export function Header() {
  const { headerLight } = useSite()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(LINKS[0].image)
  const [hover, setHover] = useState<Record<string, number>>({})
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const bump = (k: string) => setHover((h) => ({ ...h, [k]: (h[k] ?? 0) + 1 }))
  // on a project page every WhatsApp entry carries the project's name and code (DEC-017, DEC-033)
  const project = bySlug(matchPath('/projetos/:slug', pathname)?.params.slug)
  const wa = project ? waLink('project', project) : waLink('nav')

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !open) return
      setOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])
  // open menu: the page behind is inert and focus moves to the first link; closing hands focus back to the toggle
  useEffect(() => {
    const behind = [document.getElementById('main'), document.querySelector('footer')].filter(Boolean) as HTMLElement[]
    behind.forEach((el) => (el.inert = open))
    if (open) requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('a')?.focus())
    return () => behind.forEach((el) => (el.inert = false))
  }, [open])
  // scroll progress written straight to a CSS variable: no React state, no re-render per scroll frame
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        navRef.current?.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0))
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [pathname])

  const solid = open || !headerLight
  const img = bySlug(image)!

  return (
    <header className={cn('nav', solid && 'is-solid', open && 'is-open')} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <WipeLink to="/" className="nav-cell nav-logo" aria-label="Nord Arch — início" onMouseEnter={() => bump('logo')}>
        <span className="inline-flex items-center gap-3">
          <Monogram className="h-9 w-7" />
          <Shuffle text="Nord Arch" trigger={hover.logo} className="t-wordmark whitespace-nowrap" />
        </span>
      </WipeLink>

      <nav ref={navRef} aria-label="Menu principal" className="nav-cell-wrap nav-main">
        <button
          ref={toggleRef}
          type="button"
          className="nav-cell nav-toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => bump('menu')}
        >
          <Shuffle text={open ? 'Fechar' : 'Menu'} trigger={hover.menu} className="nav-label" />
          <span className="nav-icon" aria-hidden="true" />
        </button>

        {/* a disclosure, not a modal dialog: the page behind goes inert while it is open */}
        <div ref={panelRef} id="nav-panel" className="nav-panel" inert={!open}>
          <div className="nav-panel-image">
            <Picture key={img.slug} img={cardOf(img)} sizes="20rem" alt="" imgClassName="nav-panel-img h-full w-full object-cover" />
          </div>
          <div className="nav-panel-body">
            <ul className="nav-panel-list">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <WipeLink to={l.to} className="nav-panel-link" onMouseEnter={() => setImage(l.image)} onFocus={() => setImage(l.image)} onClick={() => setOpen(false)}>
                    <span className="nav-panel-link-label">{l.label}</span>
                  </WipeLink>
                </li>
              ))}
            </ul>
            <ul className="nav-panel-list nav-panel-side">
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="nav-button">
                  <span>WhatsApp</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="nav-button">
                  <span>Instagram</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="nav-button">
                  <span>E-mail</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
            <div className="nav-panel-footer">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="nav-cell">WhatsApp</a>
              <WipeLink to="/contato" className="nav-cell nav-contact" onClick={() => setOpen(false)}>Contato</WipeLink>
            </div>
          </div>
        </div>
      </nav>

      <a href={wa} target="_blank" rel="noopener noreferrer" className="nav-cell nav-side" onMouseEnter={() => bump('wa')}>
        <Shuffle text="WhatsApp" trigger={hover.wa} className="nav-label" />
      </a>
      <WipeLink to="/contato" className="nav-cell nav-side nav-contact" onMouseEnter={() => bump('ct')}>
        <Shuffle text="Contato" trigger={hover.ct} className="nav-label" />
      </WipeLink>
    </header>
  )
}
