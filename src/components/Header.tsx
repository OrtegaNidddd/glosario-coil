import coilMxLogo from '../assets/LOGO COIL MX.jpeg'
import fescLogo from '../assets/logo-FESC.png'

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

      <div className="flex items-center gap-3 self-end lg:self-auto">
        <button
          type="button"
          onClick={onOpenNewTermModal}
          className="rounded-full bg-[#83111a] p-3 text-sm font-semibold text-white transition hover:bg-[#a81724]"
        >
          +
        </button>
        <img
          src={coilMxLogo}
          alt="Logo Mexico"
          className="h-15 w-auto object-contain"
        />
        <img src={fescLogo} alt="Logo FESC" className="h-15 w-auto object-contain" />
      </div>
    </header>
  )
}
