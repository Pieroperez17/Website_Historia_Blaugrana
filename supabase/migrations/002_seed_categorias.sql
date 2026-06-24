-- ============================================================
-- Seed de categorías iniciales
-- Ejecutar DESPUÉS de 001_schema.sql
-- ============================================================

INSERT INTO categorias (nombre, tipo, imagen_url) VALUES
    ('Bundesliga',    'Club', 'https://paladarnegro.net/escudoteca/ligas/ligas/img/alemania.jpg'),
    ('Liga 1',        'Club', 'https://paladarnegro.net/escudoteca/ligas/ligas/img/peru.jpg'),
    ('Premier League','Club', 'https://paladarnegro.net/escudoteca/ligas/ligas/img/inglaterra.jpg'),
    ('LaLiga',        'Club', 'https://paladarnegro.net/escudoteca/ligas/ligas/img/espana.jpg'),
    ('Serie A',       'Club', 'https://paladarnegro.net/escudoteca/ligas/ligas/img/italia.jpg'),
    ('CONMEBOL',      'Pais', 'https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/conmebol.jpg'),
    ('UEFA',          'Pais', 'https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/uefa.jpg'),
    ('CAF',           'Pais', 'https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/caf.jpg'),
    ('AFC',           'Pais', 'https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/asian.jpg'),
    ('OFC',           'Pais', 'https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/ofc.jpg'),
    ('Nuevo Ingreso', 'Tag',  NULL);
