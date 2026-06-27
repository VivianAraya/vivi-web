export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative text-center py-[120px] px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f5f2ec 0%, #faf8f5 40%, #ffffff 100%)",
      }}
    >
      <div className="absolute opacity-[0.07] pointer-events-none left-[-40px] top-[10%] w-[280px]">
        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 280 C100 280 60 200 80 150 C100 100 40 80 20 40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          <ellipse cx="80" cy="150" rx="22" ry="12" transform="rotate(-20 80 150)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <ellipse cx="60" cy="110" rx="16" ry="9" transform="rotate(15 60 110)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
          <ellipse cx="45" cy="80" rx="12" ry="7" transform="rotate(-10 45 80)" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
          <circle cx="20" cy="40" r="8" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
          <path d="M100 280 C100 280 140 220 130 180 C120 140 160 100 170 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <ellipse cx="130" cy="180" rx="18" ry="10" transform="rotate(15 130 180)" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute opacity-[0.07] pointer-events-none right-[-30px] top-[20%] w-[220px]" style={{ transform: "scaleX(-1)" }}>
        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 280 C100 280 140 220 130 180 C120 140 160 100 170 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <ellipse cx="130" cy="180" rx="18" ry="10" transform="rotate(15 130 180)" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
          <ellipse cx="135" cy="140" rx="14" ry="8" transform="rotate(-10 135 140)" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.35" />
          <circle cx="170" cy="60" r="6" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-[720px] mx-auto relative z-[1] reveal">
        <div className="inline-block px-4 py-[5px] bg-[rgba(184,147,60,0.1)] text-[var(--tertiary)] rounded-[20px] text-[0.72rem] font-semibold uppercase tracking-[0.1em] mb-6">
          Arte con tintes naturales · Galicia
        </div>
        <h1 className="text-[var(--primary)] mb-[18px]">
          Donde la naturaleza se convierte en símbolo
        </h1>
        <p className="text-[1.1rem] text-[var(--secondary)] max-w-[500px] mx-auto mb-9 leading-relaxed">
          Piezas únicas creadas a mano con tintes extraídos de plantas, hongos y
          cortezas. Cada color, cada trazo, cada animal lleva la huella del
          momento en que nació.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#colecciones"
            className="inline-block px-8 py-[14px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-all duration-300 bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--whisper)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(45,74,62,0.25)]"
          >
            Ver colecciones
          </a>
          <a
            href="/encargar"
            className="inline-block px-8 py-[14px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-all duration-300 bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
          >
            Encargar pieza personalizada
          </a>
        </div>
      </div>
    </section>
  );
}
