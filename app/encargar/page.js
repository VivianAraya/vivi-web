"use client";

import { useState, useEffect } from "react";
import { submitEncargo } from "@/lib/supabase/client";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

const GAMAS = [
  { id: "subconsciente", label: "🧠 Subconsciente" },
  { id: "real", label: "👁️ Real" },
  { id: "ambas", label: "✨ Las dos" },
];

const ESTADOS = {
  idle: "idle",
  enviando: "enviando",
  enviado: "enviado",
  error: "error",
};

function EncargoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [animal, setAnimal] = useState("");
  const [gama, setGama] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState(ESTADOS.idle);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill from query params
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
      setErrorMsg("Nombre y email son obligatorios");
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
    } catch (err) {
      setEstado(ESTADOS.error);
      setErrorMsg("No se pudo enviar. Intenta de nuevo.");
    }
  };

  // Success state
  if (estado === ESTADOS.enviado) {
    return (
      <div className="pergamino text-center py-10">
        <div className="text-5xl mb-6">📜</div>
        <h2 className="mb-4">¡Encargo recibido!</h2>
        <p className="text-[var(--secondary)] max-w-[420px] mx-auto mb-2 leading-relaxed">
          Vivi ha recibido tu encargo. Te escribirá en los próximos días al
          email que nos diste para contarte los siguientes pasos.
        </p>
        <p className="text-sm text-[var(--secondary)] opacity-60 mb-8">
          Cada pieza es única y se crea a mano con tintes naturales.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-[12px] rounded-[var(--radius-sm)] text-sm font-semibold bg-[var(--primary)] text-[var(--on-primary)] no-underline hover:bg-[var(--whisper)] transition-all duration-300"
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pergamino">
      <h2 className="text-center mb-2">Tu animal de poder</h2>
      <p className="text-center text-[var(--secondary)] text-[0.9rem] mb-8 max-w-[440px] mx-auto">
        Cuéntanos qué animal te gustaría y Vivi creará tu pieza única.
      </p>

      {/* Gama selector */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--secondary)] mb-3">
          Gama
        </label>
        <div className="flex gap-3 flex-wrap">
          {GAMAS.map((g) => {
            const isSelected = gama === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGama(isSelected ? null : g.id)}
                className={`font-sans px-5 py-[9px] rounded-[var(--radius-sm)] text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? "bg-[var(--tertiary)] text-white border-[1.5px] border-[var(--tertiary)]"
                    : "bg-white text-[var(--on-neutral)] border-[1.5px] border-[var(--border)] hover:border-[var(--tertiary)]"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animal */}
      <div className="mb-5">
        <label
          htmlFor="animal"
          className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--secondary)] mb-2"
        >
          Animal
        </label>
        <input
          id="animal"
          type="text"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          placeholder="Lince, Pantera, Colibrí…"
          className="w-full px-4 py-[10px] rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] text-sm font-sans placeholder:text-[var(--secondary)] placeholder:opacity-40 focus:outline-none focus:border-[var(--tertiary)] transition-colors"
        />
      </div>

      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="nombre"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--secondary)] mb-2"
          >
            Nombre *
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Tu nombre"
            className="w-full px-4 py-[10px] rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] text-sm font-sans placeholder:text-[var(--secondary)] placeholder:opacity-40 focus:outline-none focus:border-[var(--tertiary)] transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--secondary)] mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
            className="w-full px-4 py-[10px] rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] text-sm font-sans placeholder:text-[var(--secondary)] placeholder:opacity-40 focus:outline-none focus:border-[var(--tertiary)] transition-colors"
          />
        </div>
      </div>

      {/* Mensaje */}
      <div className="mb-3">
        <label
          htmlFor="mensaje"
          className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--secondary)] mb-2"
        >
          Mensaje{" "}
          <span className="font-normal normal-case tracking-normal opacity-50">
            (opcional)
          </span>
        </label>
        <textarea
          id="mensaje"
          rows={3}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Cuéntanos algo sobre ti, el animal que elegiste, o lo que imaginas…"
          className="w-full px-4 py-[10px] rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] text-sm font-sans placeholder:text-[var(--secondary)] placeholder:opacity-40 focus:outline-none focus:border-[var(--tertiary)] transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-600 mb-3 text-center">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={estado === ESTADOS.enviando}
        className="w-full py-[13px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold transition-all duration-300 bg-[var(--tertiary)] text-[var(--on-primary)] hover:bg-[#a07d2e] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,147,60,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {estado === ESTADOS.enviando ? "Enviando…" : "Encargar pieza"}
      </button>
    </form>
  );
}

export default function EncargoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 py-[60px] px-6 md:py-[100px]">
        <div className="max-w-[560px] mx-auto">
          <EncargoForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
