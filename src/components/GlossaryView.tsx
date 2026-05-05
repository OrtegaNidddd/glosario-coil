import { GlossaryCard } from './GlossaryCard'
import type { GlossaryTerm } from '../types/term'

type GlossaryViewProps = {
  items: GlossaryTerm[]
  infoMessage?: string | null
}

export function GlossaryView({ items, infoMessage }: GlossaryViewProps) {
  return (
    <section>
      <header>
        <h2 className="font-['Fraunces'] text-[clamp(2.05rem,4vw,3rem)] leading-[1.02] font-bold tracking-[-0.03em] text-[#83111a]">
          Glosario Gastronomico
        </h2>
        <p className="mt-3 max-w-190 text-[1.03rem] text-[#65574d]">
          Sumergete en la riqueza de los sabores mexicanos y colombianos a traves de terminos
          fundamentales.
        </p>
      </header>

      {infoMessage ? (
        <p className="mt-6 rounded-xl border border-[#e9d7b8] bg-[#fff3de] p-4 text-sm text-[#7a5a2e]">
          {infoMessage}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-[#d9ccb7] bg-[#fdf7ed] p-5 text-sm text-[#6d5e53]">
          No hay resultados para tu busqueda en Glosario.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Tarjetas del glosario">
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
