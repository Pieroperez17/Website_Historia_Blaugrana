import Layout from "../Layout.jsx";
import './EstilosGenerales.css';

export default function Contactanos() {
    return (
        <Layout>
            <img src="" alt="" />
            <h1 className="title-inicio-show" >Contáctanos</h1>
            <p className="texto-generico" >
                ¡Nos encantaría saber de ti! Si tienes alguna pregunta, comentario o simplemente quieres saludar, no dudes en ponerte en contacto con nosotros. 
                Puedes enviarnos un correo electrónico a <a href="mailto:contacto@historiablaugrana.com">contacto@historiablaugrana.com</a>.
            </p>
            <p className="texto-generico" >
                También puedes encontrarnos en nuestras redes sociales:
                <ul>
                    <li><a href="https://www.facebook.com/historiablaugrana" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.twitter.com/historiablaugrana" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://www.instagram.com/historiablaugrana" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </p>
            <p className="texto-generico" >
                Nuestro equipo está disponible para ayudarte de lunes a viernes, de 9:00 a 18:00 horas.
            </p>
            <p className="texto-generico" >
                ¡Esperamos saber de ti pronto!
            </p>

        </Layout>
    );
}