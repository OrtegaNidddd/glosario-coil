import { useState } from 'react'

import { GlossaryCard } from '../components/common/GlossaryCard'
import { Modal } from '../components/common/Modal'
import { NewTermModal } from '../features/terms/NewTermModal'
import { canEditTerm } from '../features/terms/termViewHelpers'
import type { GlossaryTerm } from '../types/term'

type TechniquesViewProps = {
  items: GlossaryTerm[]
  onTermUpdated: (term: GlossaryTerm) => void
}

type SelectedTerm = GlossaryTerm | null

export function TechniquesView({ items, onTermUpdated }: TechniquesViewProps) {
  const [selectedTerm, setSelectedTerm] = useState<SelectedTerm>(null)
  const [editingTerm, setEditingTerm] = useState<SelectedTerm>(null)

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
          Tecnicas Culinarias
        </h2>
        <p className="mt-3 max-w-190 text-[1.03rem] text-[#65574d]">
          Interfaz dedicada a metodos y procesos de cocina para mejorar preparacion, textura y
          presentacion.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-[#d9ccb7] bg-[#fdf7ed] p-5 text-sm text-[#6d5e53]">
          No hay tecnicas que coincidan con tu busqueda.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Tarjetas de tecnicas">
          {items.map((item) => (
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
      )}

      <Modal isOpen={!!selectedTerm} onClose={() => setSelectedTerm(null)} title={selectedTerm?.title || ''}>
        {selectedTerm && (
          <div className="space-y-4">
            {selectedTerm.imageUrl && (
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedTerm.imageUrl}
                  alt={selectedTerm.title}
                  className="max-h-80 h-auto w-full object-cover"
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