import Layout from "../Layout.jsx";
import { ViewCardProduct } from "../components/ViewCardProduct.jsx";
import './EstilosGenerales.css';
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos.js";

export default function NuevosIngresos() {
    const { productos, loading } = useProductos()
    const nuevosIngresos = productos.filter(p => p.categories.some(c => c.nombre === "Nuevo Ingreso"))

    return (
        <Layout>
            <>
                <h1 className="title-inicio-show">Nuevos <br className="salto" />Ingresos</h1>
                <div className="container-club">
                    {loading
                        ? <p style={{ textAlign: 'center', color: '#aaa', padding: 40, gridColumn: '1/-1' }}>Cargando...</p>
                        : nuevosIngresos.map((producto) => (
                            <Link to={`/producto/${producto.documentId}`} className="LinkSyleView" key={producto.id}>
                                <ViewCardProduct product={producto} />
                            </Link>
                        ))
                    }
                </div>
            </>
        </Layout>
    );
}
