"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

const EUR = (cents) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);

function TiendaInner() {
  const searchParams = useSearchParams();
  const [piezas, setPiezas] = useState([]);
  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(null); // "{pieza_id}-{gama_id}"
  const [msg, setMsg] = useState(null);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    async function load() {
      const supabase = getBrowserSupabase();
      const [{ data: p }, { data: c }] = await Promise.all([
        supabase.from("piezas").select("*, gamas(*), colecciones(nombre)").eq("disponible", true).order("created_at", { ascending: false }),
        supabase.from("colecciones").select("*").order("orden"),
      ]);
      setPiezas(p || []);
      setColecciones(c || []);
      setLoading(false);
    }
    load();
  }, []);

  async function comprar({ pieza_id, gama_id, titulo, precio, emoji }) {
    setBuying(`${pieza_id}-${gama_id || "no"}`);
    setMsg(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pieza_id, gama_id, titulo, precio, emoji }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMsg({ type: "error", text: data.error || "Error al crear el pago" });
      }
    } catch {
      setMsg({ type: "error", text: "No se pudo conectar con el servidor" });
    }
    setBuying(null);
  }

  const coleccionDe = (nombre) => colecciones.find((c) => c.nombre === nombre);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20 text-center text-[var(--secondary)]">
        Cargando tienda...
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--secondary)] hover:text-[var(--primary)] transition-colors mb-6">
        ← Volver al inicio
      </a>
      <h1 className="text-4xl font-bold text-[var(--primary)] serif mb-4">Tienda</h1>
      <p className="text-[var(--secondary)] mb-12 max-w-xl">
        Cada pieza es única, hecha a mano con tintes naturales. Elige la que resuene contigo.
      </p>

      {success && (
        <div className="bg-green-50 text-green-800 px-6 py-4 rounded-[var(--radius-md)] mb-8">
          ✅ ¡Gracias por tu compra! Recibirás un email de confirmación.
        </div>
      )}
      {canceled && (
        <div className="bg-[#fef3e0] text-[var(--tertiary)] px-6 py-4 rounded-[var(--radius-md)] mb-8">
          Has cancelado el pago. La pieza sigue disponible si cambias de opinión.
        </div>
      )}
      {msg && (
        <div className={`px-6 py-4 rounded-[var(--radius-md)] mb-8 ${
          msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
        }`}>
          {msg.text}
        </div>
      )}

      {piezas.length === 0 && (
        <p className="text-[var(--secondary)]">No hay piezas disponibles ahora. Vuelve pronto.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {piezas.map((pieza) => {
          const col = coleccionDe(pieza.colecciones?.nombre);
          const esAnimalDePoder = col?.slug === "animales-de-poder";
          const gamas = pieza.gamas || [];

          return (
            <div
              key={pieza.id}
              className="border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden bg-white flex flex-col"
            >
              {/* Imagen */}
              {pieza.imagenes?.[0] && (
                <div className="aspect-[4/3] bg-[var(--surface)] overflow-hidden">
                  <img
                    src={pieza.imagenes[0]}
                    alt={pieza.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Colección tag */}
                {col && (
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--tertiary)] mb-1">
                    {col.nombre}
                  </span>
                )}

                <h3 className="text-xl font-bold text-[var(--primary)] serif mb-2">
                  {pieza.titulo}
                </h3>

                {pieza.descripcion && (
                  <p className="text-sm text-[var(--secondary)] mb-4 line-clamp-2">
                    {pieza.descripcion}
                  </p>
                )}

                {/* Gamas (Animales de Poder) */}
                {esAnimalDePoder && gamas.length > 0 && (
                  <div className="flex flex-col gap-3 mb-4 mt-auto">
                    {gamas.map((gama) => (
                      <div
                        key={gama.id}
                        className="flex items-center justify-between border border-[var(--border)] rounded-[var(--radius-sm)] px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{gama.emoji || "✨"}</span>
                          <div>
                            <div className="text-xs font-medium text-[var(--on-neutral)]/50 uppercase">
                              {gama.tipo === "subconsciente" ? "🧠 Subconsciente" : "👁️ Real"}
                            </div>
                            <div className="text-sm text-[var(--on-neutral)]/70">
                              {gama.descripcion || "Pieza única"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[var(--primary)]">
                            {EUR(gama.precio || pieza.precio || 0)}
                          </span>
                          <button
                            onClick={() =>
                              comprar({
                                pieza_id: pieza.id,
                                gama_id: gama.id,
                                titulo: `${pieza.titulo} · ${gama.tipo === "subconsciente" ? "Subconsciente" : "Real"}`,
                                precio: gama.precio || pieza.precio || 0,
                                emoji: gama.emoji,
                              })
                            }
                            disabled={buying === `${pieza.id}-${gama.id}`}
                            className="bg-[var(--primary)] text-[var(--on-primary)] px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold hover:bg-[var(--whisper)] transition-colors disabled:opacity-50"
                          >
                            {buying === `${pieza.id}-${gama.id}` ? "..." : "Comprar"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pieza normal (no Animal de Poder sin gamas) */}
                {!esAnimalDePoder && (
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <span className="font-bold text-[var(--primary)] text-lg">
                      {EUR(pieza.precio || 0)}
                    </span>
                    <button
                      onClick={() =>
                        comprar({
                          pieza_id: pieza.id,
                          gama_id: null,
                          titulo: pieza.titulo,
                          precio: pieza.precio || 0,
                          emoji: "",
                        })
                      }
                      disabled={buying === `${pieza.id}-no`}
                      className="bg-[var(--primary)] text-[var(--on-primary)] px-6 py-3 rounded-[var(--radius-sm)] text-sm font-semibold hover:bg-[var(--whisper)] transition-colors disabled:opacity-50"
                    >
                      {buying === `${pieza.id}-no` ? "..." : "Comprar"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default function Tienda() {
  return (
    <Suspense fallback={<main className="max-w-6xl mx-auto px-6 py-20 text-center">Cargando...</main>}>
      <TiendaInner />
    </Suspense>
  );
}
