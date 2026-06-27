"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const supabase = getBrowserSupabase();

      const [
        { count: totalColecciones },
        { count: totalPiezas },
        { count: encargosPendientes },
      ] = await Promise.all([
        supabase.from("colecciones").select("*", { count: "exact", head: true }),
        supabase.from("piezas").select("*", { count: "exact", head: true }),
        supabase
          .from("encargos")
          .select("*", { count: "exact", head: true })
          .eq("estado", "pendiente"),
      ]);

      setStats({ totalColecciones, totalPiezas, encargosPendientes });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <p className="text-[var(--secondary)]">Cargando...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--primary)] serif mb-8">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}

function StatCard({ label, value, href, color }) {
  return (
    <a
      href={href}
      className={`block p-6 rounded-[var(--radius-md)] ${color} transition-all hover:shadow-md`}
    >
      <div className="text-4xl font-bold serif mb-1">{value ?? "—"}</div>
      <div className="text-sm font-medium opacity-80">{label}</div>
    </a>
  );
}
