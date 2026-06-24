import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { uploadImage } from '../../lib/cloudinary'
import { useCategorias } from '../../hooks/useCategorias'
import './Admin.css'

const TALLAS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Otro']

export default function AdminProductoForm() {
    const { id } = useParams()
    const isEdit = Boolean(id)
    const navigate = useNavigate()
    const fileRef = useRef(null)

    const [form, setForm] = useState({ nombre: '', descripcion: '', stock: '1', talla: '', precio: '' })
    const [selectedCats, setSelectedCats] = useState([])
    const [existingImages, setExistingImages] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])
    const [newFiles, setNewFiles] = useState([])
    const [newPreviews, setNewPreviews] = useState([])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const { categorias } = useCategorias()

    useEffect(() => {
        if (!isEdit) return
        supabase
            .from('productos')
            .select('*, producto_imagenes(*), producto_categorias(categoria_id)')
            .eq('id', id)
            .single()
            .then(({ data }) => {
                if (!data) return
                setForm({ nombre: data.nombre, descripcion: data.descripcion || '', stock: data.stock || '1', talla: data.talla || '', precio: data.precio || '' })
                const imgs = [...(data.producto_imagenes || [])].sort((a, b) => a.orden - b.orden)
                setExistingImages(imgs)
                setSelectedCats((data.producto_categorias || []).map(pc => pc.categoria_id))
            })
    }, [id, isEdit])

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const toggleCat = (catId) => {
        setSelectedCats(prev =>
            prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
        )
    }

    const handleFiles = (e) => {
        const files = Array.from(e.target.files)
        setNewFiles(prev => [...prev, ...files])
        setNewPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
        e.target.value = ''
    }

    const removeExisting = (imgId) => {
        setImagesToDelete(prev => [...prev, imgId])
        setExistingImages(prev => prev.filter(i => i.id !== imgId))
    }

    const removeNew = (idx) => {
        URL.revokeObjectURL(newPreviews[idx])
        setNewFiles(prev => prev.filter((_, i) => i !== idx))
        setNewPreviews(prev => prev.filter((_, i) => i !== idx))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre.trim()) return setError('El nombre es obligatorio.')
        if (!form.precio) return setError('El precio es obligatorio.')

        setSaving(true)
        try {
            // 1. Subir nuevas imágenes a Cloudinary
            const uploadedUrls = []
            for (const file of newFiles) {
                const url = await uploadImage(file)
                uploadedUrls.push(url)
            }

            if (isEdit) {
                // Actualizar producto
                await supabase.from('productos').update({
                    nombre: form.nombre, descripcion: form.descripcion,
                    stock: form.stock, talla: form.talla, precio: Number(form.precio)
                }).eq('id', id)

                // Borrar imágenes marcadas
                if (imagesToDelete.length) {
                    await supabase.from('producto_imagenes').delete().in('id', imagesToDelete)
                }

                // Insertar nuevas imágenes
                const orden = existingImages.length
                if (uploadedUrls.length) {
                    await supabase.from('producto_imagenes').insert(
                        uploadedUrls.map((url, i) => ({ producto_id: id, url, nombre: `img${orden + i + 1}`, orden: orden + i }))
                    )
                }

                // Actualizar categorías
                await supabase.from('producto_categorias').delete().eq('producto_id', id)
                if (selectedCats.length) {
                    await supabase.from('producto_categorias').insert(
                        selectedCats.map(cid => ({ producto_id: id, categoria_id: cid }))
                    )
                }
            } else {
                // Crear producto
                const { data: prod, error: errProd } = await supabase
                    .from('productos')
                    .insert({ nombre: form.nombre, descripcion: form.descripcion, stock: form.stock, talla: form.talla, precio: Number(form.precio) })
                    .select('id')
                    .single()
                if (errProd) throw new Error(errProd.message)

                // Imágenes
                if (uploadedUrls.length) {
                    await supabase.from('producto_imagenes').insert(
                        uploadedUrls.map((url, i) => ({ producto_id: prod.id, url, nombre: `img${i + 1}`, orden: i }))
                    )
                }

                // Categorías
                if (selectedCats.length) {
                    await supabase.from('producto_categorias').insert(
                        selectedCats.map(cid => ({ producto_id: prod.id, categoria_id: cid }))
                    )
                }
            }

            navigate('/admin/productos')
        } catch (err) {
            setError(err.message || 'Error al guardar el producto.')
        }
        setSaving(false)
    }

    return (
        <>
            <div className="admin-page-header">
                <h1 className="admin-page-title">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
                <Link to="/admin/productos" className="btn btn-secondary">← Volver</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="admin-form-card">
                    <div className="admin-form-grid">
                        <div className="admin-form-group full">
                            <label>Nombre *</label>
                            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: CAMISETA FC BARCELONA LOCAL NIKE..." required />
                        </div>

                        <div className="admin-form-group">
                            <label>Precio (S/) *</label>
                            <input name="precio" type="number" min="0" step="0.01" value={form.precio} onChange={handleChange} placeholder="0.00" required />
                        </div>

                        <div className="admin-form-group">
                            <label>Stock</label>
                            <input name="stock" value={form.stock} onChange={handleChange} placeholder="1" />
                        </div>

                        <div className="admin-form-group">
                            <label>Talla</label>
                            <select name="talla" value={TALLAS.includes(form.talla) ? form.talla : (form.talla ? 'Otro' : '')} onChange={e => {
                                if (e.target.value !== 'Otro') setForm(p => ({ ...p, talla: e.target.value }))
                                else setForm(p => ({ ...p, talla: '' }))
                            }}>
                                <option value="">Seleccionar</option>
                                {TALLAS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            {(!TALLAS.slice(0, -1).includes(form.talla)) && (
                                <input
                                    name="talla"
                                    value={form.talla}
                                    onChange={handleChange}
                                    placeholder="Talla personalizada (ej: 16, XL Niños...)"
                                    style={{ marginTop: 8 }}
                                />
                            )}
                        </div>

                        <div className="admin-form-group full">
                            <label>Descripción</label>
                            <textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción del producto (emojis y saltos de línea permitidos)..."
                            />
                        </div>

                        {/* Categorías */}
                        <div className="admin-form-group full">
                            <label>Categorías</label>
                            <div className="admin-cats-grid">
                                {categorias.map(cat => (
                                    <label
                                        key={cat.id}
                                        className={`admin-cat-chip ${selectedCats.includes(cat.id) ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCats.includes(cat.id)}
                                            onChange={() => toggleCat(cat.id)}
                                        />
                                        {cat.nombre}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Imágenes existentes */}
                        {existingImages.length > 0 && (
                            <div className="admin-form-group full">
                                <label>Imágenes actuales ({existingImages.length})</label>
                                <div className="admin-images-grid">
                                    {existingImages.map(img => (
                                        <div key={img.id} className="admin-image-item">
                                            <img src={img.url} alt={img.nombre} />
                                            <button type="button" className="admin-image-delete" onClick={() => removeExisting(img.id)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nuevas imágenes */}
                        <div className="admin-form-group full">
                            <label>Agregar imágenes</label>
                            {newPreviews.length > 0 && (
                                <div className="admin-images-grid" style={{ marginBottom: 12 }}>
                                    {newPreviews.map((src, i) => (
                                        <div key={i} className="admin-image-item">
                                            <img src={src} alt={`nueva ${i + 1}`} />
                                            <button type="button" className="admin-image-delete" onClick={() => removeNew(i)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="admin-upload-area" onClick={() => fileRef.current?.click()}>
                                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} />
                                <p className="admin-upload-label">
                                    <span>Haz clic para seleccionar</span> o arrastra imágenes aquí<br />
                                    <small style={{ color: '#9ca3af' }}>JPG, PNG, WEBP · Múltiples imágenes</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && <div className="admin-error-msg">{error}</div>}

                    <div className="admin-form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
                        </button>
                        <Link to="/admin/productos" className="btn btn-secondary">Cancelar</Link>
                    </div>
                </div>
            </form>
        </>
    )
}
