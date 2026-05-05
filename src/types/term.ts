export type TermCategory = 'Tecnica' | 'Ingrediente' | 'Maridaje'

export type GlossaryTerm = {
  id: string
  title: string
  description: string
  category: TermCategory
  imageLabel?: string
  imageUrl?: string
  createdAt?: string
}

export type NewGlossaryTermInput = {
  title: string
  description: string
  category: TermCategory
  imageLabel?: string
  imageFile?: File
}
