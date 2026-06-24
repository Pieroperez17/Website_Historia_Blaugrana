import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function normalizar(data) {
    return (data || []).map(c => ({
        id: c.id,
        documentId: String(c.id),
        nombre: c.nombre,
        descripcion: c.descripcion,
        tipo: c.tipo,
        url: c.imagen_url,
        imagenRef: {
            id: c.id,
            documentId: String(c.id),
            name: c.nombre + '.png',
            url: c.imagen_url,
            formats: {
                large:  { url: c.imagen_url },
                medium: { url: c.imagen_url },
                small:  { url: c.imagen_url }
            }
        }
    }))
}

export function useCategorias() {
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.from('categorias').select('*').order('nombre')
            .then(({ data }) => {
                setCategorias(normalizar(data))
                setLoading(false)
            })
    }, [])

    return { categorias, loading }
}
