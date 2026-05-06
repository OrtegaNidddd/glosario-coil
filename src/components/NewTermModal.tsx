import { Modal } from './Modal'
import { NewTermForm } from './NewTermForm'
import type { GlossaryTerm } from '../types/term'

type NewTermModalProps = {
  isOpen: boolean
  onClose: () => void
  onTermCreated?: (term: GlossaryTerm) => void
  onTermUpdated?: (term: GlossaryTerm) => void
  termToEdit?: GlossaryTerm | null
}

export function NewTermModal({
  isOpen,
  onClose,
  onTermCreated,
  onTermUpdated,
  termToEdit,
}: NewTermModalProps) {
  function handleTermCreated(term: GlossaryTerm) {
    onTermCreated?.(term)
    onClose()
  }

  function handleTermUpdated(term: GlossaryTerm) {
    onTermUpdated?.(term)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={termToEdit ? 'Editar término' : 'Agregar nuevo término'}
    >
      <NewTermForm onCreated={handleTermCreated} onUpdated={handleTermUpdated} termToEdit={termToEdit} />
    </Modal>
  )
}
