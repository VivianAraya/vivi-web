"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

const ESTADOS = ["pendiente", "en_proceso", "completado", "cancelado"];
const ESTADO_LABELS = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  completado: "Completado",
  cancelado: "Cancelado",
};
const ESTADO_COLORS = {
  pendiente: "bg-[#fef3e0] text-[var(--tertiary)]",
  en_proceso: "bg-blue-50 text-blue-700",
  completado: "bg-green-50 text-green-700",
  cancelado: "bg-red-50 text-red-700",
};

export default function AdminEncargos() {
  const supabase = getBrowserSupabase();
  const [encargos, setEncargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [msg, setMsg] = useState(null);

  async function load() {
    let query = supabase.from("encargos").select("*").order("created_at", { ascending: false });
    if (filtro !== "todos") query = query.eq("estado", filtro);
    const { data } = await query;
    setEncargos(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filtro]);

  async function changeEstado(id, nuevoEstado) {
    const { error } = await supabase.from("encargos").update({ estado: nuevoEstado }).eq("id", id);
    if (error) {
      setMsg({ type: "error", text: error.message });
    } else {
      setMsg({ type: "success", text: "Estado actualizado" });
      await load();
    }
  }

  if (loading) return <p className="text-[var(--secondary)]">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[var(--primary)] serif">Encargos</h2>

        <div className="flex gap-2">
          {["todos", ...ESTADOS].map((e) => (
            <button
              key={e}
              onClick={() => setFiltro(e)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filtro === e
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white border border-[rgba(0,0,0,0.08)] text-[var(--secondary)] hover:border-[var(--primary)]"
              }`}
            >
              {e === "todos" ? "Todos" : ESTADO_LABELS[e]}
            </button>
          ))}
        </div>
      </div>

      {msg && (
        <div className={`mb-6 px-4 py-3 rounded-[var(--radius-sm)] text-sm ${msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden">
        {encargos.length === 0 ? (
          <p className="px-6 py-12 text-center text-[var(--secondary)]">No hay encargos{filtro !== "todos" ? ` en estado "${ESTADO_LABELS[filtro]}"` : ""}</p>
        ) : (
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {encargos.map((enc) => (
              <div key={enc.id} className="p-6 hover:bg-[rgba(0,0,0,0.005)]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[var(--primary)]">{enc.nombre}</h3>
                    <p className="text-sm text-[var(--secondary)]">{enc.email}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ESTADO_COLORS[enc.estado]}`}>
                    {ESTADO_LABELS[enc.estado]}
                  </span>
                </div>

                {(enc.animal || enc.gama) && (
                  <div className="flex gap-4 text-sm mb-3">
                    {enc.animal && <span className="text-[var(--secondary)]">🐾 <strong>{enc.animal}</strong></span>}
                    {enc.gama && <span className="text-[var(--secondary)]">🎨 {ESTADO_LABELS[enc.gama] || enc.gama}</span>}
                  </div>
                )}

                {enc.mensaje && (
                  <p className="text-sm text-[var(--secondary)] mb-3 bg-[var(--neutral)] p-3 rounded-[var(--radius-sm)] italic">
                    &ldquo;{enc.mensaje}&rdquo;
                  </p>
                )}

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-[var(--secondary)]">Cambiar estado:</span>
                  {ESTADOS.filter((e) => e !== enc.estado).map((e) => (
                    <button
                      key={e}
                      onClick={() => changeEstado(enc.id, e)}
                      className={`text-xs px-3 py-1 rounded-full font-medium border transition-colors ${ESTADO_COLORS[e]} border-transparent hover:border-current`}
                    >
                      {ESTADO_LABELS[e]}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[var(--secondary)] mt-3 opacity-60">
                  {new Date(enc.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
