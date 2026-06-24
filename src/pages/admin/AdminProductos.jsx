import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { importarDatosIniciales } from '../../lib/seedData'
import './Admin.css'

export default function AdminProductos() {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [importing, setImporting] = useState(false)
    const [importProgress, setImportProgress] = useState({ current: 0, total: 0, nombre: '' })
    const [deleteId, setDeleteId] = useState(null)

    const cargar = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('productos')
            .select('id, nombre, precio, talla, stock, created_at, producto_imagenes(url, orden)')
            .order('created_at', { ascending: false })
        setProductos(data || [])
        setLoading(false)
    }

    useEffect(() => { cargar() }, [])

    const handleImportar = async () => {
        if (!confirm('¿Importar los 36 productos estáticos a la base de datos? Esto puede tardar ~30 segundos.')) return
        setImporting(true)
        try {
            await importarDatosIniciales(supabase, (current, total, nombre) => {
                setImportProgress({ current, total, nombre })
            })
            await cargar()
        } catch (e) {
            alert('Error al importar: ' + e.message)
        }
        setImporting(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return
        setDeleteId(id)
        await supabase.from('productos').delete().eq('id', id)
        setProductos(prev => prev.filter(p => p.id !== id))
        setDeleteId(null)
    }

    const getPrimera = (p) => {
        const imgs = [...(p.producto_imagenes || [])].sort((a, b) => a.orden - b.orden)
        return imgs[0]?.url || null
    }

    return (
        <>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Productos ({productos.length})</h1>
                <Link to="/admin/productos/nuevo" className="btn btn-primary">+ Nuevo producto</Link>
            </div>

            {productos.length === 0 && !loading && (
                <div className="admin-banner">
                    <div>
                        <strong>Base de datos vacía.</strong> Puedes importar los 36 productos existentes con un clic.
                        {importing && (
                            <div style={{ marginTop: 8 }}>
                                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                                    Importando {importProgress.current}/{importProgress.total}: {importProgress.nombre}
                                </div>
                                <div className="admin-progress">
                                    <div
                                        className="admin-progress-bar"
                                        style={{ width: importProgress.total ? `${(importProgress.current / importProgress.total) * 100}%` : '0%' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="admin-banner-actions">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleImportar}
                            disabled={importing}
                        >
                            {importing ? 'Importando...' : 'Importar datos iniciales'}
                        </button>
                    </div>
                </div>
            )}

            <div className="admin-table-card">
                {loading ? (
                    <div className="admin-empty"><p>Cargando...</p></div>
                ) : productos.length === 0 ? (
                    <div className="admin-empty">
                        <h3>Sin productos</h3>
                        <p>Crea tu primer producto o importa los datos existentes.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Talla</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        {getPrimera(p)
                                            ? <img src={getPrimera(p)} alt={p.nombre} className="admin-thumb" />
                                            : <div className="admin-thumb" style={{ background: '#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🧥</div>
                                        }
                                    </td>
                                    <td style={{ maxWidth: 280 }}>
                                        <div style={{ fontWeight: 600, lineHeight: 1.3, fontSize: 13 }}>{p.nombre}</div>
                                    </td>
                                    <td>{p.talla || '—'}</td>
                                    <td>S/ {Number(p.precio).toFixed(2)}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <div className="admin-actions">
                                            <Link to={`/admin/productos/${p.id}`} className="btn btn-secondary btn-sm btn-icon">✏️</Link>
                                            <button
                                                className="btn btn-danger btn-sm btn-icon"
                                                onClick={() => handleDelete(p.id)}
                                                disabled={deleteId === p.id}
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
