import { useState } from 'react'

import { createTerm } from '../services/termsService'
import type { GlossaryTerm, TermCategory } from '../types/term'

type NewTermFormProps = {
  onCreated: (term: GlossaryTerm) => void
}

type FormState = {
  title: string
  description: string
  category: TermCategory
  imageLabel: string
  imageFile: File | null
  imagePreview: string | null
}

const initialState: FormState = {
  title: '',
  description: '',
  category: 'Termino',
  imageLabel: '',
  imageFile: null,
  imagePreview: null,
}

export function NewTermForm({ onCreated }: NewTermFormProps) {
  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!form.title.trim() || !form.description.trim()) {
      setError('Titulo y descripcion son obligatorios.')
      return
    }

    try {
      setIsSubmitting(true)
      const newTerm = await createTerm({
        title: form.title,
        description: form.description,
        category: form.category,
        imageLabel: form.imageLabel,
        imageFile: form.imageFile || undefined,
      })
      onCreated(newTerm)
      setForm(initialState)
      setSuccess('Termino creado correctamente.')
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message)
      } else {
        setError('Ocurrio un error inesperado.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: preview,
      }))
    }
  }

  function handleRemoveImage() {
    if (form.imagePreview) {
      URL.revokeObjectURL(form.imagePreview)
    }
    setForm((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
    }))
  }

  return (
    <section className="w-full">
      <h3 className="font-['Fraunces'] text-xl font-bold text-[#83111a]">Nuevo termino</h3>
      <p className="mt-1 text-sm text-[#6d5e53]">
        Completa el formulario para guardar un termino en Supabase.
      </p>

      <form className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-sm font-semibold text-[#5a4d43]">
          Titulo
          <input
            type="text"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
            placeholder="Ej. Confitado"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-semibold text-[#5a4d43]">
          Categoria
          <select
            value={form.category}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, category: event.target.value as TermCategory }))
            }
            className="w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
          >
            <option value="Termino">Termino</option>
            <option value="Tecnica">Tecnica</option>
            <option value="Ingrediente">Ingrediente</option>
            <option value="Maridaje">Maridaje</option>
          </select>
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col gap-1 text-sm font-semibold text-[#5a4d43]">
          Descripcion
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="w-full min-h-28 rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
            placeholder="Describe el termino gastronomico..."
            required
          />
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col gap-1 text-sm font-semibold text-[#5a4d43]">
          Texto para placeholder de imagen (opcional)
          <input
            type="text"
            value={form.imageLabel}
            onChange={(event) => setForm((prev) => ({ ...prev, imageLabel: event.target.value }))}
            className="w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
            placeholder="Ej. Espacio para foto de confitado"
          />
        </label>

        <label className="col-span-1 sm:col-span-2 flex flex-col gap-1 text-sm font-semibold text-[#5a4d43]">
          Imagen (max 5MB - JPG, PNG, WebP, GIF)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
          />
        </label>

        {form.imagePreview ? (
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
            <img
              src={form.imagePreview}
              alt="Preview"
              className="w-full max-h-40 rounded-lg border border-[#dccdb6] object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="w-fit rounded-lg bg-[#8f2222] px-3 py-1 text-sm font-semibold text-white transition hover:bg-[#a82a2a]"
            >
              Eliminar imagen
            </button>
          </div>
        ) : null}

        <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#83111a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a81724] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar termino'}
          </button>

          {success ? <p className="text-sm font-semibold text-[#156e3f]">{success}</p> : null}
        </div>

        {error ? (
          <p className="col-span-1 sm:col-span-2 rounded-lg border border-[#e7bfbf] bg-[#fff1f1] px-3 py-2 text-sm text-[#8f2222]">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  )
}
