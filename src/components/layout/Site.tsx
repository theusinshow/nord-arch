import { createContext, useCallback, useContext, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { prefersReducedMotion } from '@/lib/hooks'

/** Set just before an in-app project navigation. Cleared after the entry mask starts. */
let projectMaskArmed = false
export function armProjectMask() {
  projectMaskArmed = true
}
export function projectMaskPending() {
  return projectMaskArmed
}
export function clearProjectMask() {
  projectMaskArmed = false
}

export type HeaderMode = 'solid' | 'ghost' | 'photo'

type Site = {
  headerMode: HeaderMode
  setHeaderMode: (v: HeaderMode) => void
  go: (to: string) => void
  openProject: (slug: string) => void
}

const Ctx = createContext<Site | null>(null)
export const useSite = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useSite outside <SiteProvider>')
  return c
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [headerMode, setHeaderMode] = useState<HeaderMode>('solid')

  const go = useCallback(
    async (target: string) => {
      const [to, hash] = target.split('#')
      if (hash && (to || '/') === window.location.pathname) {
        document.getElementById(hash)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
        return
      }
      const land = () => {
        const run = () => (hash ? document.getElementById(hash)?.scrollIntoView() : window.scrollTo(0, 0))
        run()
        if (hash) [80, 300].forEach((ms) => setTimeout(run, ms))
      }
      await navigate(to || '/')
      requestAnimationFrame(land)
    },
    [navigate],
  )

  const openProject = useCallback(
    (slug: string) => {
      if (!prefersReducedMotion()) armProjectMask()
      void navigate(`/projetos/${slug}`)
    },
    [navigate],
  )

  const value = useMemo(() => ({ headerMode, setHeaderMode, go, openProject }), [headerMode, go, openProject])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/** Internal link. Modifier-clicks keep the browser default. */
export function WipeLink({ to, className, children, onClick: onClickProp, ...rest }: { to: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { go } = useSite()
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

/** Link into a project. The 33.7° mask runs on the destination opening. */
export function ProjectLink({ slug, className, children, onClick: onClickProp, ...rest }: { slug: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { openProject } = useSite()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClickProp?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    openProject(slug)
  }
  return (
    <a href={`/projetos/${slug}`} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}
