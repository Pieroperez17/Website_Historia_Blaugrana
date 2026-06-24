import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { uploadImage } from '../../lib/cloudinary'
import './Admin.css'

const TIPOS = ['Club', 'Pais', 'Tag']

export default function AdminCategoriaForm() {
    const { id } = useParams()
    const isEdit = Boolean(id)
    const navigate = useNavigate()
    const fileRef = useRef(null)

    const [form, setForm] = useState({ nombre: '', tipo: 'Club', descripcion: '', imagen_url: '' })
    const [newFile, setNewFile] = useState(null)
    const [preview, setPreview] = useState('')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isEdit) return
        supabase.from('categorias').select('*').eq('id', id).single()
            .then(({ data }) => {
                if (data) {
                    setForm({ nombre: data.nombre, tipo: data.tipo, descripcion: data.descripcion || '', imagen_url: data.imagen_url || '' })
                    setPreview(data.imagen_url || '')
                }
            })
    }, [id, isEdit])

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setNewFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!form.nombre.trim()) return setError('El nombre es obligatorio.')

        setSaving(true)
        try {
            let imagen_url = form.imagen_url

            if (newFile) {
                imagen_url = await uploadImage(newFile)
            }

            const payload = { nombre: form.nombre, tipo: form.tipo, descripcion: form.descripcion, imagen_url }

            if (isEdit) {
                await supabase.from('categorias').update(payload).eq('id', id)
            } else {
                await supabase.from('categorias').insert(payload)
            }

            navigate('/admin/categorias')
        } catch (err) {
            setError(err.message || 'Error al guardar.')
        }
        setSaving(false)
    }

    return (
        <>
            <div className="admin-page-header">
                <h1 className="admin-page-title">{isEdit ? 'Editar categoría' : 'Nueva categoría'}</h1>
                <Link to="/admin/categorias" className="btn btn-secondary">← Volver</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="admin-form-card" style={{ maxWidth: 560 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div className="admin-form-group">
                            <label>Nombre *</label>
                            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: LaLiga" required />
                        </div>

                        <div className="admin-form-group">
                            <label>Tipo</label>
                            <select name="tipo" value={form.tipo} onChange={handleChange}>
                                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <small style={{ color: '#6b7280', fontSize: 12 }}>
                                Club = aparece en carousel de Clubes · Pais = aparece en Países · Tag = etiqueta especial
                            </small>
                        </div>

                        <div className="admin-form-group">
                            <label>Descripción</label>
                            <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Opcional" />
                        </div>

                        <div className="admin-form-group">
                            <label>Imagen</label>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 8 }}
                                />
                            )}
                            <input
                                name="imagen_url"
                                value={form.imagen_url}
                                onChange={e => { handleChange(e); setPreview(e.target.value) }}
                                placeholder="https://... (URL de imagen)"
                            />
                            <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, margin: '8px 0' }}>— o —</div>
                            <div className="admin-upload-area" onClick={() => fileRef.current?.click()}>
                                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
                                <p className="admin-upload-label"><span>Subir imagen</span> desde tu dispositivo</p>
                            </div>
                        </div>
                    </div>

                    {error && <div className="admin-error-msg">{error}</div>}

                    <div className="admin-form-actions">
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear categoría'}
                        </button>
                        <Link to="/admin/categorias" className="btn btn-secondary">Cancelar</Link>
                    </div>
                </div>
            </form>
        </>
    )
}
