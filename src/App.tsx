import { useEffect, useMemo, useState } from 'react'

import { AppShell, type SectionId } from './components/AppShell'
import { IngredientsView } from './components/IngredientsView'
import { TechniquesView } from './components/TechniquesView'
import { GlossaryView } from './components/GlossaryView'
import { MaridajesView } from './components/MaridajesView'
import { TerminosView } from './components/TerminosView'
import { getTerms } from './services/termsService'
import { hasSupabaseCredentials } from './services/supabaseClient'
import type { GlossaryTerm } from './types/term'

const fallbackGlossaryItems: GlossaryTerm[] = [
  {
    id: 'fallback-1',
    title: 'Mise en Place',
    description: 'El arte de organizar y preparar ingredientes y utensilios antes de cocinar.',
    category: 'Tecnica' as const,
  },
  {
    id: 'fallback-2',
    title: 'Epazote',
    description: 'Hierba aromatica usada en la cocina mexicana para aportar profundidad.',
    category: 'Ingrediente' as const,
  },
  {
    id: 'fallback-3',
    title: 'Azafran',
    description: 'Estigmas florales que dan color, aroma y un perfil exotico a las recetas.',
    category: 'Ingrediente' as const,
  },
  {
    id: 'fallback-4',
    title: 'Blanqueado',
    description: 'Escaldado breve para fijar color y textura antes de otros procesos.',
    category: 'Tecnica' as const,
  },
  {
    id: 'fallback-5',
    title: 'Agar-Agar',
    description: 'Gelificante natural derivado de algas para texturas firmes y limpias.',
    category: 'Ingrediente' as const,
  },
  {
    id: 'fallback-6',
    title: 'Esferificacion',
    description: 'Tecnica molecular para encapsular liquidos en esferas delicadas.',
    category: 'Tecnica' as const,
  },
]

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('glosario')
  const [searchQuery, setSearchQuery] = useState('')
  const [terms, setTerms] = useState<GlossaryTerm[]>(fallbackGlossaryItems)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function loadTerms() {
      if (!hasSupabaseCredentials) {
        setLoadError(
          'Configura tus credenciales en .env.local para persistir terminos en Supabase.',
        )
        return
      }

      try {
        const dbTerms = await getTerms()
        if (dbTerms.length > 0) {
          setTerms(dbTerms)
        }
        setLoadError(null)
      } catch (error) {
        if (error instanceof Error) {
          setLoadError(error.message)
        } else {
          setLoadError('No fue posible cargar los terminos desde Supabase.')
        }
      }
    }

    loadTerms()
  }, [])

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredItems = useMemo(() => {
    const categoryFiltered = terms.filter((item) => {
      if (activeSection === 'tecnicas') return item.category === 'Tecnica'
      if (activeSection === 'ingredientes') return item.category === 'Ingrediente'
      if (activeSection === 'maridajes') return item.category === 'Maridaje'
      if (activeSection === 'terminos') return item.category === 'Termino'
      return true
    })

    if (!normalizedQuery) return categoryFiltered

    return categoryFiltered.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.category}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [activeSection, normalizedQuery, terms])

  function handleTermCreated(newTerm: GlossaryTerm) {
    setTerms((previous) => [newTerm, ...previous])
    if (newTerm.category === 'Termino') {
      setActiveSection('terminos')
    } else if (newTerm.category === 'Tecnica') {
      setActiveSection('tecnicas')
    } else if (newTerm.category === 'Ingrediente') {
      setActiveSection('ingredientes')
    } else if (newTerm.category === 'Maridaje') {
      setActiveSection('maridajes')
    } else {
      setActiveSection('glosario')
    }
    setSearchQuery('')
    setLoadError(null)
  }

  return (
    <AppShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      isModalOpen={isModalOpen}
      onModalOpen={() => setIsModalOpen(true)}
      onModalClose={() => setIsModalOpen(false)}
      onTermCreated={handleTermCreated}
    >
      {activeSection === 'glosario' ? (
        <GlossaryView items={filteredItems} infoMessage={loadError} />
      ) : null}
      {activeSection === 'tecnicas' ? <TechniquesView items={filteredItems} /> : null}
      {activeSection === 'ingredientes' ? <IngredientsView items={filteredItems} /> : null}
      {activeSection === 'maridajes' ? <MaridajesView items={filteredItems} /> : null}
      {activeSection === 'terminos' ? <TerminosView items={filteredItems} /> : null}
    </AppShell>
  )
}

export default App
