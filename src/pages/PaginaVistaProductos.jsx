import Layout from '../Layout.jsx';
import { useState, useEffect } from 'react';
import {ViewCardProduct} from "../components/ViewCardProduct.jsx";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './EstilosGenerales.css';

function busquedaFlexible(texto, busqueda) {
    // Convertir ambos a minúsculas
    const textoNormalizado = texto.toLowerCase();
    const busquedaNormalizada = busqueda.toLowerCase();
    
    // Eliminar espacios extras y normalizar
    const textoLimpio = textoNormalizado.replace(/\s+/g, ' ').trim();
    const busquedaLimpia = busquedaNormalizada.replace(/\s+/g, ' ').trim();
    
    // Verificar si la búsqueda está contenida en el texto
    return textoLimpio.includes(busquedaLimpia);
}


export default function PaginaVistaProductos(){
    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

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
            const res = await fetch(`${baseUrl}/api/products?populate=*`, {
                method: "GET",
                headers: {
                    ...(apiAuth ? { Authorization: apiAuth } : {}),
                },
            });
            if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
            const json = await res.json();
            // If the API returns an array use it directly, otherwise try common wrappers
            setData(json.data);
            setIsLoading(false);
            //console.log(json.data[0].imagenRef.url);
        } catch (err) {
            if (err.name !== "AbortError") console.error("Error loading categories:", err);
        }
    }
    
    fetchCategories();
    return;
    }, []);


    const DataFilter = Data.filter(producto => producto.categories.some(cat => busquedaFlexible(cat.nombre,id)) || busquedaFlexible(producto.nombre,id) );
    console.log(Data);
    return (
        <Layout>
            {isLoading ?
                (
                    <div>
                        <h1>cARGANDO</h1>
                    </div>
                )
            :(
                <>
                    <h1 className="title-inicio-show" >{id}</h1>
                    <div className="container-club">
                        {DataFilter.length > 0 ?
                            DataFilter.map((producto) => (
                                <Link to={`/producto/${producto.documentId}`} className="LinkSyleView" >
                                    <ViewCardProduct key={producto.id} product={producto} />
                                </Link> 
                            ))
                            : 
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <img
                                style={{
                                    width:'30vw',
                                    filter: 'grayscale(100%)'
                                }}
                                src="../src/public/logo.png" alt="NotFound" 
                                />
                                <h3 style={{color : 'gray', fontSize: '2rem'}}>No encontramos resultados :(</h3>
                            </div>
                        }
                    </div>
                </>
            )
            }
        </Layout>
    );
};
