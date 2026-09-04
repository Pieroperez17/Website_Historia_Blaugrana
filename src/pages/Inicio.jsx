import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import Layout from '../Layout.jsx';
import Marquesina from '../components/Marquesina.jsx';
import TarjetaProducto from '../components/TarjetaProducto.jsx';
import { useProductos } from '../hooks/useProductos.js';
import { useCategorias } from '../hooks/useCategorias.js';
import '../estilos/blaugrana.css';

const PANELES = [
  {
    id: 'clubes',
    imagen: '/inicio/hero-1.webp',
    titulo: 'Clubes',
    texto: 'Camisetas de club, retro y actuales',
    cta: 'Ver clubes',
    link: '/clubes',
  },
  {
    id: 'paises',
    imagen: '/inicio/hero-2.webp',
    titulo: 'Selecciones',
    texto: 'Las camisetas que marcaron mundiales',
    cta: 'Ver países',
    link: '/paises',
  },
];

const BENEFICIOS = [
  { Icono: Truck, titulo: 'Envíos a todo el Perú', texto: 'Coordinamos por WhatsApp' },
  { Icono: ShieldCheck, titulo: 'Piezas verificadas', texto: 'Revisamos cada camiseta' },
  { Icono: MessageCircle, titulo: 'Atención todos los días', texto: 'Lunes a domingo, 24 h' },
  { Icono: Sparkles, titulo: 'Stock corto', texto: 'Muchas piezas son únicas' },
];

const BANNER_FONDO =
  'https://magical-horn-ed73f8415c.media.strapiapp.com/imagetest_19a734a241.jpg';

export default function Inicio() {
  const { productos, loading: cargandoP } = useProductos();
  const { categorias, loading: cargandoC } = useCategorias();

  const nuevos = productos.filter((p) =>
    p.categories.some((c) => c.nombre === 'Nuevo Ingreso'),
  );
  const destacados = (nuevos.length >= 4 ? nuevos : productos).slice(0, 8);
  const clubes = categorias.filter((c) => c.tipo === 'Club').slice(0, 4);

  return (
    <Layout>
      {/* Un solo h1 en la página; los paneles del hero son h2. */}
      <h1 className="hb-solo-lectores">
        Historia Blaugrana — camisetas de fútbol de clubes y selecciones en Perú
      </h1>

      {/* ------------------------------------------------------------ hero */}
      <section className="hb-hero">
        {PANELES.map((p) => (
          <Link key={p.id} to={p.link} className="hb-hero__panel">
            <img src={p.imagen} alt={p.titulo} />
            <div className="hb-hero__contenido">
              <h2 className="hb-hero__titulo">{p.titulo}</h2>
              <p className="hb-hero__texto">{p.texto}</p>
              <span className="hb-btn hb-btn--claro hb-btn--sm">{p.cta}</span>
            </div>
          </Link>
        ))}
      </section>

      <Marquesina texto="ENVÍOS A TODO EL PERÚ · CAMISETAS RETRO · CLUBES Y SELECCIONES · PIEZAS DE COLECCIÓN" />

      {/* ------------------------------------------------------- novedades */}
      <section className="hb-seccion hb-contenedor">
        <div className="hb-seccion__cabecera">
          <div>
            <span className="hb-etiqueta">Recién llegadas</span>
            <h2 className="hb-titulo-seccion" style={{ marginTop: 6 }}>
              Nuevos ingresos
            </h2>
          </div>
          <Link to="/nuevos-ingresos" className="hb-ver-todo">
            Ver todo →
          </Link>
        </div>

        {cargandoP ? (
          <p className="hb-vacio">Cargando camisetas…</p>
        ) : destacados.length === 0 ? (
          <p className="hb-vacio">Todavía no hay productos publicados.</p>
        ) : (
          <div className="hb-rejilla hb-rejilla--4">
            {destacados.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------ categorías */}
      <section className="hb-seccion hb-seccion--ajustada hb-contenedor">
        <div className="hb-seccion__cabecera">
          <div>
            <span className="hb-etiqueta">Por equipo</span>
            <h2 className="hb-titulo-seccion" style={{ marginTop: 6 }}>
              Clubes
            </h2>
          </div>
          <Link to="/clubes" className="hb-ver-todo">
            Ver todos →
          </Link>
        </div>

        {cargandoC ? (
          <p className="hb-vacio">Cargando clubes…</p>
        ) : (
          <div className="hb-rejilla-cat">
            {clubes.map((c) => (
              <Link
                key={c.id}
                to={`/productos/${encodeURIComponent(c.nombre)}`}
                className="hb-teja"
              >
                {c.url && <img src={c.url} alt={c.nombre} loading="lazy" />}
                <div className="hb-teja__pie">
                  <span className="hb-teja__nombre">{c.nombre}</span>
                  <span className="hb-teja__flecha">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------- banner */}
      <section className="hb-banner">
        <img className="hb-banner__fondo" src={BANNER_FONDO} alt="" />
        <div className="hb-contenedor hb-banner__contenido">
          <span className="hb-banner__etiqueta">Historia Blaugrana</span>
          <h2 className="hb-banner__titulo">Más que una camiseta</h2>
          <p className="hb-banner__texto">
            Buscamos piezas que cuenten algo: la del debut, la del título, la que llevabas de
            chico. Cada una llega revisada y lista para volver a usarse.
          </p>
          <Link to="/tienda" className="hb-btn hb-btn--claro">
            Ver todo el catálogo
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------- beneficios */}
      <section className="hb-beneficios">
        <div className="hb-contenedor hb-beneficios__rejilla">
          {BENEFICIOS.map(({ Icono, titulo, texto }) => (
            <div className="hb-beneficio" key={titulo}>
              <Icono size={24} />
              <div>
                <strong>{titulo}</strong>
                <span>{texto}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
