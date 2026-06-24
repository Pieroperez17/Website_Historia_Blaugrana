import Layout from "../Layout.jsx";
import './EstilosGenerales.css';
import { Link } from "react-router-dom";
import { useCategorias } from "../hooks/useCategorias.js";

export default function Clubes() {
    const { categorias, loading } = useCategorias()
    const clubes = categorias.filter(c => c.tipo === 'Club')

    return (
        <Layout>
            <>
                <h1 className="title-inicio-show">Clubes</h1>
                <div className="container-club">
                    {loading
                        ? <p style={{ textAlign: 'center', color: '#aaa', padding: 40, gridColumn: '1/-1' }}>Cargando...</p>
                        : clubes.map((club) => (
                            <Link key={club.id} className="card-club" to={`/productos/${club.nombre}`}>
                                <img src={club.imagenRef?.formats?.medium?.url} alt={club.imagenRef?.name} className="image-club" />
                                <div className="info-club">
                                    <h2>{club.nombre}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </>
        </Layout>
    );
}
