# COIL Glosario

Aplicación web para explorar y gestionar un glosario culinario con categorías como técnicas, ingredientes, maridajes y términos. La interfaz está construida con React, TypeScript y Vite, y usa Supabase para persistencia de datos e imágenes.

## Funcionalidades

- Vista principal del glosario con tarjetas agrupadas por categoría.
- Búsqueda de términos.
- Modal de detalle para ver la información completa de cada entrada.
- Creación y edición de términos.
- Carga de imágenes para cada término.
- Sidebar y encabezado adaptados a escritorio y móvil.

## Requisitos

- Node.js 20 o superior.
- Una cuenta/proyecto de Supabase con la tabla `glossary_terms` y el bucket de imágenes configurados.

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env.local` con estas variables:

```bash
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Estructura general

- `src/App.tsx`: orquestación principal de la app.
- `src/components/`: componentes de interfaz como `Header`, `Sidebar`, `GlossaryView` y formularios/modales.
- `src/services/`: lógica de Supabase y subida de imágenes.
- `src/types/`: tipos compartidos de la aplicación.

## Notas de Supabase

La tabla `glossary_terms` debe incluir, al menos, estas columnas:

- `id`
- `title`
- `description`
- `category`
- `image_label`
- `image_url`
- `created_at`
- `updated_at`

También debe existir la policy de `SELECT`, `INSERT` y `UPDATE` para el rol que uses desde el cliente si quieres editar términos desde la UI.

## Desarrollo

1. Instala dependencias.
2. Configura `.env.local`.
3. Ejecuta:

```bash
npm run dev
```

## Build

Para generar la versión de producción:

```bash
npm run build
```

## Preview

Para previsualizar el build localmente:

```bash
npm run preview
```
