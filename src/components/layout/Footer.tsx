import { Lockup } from '@/components/brand/Monogram'
import { contact, footer } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { WipeLink } from './Site'

export function Footer() {
  return (
    <footer className="wrap mt-[var(--sec-l)] border-t border-border pb-10 pt-10">
      <div className="grid-12 gap-y-10">
        <div className="col-span-4 sm:col-span-8 lg:col-span-4">
          <WipeLink to="/" aria-label="Nord Arch — início" className="inline-flex min-h-[44px] items-center">
            <Lockup />
          </WipeLink>
        </div>
        <nav aria-label="Rodapé" className="col-span-2 sm:col-span-3 lg:col-span-3">
          <ul className="flex flex-col gap-3">
            <li><WipeLink to="/projetos" className="t-nav link inline-flex min-h-[44px] items-center">Projetos</WipeLink></li>
            <li><WipeLink to="/estudio" className="t-nav link inline-flex min-h-[44px] items-center">Estúdio</WipeLink></li>
            <li><WipeLink to="/contato" className="t-nav link inline-flex min-h-[44px] items-center">Contato</WipeLink></li>
            <li><a href={waLink('nav')} target="_blank" rel="noopener noreferrer" className="t-nav link inline-flex min-h-[44px] items-center">WhatsApp</a></li>
          </ul>
        </nav>
        <address className="t-caption col-span-4 not-italic text-muted sm:col-span-3 lg:col-span-3">
          <a href={`mailto:${contact.email}`} className="link inline-flex min-h-[44px] items-center">{contact.email}</a>
          <br />
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center">{contact.instagram} ↗</a>
          <br />
          {contact.city}
        </address>
        <div className="t-caption col-span-4 text-muted sm:col-span-8 lg:col-span-2 lg:text-right">
          <p>{footer.notice}</p>
          <p className="mt-2">
            <WipeLink to="/creditos" className="link inline-flex min-h-[44px] items-center">Créditos</WipeLink>
            {' · '}
            <WipeLink to="/privacidade" className="link inline-flex min-h-[44px] items-center">Privacidade</WipeLink>
          </p>
        </div>
      </div>
    </footer>
  )
}
