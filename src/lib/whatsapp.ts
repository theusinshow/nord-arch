import { contact } from '@/content/site'

type Variant = 'project' | 'contact' | 'nav' | 'build' | 'renovate' | 'other'

const MESSAGES: Record<Exclude<Variant, 'project'>, string> = {
  nav: 'Olá, gostaria de conversar sobre um projeto.',
  contact: 'Olá, gostaria de marcar uma primeira conversa sobre um projeto.',
  // Home closing — three starting points (DEC-029). Complete sentences: no "___" blanks to send by mistake (DEC-033)
  build: 'Olá, tenho um terreno e gostaria de conversar sobre o projeto de uma casa.',
  renovate: 'Olá, gostaria de conversar sobre a reforma e os interiores de um imóvel.',
  other: 'Olá, gostaria de conversar sobre um projeto de paisagismo ou de um espaço comercial.',
}

/** Single source for every WhatsApp message (DEC-017, DEC-029, CNT-011). */
export function waMessage(variant: Variant, project?: { name: string; code: string }) {
  if (variant === 'project' && project) return `Olá, vi a ${project.name} (${project.code}) e gostaria de conversar sobre um projeto.`
  return MESSAGES[variant === 'project' ? 'nav' : variant]
}

export function waLink(variant: Variant, project?: { name: string; code: string }) {
  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(waMessage(variant, project))}`
}
