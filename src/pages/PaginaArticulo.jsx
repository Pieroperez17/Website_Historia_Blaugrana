import { useParams } from 'react-router-dom';
import Layout from '../Layout.jsx';
import './PaginaArticulo.css';
import { ImagenContinua } from '../components/ImagenContinua.jsx';
import { FaWhatsapp } from "react-icons/fa";
import { useProducto } from '../hooks/useProductos.js';

const MuestraProducto = ({ product }) => {
    const handleWhatsAppClick = () => {
        const mensaje = `Quiero comprar la ${product.nombre} en talla ${product.talla}`;
        const url = `https://wa.me/51908582191?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    };

    return (
        <article className="articulo-container">
            <div className="articulo-imagen">
                <ImagenContinua images={product.imagen} />
            </div>
            <div className="articulo-contenido">
                <h2 className="articulo-titulo">{product.nombre}</h2>
                <p className="articulo-meta">Stock: {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</p>
                <p>S/ {product.precio?.toFixed(2)}</p>
                <p className="articulo-talla">Talla: <span className='Butss'>{product.talla}</span></p>
                <button className='button-buy' onClick={handleWhatsAppClick}>
                    <FaWhatsapp />
                    Comprar por Whatsapp
                </button>
                <h3 className="articulo-descripcion-titulo">Descripción</h3>
                <p className="articulo-descripcion">{product.descripcion}</p>
                <h3 className="articulo-categorias-titulo">Categorías</h3>
                <div className="articulo-categorias">
                    {product.categories.map((cat) => (
                        <span key={cat.id} className="categoria-badge">{cat.nombre}</span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default function PaginaArticulo() {
    const { id } = useParams();
    const { producto, loading, error } = useProducto(id);

    if (loading) return (
        <Layout>
            <p style={{ textAlign: 'center', padding: 60, color: '#aaa' }}>Cargando producto...</p>
        </Layout>
    );

    if (error || !producto) return (
        <Layout>
            <p style={{ textAlign: 'center', padding: 60, color: '#888' }}>Producto no encontrado.</p>
        </Layout>
    );

    return (
        <Layout>
            <MuestraProducto product={producto} />
        </Layout>
    );
}
