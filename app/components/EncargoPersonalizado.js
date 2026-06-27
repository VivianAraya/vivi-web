"use client";

import { useState } from "react";
import Link from "next/link";

const GAMAS = [
  { id: "subconsciente", label: "🧠 Subconsciente", color: "var(--tertiary)" },
  { id: "real", label: "👁️ Real", color: "var(--mystical)" },
  { id: "ambas", label: "✨ Las dos", color: "var(--primary)" },
];

export default function EncargoPersonalizado() {
  const [gama, setGama] = useState(null);
  const [animal, setAnimal] = useState("");

  const encargoHref = `/encargar?gama=${gama || ""}&animal=${encodeURIComponent(animal.trim())}`;

  return (
    <section id="encargos" className="py-[100px] px-6 bg-white text-center">
      <div className="max-w-[700px] mx-auto py-14 px-8 md:px-12 bg-[var(--neutral)] rounded-[var(--radius-lg)] shadow-[var(--shadow)] border border-[rgba(0,0,0,0.04)] relative overflow-hidden reveal">
        <div
          className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184,147,60,0.06), transparent 70%)",
          }}
        />
        <h2 className="text-[var(--primary)] mb-3 relative">
          Crear mi animal de poder
        </h2>
        <p className="text-[var(--secondary)] text-[0.95rem] mb-7 max-w-[480px] mx-auto relative">
          Elige un animal —de la saga o uno nuevo— y la gama que más te hable.
          Vivi creará tu pieza única, hecha a mano con tintes naturales.
        </p>

        {/* Gama selector */}
        <div className="flex gap-3 justify-center flex-wrap mb-5 relative">
          {GAMAS.map((g) => {
            const isSelected = gama === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGama(isSelected ? null : g.id)}
                className={`font-sans px-6 py-[11px] rounded-[var(--radius-sm)] text-sm font-semibold cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "text-white border-[1.5px]"
                    : "bg-white text-[var(--on-neutral)] border-[1.5px] border-[var(--border)]"
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: g.color,
                        borderColor: g.color,
                        boxShadow: `0 2px 12px ${g.color}33`,
                      }
                    : {}
                }
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Animal name input */}
        <div className="relative mb-7 max-w-[360px] mx-auto">
          <input
            type="text"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            placeholder="Escribe tu animal (ej: Lince, Pantera…)"
            className="w-full px-5 py-[11px] rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] text-sm font-sans text-center placeholder:text-[var(--secondary)] placeholder:opacity-50 focus:outline-none focus:border-[var(--tertiary)] transition-colors duration-300"
          />
        </div>

        {/* CTA */}
        <Link
          href={encargoHref}
          className="inline-block px-8 py-[14px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-all duration-300 bg-[var(--tertiary)] text-[var(--on-primary)] hover:bg-[#a07d2e] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,147,60,0.3)] relative"
        >
          Encargar pieza personalizada
        </Link>
      </div>
    </section>
  );
}
