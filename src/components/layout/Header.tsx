import coilMxLogo from '../../assets/LOGO COIL MX.jpeg'
import fescLogo from '../../assets/logo-FESC.png'

type HeaderProps = {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onOpenNewTermModal: () => void
}

export function Header({ searchQuery, onSearchQueryChange, onOpenNewTermModal }: HeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-[#e2d7c6] bg-[#f8f0e1] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div
        className="flex w-full items-center rounded-full border border-[#e5d8c5] bg-[#f3ebe0] px-4 lg:max-w-170"
        role="search"
      >
        <span className="mr-2 text-sm text-[#8f7f69]" aria-hidden="true">
          ⌕
        </span>

        <input
          className="h-10 w-full border-none bg-transparent text-[0.95rem] font-medium text-[#473d35] outline-none placeholder:text-[#9a8c79]"
          type="search"
          placeholder="Buscar terminos, tecnicas o ingredientes..."
          aria-label="Buscar en el glosario"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 lg:gap-3">
        <button
          type="button"
          onClick={onOpenNewTermModal}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#83111a] px-2 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#a81724] hover:shadow-lg active:scale-95 lg:px-4 lg:py-2.5 lg:text-sm"
          aria-label="Agregar nuevo término"
        >
          <svg className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden lg:inline">Agregar Término</span>
        </button>
        <img src={coilMxLogo} alt="Logo Mexico" className="h-16 w-auto shrink-0 object-contain lg:h-20" />
        <img src={fescLogo} alt="Logo FESC" className="h-16 w-auto shrink-0 object-contain lg:h-20" />
      </div>
    </header>
  )
}