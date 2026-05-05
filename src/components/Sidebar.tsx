import coilMxColLogo from '../assets/COL+MX.png'
import type { SectionId } from './AppShell'

const navItems = [
  { label: 'Glosario', section: 'glosario' },
  { label: 'Tecnicas', section: 'tecnicas' },
  { label: 'Ingredientes', section: 'ingredientes' },
  { label: 'Maridajes', section: 'maridajes' },
]

type SidebarProps = {
  activeSection: SectionId
  onSectionChange: (section: SectionId) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="flex flex-col justify-between gap-4 border-b border-[#e2d7c6] bg-[#f3ecde] px-4 py-5 lg:border-r lg:border-b-0">
      <div>
        <h1 className="font-['Fraunces'] text-[1.95rem] leading-[1.03] font-bold tracking-[-0.02em] text-[#83111a]">
          Sabor y Cultura
        </h1>

        <div className="mt-5 rounded-xl border border-[#e2d7c6] bg-[#fff9ee] p-3">
          <img src={coilMxColLogo} alt="COIL MX - COL" className="block w-37.5 max-w-full rounded-full border-4 border-[#83111a]" />
          <p className="mt-2 text-[0.83rem] text-[#7f746b]">Explora el patrimonio culinario</p>
        </div>
      </div>

      <nav aria-label="Navegacion principal" className="grid gap-2 md:grid-cols-3 lg:grid-cols-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onSectionChange(item.section as SectionId)}
            className={`rounded-[10px] border px-3 py-3 text-left text-[0.95rem] leading-tight font-semibold transition md:text-center lg:text-left ${
              activeSection === item.section
                ? 'border-[#ead7d7] bg-white text-[#83111a] shadow-[inset_2px_0_0_#c91d2e]'
                : 'border-transparent text-[#6c6054] hover:bg-[#f8f1e6]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
