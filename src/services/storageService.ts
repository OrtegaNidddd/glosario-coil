import { supabase } from './supabaseClient'

const BUCKET_NAME = 'glossary-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function getSupabaseStorageClient() {
  if (!supabase) {
    throw new Error('Faltan credenciales de Supabase.')
  }

  return supabase.storage.from(BUCKET_NAME)
}

export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Tipo de archivo no permitido. Usa: ${ALLOWED_TYPES.join(', ')}`)
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`El archivo es muy grande. Máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`)
  }

  const storage = getSupabaseStorageClient()

  // Generar nombre único para el archivo
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  const fileName = `${timestamp}-${random}-${file.name}`

  const { error, data } = await storage.upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    throw new Error(`Error al subir imagen: ${error.message}`)
  }

  // Obtener URL pública de la imagen
  const { data: urlData } = storage.getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function deleteImage(imageUrl: string): Promise<void> {
  // Extraer nombre del archivo de la URL
  const fileName = imageUrl.split('/').pop()
  if (!fileName) {
    throw new Error('URL de imagen inválida')
  }

  const storage = getSupabaseStorageClient()
  const { error } = await storage.remove([fileName])

  if (error) {
    throw new Error(`Error al eliminar imagen: ${error.message}`)
  }
}
