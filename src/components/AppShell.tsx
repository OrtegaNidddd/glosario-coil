import type { ReactNode } from 'react'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { NewTermModal } from './NewTermModal'
import type { GlossaryTerm } from '../types/term'

export type SectionId = 'glosario' | 'tecnicas' | 'ingredientes' | 'maridajes' | 'terminos'

type AppShellProps = {
  activeSection: SectionId
  onSectionChange: (section: SectionId) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  isModalOpen: boolean
  onModalOpen: () => void
  onModalClose: () => void
  onTermCreated: (term: GlossaryTerm) => void
  children: ReactNode
}

export function AppShell({
  activeSection,
  onSectionChange,
  searchQuery,
  onSearchQueryChange,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onTermCreated,
  children,
}: AppShellProps) {
  return (
    <div className="mx-auto my-0 min-h-screen w-full overflow-hidden border border-[#e2d7c6] bg-[#f8f3e9] shadow-[0_14px_45px_rgba(108,73,28,0.12)] lg:my-5 lg:min-h-[calc(100vh-2.5rem)] lg:w-[min(1280px,96vw)] lg:rounded-[18px]">
      <div className="grid min-h-full grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />

        <div className="flex min-w-0 flex-col bg-[#fffdf9]">
          <Header
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onOpenNewTermModal={onModalOpen}
          />
          <main className="flex-1 px-4 pt-6 pb-9 sm:px-6">{children}</main>

          <footer className="flex flex-col gap-3 border-t border-[#e2d7c6] bg-[#f6efdf] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="font-['Fraunces'] text-sm font-bold text-[#83111a]">Sabor y Cultura</p>
              <p className="mt-1 text-xs text-[#8c7e6f]">
                Proyecto desarrollado en el COIL MEXICO - COLOMBIA
              </p>
            </div>
          </footer>
        </div>
      </div>

      <NewTermModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onTermCreated={onTermCreated}
      />
    </div>
  )
}
