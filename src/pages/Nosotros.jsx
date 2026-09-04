import { Link } from 'react-router-dom';
import Layout from '../Layout.jsx';
import Marquesina from '../components/Marquesina.jsx';
import '../estilos/blaugrana.css';

const PARRAFOS = [
  'Historia Blaugrana nació de una obsesión sencilla: las camisetas de fútbol cuentan cosas. La del debut, la del título que nadie esperaba, la que llevabas puesta viendo el partido con tu viejo. Empezamos buscando las nuestras y terminamos consiguiéndoselas a otros.',
  'Trabajamos con camisetas de club y de selección, retro y actuales. No compramos por lotes ni reponemos en automático: cada pieza entra porque tiene algo — una temporada, un escudo, un patrocinador que ya no existe. Por eso el stock es corto y muchas veces hay una sola talla.',
  'Antes de publicar cualquier camiseta la revisamos: estado de la tela, escudos, estampados y costuras. Si algo tiene un detalle, lo decimos en la ficha. Preferimos vender menos y que sepas exactamente qué estás comprando.',
];

const VALORES = [
  {
    titulo: 'Piezas con historia',
    texto:
      'Retro y actuales, de clubes y selecciones. Buscamos camisetas que signifiquen algo, no solo que estén disponibles.',
  },
  {
    titulo: 'Revisadas una por una',
    texto:
      'Comprobamos tela, escudos y estampados antes de publicar. Cualquier detalle va escrito en la ficha del producto.',
  },
  {
    titulo: 'Trato directo',
    texto:
      'Nos escribes por Instagram, TikTok o correo y te respondemos nosotros. Sin formularios ni intermediarios.',
  },
];

const CIFRAS = [
  { valor: '100%', texto: 'Piezas revisadas' },
  { valor: '24/7', texto: 'Atención todos los días' },
  { valor: 'Perú', texto: 'Envíos a todo el país' },
];

const FAQ = [
  {
    pregunta: '¿Cómo sé qué talla comprar?',
    respuesta:
      'Cada camiseta indica su talla en la ficha. Como son piezas únicas no hay stock por tallas: lo que ves publicado es lo que hay. Si tienes dudas del calce, escríbenos y te pasamos las medidas exactas de esa camiseta.',
  },
  {
    pregunta: '¿Hacen envíos a provincia?',
    respuesta:
      'Sí, enviamos a todo el Perú. Coordinamos el envío y el pago contigo por WhatsApp o por redes una vez que eliges tu camiseta.',
  },
  {
    pregunta: '¿Puedo encargar una camiseta que no está publicada?',
    respuesta:
      'Puedes. Escríbenos con el equipo, la temporada y la talla que buscas y te avisamos cuando aparezca algo que encaje.',
  },
  {
    pregunta: '¿Las camisetas son nuevas o usadas?',
    respuesta:
      'Hay de las dos. En cada ficha indicamos el estado de la pieza; las retro suelen ser de segunda mano y las actuales llegan nuevas.',
  },
];

export default function Nosotros() {
  return (
    <Layout>
      <section className="hb-portada hb-contenedor">
        <span className="hb-etiqueta">Nosotros</span>
        <h1>Historia Blaugrana</h1>
        <p>
          Camisetas de fútbol con historia, elegidas y revisadas una por una desde Perú.
        </p>
      </section>

      <section className="hb-seccion hb-contenedor">
        <div className="hb-dos-col">
          <div className="hb-prosa">
            {PARRAFOS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link
              to="/tienda"
              className="hb-btn hb-btn--linea"
              style={{ justifySelf: 'start', marginTop: 8 }}
            >
              Ver el catálogo
            </Link>
          </div>
          <img src="/inicio/hero-2.webp" alt="Camisetas de Historia Blaugrana" loading="lazy" />
        </div>
      </section>

      <section className="hb-contenedor">
        <div className="hb-stats">
          {CIFRAS.map((c) => (
            <div className="hb-stat" key={c.texto}>
              <strong>{c.valor}</strong>
              <span>{c.texto}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="hb-seccion hb-contenedor">
        <div className="hb-seccion__cabecera">
          <div>
            <span className="hb-etiqueta">Cómo trabajamos</span>
            <h2 className="hb-titulo-seccion" style={{ marginTop: 6 }}>
              Nuestra forma
            </h2>
          </div>
        </div>
        <div className="hb-valores">
          {VALORES.map((v) => (
            <div className="hb-valor" key={v.titulo}>
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquesina texto="CLUBES · SELECCIONES · RETRO · PIEZAS ÚNICAS · HECHO DESDE PERÚ" />

      <section className="hb-seccion hb-contenedor">
        <div className="hb-seccion__cabecera">
          <div>
            <span className="hb-etiqueta">Dudas frecuentes</span>
            <h2 className="hb-titulo-seccion" style={{ marginTop: 6 }}>
              Antes de comprar
            </h2>
          </div>
          <Link to="/contactanos" className="hb-ver-todo">
            Escríbenos →
          </Link>
        </div>
        <div className="hb-valores">
          {FAQ.map((f) => (
            <div className="hb-valor" key={f.pregunta}>
              <h3>{f.pregunta}</h3>
              <p>{f.respuesta}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
