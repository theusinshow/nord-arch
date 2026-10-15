import type { ReactNode } from 'react'
import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { cardOf, caption, type Img, type Project } from '@/content/projects'
import { cn } from '@/lib/cn'

/** Hairline + label on the left, optional count on the right. */
export function SectionLabel({ children, aside, as: Tag = 'h2', id }: { children: ReactNode; aside?: ReactNode; as?: 'h2' | 'p'; id?: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between border-t border-border pt-3">
      <Tag id={id} className="t-label">{children}</Tag>
      {aside && <span className="t-label text-muted">{aside}</span>}
    </div>
  )
}

/** Museum label: name · place · year. The name is Michroma; the rest is the grotesk. */
export function Caption({ project, className }: { project: Project; className?: string }) {
  return (
    <p className={cn('t-caption mt-3 max-w-none', className)}>
      <span className="t-name-sm text-text group-hover:underline group-hover:underline-offset-4">{project.name}</span>
      <span className="text-muted"> · {caption(project)}</span>
    </p>
  )
}

/** The whole card is the link. No hover zoom, no “ver projeto”. */
export function ProjectCard({ project, img, sizes, className, ratio }: { project: Project; img?: Img; sizes: string; className?: string; ratio?: '3/2' | '4/5' }) {
  const image = img ?? cardOf(project)
  return (
    <ProjectLink slug={project.slug} className={cn('group block', className)}>
      <Picture img={image} sizes={sizes} imgClassName="w-full object-cover" imgStyle={ratio ? { aspectRatio: ratio } : undefined} />
      <Caption project={project} />
    </ProjectLink>
  )
}

/** Technical sheet as a table: grotesk keys, grotesk values, hairline under each row. */
export function Ficha({ rows, className, caption: cap }: { rows: [string, ReactNode][]; className?: string; caption?: string }) {
  return (
    <table className={cn('ficha', className)}>
      {cap ? <caption className="sr-only">{cap}</caption> : null}
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
