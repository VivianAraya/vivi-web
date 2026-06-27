"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [visitas, setVisitas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = getBrowserSupabase();

      const [
        { count: totalColecciones },
        { count: totalPiezas },
        { count: encargosPendientes },
        { count: totalVisitas },
        { data: visHoy },
        { data: visSemana },
      ] = await Promise.all([
        supabase.from("colecciones").select("*", { count: "exact", head: true }),
        supabase.from("piezas").select("*", { count: "exact", head: true }),
        supabase.from("encargos").select("*", { count: "exact", head: true }).eq("estado", "pendiente"),
        supabase.from("visitas").select("*", { count: "exact", head: true }),
        supabase.from("visitas").select("*", { count: "exact", head: true }).gte("created_at", todayISO()),
        supabase.from("visitas").select("*", { count: "exact", head: true }).gte("created_at", weekAgoISO()),
      ]);

      setStats({ totalColecciones, totalPiezas, encargosPendientes });
      setVisitas({
        total: totalVisitas,
        hoy: visHoy?.length ? visHoy.length : 0,
        semana: visSemana?.length ? visSemana.length : 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="text-[var(--secondary)]">Cargando...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--primary)] serif mb-8">Dashboard</h2>

      {/* ─── Catálogo ─── */}
      <h3 className="text-sm uppercase tracking-wider text-[var(--on-neutral)]/40 mb-4">
        Catálogo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="Colecciones"
          value={stats?.totalColecciones}
          href="/admin/colecciones"
          color="bg-[var(--mystical-tint)] text-[var(--mystical)]"
        />
        <StatCard
          label="Piezas"
          value={stats?.totalPiezas}
          href="/admin/piezas"
          color="bg-[#e8f0eb] text-[var(--primary)]"
        />
        <StatCard
          label="Encargos pendientes"
          value={stats?.encargosPendientes}
          href="/admin/encargos"
          color={stats?.encargosPendientes > 0 ? "bg-[#fef3e0] text-[var(--tertiary)]" : "bg-gray-100 text-gray-500"}
        />
      </div>

      {/* ─── Visitas ─── */}
      <h3 className="text-sm uppercase tracking-wider text-[var(--on-neutral)]/40 mb-4">
        Visitas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Visitas totales"
          value={visitas?.total}
          color="bg-[#f3f0f8] text-[var(--whisper)]"
        />
        <StatCard
          label="Visitas hoy"
          value={visitas?.hoy}
          color="bg-[#e8f5e9] text-green-800"
        />
        <StatCard
          label="Visitas esta semana"
          value={visitas?.semana}
          color="bg-[#e3f2fd] text-blue-800"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, href, color }) {
  const card = (
    <div className={`block p-6 rounded-[var(--radius-md)] ${color} transition-all ${href ? "hover:shadow-md" : ""}`}>
      <div className="text-4xl font-bold serif mb-1">{value ?? "—"}</div>
      <div className="text-sm font-medium opacity-80">{label}</div>
    </div>
  );
  if (href) return <a href={href}>{card}</a>;
  return card;
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function weekAgoISO() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
