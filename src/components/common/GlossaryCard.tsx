import type { MouseEvent } from 'react'

type GlossaryCardProps = {
  title: string
  description: string
  category: 'Tecnica' | 'Ingrediente' | 'Maridaje' | 'Termino'
  imageLabel?: string
  imageUrl?: string
  onClick?: () => void
  onEdit?: () => void
}

export function GlossaryCard({
  title,
  description,
  category,
  imageUrl,
  onClick,
  onEdit,
}: GlossaryCardProps) {
  const chipStyle =
    category === 'Tecnica' || category === 'Termino'
      ? 'bg-[#c91d2e] text-white'
      : 'bg-[#d67a00] text-white'

  function handleEditClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onEdit?.()
  }

  if (!imageUrl) {
    return (
      <article
        onClick={onClick}
        className="relative cursor-pointer rounded-[14px] border border-[#e2d7c6] bg-[#fff9ee] p-4 shadow-[0_10px_24px_rgba(30,18,7,0.12)] transition hover:border-[#d67a00] hover:shadow-[0_10px_24px_rgba(131,17,26,0.25)]"
      >
        {onEdit ? (
          <button
            type="button"
            onClick={handleEditClick}
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#83111a] shadow-sm transition hover:bg-white"
            aria-label={`Editar ${title}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-4m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z"
              />
            </svg>
            <span className="hidden sm:inline">Editar</span>
          </button>
        ) : null}
        <div className="flex flex-col gap-2">
          <span
            className={`w-fit rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wider uppercase ${chipStyle}`}
          >
            {category}
          </span>
          <h3 className="font-['Fraunces'] text-[1.18rem] leading-[1.1] font-bold text-[#2f241d]">
            {title}
          </h3>
          <p className="text-[0.92rem] leading-normal text-[#63574c]">{description}</p>
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={onClick}
      className="relative isolate min-h-80 cursor-pointer overflow-hidden rounded-[14px] bg-[#2d2521] shadow-[0_10px_24px_rgba(30,18,7,0.22)] transition hover:shadow-[0_15px_35px_rgba(30,18,7,0.35)]"
    >
      <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />

      {onEdit ? (
        <button
          type="button"
          onClick={handleEditClick}
          className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#83111a] shadow-sm transition hover:bg-white"
          aria-label={`Editar ${title}`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-4m-1.5-9.5a2.121 2.121 0 113 3L12 16l-4 1 1-4 9.5-9.5z"
            />
          </svg>
          <span className="hidden sm:inline">Editar</span>
        </button>
      ) : null}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,9,7,0)_0%,rgba(12,9,7,0.3)_30%,rgba(12,9,7,0.8)_70%,rgba(8,6,4,0.98)_100%)]" />

      <div className="relative z-10 flex min-h-80 flex-col justify-between p-4">
        <div className="shrink-0">
          <span
            className={`w-fit rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wider uppercase ${chipStyle}`}
          >
            {category}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-['Fraunces'] text-[1.3rem] leading-[1.15] font-bold text-white drop-shadow-lg">
            {title}
          </h3>
          <p className="line-clamp-3 text-[0.95rem] leading-normal text-white drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}