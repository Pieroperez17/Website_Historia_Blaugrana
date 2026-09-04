import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../Layout.jsx';
import TarjetaProducto from '../components/TarjetaProducto.jsx';
import { useProductos } from '../hooks/useProductos.js';
import { useCategorias } from '../hooks/useCategorias.js';
import '../estilos/blaugrana.css';

const ORDENES = [
  { valor: 'nuevo', texto: 'Novedades primero' },
  { valor: 'precio-asc', texto: 'Precio: menor a mayor' },
  { valor: 'precio-desc', texto: 'Precio: mayor a menor' },
  { valor: 'nombre', texto: 'Nombre A–Z' },
];

export default function Tienda() {
  const { productos, loading } = useProductos();
  const { categorias } = useCategorias();
  const [params, setParams] = useSearchParams();

  const categoriaActiva = params.get('categoria') || '';
  const [orden, setOrden] = useState('nuevo');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [soloNuevos, setSoloNuevos] = useState(false);
  const [abiertos, setAbiertos] = useState(false);

  function elegirCategoria(nombre) {
    const siguiente = new URLSearchParams(params);
    if (nombre) siguiente.set('categoria', nombre);
    else siguiente.delete('categoria');
    setParams(siguiente, { replace: true });
  }

  // Cuenta cuántos productos hay por categoría para mostrarlo junto al filtro.
  const conteos = useMemo(() => {
    const mapa = new Map();
    productos.forEach((p) =>
      (p.categories || []).forEach((c) => {
        if (c.nombre) mapa.set(c.nombre, (mapa.get(c.nombre) || 0) + 1);
      }),
    );
    return mapa;
  }, [productos]);

  const grupos = useMemo(() => {
    const conProductos = categorias.filter((c) => (conteos.get(c.nombre) || 0) > 0);
    return {
      Clubes: conProductos.filter((c) => c.tipo === 'Club'),
      Países: conProductos.filter((c) => c.tipo === 'País' || c.tipo === 'Pais'),
      Otras: conProductos.filter((c) => !['Club', 'País', 'Pais'].includes(c.tipo)),
    };
  }, [categorias, conteos]);

  const lista = useMemo(() => {
    let items = [...productos];

    if (categoriaActiva) {
      items = items.filter((p) =>
        (p.categories || []).some((c) => c.nombre === categoriaActiva),
      );
    }
    if (soloDisponibles) items = items.filter((p) => Number(p.stock) > 0);
    if (soloNuevos) {
      items = items.filter((p) =>
        (p.categories || []).some((c) => c.nombre === 'Nuevo Ingreso'),
      );
    }

    const esNuevo = (p) =>
      (p.categories || []).some((c) => c.nombre === 'Nuevo Ingreso') ? 1 : 0;

    const criterios = {
      nuevo: (a, b) => esNuevo(b) - esNuevo(a) || (a.nombre || '').localeCompare(b.nombre || ''),
      'precio-asc': (a, b) => (a.precio || 0) - (b.precio || 0),
      'precio-desc': (a, b) => (b.precio || 0) - (a.precio || 0),
      nombre: (a, b) => (a.nombre || '').localeCompare(b.nombre || ''),
    };
    return items.sort(criterios[orden] || criterios.nuevo);
  }, [productos, categoriaActiva, soloDisponibles, soloNuevos, orden]);

  const hayFiltros = categoriaActiva || soloDisponibles || soloNuevos;

  return (
    <Layout>
      <div className="hb-contenedor hb-listado">
        <aside className={`hb-filtros${abiertos ? ' abierta abierto' : ''}`}>
          <div className="hb-filtros__grupo">
            <h4>Catálogo</h4>
            <button
              type="button"
              className={`hb-filtros__opcion${!categoriaActiva ? ' activa' : ''}`}
              onClick={() => elegirCategoria('')}
            >
              Todo <small>{productos.length}</small>
            </button>
          </div>

          {Object.entries(grupos).map(([titulo, items]) =>
            items.length === 0 ? null : (
              <div className="hb-filtros__grupo" key={titulo}>
                <h4>{titulo}</h4>
                <div className="hb-filtros__lista">
                  {items.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`hb-filtros__opcion${
                        categoriaActiva === c.nombre ? ' activa' : ''
                      }`}
                      onClick={() => elegirCategoria(c.nombre)}
                    >
                      {c.nombre} <small>{conteos.get(c.nombre)}</small>
                    </button>
                  ))}
                </div>
              </div>
            ),
          )}

          <div className="hb-filtros__grupo">
            <h4>Filtrar</h4>
            <label className="hb-check">
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
              />
              Solo disponibles
            </label>
            <label className="hb-check">
              <input
                type="checkbox"
                checked={soloNuevos}
                onChange={(e) => setSoloNuevos(e.target.checked)}
              />
              Nuevos ingresos
            </label>
          </div>

          <div className="hb-filtros__grupo">
            <h4>Ayuda</h4>
            <Link to="/nosotros" className="hb-filtros__opcion">
              Sobre nosotros
            </Link>
            <Link to="/contactanos" className="hb-filtros__opcion">
              Contacto y envíos
            </Link>
          </div>
        </aside>

        <div>
          <div className="hb-listado__top">
            <div>
              <h1 className="hb-listado__titulo">{categoriaActiva || 'Todo el catálogo'}</h1>
              <p className="hb-listado__conteo">
                {loading
                  ? 'Cargando…'
                  : `${lista.length} camiseta${lista.length === 1 ? '' : 's'}`}
                {hayFiltros && !loading && ' · filtros activos'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button
                type="button"
                className="hb-btn hb-btn--linea hb-btn--sm hb-filtros-btn"
                onClick={() => setAbiertos((v) => !v)}
              >
                {abiertos ? 'Ocultar' : 'Filtros'}
              </button>
              <select
                className="hb-select"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                aria-label="Ordenar productos"
              >
                {ORDENES.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.texto}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="hb-vacio">Cargando camisetas…</p>
          ) : lista.length === 0 ? (
            <div className="hb-vacio">
              <p>No encontramos camisetas con estos filtros.</p>
              <button
                type="button"
                className="hb-btn hb-btn--linea hb-btn--sm"
                onClick={() => {
                  elegirCategoria('');
                  setSoloDisponibles(false);
                  setSoloNuevos(false);
                }}
              >
                Quitar filtros
              </button>
            </div>
          ) : (
            <div className="hb-rejilla">
              {lista.map((p) => (
                <TarjetaProducto key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
