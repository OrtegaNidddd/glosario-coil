import type { GlossaryTerm } from '../../types/term'

export function canEditTerm(term: GlossaryTerm) {
  return !term.id.startsWith('fallback-')
}