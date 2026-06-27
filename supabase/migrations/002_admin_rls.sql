-- =============================================================
-- Migración 002: Admin RLS + Storage policies
-- Proyecto: vivi-web
-- Fecha: 2026-06-27
-- =============================================================

-- ─── DESHABILITAR REGISTRO PÚBLICO ─────────────────────────
-- Solo el admin (creado manualmente) puede acceder

-- ─── RLS: POLÍTICAS ADMIN (INSERT/UPDATE/DELETE) ───────────

-- colecciones: admin full access
CREATE POLICY "colecciones_admin_all" ON colecciones
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- piezas: admin full access
CREATE POLICY "piezas_admin_all" ON piezas
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- gamas: admin full access
CREATE POLICY "gamas_admin_all" ON gamas
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- encargos: admin can SELECT and UPDATE
CREATE POLICY "encargos_admin_select" ON encargos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "encargos_admin_update" ON encargos
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── STORAGE: POLÍTICAS ────────────────────────────────────
-- Allow authenticated users to upload/delete files in piezas bucket

CREATE POLICY "storage_piezas_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'piezas');

CREATE POLICY "storage_piezas_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'piezas' AND auth.role() = 'authenticated');

CREATE POLICY "storage_piezas_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'piezas' AND auth.role() = 'authenticated');

CREATE POLICY "storage_piezas_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'piezas' AND auth.role() = 'authenticated');
