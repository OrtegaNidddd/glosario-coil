type GlossaryCardProps = {
  title: string
  description: string
  category: 'Tecnica' | 'Ingrediente' | 'Maridaje' | 'Termino'
  imageLabel?: string
  imageUrl?: string
  onClick?: () => void
}

export function GlossaryCard({
  title,
  description,
  category,
  imageUrl,
  onClick,
}: GlossaryCardProps) {
  const chipStyle =
    category === 'Tecnica' || category === 'Termino'
      ? 'bg-[#c91d2e] text-white'
      : 'bg-[#d67a00] text-white'

  if (!imageUrl) {
    return (
      <article
        onClick={onClick}
        className="cursor-pointer rounded-[14px] border border-[#e2d7c6] bg-[#fff9ee] p-4 shadow-[0_10px_24px_rgba(30,18,7,0.12)] transition hover:shadow-[0_10px_24px_rgba(131,17,26,0.25)] hover:border-[#d67a00]"
      >
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
      className="relative isolate min-h-80 overflow-hidden rounded-[14px] bg-[#2d2521] shadow-[0_10px_24px_rgba(30,18,7,0.22)] cursor-pointer transition hover:shadow-[0_15px_35px_rgba(30,18,7,0.35)]"
    >
      <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />

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
