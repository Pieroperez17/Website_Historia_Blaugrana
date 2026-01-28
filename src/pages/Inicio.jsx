import Layout from "../Layout.jsx";
import { CategoryCarousel } from "../components/CategoryCarousel.jsx";
import {ViewCardProduct} from "../components/ViewCardProduct.jsx";
import { Link } from "react-router-dom";
import categorias from "../data/Categoria.js";
import products from "../data/Products.js";
import './EstilosGenerales.css';


export default function Inicio() {
    const Nuevos_Ingresos = products.filter(producto => producto.categories.some(cat => cat.nombre === "Nuevo Ingreso") )

    return (
        <Layout>
            <main style={styles.container} >
                <img style={styles.imge} className="ImageInicioView" src="https://magical-horn-ed73f8415c.media.strapiapp.com/imagetest_19a734a241.jpg" alt="Imagen Inicio 1" />
                <>
                    <h1 style={{margin:'20px 0px 0px 0px'}}  className="title-inicio-show" >Clubes</h1>
                    <CategoryCarousel categories={categorias.filter( club => club.tipo == 'Club')} />
                </>
                <>
                    <h1 className="title-inicio-show" >Nuevos <br className="salto"></br>Ingresos</h1>
                    <div className="container-club">
                        {Nuevos_Ingresos.slice(0, 6).map((producto) => (
                            <Link to={`/producto/${producto.documentId}`} className="LinkSyleView" >
                                <ViewCardProduct key={producto.id} product={producto} />
                            </Link>
                        ))}
                    </div>
                </>
            </main>
        </Layout>
        
    );
}

const styles = {
    container: {
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        color: "#111",
    },
    imge: {
        width: "100%",
    },

};