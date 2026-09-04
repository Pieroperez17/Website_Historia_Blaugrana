import { Link } from 'react-router-dom';

const SIN_IMAGEN =
  'https://magical-horn-ed73f8415c.media.strapiapp.com/Not_Found_Image_20bccea143.png';

export function precioSoles(valor) {
  const n = Number(valor) || 0;
  return `S/ ${n.toFixed(2)}`;
}

export default function TarjetaProducto({ producto }) {
  const fotos = producto.imagen?.length ? producto.imagen : [{ url: SIN_IMAGEN }];
  const [principal, alterna] = fotos;
  const stock = Number(producto.stock) || 0;
  const agotado = stock === 0;
  const pocas = stock > 0 && stock <= 3;
  const esNuevo = producto.categories?.some((c) => c.nombre === 'Nuevo Ingreso');
  const enlace = `/producto/${producto.documentId}`;

  return (
    <article className="hb-tarjeta">
      <div className="hb-tarjeta__media">
        <Link to={enlace} className="hb-tarjeta__figura">
          <div className="hb-tarjeta__insignias">
            {agotado && <span className="hb-insignia hb-insignia--agotado">Agotado</span>}
            {!agotado && esNuevo && <span className="hb-insignia hb-insignia--nuevo">Nuevo</span>}
            {pocas && <span className="hb-insignia hb-insignia--ultimas">Últimas {stock}</span>}
          </div>

          <img
            src={principal.url}
            alt={producto.nombre}
            loading="lazy"
            className={`hb-tarjeta__img hb-tarjeta__img--principal${alterna ? '' : ' hb-tarjeta__img--sola'}`}
          />
          {alterna && (
            <img
              src={alterna.url}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="hb-tarjeta__img hb-tarjeta__img--alterna"
            />
          )}
        </Link>

        {!agotado && (
          <div className="hb-tarjeta__accion">
            <Link to={enlace} className="hb-btn hb-btn--sm hb-btn--bloque">
              Ver producto
            </Link>
          </div>
        )}
      </div>

      <div className="hb-tarjeta__info">
        <Link to={enlace} className="hb-tarjeta__nombre">
          {producto.nombre}
        </Link>
        <span className="hb-tarjeta__precio">{precioSoles(producto.precio)}</span>
        <div className="hb-tarjeta__meta">
          {producto.talla && <span className="hb-tarjeta__talla">Talla {producto.talla}</span>}
          <span>{agotado ? 'Sin stock' : `${stock} disponible${stock === 1 ? '' : 's'}`}</span>
        </div>
      </div>
    </article>
  );
}
