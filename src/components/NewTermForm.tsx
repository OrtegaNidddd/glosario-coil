import { useEffect, useState } from 'react'

import { createTerm, updateTerm } from '../services/termsService'
import type { GlossaryTerm, TermCategory } from '../types/term'

type NewTermFormProps = {
  onCreated?: (term: GlossaryTerm) => void
  onUpdated?: (term: GlossaryTerm) => void
  termToEdit?: GlossaryTerm | null
}

type FormState = {
  title: string
  description: string
  category: TermCategory
  imageLabel: string
  imageFile: File | null
  imagePreview: string | null
  imageUrl: string | null
}

function createInitialState(termToEdit?: GlossaryTerm | null): FormState {
  return {
    title: termToEdit?.title ?? '',
    description: termToEdit?.description ?? '',
    category: termToEdit?.category ?? 'Termino',
    imageLabel: termToEdit?.imageLabel ?? '',
    imageFile: null,
    imagePreview: termToEdit?.imageUrl ?? null,
    imageUrl: termToEdit?.imageUrl ?? null,
  }
}

function getFormTitle(termToEdit?: GlossaryTerm | null) {
  return termToEdit ? 'Editar termino' : 'Nuevo termino'
}

function getFormDescription(termToEdit?: GlossaryTerm | null) {
  return termToEdit
    ? 'Actualiza la información del término y agrega o reemplaza su imagen.'
    : 'Completa el formulario para guardar un termino en Supabase.'
}

function getSubmitLabel(termToEdit?: GlossaryTerm | null) {
  return termToEdit ? 'Guardar cambios' : 'Guardar termino'
}

export function NewTermForm({ onCreated, onUpdated, termToEdit }: NewTermFormProps) {
  const [form, setForm] = useState<FormState>(() => createInitialState(termToEdit))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    setForm(createInitialState(termToEdit))
    setError(null)
    setSuccess(null)
  }, [termToEdit])

  useEffect(() => {
    return () => {
      if (form.imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(form.imagePreview)
      }
    }
  }, [form.imagePreview])

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
      const savedTerm = termToEdit
        ? await updateTerm(termToEdit.id, {
            title: form.title,
            description: form.description,
            category: form.category,
            imageLabel: form.imageLabel,
            imageFile: form.imageFile || undefined,
            imageUrl: form.imageUrl,
          })
        : await createTerm({
            title: form.title,
            description: form.description,
            category: form.category,
            imageLabel: form.imageLabel,
            imageFile: form.imageFile || undefined,
          })

      if (termToEdit) {
        onUpdated?.(savedTerm)
        setSuccess('Termino actualizado correctamente.')
      } else {
        onCreated?.(savedTerm)
        setForm(createInitialState())
        setSuccess('Termino creado correctamente.')
      }
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
      if (form.imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(form.imagePreview)
      }

      const preview = URL.createObjectURL(file)
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: preview,
      }))
    }
  }

  function handleRemoveImage() {
    if (form.imagePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(form.imagePreview)
    }
    setForm((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
      imageUrl: null,
    }))
  }

  return (
    <section className="w-full">
      <h3 className="font-['Fraunces'] text-xl font-bold text-[#83111a]">{getFormTitle(termToEdit)}</h3>
      <p className="mt-1 text-sm text-[#6d5e53]">{getFormDescription(termToEdit)}</p>

      <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
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

        <label className="col-span-1 flex flex-col gap-1 text-sm font-semibold text-[#5a4d43] sm:col-span-2">
          Descripcion
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="min-h-28 w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
            placeholder="Describe el termino gastronomico..."
            required
          />
        </label>

        <label className="col-span-1 flex flex-col gap-1 text-sm font-semibold text-[#5a4d43] sm:col-span-2">
          Texto para placeholder de imagen (opcional)
          <input
            type="text"
            value={form.imageLabel}
            onChange={(event) => setForm((prev) => ({ ...prev, imageLabel: event.target.value }))}
            className="w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
            placeholder="Ej. Espacio para foto de confitado"
          />
        </label>

        <label className="col-span-1 flex flex-col gap-1 text-sm font-semibold text-[#5a4d43] sm:col-span-2">
          Imagen (max 5MB - JPG, PNG, WebP, GIF)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-[#dccdb6] bg-white px-3 py-2 text-sm font-medium outline-none ring-[#c06725] focus:ring-2"
          />
        </label>

        {form.imagePreview ? (
          <div className="col-span-1 flex flex-col gap-2 sm:col-span-2">
            <img
              src={form.imagePreview}
              alt="Preview"
              className="max-h-40 w-full rounded-lg border border-[#dccdb6] object-cover"
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

        <div className="col-span-1 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#83111a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a81724] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Guardando...' : getSubmitLabel(termToEdit)}
          </button>

          {success ? <p className="text-sm font-semibold text-[#156e3f]">{success}</p> : null}
        </div>

        {error ? (
          <p className="col-span-1 rounded-lg border border-[#e7bfbf] bg-[#fff1f1] px-3 py-2 text-sm text-[#8f2222] sm:col-span-2">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  )
}
