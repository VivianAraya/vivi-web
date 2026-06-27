-- =============================================================
-- Migración 003: Tabla de visitas para estadísticas
-- Proyecto: vivi-web
-- Fecha: 2026-07-04
-- =============================================================

-- ─── TABLA: VISITAS ────────────────────────────────────────

CREATE TABLE visitas (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path       text NOT NULL DEFAULT '',
  referrer   text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Índice para consultas por fecha
CREATE INDEX idx_visitas_created_at ON visitas (created_at DESC);

-- ─── RLS ───────────────────────────────────────────────────

ALTER TABLE visitas ENABLE ROW LEVEL SECURITY;

-- Cualquiera (anon) puede registrar una visita
CREATE POLICY "visitas_insert_anon" ON visitas
  FOR INSERT WITH CHECK (true);

-- Solo el admin (authenticated) puede ver las estadísticas
CREATE POLICY "visitas_select_auth" ON visitas
  FOR SELECT USING (auth.role() = 'authenticated');
