import { Lockup } from '@/components/brand/Monogram'
import { contact, footer } from '@/content/site'
import { waLink } from '@/lib/whatsapp'
import { WipeLink } from './Site'

export function Footer() {
  return (
    // ink on every page (DEC-032): white pages end on a black base; ink endings run straight into it, split by a hairline
    <footer className="ink">
      <div className="wrap grid-12 gap-y-10 border-t border-border pb-10 pt-[var(--sec-s)]">
        <div className="col-span-4 sm:col-span-8 lg:col-span-4">
          <WipeLink to="/" aria-label="Nord Arch — início" className="inline-block py-1">
            <Lockup />
          </WipeLink>
        </div>
        <nav aria-label="Rodapé" className="col-span-2 sm:col-span-3 lg:col-span-3">
          {/* 44px touch targets: the gap lives inside each link's padding (DEC-033) */}
          <ul className="-my-4 flex flex-col">
            <li><WipeLink to="/projetos" className="t-nav link inline-block py-4">Projetos</WipeLink></li>
            <li><WipeLink to="/estudio" className="t-nav link inline-block py-4">Estúdio</WipeLink></li>
            <li><WipeLink to="/contato" className="t-nav link inline-block py-4">Contato</WipeLink></li>
            <li><a href={waLink('nav')} target="_blank" rel="noopener noreferrer" className="t-nav link inline-block py-4">WhatsApp</a></li>
          </ul>
        </nav>
        <address className="t-caption col-span-4 not-italic text-muted sm:col-span-3 lg:col-span-3">
          <a href={`mailto:${contact.email}`} className="link inline-block py-3">{contact.email}</a>
          <br />
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="link inline-block py-3">{contact.instagram} ↗</a>
          <br />
          {contact.city}
        </address>
        <div className="t-caption col-span-4 text-muted sm:col-span-8 lg:col-span-2 lg:text-right">
          <p>{footer.notice}</p>
          <p className="mt-2">
            <WipeLink to="/creditos" className="link inline-block py-3">Créditos</WipeLink>
            {' · '}
            <WipeLink to="/privacidade" className="link inline-block py-3">Privacidade</WipeLink>
          </p>
        </div>
      </div>
    </footer>
  )
}
