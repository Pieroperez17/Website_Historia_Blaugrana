import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, ChevronDown, ArrowRight } from 'lucide-react';
import { FaInstagram, FaTiktok } from 'react-icons/fa6';
import Logo from './public/logo.png';
import { useCategorias } from './hooks/useCategorias.js';
import { useProductos } from './hooks/useProductos.js';
import TarjetaProducto from './components/TarjetaProducto.jsx';
import './index.css';
import './estilos/blaugrana.css';

const ANUNCIOS = [
  'ENVÍOS A TODO EL PERÚ',
  'CAMISETAS RETRO Y ACTUALES',
  'ORIGINALES Y DE COLECCIÓN',
];

/* ------------------------------------------------------------- buscador */

function Buscador({ cerrar }) {
  const { productos } = useProductos();
  const [q, setQ] = useState('');

  useEffect(() => {
    const alTeclear = (e) => e.key === 'Escape' && cerrar();
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [cerrar]);

  const resultados = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return productos.filter((p) =>
      [p.nombre, p.descripcion, ...(p.categories || []).map((c) => c.nombre)]
        .join(' ')
        .toLowerCase()
        .includes(t),
    );
  }, [q, productos]);

  return (
    <div className="hb-menu-movil" style={{ zIndex: 96 }}>
      <div className="hb-contenedor">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingBottom: 20,
            borderBottom: '1px solid var(--linea-tenue)',
          }}
        >
          <Search size={24} color="var(--tinta)" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca una camiseta, un club, un país…"
            aria-label="Buscar productos"
            style={{
              flex: 1,
              padding: '12px 0',
              background: 'transparent',
              border: 0,
              outline: 'none',
              fontSize: 'clamp(18px, 3vw, 30px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              fontFamily: 'inherit',
              color: 'var(--tinta)',
            }}
          />
          <button type="button" className="hb-icono-btn" onClick={cerrar} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        <div style={{ paddingBlock: 26 }}>
          {!q.trim() ? (
            <p className="hb-etiqueta">Escribe para buscar entre nuestras camisetas</p>
          ) : resultados.length === 0 ? (
            <div className="hb-vacio">
              <p>Sin resultados para “{q}”.</p>
            </div>
          ) : (
            <>
              <p className="hb-etiqueta" style={{ marginBottom: 18 }}>
                {resultados.length} resultado{resultados.length === 1 ? '' : 's'}
              </p>
              <div className="hb-rejilla">
                {resultados.map((p) => (
                  <div key={p.id} onClick={cerrar} role="presentation">
                    <TarjetaProducto producto={p} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- cabecera */

function Cabecera() {
  const { categorias } = useCategorias();
  const [fija, setFija] = useState(false);
  const [menu, setMenu] = useState(false);
  const [buscar, setBuscar] = useState(false);
  const { pathname } = useLocation();

  const clubes = categorias.filter((c) => c.tipo === 'Club');

  useEffect(() => {
    const alScroll = () => setFija(window.scrollY > 8);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setBuscar(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu || buscar ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu, buscar]);

  const claseEnlace = ({ isActive }) => `hb-cabecera__enlace${isActive ? ' activo' : ''}`;

  return (
    <>
      <div className="hb-anuncio">
        <div className="hb-anuncio__pista">
          {[0, 1].map((g) => (
            <div className="hb-anuncio__grupo" key={g} aria-hidden={g === 1}>
              {ANUNCIOS.concat(ANUNCIOS).map((t, i) => (
                <span className="hb-anuncio__texto" key={`${g}-${i}`}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className={`hb-cabecera${fija ? ' hb-cabecera--fija' : ''}`}>
        <div className="hb-contenedor hb-cabecera__barra">
          <nav className="hb-cabecera__nav">
            <NavLink to="/tienda" className={claseEnlace}>
              Tienda
            </NavLink>

            <div className="hb-desplegable">
              <NavLink to="/clubes" className={claseEnlace} style={{ display: 'flex', gap: 5 }}>
                Clubes
                <ChevronDown size={13} />
              </NavLink>
              <div className="hb-desplegable__menu">
                {clubes.slice(0, 12).map((c) => (
                  <Link
                    key={c.id}
                    to={`/productos/${encodeURIComponent(c.nombre)}`}
                    className="hb-desplegable__item"
                  >
                    {c.nombre}
                  </Link>
                ))}
                <Link to="/clubes" className="hb-desplegable__item">
                  Ver todos
                </Link>
              </div>
            </div>

            <NavLink to="/paises" className={claseEnlace}>
              Países
            </NavLink>
            <NavLink to="/nosotros" className={claseEnlace}>
              Nosotros
            </NavLink>
          </nav>

          <button
            type="button"
            className="hb-icono-btn hb-menu-btn"
            onClick={() => setMenu(true)}
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="hb-cabecera__marca" aria-label="Historia Blaugrana — inicio">
            <img src={Logo} alt="Historia Blaugrana" />
          </Link>

          <div className="hb-cabecera__acciones">
            <button
              type="button"
              className="hb-icono-btn"
              onClick={() => setBuscar(true)}
              aria-label="Buscar"
            >
              <Search size={19} />
            </button>
            <Link to="/tienda" className="hb-icono-btn" aria-label="Ver la tienda">
              <ShoppingCart size={19} />
            </Link>
          </div>
        </div>
      </header>

      {menu && (
        <div className="hb-menu-movil">
          <div className="hb-menu-movil__top">
            <img src={Logo} alt="Historia Blaugrana" />
            <button
              type="button"
              className="hb-icono-btn"
              onClick={() => setMenu(false)}
              aria-label="Cerrar menú"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="hb-menu-movil__lista">
            <Link to="/tienda" className="hb-menu-movil__enlace">
              Tienda
            </Link>
            <Link to="/clubes" className="hb-menu-movil__enlace">
              Clubes
            </Link>
            {clubes.slice(0, 8).map((c) => (
              <Link
                key={c.id}
                to={`/productos/${encodeURIComponent(c.nombre)}`}
                className="hb-menu-movil__sub"
              >
                {c.nombre}
              </Link>
            ))}
            <Link to="/paises" className="hb-menu-movil__enlace">
              Países
            </Link>
            <Link to="/nuevos-ingresos" className="hb-menu-movil__enlace">
              Nuevos ingresos
            </Link>
            <Link to="/nosotros" className="hb-menu-movil__enlace">
              Nosotros
            </Link>
            <Link to="/contactanos" className="hb-menu-movil__enlace">
              Contáctanos
            </Link>
          </nav>
        </div>
      )}

      {buscar && <Buscador cerrar={() => setBuscar(false)} />}
    </>
  );
}

/* ------------------------------------------------------------------ pie */

function Pie() {
  return (
    <>
      <section className="hb-boletin">
        <div className="hb-contenedor hb-boletin__rejilla">
          <div>
            <h2 className="hb-boletin__titulo">Cada camiseta guarda una historia</h2>
            <p className="hb-boletin__texto">
              Escríbenos por Instagram o TikTok y te avisamos cuando entre una pieza que estás
              buscando. Trabajamos por encargos y stock corto.
            </p>
            <Link
              to="/contactanos"
              className="hb-btn hb-btn--claro"
              style={{ marginTop: 24 }}
            >
              Escríbenos
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hb-boletin__enlaces">
            <div className="hb-boletin__col">
              <h4>Tienda</h4>
              <Link to="/tienda">Todo el catálogo</Link>
              <Link to="/clubes">Clubes</Link>
              <Link to="/paises">Países</Link>
              <Link to="/nuevos-ingresos">Nuevos ingresos</Link>
            </div>
            <div className="hb-boletin__col">
              <h4>Marca</h4>
              <Link to="/nosotros">Nosotros</Link>
              <Link to="/contactanos">Contáctanos</Link>
              <a
                href="https://www.instagram.com/historia.blaugranaa/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@historia.blaugranaa"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="hb-pie">
        <div className="hb-contenedor">
          <div className="hb-pie__barra">
            <span>
              © {new Date().getFullYear()} Historia Blaugrana · Camisetas de fútbol en Perú
            </span>
            <div className="hb-pie__redes">
              <a
                href="https://www.instagram.com/historia.blaugranaa/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={17} />
              </a>
              <a
                href="https://www.tiktok.com/@historia.blaugranaa"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok size={16} />
              </a>
              <a href="mailto:historia.blaugranaa@hotmail.com" aria-label="Correo">
                historia.blaugranaa@hotmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="hb-pie__marca" aria-hidden="true">
          <img src={Logo} alt="" />
        </div>
      </footer>
    </>
  );
}

export default function Layout({ children }) {
  return (
    <div className="container">
      <Cabecera />
      <main className="main">{children}</main>
      <Pie />
    </div>
  );
}
