import { useState } from 'react'
import TearTicket from '@/components/reactbits/TearTicket'
import { Picture } from '@/components/ui/Picture'
import type { Project } from '@/content/projects'
import { cardOf } from '@/content/projects'
import { ticket } from '@/content/site'
import { waLink, waMessage } from '@/lib/whatsapp'
import { useMedia } from '@/lib/hooks'

type Props = { variant: 'home' | 'contact' } | { variant: 'project'; project: Project }

/**
 * One component, three variants (DEC-017). Tears by drag, tap/click or Enter/Space,
 * then opens WhatsApp with the variant's message (single source: lib/whatsapp.ts).
 */
export function Ticket(props: Props) {
  const [torn, setTorn] = useState(false)
  const narrow = useMedia('(max-width: 639px)')
  const project = props.variant === 'project' ? props.project : undefined
  const href = waLink(props.variant, project)
  const copy = ticket[props.variant]
  const title = typeof copy.title === 'function' ? copy.title(project!.name) : copy.title

  const vertical = props.variant === 'contact' && !narrow
  const size = vertical
    ? { width: 360, height: 560, stubSize: 170 }
    : props.variant === 'project'
      ? { width: 620, height: 230, stubSize: 170 }
      : { width: 560, height: 200, stubSize: 140 }

  const onTear = () => {
    setTorn(true)
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full max-w-full">
      <TearTicket
        {...size}
        orientation={vertical ? 'vertical' : 'horizontal'}
        background="#FFFFFF"
        color="#0B0B0C"
        border
        borderColor="#0B0B0C"
        borderWidth={1}
        radius={0}
        notch={0}
        holes={vertical ? 7 : 5}
        holeSize={6}
        tearAngle={33.7}
        rotate={0}
        tilt={false}
        parallax={0}
        scrim={false}
        onTear={onTear}
        ariaLabel={`${copy.stub}: abrir conversa no WhatsApp${project ? ` sobre a ${project.name}` : ''}`}
        stub={
          <span className={`flex h-full w-full flex-col items-center justify-center gap-3 p-4 border-dashed border-text ${vertical ? "border-t" : "border-l"}`}>
            {project ? (
              <>
                <Picture img={cardOf(project)} sizes="120px" alt="" className="block w-[96px]" imgClassName="aspect-[4/5] w-full object-cover" />
                <span className="t-label">{project.code}</span>
              </>
            ) : (
              <span className="t-label [writing-mode:vertical-rl] rotate-180">{copy.stub}</span>
            )}
          </span>
        }
      >
        <div className="flex h-full flex-col justify-between p-6 sm:p-7" aria-live="polite">
          <p className="t-label text-muted">{torn ? ticket.done : copy.label}</p>
          {torn ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="t-h3 link self-start">
              Abrir conversa ↗
            </a>
          ) : (
            <p className="t-h3 max-w-[16ch]">{title}</p>
          )}
        </div>
      </TearTicket>
      <p className="sr-only">Mensagem: {waMessage(props.variant, project)}</p>
    </div>
  )
}
