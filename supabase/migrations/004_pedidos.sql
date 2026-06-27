-- =============================================================
-- Migración 004: Tabla de pedidos para Stripe
-- Proyecto: vivi-web
-- Fecha: 2026-07-04
-- =============================================================

CREATE TABLE pedidos (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id    text UNIQUE NOT NULL,
  stripe_customer_email text NOT NULL DEFAULT '',
  pieza_id             uuid REFERENCES piezas(id) ON DELETE SET NULL,
  gama_id              uuid REFERENCES gamas(id) ON DELETE SET NULL,
  cantidad             integer NOT NULL DEFAULT 1,
  total                integer NOT NULL DEFAULT 0, -- en céntimos
  estado               text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado', 'enviado', 'cancelado')),
  nombre_cliente       text DEFAULT '',
  metadata             jsonb DEFAULT '{}',
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_pedidos_estado ON pedidos (estado);
CREATE INDEX idx_pedidos_created_at ON pedidos (created_at DESC);

-- ─── RLS ───────────────────────────────────────────────────

ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Admin (Vivi) puede ver y gestionar pedidos
CREATE POLICY "pedidos_admin_select" ON pedidos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "pedidos_admin_update" ON pedidos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- El webhook (server-side) usa service_role, salta RLS automáticamente
