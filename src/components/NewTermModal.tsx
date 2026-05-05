import { Modal } from './Modal'
import { NewTermForm } from './NewTermForm'
import type { GlossaryTerm } from '../types/term'

type NewTermModalProps = {
  isOpen: boolean
  onClose: () => void
  onTermCreated: (term: GlossaryTerm) => void
}

export function NewTermModal({ isOpen, onClose, onTermCreated }: NewTermModalProps) {
  function handleTermCreated(term: GlossaryTerm) {
    onTermCreated(term)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar nuevo término">
      <NewTermForm onCreated={handleTermCreated} />
    </Modal>
  )
}
