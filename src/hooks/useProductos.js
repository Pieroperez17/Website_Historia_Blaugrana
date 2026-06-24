import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function normalizar(data) {
    return (data || []).map(p => ({
        id: p.id,
        documentId: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        stock: p.stock,
        talla: p.talla,
        precio: p.precio,
        imagen: (p.producto_imagenes || [])
            .sort((a, b) => a.orden - b.orden)
            .map((img, i) => ({ id: img.id, name: img.nombre || `img${i + 1}`, url: img.url })),
        categories: (p.producto_categorias || [])
            .map(pc => ({ id: pc.categoria?.id, nombre: pc.categoria?.nombre }))
            .filter(c => c.nombre)
    }))
}

const SELECT = `*, producto_imagenes(*), producto_categorias(categoria:categorias(id, nombre))`

export function useProductos() {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        supabase.from('productos').select(SELECT)
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) setError(error.message)
                else setProductos(normalizar(data))
                setLoading(false)
            })
    }, [])

    return { productos, loading, error }
}

export function useProducto(id) {
    const [producto, setProducto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        supabase.from('productos').select(SELECT)
            .eq('id', id)
            .single()
            .then(({ data, error }) => {
                if (error) setError(error.message)
                else setProducto(normalizar([data])[0])
                setLoading(false)
            })
    }, [id])

    return { producto, loading, error }
}
