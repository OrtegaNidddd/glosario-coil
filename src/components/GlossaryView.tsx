import { useState } from 'react'
import { GlossaryCard } from './GlossaryCard'
import { Modal } from './Modal'
import { NewTermModal } from './NewTermModal'
import type { GlossaryTerm, TermCategory } from '../types/term'

type GlossaryViewProps = {
  items: GlossaryTerm[]
  infoMessage?: string | null
  onTermUpdated: (term: GlossaryTerm) => void
}

type SelectedTerm = GlossaryTerm | null

// Orden de categorías y sus etiquetas personalizadas
const CATEGORY_CONFIG: Record<TermCategory, { label: string; order: number; icon: string }> = {
  Ingrediente: { label: '🥘 Ingredientes', order: 1, icon: '🥘' },
  Tecnica: { label: '🔪 Técnicas', order: 2, icon: '🔪' },
  Maridaje: { label: '🍷 Maridajes', order: 3, icon: '🍷' },
  Termino: { label: '📖 Términos', order: 4, icon: '📖' },
}

function groupAndSortTerms(items: GlossaryTerm[]): Record<TermCategory, GlossaryTerm[]> {
  const grouped: Record<TermCategory, GlossaryTerm[]> = {
    Ingrediente: [],
    Tecnica: [],
    Maridaje: [],
    Termino: [],
  }

  items.forEach((item) => {
    grouped[item.category].push(item)
  })

  // Ordenar cada grupo alfabéticamente por título
  Object.keys(grouped).forEach((key) => {
    grouped[key as TermCategory].sort((a, b) => a.title.localeCompare(b.title, 'es'))
  })

  return grouped
}

function canEditTerm(term: GlossaryTerm) {
  return !term.id.startsWith('fallback-')
}

export function GlossaryView({ items, infoMessage, onTermUpdated }: GlossaryViewProps) {
  const [selectedTerm, setSelectedTerm] = useState<SelectedTerm>(null)
  const [editingTerm, setEditingTerm] = useState<SelectedTerm>(null)
  const grouped = groupAndSortTerms(items)
  const categories = (Object.keys(CATEGORY_CONFIG) as TermCategory[]).sort(
    (a, b) => CATEGORY_CONFIG[a].order - CATEGORY_CONFIG[b].order,
  )

  function handleOpenEditor(term: GlossaryTerm) {
    setEditingTerm(term)
  }

  function handleTermUpdated(updatedTerm: GlossaryTerm) {
    setEditingTerm(null)
    setSelectedTerm((current) => (current?.id === updatedTerm.id ? updatedTerm : current))
    onTermUpdated(updatedTerm)
  }

  return (
    <section>
      <header>
        <h2 className="font-['Fraunces'] text-[clamp(2.05rem,4vw,3rem)] leading-[1.02] font-bold tracking-[-0.03em] text-[#83111a]">
          Glosario Gastronomico
        </h2>
        <p className="mt-3 max-w-190 text-[1.03rem] text-[#65574d]">
          Sumergete en la riqueza de los sabores mexicanos y colombianos a traves de terminos
          fundamentales.
        </p>
      </header>

      {infoMessage ? (
        <p className="mt-6 rounded-xl border border-[#e9d7b8] bg-[#fff3de] p-4 text-sm text-[#7a5a2e]">
          {infoMessage}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-[#d9ccb7] bg-[#fdf7ed] p-5 text-sm text-[#6d5e53]">
          No hay resultados para tu busqueda en Glosario.
        </p>
      ) : (
        <div className="mt-6 space-y-10">
          {categories.map((category) => {
            const categoryItems = grouped[category]
            if (categoryItems.length === 0) return null

            const config = CATEGORY_CONFIG[category]
            return (
              <div key={category}>
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#e9d7b8] pb-3">
                  <h3 className="text-2xl font-bold text-[#83111a]">{config.label}</h3>
                  <span className="inline-flex items-center justify-center rounded-full bg-[#83111a] px-3 py-1 text-sm font-semibold text-white">
                    {categoryItems.length}
                  </span>
                </div>
                <div
                  className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                  aria-label={`Tarjetas de ${config.label}`}
                >
                  {categoryItems.map((item) => (
                    <GlossaryCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      category={item.category}
                      imageLabel={item.imageLabel}
                      imageUrl={item.imageUrl}
                      onClick={() => setSelectedTerm(item)}
                      onEdit={canEditTerm(item) ? () => handleOpenEditor(item) : undefined}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal
        isOpen={!!selectedTerm}
        onClose={() => setSelectedTerm(null)}
        title={selectedTerm?.title || ''}
      >
        {selectedTerm && (
          <div className="space-y-4">
            {selectedTerm.imageUrl && (
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedTerm.imageUrl}
                  alt={selectedTerm.title}
                  className="w-full h-auto object-cover max-h-80"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-bold tracking-wider uppercase ${
                  selectedTerm.category === 'Tecnica' || selectedTerm.category === 'Termino'
                    ? 'bg-[#c91d2e] text-white'
                    : 'bg-[#d67a00] text-white'
                }`}
              >
                {selectedTerm.category}
              </span>
              {canEditTerm(selectedTerm) ? (
                <button
                  type="button"
                  onClick={() => setEditingTerm(selectedTerm)}
                  className="inline-flex items-center gap-1 rounded-full border border-[#e2d7c6] bg-[#fff9ee] px-3 py-1 text-sm font-semibold text-[#83111a] transition hover:bg-[#f7ead7]"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-4m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                  Editar
                </button>
              ) : null}
            </div>

            <p className="whitespace-pre-wrap text-[1rem] leading-[1.6] text-[#63574c]">
              {selectedTerm.description}
            </p>
          </div>
        )}
      </Modal>

      <NewTermModal
        isOpen={!!editingTerm}
        onClose={() => setEditingTerm(null)}
        termToEdit={editingTerm}
        onTermUpdated={handleTermUpdated}
      />
    </section>
  )
}
