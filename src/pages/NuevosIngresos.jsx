import Layout from "../Layout.jsx";
import {ViewCardProduct} from "../components/ViewCardProduct.jsx";
import './EstilosGenerales.css';
import { Link } from "react-router-dom";
import products from "../data/Products.js";


export default function NuevosIngresos() {
    const Nuevos_Ingresos = products.filter(producto => producto.categories.some(cat => cat.nombre === "Nuevo Ingreso") )
    
    return (
        <Layout>
            <>
                <h1 className="title-inicio-show" >Nuevos <br className="salto"></br>Ingresos</h1>
                <div className="container-club">
                    {Nuevos_Ingresos.map((producto) => (
                        <Link to={`/producto/${producto.documentId}`} className="LinkSyleView" >
                            <ViewCardProduct key={producto.id} product={producto} />
                        </Link> 
                    ))}
                </div>
            </>
        </Layout>
    );
}
