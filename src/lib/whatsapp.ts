import { contact } from '@/content/site'

type Variant = 'home' | 'project' | 'contact' | 'nav'

const MESSAGES: Record<Exclude<Variant, 'project'>, string> = {
  nav: 'Olá, gostaria de conversar sobre um projeto.',
  home: 'Olá, conheci a Nord Arch e tenho um terreno em ___. Podemos conversar?',
  contact: 'Olá! Terreno em: ___ · Programa: ___ · Projeto de referência: ___',
}

/** Single source for every WhatsApp message (DEC-017, CNT-011). */
export function waMessage(variant: Variant, project?: { name: string; code: string }) {
  if (variant === 'project' && project) return `Olá, vi a ${project.name} (${project.code}) e gostaria de conversar sobre um projeto.`
  return MESSAGES[variant === 'project' ? 'nav' : variant]
}

export function waLink(variant: Variant, project?: { name: string; code: string }) {
  return `https://wa.me/${contact.phone}?text=${encodeURIComponent(waMessage(variant, project))}`
}
