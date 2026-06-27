-- =============================================================
-- Migración 001: Catálogo Vivián Araya
-- Proyecto: vivi-web
-- Fecha: 2026-06-27
-- =============================================================

-- ─── 1. COLECCIONES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS colecciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  imagen_url TEXT,
  orden INTEGER DEFAULT 0,
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 2. PIEZAS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS piezas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2),
  coleccion_id UUID REFERENCES colecciones(id) ON DELETE SET NULL,
  tipo TEXT DEFAULT 'normal' CHECK (tipo IN ('normal', 'animal_de_poder')),
  imagenes TEXT[] DEFAULT '{}',
  dimensiones TEXT,
  tecnica TEXT,
  disponible BOOLEAN DEFAULT true,
  vendido BOOLEAN DEFAULT false,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. GAMAS (Animales de Poder — dual) ──────────────────────
CREATE TABLE IF NOT EXISTS gamas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pieza_id UUID NOT NULL REFERENCES piezas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('subconsciente', 'real')),
  emoji TEXT,
  descripcion TEXT,
  precio DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 4. ENCARGOS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS encargos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  animal TEXT,
  gama TEXT CHECK (gama IN ('subconsciente', 'real', 'ambas')),
  mensaje TEXT,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_proceso', 'completado', 'cancelado')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── RLS: ACTIVAR ─────────────────────────────────────────────
ALTER TABLE colecciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE piezas ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamas ENABLE ROW LEVEL SECURITY;
ALTER TABLE encargos ENABLE ROW LEVEL SECURITY;

-- ─── RLS: POLÍTICAS ───────────────────────────────────────────

-- colecciones: SELECT público
CREATE POLICY "colecciones_select_public" ON colecciones
  FOR SELECT USING (true);

-- piezas: SELECT público (solo disponibles)
CREATE POLICY "piezas_select_public" ON piezas
  FOR SELECT USING (disponible = true);

-- gamas: SELECT público
CREATE POLICY "gamas_select_public" ON gamas
  FOR SELECT USING (true);

-- encargos: INSERT público, SELECT solo admin
CREATE POLICY "encargos_insert_public" ON encargos
  FOR INSERT WITH CHECK (true);

-- ─── DATOS INICIALES ──────────────────────────────────────────

-- Colecciones
INSERT INTO colecciones (nombre, slug, descripcion, orden) VALUES
  ('Animales de Poder', 'animales-de-poder', 'Dos miradas de cada animal: la simbólica que habita tu interior y la real que camina el mundo.', 1),
  ('Mini cuadros · Microcosmos', 'mini-cuadros', 'Piezas pequeñas, íntimas y llenas de identidad botánica. Un mundo en cada trazo.', 2),
  ('Color botánico', 'color-botanico', 'Obras donde el proceso del color vegetal es el protagonista. La paleta de la tierra.', 3),
  ('Textiles teñidos a mano', 'textiles', 'Calcetines y textiles con tintes extraídos de plantas y hongos. Color que se siente.', 4);

-- Animales de Poder: piezas
WITH c AS (SELECT id FROM colecciones WHERE slug = 'animales-de-poder')
INSERT INTO piezas (titulo, descripcion, coleccion_id, tipo, destacado) VALUES
  ('Zorro', 'El espíritu del zorro: astucia, adaptabilidad y la magia de lo invisible.', (SELECT id FROM c), 'animal_de_poder', true),
  ('Lobo', 'El espíritu del lobo: instinto, lealtad y la fuerza de la manada interior.', (SELECT id FROM c), 'animal_de_poder', true),
  ('Búho', 'El espíritu del búho: sabiduría silenciosa y la visión en la oscuridad.', (SELECT id FROM c), 'animal_de_poder', true);

-- Gamas: Zorro
WITH p AS (SELECT id FROM piezas WHERE titulo = 'Zorro')
INSERT INTO gamas (pieza_id, tipo, emoji, descripcion, precio) VALUES
  ((SELECT id FROM p), 'subconsciente', '✨🦊', 'Astucia que baila en sueños. El zorro que susurra secretos al oído del alma.', 28.00),
  ((SELECT id FROM p), 'real', '🦊', 'Pelaje rojizo, mirada viva. El zorro que cruza el bosque al atardecer.', 28.00);

-- Gamas: Lobo
WITH p AS (SELECT id FROM piezas WHERE titulo = 'Lobo')
INSERT INTO gamas (pieza_id, tipo, emoji, descripcion, precio) VALUES
  ((SELECT id FROM p), 'subconsciente', '🌙🐺', 'El aullido que resuena en tu interior. Instinto puro, lealtad que no se ve.', 32.00),
  ((SELECT id FROM p), 'real', '🐺', 'Caminante incansable de los bosques del norte. Fiel a su manada, libre en la nieve.', 32.00);

-- Gamas: Búho
WITH p AS (SELECT id FROM piezas WHERE titulo = 'Búho')
INSERT INTO gamas (pieza_id, tipo, emoji, descripcion, precio) VALUES
  ((SELECT id FROM p), 'subconsciente', '🔮🦉', 'El guardián silencioso de lo que sabes sin saber. Ve en la oscuridad de tu mente.', 30.00),
  ((SELECT id FROM p), 'real', '🦉', 'Vigilante de la noche. Ojos grandes, vuelo mudo, presencia antigua en los árboles.', 30.00);
