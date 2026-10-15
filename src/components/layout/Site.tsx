import { createContext, useCallback, useContext, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { prefersReducedMotion } from '@/lib/hooks'
import { Monogram } from '@/components/brand/Monogram'

/**
 * Site-wide state and the two navigation languages (DEC-016):
 *  - go(to): the 33.7° ink wipe ("mudar de sala") for every route change except project entries;
 *  - openProject(slug, img): the shared image expanding into the project opening ("entrar numa casa"),
 *    via the View Transitions API (`view-transition-name: project-image`).
 */
type Site = {
  headerLight: boolean
  setHeaderLight: (v: boolean) => void
  introReady: boolean
  setIntroReady: (v: boolean) => void
  go: (to: string) => void
  openProject: (slug: string, img?: HTMLImageElement | null) => void
}

const Ctx = createContext<Site | null>(null)
export const useSite = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useSite outside <SiteProvider>')
  return c
}

const WIPE_MS = 600
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function SiteProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [headerLight, setHeaderLight] = useState(false)
  const [introReady, setIntroReady] = useState(false)
  const wipeRef = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  const go = useCallback(
    async (target: string) => {
      const [to, hash] = target.split('#')
      const wipe = wipeRef.current
      // same page + anchor (e.g. /#servicos from the home): just scroll there
      if (hash && (to || '/') === window.location.pathname) {
        document.getElementById(hash)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
        return
      }
      // the router's ScrollRestoration runs after navigation; land again once it has settled
      const land = () => {
        const to = () => (hash ? document.getElementById(hash)?.scrollIntoView() : window.scrollTo(0, 0))
        to()
        document.getElementById('main')?.focus({ preventScroll: true }) // announce the new page (WCAG 2.4.3)
        if (hash) [80, 300].forEach((ms) => setTimeout(to, ms))
      }
      if (busy.current) return
      if (!wipe || prefersReducedMotion()) {
        await navigate(to || '/')
        requestAnimationFrame(land)
        return
      }
      busy.current = true
      wipe.dataset.state = 'in'
      await wait(WIPE_MS)
      await navigate(to || '/')
      await new Promise((r) => requestAnimationFrame(r))
      land()
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      wipe.dataset.state = 'out'
      await wait(WIPE_MS)
      wipe.dataset.state = 'idle'
      busy.current = false
    },
    [navigate],
  )

  const openProject = useCallback(
    (slug: string, img?: HTMLImageElement | null) => {
      const to = `/projetos/${slug}`
      const canVT = 'startViewTransition' in document && !prefersReducedMotion()
      if (!canVT || !img) {
        void go(to)
        return
      }
      document.querySelectorAll<HTMLElement>('[style*="project-image"]').forEach((el) => (el.style.viewTransitionName = ''))
      img.style.viewTransitionName = 'project-image'
      document.documentElement.dataset.vt = 'project'
      void navigate(to, { viewTransition: true })
      setTimeout(() => {
        delete document.documentElement.dataset.vt
      }, 1400)
    },
    [go, navigate],
  )

  const value = useMemo(
    () => ({ headerLight, setHeaderLight, introReady, setIntroReady, go, openProject }),
    [headerLight, introReady, go, openProject],
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      <div ref={wipeRef} className="wipe" data-state="idle" aria-hidden="true">
        <Monogram className="wipe-mark" />
      </div>
    </Ctx.Provider>
  )
}

/** Internal link that navigates with the diagonal wipe (keeps modifier-click behaviour). */
export function WipeLink({ to, className, children, onClick: onClickProp, ...rest }: { to: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { go } = useSite()
  // compose: a caller's onClick (e.g. closing the menu) must not replace the wipe navigation
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClickProp?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (!to.includes('#') && to === window.location.pathname + window.location.search) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      return
    }
    void go(to)
  }
  return (
    <a href={to} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}

/** Link into a project: the image inside it becomes the shared element. */
export function ProjectLink({ slug, className, children, onClick: onClickProp, ...rest }: { slug: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { openProject } = useSite()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClickProp?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    openProject(slug, e.currentTarget.querySelector('img'))
  }
  return (
    <a href={`/projetos/${slug}`} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}
