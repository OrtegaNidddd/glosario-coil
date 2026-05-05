import { GlossaryCard } from './GlossaryCard'
import type { GlossaryTerm } from '../types/term'

type MaridajesViewProps = {
  items: GlossaryTerm[]
}

export function MaridajesView({ items }: MaridajesViewProps) {
  return (
    <section>
      <header>
        <h2 className="font-['Fraunces'] text-[clamp(2.05rem,4vw,3rem)] leading-[1.02] font-bold tracking-[-0.03em] text-[#83111a]">
          Maridajes Culinarios
        </h2>
        <p className="mt-3 max-w-190 text-[1.03rem] text-[#65574d]">
          Descubre las combinaciones perfectas entre platillos tradicionales de Mexico y Colombia.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-[#d9ccb7] bg-[#fdf7ed] p-5 text-sm text-[#6d5e53]">
          No hay resultados para tu busqueda en Maridajes.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Tarjetas de maridajes">
          {items.map((item) => (
            <GlossaryCard
              key={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              imageLabel={item.imageLabel}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      )}
    </section>
  )
}
