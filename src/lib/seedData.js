import seedProducts from '../data/Products.js'
import seedCategorias from '../data/Categoria.js'

export { seedProducts, seedCategorias }

export async function importarDatosIniciales(supabase, onProgress) {
    // Obtener categorías existentes en Supabase
    const { data: catsDB } = await supabase.from('categorias').select('id, nombre')
    const catMap = {}
    ;(catsDB || []).forEach(c => { catMap[c.nombre] = c.id })

    const total = seedProducts.length
    for (let i = 0; i < total; i++) {
        const p = seedProducts[i]
        onProgress(i + 1, total, p.nombre)

        const { data: prod, error } = await supabase
            .from('productos')
            .insert({
                nombre: p.nombre,
                descripcion: p.descripcion,
                stock: p.stock,
                talla: p.talla,
                precio: p.precio
            })
            .select('id')
            .single()

        if (error || !prod) continue

        if (p.imagen?.length) {
            await supabase.from('producto_imagenes').insert(
                p.imagen.map((img, idx) => ({
                    producto_id: prod.id,
                    nombre: img.name,
                    url: img.url,
                    orden: idx
                }))
            )
        }

        for (const cat of (p.categories || [])) {
            const catId = catMap[cat.nombre]
            if (catId) {
                await supabase.from('producto_categorias').insert({
                    producto_id: prod.id,
                    categoria_id: catId
                })
            }
        }
    }
}
