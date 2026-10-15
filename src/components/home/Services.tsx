import { home } from '@/content/site'

/** Services as a text list. No columns, cards, or “ver projeto”. */
export function Services() {
  const s = home.services
  return (
    <section id="servicos" className="wrap mt-[var(--sec-l)]" aria-labelledby="servicos-title">
      <h2 id="servicos-title" className="t-label text-muted">{s.label}</h2>
      <ul className="svc">
        {s.items.map((it) => (
          <li key={it.title}>
            <h3 className="t-h3">{it.title}</h3>
            <p className="t-body mt-2">{it.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
