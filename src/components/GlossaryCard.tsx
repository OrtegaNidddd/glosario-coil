type GlossaryCardProps = {
  title: string
  description: string
  category: 'Tecnica' | 'Ingrediente' | 'Maridaje' | 'Termino'
  imageLabel?: string
  imageUrl?: string
}

export function GlossaryCard({
  title,
  description,
  category,
  imageUrl,
}: GlossaryCardProps) {
  const chipStyle =
    category === 'Tecnica' || category === 'Termino'
      ? 'bg-[#c91d2e] text-white'
      : 'bg-[#d67a00] text-white'

  if (!imageUrl) {
    return (
      <article className="rounded-[14px] border border-[#e2d7c6] bg-[#fff9ee] p-4 shadow-[0_10px_24px_rgba(30,18,7,0.12)]">
        <div className="flex flex-col gap-2">
          <span
            className={`w-fit rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wider uppercase ${chipStyle}`}
          >
            {category}
          </span>
          <h3 className="font-['Fraunces'] text-[1.18rem] leading-[1.1] font-bold text-[#2f241d]">
            {title}
          </h3>
          <p className="text-[0.92rem] leading-[1.5] text-[#63574c]">{description}</p>
        </div>
      </article>
    )
  }

  return (
    <article className="relative isolate min-h-70 overflow-hidden rounded-[14px] bg-[#2d2521] shadow-[0_10px_24px_rgba(30,18,7,0.22)]">
      <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />

      <div className="relative z-10 flex min-h-70 flex-col justify-end gap-2 bg-[linear-gradient(180deg,rgba(12,9,7,0.08)_40%,rgba(8,6,4,0.95)_100%)] p-3">
        <span
          className={`w-fit rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wider uppercase ${chipStyle}`}
        >
          {category}
        </span>
        <h3 className="font-['Fraunces'] text-[1.18rem] leading-[1.1] font-bold text-white">{title}</h3>
        <p className="text-[0.92rem] leading-[1.4] text-[rgba(255,255,255,0.84)]">{description}</p>
      </div>
    </article>
  )
}
