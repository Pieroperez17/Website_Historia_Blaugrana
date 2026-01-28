import Layout from '../Layout.jsx';
import {ViewCardProduct} from "../components/ViewCardProduct.jsx";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './EstilosGenerales.css';
import products from "../data/Products.js";

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
    const { id } = useParams();
    const DataFilter = products.filter(producto => producto.categories.some(cat => busquedaFlexible(cat.nombre,id)) || busquedaFlexible(producto.nombre,id) );
    return (
        <Layout>
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
                            <h3 style={{color : 'gray', fontSize: '2rem'}}>No encontramos resultados :(</h3>
                        </div>
                    }
                </div>
            </>
        </Layout>
    );
};
