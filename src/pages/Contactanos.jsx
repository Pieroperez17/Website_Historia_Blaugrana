import Layout from "../Layout.jsx";
import './EstilosGenerales.css';

export default function Contactanos() {
    return (
        <Layout>
            <div className="padrrecontinain">
                <img src="https://magical-horn-ed73f8415c.media.strapiapp.com/07151258c630ebfcee9d361a8b48265b_ae1f71733d.jpg" className="imgContactus" alt="Amor por las camisetas" />
                <div className="obss2">
                    <h1 className="title-inicio-show" >Contáctanos</h1>
                        <p className="texto-generico" >
                        ¡Nos encantaría saber de ti! Si tienes alguna pregunta, comentario o simplemente quieres saludar, no dudes en ponerte en contacto con nosotros. 
                        Puedes enviarnos un correo electrónico a <a href="mailto:historia.blaugranaa@hotmail.com">historia.blaugranaa@hotmail.com</a>.
                    </p>
                    <p className="texto-generico" >
                        También puedes encontrarnos en nuestras redes sociales:
                        <ul>
                            <li><a className="btn-icon-redes" href="https://www.tiktok.com/@historia.blaugranaa?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                            <li><a className="btn-icon-redes" href="https://www.instagram.com/historia.blaugranaa/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </p>
                    <p className="texto-generico" >
                        Nuestro equipo está disponible para ayudarte de lunes a viernes, de 9:00 a 18:00 horas.
                    </p>
                    <p className="texto-generico" >
                        ¡Esperamos saber de ti pronto!
                    </p>
                </div>
            </div>
            

        </Layout>
    );
}