export default function Marquesina({ texto }) {
  const partes = String(texto || '')
    .split('·')
    .map((t) => t.trim())
    .filter(Boolean);
  if (partes.length === 0) return null;

  return (
    <div className="hb-marquesina">
      <div className="hb-marquesina__pista">
        {[0, 1].map((g) => (
          <div className="hb-marquesina__grupo" key={g} aria-hidden={g === 1}>
            {partes.concat(partes).map((t, i) => (
              <span key={`${g}-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
                <span className="hb-marquesina__texto">{t}</span>
                <span className="hb-marquesina__punto" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
