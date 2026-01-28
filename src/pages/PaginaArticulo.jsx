import { useParams } from 'react-router-dom';
import Layout from '../Layout.jsx';
import './PaginaArticulo.css';
import { ImagenContinua } from '../components/ImagenContinua.jsx';
import { FaWhatsapp } from "react-icons/fa";
import products from "../data/Products.js";

const MuestraProducto = ({product}) => {
    var categorias = product.categories;
    var imagesLista = product.imagen;

    const handleWhatsAppClick = () => {
        const mensaje = `Quiero comprar la ${product.nombre} en talla ${product.talla}`;
        const numeroWhatsApp = "51908582191";
        const mensajeEncodificado = encodeURIComponent(mensaje);
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeEncodificado}`;
        window.open(urlWhatsApp, "_blank");
    };
    
    return (
        <article className="articulo-container">
            <div className="articulo-imagen">
                <ImagenContinua  images={imagesLista} />
            </div>
            <div className="articulo-contenido">
                <h2 className="articulo-titulo">{product.nombre}</h2>
                <p className="articulo-meta">Stock: {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</p>
                <p className="">S/ {product.precio?.toFixed(2)}</p>
                <p className="articulo-talla">Talla: <span className='Butss'>{product.talla}</span></p>
                <button className='button-buy' onClick={handleWhatsAppClick}>
                    <FaWhatsapp />
                    Comprar por Whatsapp
                </button>
                <h3 className="articulo-descripcion-titulo">Descripción</h3>
                <p className="articulo-descripcion">{product.descripcion}</p>
                <h3 className="articulo-categorias-titulo">Categorías</h3>
                <div className="articulo-categorias">
                    {categorias.map((cat) => (
                        <span key={cat.id} className="categoria-badge">{cat.nombre}</span>
                    ))}
                </div>
            </div>
        </article>
    )
};




export default function PaginaArticulo(){
    const { id } = useParams();
    const Product = products.find(producto => producto.documentId === id );
    return (
        <Layout>
            <MuestraProducto product={Product} />
        </Layout>
    )
};



