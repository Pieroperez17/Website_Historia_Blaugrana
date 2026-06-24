import Layout from "../Layout.jsx";
import './EstilosGenerales.css';
import { Link } from "react-router-dom";
import { useCategorias } from "../hooks/useCategorias.js";

export default function Paises() {
    const { categorias, loading } = useCategorias()
    const paises = categorias.filter(c => c.tipo === 'Pais')

    return (
        <Layout>
            <>
                <h1 className="title-inicio-show">Paises</h1>
                <div className="container-club">
                    {loading
                        ? <p style={{ textAlign: 'center', color: '#aaa', padding: 40, gridColumn: '1/-1' }}>Cargando...</p>
                        : paises.map((pais) => (
                            <Link key={pais.id} className="card-club" to={`/productos/${pais.nombre}`}>
                                <img src={pais.imagenRef?.formats?.medium?.url} alt={pais.imagenRef?.name} className="image-club" />
                                <div className="info-club">
                                    <h2>{pais.nombre}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </>
        </Layout>
    );
}
