import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './Admin.css'

const TIPO_BADGE = { Club: 'badge-club', Pais: 'badge-pais', Tag: 'badge-tag' }

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState(null)

    const cargar = async () => {
        setLoading(true)
        const { data } = await supabase.from('categorias').select('*').order('nombre')
        setCategorias(data || [])
        setLoading(false)
    }

    useEffect(() => { cargar() }, [])

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar esta categoría? Los productos que la usen perderán esta categoría.')) return
        setDeleteId(id)
        await supabase.from('categorias').delete().eq('id', id)
        setCategorias(prev => prev.filter(c => c.id !== id))
        setDeleteId(null)
    }

    return (
        <>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Categorías ({categorias.length})</h1>
                <Link to="/admin/categorias/nuevo" className="btn btn-primary">+ Nueva categoría</Link>
            </div>

            <div className="admin-table-card">
                {loading ? (
                    <div className="admin-empty"><p>Cargando...</p></div>
                ) : categorias.length === 0 ? (
                    <div className="admin-empty">
                        <h3>Sin categorías</h3>
                        <p>Crea las categorías primero para luego asignarlas a los productos.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(cat => (
                                <tr key={cat.id}>
                                    <td>
                                        {cat.imagen_url
                                            ? <img src={cat.imagen_url} alt={cat.nombre} className="admin-thumb" />
                                            : <div className="admin-thumb" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🗂️</div>
                                        }
                                    </td>
                                    <td><strong>{cat.nombre}</strong></td>
                                    <td>
                                        <span className={`badge ${TIPO_BADGE[cat.tipo] || 'badge-tag'}`}>
                                            {cat.tipo}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="admin-actions">
                                            <Link to={`/admin/categorias/${cat.id}`} className="btn btn-secondary btn-sm btn-icon">✏️</Link>
                                            <button
                                                className="btn btn-danger btn-sm btn-icon"
                                                onClick={() => handleDelete(cat.id)}
                                                disabled={deleteId === cat.id}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
