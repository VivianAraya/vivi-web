"use client";

import { useState, useEffect } from "react";
import { submitEncargo } from "@/lib/supabase/client";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

const GAMAS = [
  {
    id: "subconsciente",
    label: "Subconsciente",
    emoji: "🧠",
    desc: "El que habita tu interior — símbolos, sueños, arquetipos",
    cssClass: "selected-subconsciente",
    realm: "realm-subconsciente",
  },
  {
    id: "real",
    label: "Real",
    emoji: "👁️",
    desc: "El que camina el mundo — naturaleza, instinto, presencia",
    cssClass: "selected-real",
    realm: "realm-real",
  },
  {
    id: "ambas",
    label: "Las dos miradas",
    emoji: "✨",
    desc: "Subconsciente y real juntos — la pieza más completa",
    cssClass: "selected-ambas",
    realm: "realm-ambas",
  },
];

const ESTADOS = {
  idle: "idle",
  enviando: "enviando",
  enviado: "enviado",
  error: "error",
};

// ─── Mandala SVG ─────────────────────────────────────────────────
function Mandala() {
  return (
    <svg
      className="pergamino-mandala"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="32"
          y1="32"
          x2={32 + 14 * Math.cos((angle * Math.PI) / 180)}
          y2={32 + 14 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.35"
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx={32 + 22 * Math.cos((angle * Math.PI) / 180)}
          cy={32 + 22 * Math.sin((angle * Math.PI) / 180)}
          rx="5.5"
          ry="3.5"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.25"
          transform={`rotate(${angle} ${32 + 22 * Math.cos((angle * Math.PI) / 180)} ${32 + 22 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 5" opacity="0.2" />
    </svg>
  );
}

function Ornament() {
  return (
    <div className="pergamino-ornament">
      <span className="pergamino-ornament-line" />
      <span className="pergamino-ornament-dot" />
      <span className="pergamino-ornament-dot" />
      <Mandala />
      <span className="pergamino-ornament-dot" />
      <span className="pergamino-ornament-dot" />
      <span className="pergamino-ornament-line" />
    </div>
  );
}

function Divider() {
  return (
    <div className="pergamino-divider">
      <span className="pergamino-divider-dot" />
    </div>
  );
}

// ─── Sparkles — ethereal floating particles ─────────────────────
function Sparkles() {
  return (
    <>
      <span className="pergamino-sparkle" />
      <span className="pergamino-sparkle" />
      <span className="pergamino-sparkle" />
      <span className="pergamino-sparkle" />
      <span className="pergamino-sparkle" />
      <span className="pergamino-sparkle" />
    </>
  );
}

// ─── MAIN FORM ───────────────────────────────────────────────────
function EncargoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [animal, setAnimal] = useState("");
  const [gama, setGama] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState(ESTADOS.idle);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const gamaParam = params.get("gama");
    const animalParam = params.get("animal");
    if (gamaParam && GAMAS.some((g) => g.id === gamaParam)) setGama(gamaParam);
    if (animalParam) setAnimal(decodeURIComponent(animalParam));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      setErrorMsg("Tu nombre y email son necesarios para que Vivi pueda contactarte.");
      return;
    }
    setEstado(ESTADOS.enviando);
    setErrorMsg("");
    try {
      await submitEncargo({
        nombre: nombre.trim(),
        email: email.trim(),
        animal: animal.trim() || null,
        gama: gama || null,
        mensaje: mensaje.trim() || null,
      });
      setEstado(ESTADOS.enviado);
    } catch {
      setEstado(ESTADOS.error);
      setErrorMsg("Algo no ha salido bien. Intenta de nuevo en un momento.");
    }
  };

  const gamaSeleccionada = GAMAS.find((g) => g.id === gama);
  const realmClass = gamaSeleccionada ? gamaSeleccionada.realm : "";

  // ─── SUCCESS ─────────────────────────────────────────────
  if (estado === ESTADOS.enviado) {
    return (
      <div className={`pergamino pergamino-success ${realmClass}`}>
        <Sparkles />
        <div className="glow-orb" />
        <Ornament />
        <div className="pergamino-success-icon">🌙</div>
        <h2 className="serif text-[1.8rem] mb-4">
          Tu animal de poder ha sido invocado
        </h2>
        <p className="max-w-[400px] mx-auto mb-3 leading-relaxed text-[0.95rem] opacity-80">
          Vivi recibirá tu encargo en las próximas horas. Te escribirá
          al email que nos diste para empezar a darle forma a tu pieza.
        </p>
        <p className="opacity-40 text-sm mb-8 italic">
          Cada animal nace de un proceso lento, con tintes naturales y
          la mano de quien escucha a la tierra.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-[12px] rounded-[3px] text-sm font-semibold no-underline transition-all duration-300"
          style={{
            background: "var(--theme-btn-bg)",
            color: "#fff",
          }}
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  // ─── FORM ─────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className={`pergamino ${realmClass}`}>
      <Sparkles />
      <div className="glow-orb" />
      <Ornament />

      {/* Header */}
      <div className="pergamino-intro text-center mb-6">
        <h2 className="serif text-[1.7rem] md:text-[2rem] mb-3 leading-tight">
          Crear mi animal de poder
        </h2>
        <p className="text-[0.9rem] max-w-[420px] mx-auto leading-relaxed opacity-70">
          Un animal que te representa. Una pieza única que Vivi creará
          para ti, con tintes extraídos de la tierra y la escucha de lo
          que ese animal significa para quien lo invoca.
        </p>
      </div>

      <Divider />

      {/* ─── Paso 1: La mirada ─── */}
      <div className="mb-7">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] opacity-60 mb-4 text-center">
          Elige la mirada
        </p>
        <div className="flex flex-col gap-2.5">
          {GAMAS.map((g) => {
            const isSelected = gama === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGama(isSelected ? null : g.id)}
                className={`gama-btn text-left flex items-center gap-3 ${
                  isSelected ? g.cssClass : ""
                }`}
              >
                <span className="text-xl flex-shrink-0">{g.emoji}</span>
                <div>
                  <div className="font-semibold text-[0.85rem]">{g.label}</div>
                  <div
                    className={`text-[0.72rem] ${
                      isSelected ? "opacity-80" : "opacity-40"
                    }`}
                  >
                    {g.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* ─── Paso 2: El animal ─── */}
      <div className="mb-7">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] opacity-60 mb-4 text-center">
          Nombra a tu animal
        </p>
        <input
          type="text"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          placeholder="Lobo, Colibrí, Pantera… o uno que aún no existe"
        />
        {gamaSeleccionada && animal.trim() && (
          <p className="text-center text-[0.75rem] mt-3 opacity-50 italic">
            Un {animal.trim()} de mirada {gamaSeleccionada.label.toLowerCase()}
            {gamaSeleccionada.id === "ambas" ? ". La pieza más profunda." : "."}
          </p>
        )}
      </div>

      <Divider />

      {/* ─── Paso 3: Sobre ti ─── */}
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] opacity-60 mb-4 text-center">
          Para que Vivi pueda encontrarte
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor="nombre">Tu nombre *</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Cómo te llamas"
            />
          </div>
          <div>
            <label htmlFor="email">Tu email *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>
        </div>
        <div className="mb-1">
          <label htmlFor="mensaje">
            Algo que quieras contarle{" "}
            <span className="font-normal normal-case tracking-normal opacity-30">
              — opcional
            </span>
          </label>
          <textarea
            id="mensaje"
            rows={3}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Qué significa este animal para ti, cómo lo imaginas, algo sobre ti…"
          />
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-400/80 mt-4 text-center italic">
          {errorMsg}
        </p>
      )}

      {/* Sacred button */}
      <div className="mt-7">
        <button
          type="submit"
          disabled={estado === ESTADOS.enviando}
          className="btn-sacred"
        >
          {estado === ESTADOS.enviando ? "Invocando…" : "Encargar esta pieza"}
        </button>
      </div>
    </form>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────
export default function EncargoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 py-[40px] px-6 md:py-[80px] encargo-page-bg">
        <div className="max-w-[560px] mx-auto">
          <EncargoForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
