import Layout from "../Layout.jsx";
import './EstilosGenerales.css';
import { Link } from "react-router-dom";
import  categorias  from "../data/Categoria.js";

export default function Clubes() {
    return (
        <Layout>
            <>
                <h1 className="title-inicio-show" >Clubes</h1>
                <div className="container-club">
                    {categorias.filter( club => club.tipo == 'Club' && true).map((club) => (
                        <Link key={club.id} className="card-club" to={`/productos/${club.nombre}`}>
                            <img src={club.imagenRef?.formats?.medium?.url} alt={club.imagenRef?.name} className="image-club" />
                            <div className="info-club">
                                <h2>{club.nombre}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        </Layout>
    );
}
