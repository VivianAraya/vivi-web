export default function Hero() {
  return (
    <section className="text-center py-[100px] px-6 md:px-12 bg-gradient-to-b from-[var(--neutral)] to-white">
      <div className="text-[2.5rem] mb-6 opacity-60">☽</div>
      <h1 className="text-[var(--primary)] max-w-[700px] mx-auto mb-4">
        Piezas únicas donde la naturaleza se convierte en símbolo
      </h1>
      <p className="text-lg text-[var(--secondary)] max-w-[520px] mx-auto mb-8 leading-relaxed">
        Arte y objetos únicos creados a mano con tintes naturales, inspiración
        botánica y simbolismo animal.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="#colecciones"
          className="inline-block px-7 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-soft bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--whisper)] hover:-translate-y-px"
        >
          Ver colecciones
        </a>
        <a
          href="#encargos"
          className="inline-block px-7 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-soft bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
        >
          Encargar pieza personalizada
        </a>
      </div>
    </section>
  );
}
