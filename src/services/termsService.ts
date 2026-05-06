import type { GlossaryTerm, NewGlossaryTermInput } from '../types/term'
import { supabase } from './supabaseClient'
import { uploadImage } from './storageService'
import type { SupabaseClient } from '@supabase/supabase-js'

type DbTerm = {
  id: string
  title: string
  description: string
  category: 'tecnica' | 'ingrediente' | 'maridaje' | 'termino'
  image_label: string | null
  image_url: string | null
  created_at: string
}

function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Faltan credenciales de Supabase. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local.',
    )
  }

  return supabase
}

function mapDbTerm(term: DbTerm): GlossaryTerm {
  return {
    id: term.id,
    title: term.title,
    description: term.description,
    category:
      term.category === 'tecnica'
        ? 'Tecnica'
        : term.category === 'ingrediente'
          ? 'Ingrediente'
          : term.category === 'maridaje'
            ? 'Maridaje'
            : 'Termino',
    imageLabel: term.image_label ?? undefined,
    imageUrl: term.image_url ?? undefined,
    createdAt: term.created_at,
  }
}

function mapCategoryForDb(
  category: GlossaryTerm['category'],
): 'tecnica' | 'ingrediente' | 'maridaje' | 'termino' {
  if (category === 'Tecnica') return 'tecnica'
  if (category === 'Ingrediente') return 'ingrediente'
  if (category === 'Maridaje') return 'maridaje'
  return 'termino'
}

export async function getTerms(): Promise<GlossaryTerm[]> {
  const client = getSupabaseClient()

  const { data, error } = await client
    .from('glossary_terms')
    .select('id, title, description, category, image_label, image_url, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`No se pudieron obtener los terminos: ${error.message}`)
  }

  return (data as DbTerm[]).map(mapDbTerm)
}

export async function createTerm(input: NewGlossaryTermInput): Promise<GlossaryTerm> {
  const client = getSupabaseClient()

  // Subir imagen si está presente
  let imageUrl: string | null = null
  if (input.imageFile) {
    imageUrl = await uploadImage(input.imageFile)
  }

  const { data, error } = await client
    .from('glossary_terms')
    .insert({
      title: input.title.trim(),
      description: input.description.trim(),
      category: mapCategoryForDb(input.category),
      image_label: input.imageLabel?.trim() || null,
      image_url: imageUrl,
    })
    .select('id, title, description, category, image_label, image_url, created_at')
    .single()

  if (error) {
    const msg = error.message ?? String(error)
    if (msg.includes('check constraint') || msg.includes('glossary_terms_category_check')) {
      throw new Error(
        'No se pudo crear el término porque la categoría "Termino" no está permitida por la restricción de la tabla.\n\n' +
          'Solución rápida (ejecutar en el SQL editor de Supabase):\n' +
          "ALTER TABLE glossary_terms DROP CONSTRAINT IF EXISTS glossary_terms_category_check;\n" +
          "ALTER TABLE glossary_terms ADD CONSTRAINT glossary_terms_category_check CHECK (category IN ('tecnica','ingrediente','maridaje','termino'));\n\n" +
          'O bien, crea el término con otra categoría hasta actualizar la restricción.'
      )
    }

    throw new Error(`No se pudo crear el termino: ${msg}`)
  }

  return mapDbTerm(data as DbTerm)
}

export async function updateTerm(id: string, input: NewGlossaryTermInput): Promise<GlossaryTerm> {
  const client = getSupabaseClient()

  let imageUrl = input.imageUrl ?? null
  if (input.imageFile) {
    imageUrl = await uploadImage(input.imageFile)
  }

  const updatePayload: {
    title: string
    description: string
    category: 'tecnica' | 'ingrediente' | 'maridaje' | 'termino'
    image_label: string | null
  } = {
    title: input.title.trim(),
    description: input.description.trim(),
    category: mapCategoryForDb(input.category),
    image_label: input.imageLabel?.trim() || null,
  }

  const { data: updateResult, error: updateError } = await client
    .from('glossary_terms')
    .update(updatePayload)
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (updateError) {
    throw new Error(`No se pudo actualizar el termino: ${updateError.message}`)
  }

  if (!updateResult) {
    throw new Error('La actualización no afectó ninguna fila (id no encontrado o policy bloquea el UPDATE).')
  }

  if (imageUrl !== undefined) {
    const { data: imageUpdateResult, error: imageUpdateError } = await client
      .from('glossary_terms')
      .update({ image_url: imageUrl })
      .eq('id', id)
      .select('id')
      .maybeSingle()

    if (imageUpdateError) {
      throw new Error(`No se pudo actualizar la imagen del termino: ${imageUpdateError.message}`)
    }

    if (!imageUpdateResult) {
      throw new Error('La actualización de la imagen no afectó filas (id no encontrado o policy bloquea el UPDATE).')
    }
  }

  const { data, error: fetchError } = await client
    .from('glossary_terms')
    .select('id, title, description, category, image_label, image_url, created_at')
    .eq('id', id)
    .maybeSingle()

  if (fetchError) {
    throw new Error(`No se pudo actualizar el termino: ${fetchError.message}`)
  }

  if (!data) {
    throw new Error('No se encontró el término para actualizar.')
  }

  return mapDbTerm(data as DbTerm)
}
