import type { ReactNode } from 'react'
import { ProjectLink } from '@/components/layout/Site'
import { Picture } from '@/components/ui/Picture'
import { Reveal } from '@/components/motion/Reveal'
import { cardOf, caption, type Img, type Project } from '@/content/projects'
import { cn } from '@/lib/cn'

/** Hairline + label on the left, optional count on the right (no eyebrow/h2/paragraph stack — anti-U13). */
export function SectionLabel({ children, aside, as: Tag = 'h2', id }: { children: ReactNode; aside?: ReactNode; as?: 'h2' | 'p'; id?: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between border-t border-border pt-3">
      <Tag id={id} className="t-label">{children}</Tag>
      {aside && <span className="t-label text-muted">{aside}</span>}
    </div>
  )
}

/** Museum-label caption: **Name** · Place · Year. */
export function Caption({ project, className }: { project: Project; className?: string }) {
  return (
    <p className={cn('t-caption mt-3 max-w-none', className)}>
      <span className="font-medium text-text group-hover:underline group-hover:underline-offset-4">{project.name}</span>
      <span className="text-muted"> · {caption(project)}</span>
    </p>
  )
}

/** Whole card is the link; the image becomes the shared element on click. No hover zoom, no "Ver projeto →". */
export function ProjectCard({ project, img, sizes, className, ratio }: { project: Project; img?: Img; sizes: string; className?: string; ratio?: '3/2' | '4/5' }) {
  const image = img ?? cardOf(project)
  return (
    <ProjectLink slug={project.slug} className={cn('group block', className)}>
      <Reveal>
        <Picture img={image} sizes={sizes} imgClassName="w-full object-cover" imgStyle={ratio ? { aspectRatio: ratio } : undefined} />
      </Reveal>
      <Caption project={project} />
    </ProjectLink>
  )
}

export function Ficha({ rows, className }: { rows: [string, ReactNode][]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-[8em_1fr] gap-x-6', className)}>
      {rows.map(([k, v]) => (
        <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-border py-3">
          <dt className="t-label pt-[3px]">{k}</dt>
          <dd className="t-caption max-w-none font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
