import Layout from '../Layout.jsx';
import { ViewCardProduct } from "../components/ViewCardProduct.jsx";
import { useParams, Link } from 'react-router-dom';
import './EstilosGenerales.css';
import { useProductos } from "../hooks/useProductos.js";

function busquedaFlexible(texto, busqueda) {
    const t = (texto || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const b = (busqueda || '').toLowerCase().replace(/\s+/g, ' ').trim();
    return t.includes(b);
}

export default function PaginaVistaProductos() {
    const { id } = useParams();
    const { productos, loading } = useProductos();

    const DataFilter = productos.filter(p =>
        p.categories.some(cat => busquedaFlexible(cat.nombre, id)) ||
        busquedaFlexible(p.nombre, id)
    );

    return (
        <Layout>
            <>
                <h1 className="title-inicio-show">{id}</h1>
                <div className="container-club">
                    {loading ? (
                        <p style={{ textAlign: 'center', color: '#aaa', padding: 40, gridColumn: '1/-1' }}>Cargando...</p>
                    ) : DataFilter.length > 0 ? (
                        DataFilter.map((producto) => (
                            <Link to={`/producto/${producto.documentId}`} className="LinkSyleView" key={producto.id}>
                                <ViewCardProduct product={producto} />
                            </Link>
                        ))
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ color: 'gray', fontSize: '2rem' }}>No encontramos resultados :(</h3>
                        </div>
                    )}
                </div>
            </>
        </Layout>
    );
}
