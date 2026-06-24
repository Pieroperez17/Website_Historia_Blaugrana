-- ============================================================
-- Historia Blaugrana - Schema v1
-- Pegar en: Supabase > SQL Editor > New query > Run
-- ============================================================

-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id          SERIAL PRIMARY KEY,
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    tipo        TEXT NOT NULL,   -- 'Club' | 'Pais' | 'Tag'
    imagen_url  TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Productos
CREATE TABLE IF NOT EXISTS productos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    stock       TEXT DEFAULT '1',
    talla       TEXT,
    precio      NUMERIC NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Imágenes por producto
CREATE TABLE IF NOT EXISTS producto_imagenes (
    id          SERIAL PRIMARY KEY,
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    nombre      TEXT,
    url         TEXT NOT NULL,
    orden       INTEGER DEFAULT 0
);

-- Relación producto ↔ categoría
CREATE TABLE IF NOT EXISTS producto_categorias (
    producto_id  UUID    REFERENCES productos(id)  ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
    PRIMARY KEY (producto_id, categoria_id)
);

-- ── Row Level Security ─────────────────────────────────────
ALTER TABLE categorias         ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE producto_imagenes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE producto_categorias ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "public_read_categorias"
    ON categorias FOR SELECT USING (true);
CREATE POLICY "public_read_productos"
    ON productos FOR SELECT USING (true);
CREATE POLICY "public_read_producto_imagenes"
    ON producto_imagenes FOR SELECT USING (true);
CREATE POLICY "public_read_producto_categorias"
    ON producto_categorias FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados (admin)
CREATE POLICY "auth_all_categorias"
    ON categorias FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_productos"
    ON productos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_producto_imagenes"
    ON producto_imagenes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_producto_categorias"
    ON producto_categorias FOR ALL TO authenticated USING (true) WITH CHECK (true);
