import { useParams } from 'react-router-dom';
import Layout from '../Layout.jsx';
import React from 'react';
import { useEffect, useState } from "react";
import { ThreeDot } from 'react-loading-indicators'
import './PaginaArticulo.css';
import { ImagenContinua } from '../components/ImagenContinua.jsx';
import { FaWhatsapp } from "react-icons/fa";


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
    const [Product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
        
        useEffect(() => {
            const baseUrl = import.meta.env.VITE_API_Url ;
            const apiAuth = import.meta.env.VITE_API_Authorization ;
    
            if (!baseUrl) {
                console.error("API base URL not found in environment variables.");
                return;
            }
            if (!apiAuth) {
                console.error("API authorization token not found in environment variables.");
                return;
            }
        
        
            async function fetchCategories() {
                try {
                    const res = await fetch(`${baseUrl}/api/products/${id}?populate=*`, {
                        method: "GET",
                        headers: {
                            ...(apiAuth ? { Authorization: apiAuth } : {}),
                        },
                    });
                    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
                    const json = await res.json();
                    // If the API returns an array use it directly, otherwise try common wrappers
                    setProduct(json.data);
                    setIsLoading(false);
                } catch (err) {
                    if (err.name !== "AbortError") console.error("Error loading categories:", err);
                }
            }
        
            fetchCategories();
            return;
            }, [id]);
    return (
        <Layout>
            {isLoading ? (
                <div style={{ display: 'flex', gap:'2rem'  ,justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <ThreeDot variant="bounce" color="#4492C2" size="small" text="" textColor="" />
                </div>
            ) : (
                <MuestraProducto product={Product} />
            )}
        </Layout>
    )
};



