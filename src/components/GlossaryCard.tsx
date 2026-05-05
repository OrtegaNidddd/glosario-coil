type GlossaryCardProps = {
  title: string
  description: string
  category: 'Tecnica' | 'Ingrediente' | 'Maridaje'
  imageLabel?: string
  imageUrl?: string
}

export function GlossaryCard({
  title,
  description,
  category,
  imageLabel = 'Espacio para imagen',
  imageUrl,
}: GlossaryCardProps) {
  const chipStyle =
    category === 'Tecnica' ? 'bg-[#c91d2e] text-white' : 'bg-[#d67a00] text-white'

  return (
    <article className="relative isolate min-h-70 overflow-hidden rounded-[14px] bg-[#2d2521] shadow-[0_10px_24px_rgba(30,18,7,0.22)]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center bg-[linear-gradient(155deg,rgba(90,45,14,0.95),rgba(24,16,12,0.95)),repeating-linear-gradient(45deg,rgba(255,255,255,0.10)_0,rgba(255,255,255,0.10)_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]"
          role="img"
          aria-label={imageLabel}
        >
          <span className="rounded-full border border-dashed border-[rgba(255,247,234,0.5)] px-3 py-2 text-xs font-bold tracking-[0.04em] text-[rgba(255,249,238,0.86)] uppercase">
            {imageLabel}
          </span>
        </div>
      )}

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
