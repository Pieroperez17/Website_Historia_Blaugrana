// Saneamiento defensivo: algunas variables de entorno en Vercel quedaron
// guardadas con un BOM (U+FEFF) inicial al setearlas por CLI, lo que rompia
// la URL de subida ("Unknown API key"). Quitamos BOM y espacios iniciales.
const limpiar = (v) => (v || '').replace(/^[﻿\s]+/, '').trim()

const CLOUD = limpiar(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
const PRESET = limpiar(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

export async function uploadImage(file) {
    if (!CLOUD || !PRESET) {
        throw new Error(
            'Falta configuracion de Cloudinary. Define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en las variables de entorno.'
        )
    }

    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', PRESET)

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
        { method: 'POST', body: fd }
    )

    if (!res.ok) {
        let detalle = ''
        try {
            const err = await res.json()
            detalle = err?.error?.message || ''
        } catch { /* respuesta sin cuerpo JSON */ }
        throw new Error(`Error al subir imagen a Cloudinary${detalle ? `: ${detalle}` : ''}`)
    }

    const data = await res.json()
    return data.secure_url
}
