import Layout from "../Layout.jsx";
import { CategoryCarousel } from "../components/CategoryCarousel.jsx";
import { ViewCardProduct } from "../components/ViewCardProduct.jsx";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos.js";
import { useCategorias } from "../hooks/useCategorias.js";
import './EstilosGenerales.css';

export default function Inicio() {
    const { productos, loading: loadingP } = useProductos()
    const { categorias, loading: loadingC } = useCategorias()

    const nuevosIngresos = productos.filter(p => p.categories.some(c => c.nombre === "Nuevo Ingreso"))
    const clubes = categorias.filter(c => c.tipo === 'Club')

    return (
        <Layout>
            <main style={styles.container}>
                <img style={styles.imge} className="ImageInicioView" src="https://magical-horn-ed73f8415c.media.strapiapp.com/imagetest_19a734a241.jpg" alt="Imagen Inicio 1" />
                <>
                    <h1 style={{ margin: '20px 0px 0px 0px' }} className="title-inicio-show">Clubes</h1>
                    {loadingC
                        ? <p style={{ textAlign: 'center', color: '#aaa', padding: 20 }}>Cargando...</p>
                        : <CategoryCarousel categories={clubes} />
                    }
                </>
                <>
                    <h1 className="title-inicio-show">Nuevos <br className="salto" />Ingresos</h1>
                    <div className="container-club">
                        {loadingP
                            ? <p style={{ textAlign: 'center', color: '#aaa', padding: 20, gridColumn: '1/-1' }}>Cargando...</p>
                            : nuevosIngresos.slice(0, 6).map((producto) => (
                                <Link to={`/producto/${producto.documentId}`} className="LinkSyleView" key={producto.id}>
                                    <ViewCardProduct product={producto} />
                                </Link>
                            ))
                        }
                    </div>
                </>
            </main>
        </Layout>
    );
}

const styles = {
    container: { width: "100%", margin: "0 auto", textAlign: "center", color: "#111" },
    imge: { width: "100%" },
};
