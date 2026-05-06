import type { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4">
      <div className="relative mx-auto flex max-h-[95vh] w-full max-w-2xl flex-col rounded-2xl border border-[#e2d7c6] bg-white shadow-[0_20px_60px_rgba(30,18,7,0.4)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#8f7f69] transition hover:bg-[#f3ebe0] hover:text-[#5a4d43]"
          aria-label="Cerrar modal"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="shrink-0 border-b border-[#e2d7c6] px-6 py-4 sm:px-8">
          <h2 className="font-['Fraunces'] text-2xl font-bold text-[#83111a]">{title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-8">{children}</div>
      </div>
    </div>
  )
}