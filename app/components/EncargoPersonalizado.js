export default function EncargoPersonalizado() {
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
        <div className="flex gap-3 justify-center flex-wrap mb-8 relative">
          <button className="font-sans px-6 py-[11px] rounded-[var(--radius-sm)] text-sm font-semibold border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] cursor-pointer transition-all duration-300 hover:border-[var(--tertiary)] hover:bg-[rgba(184,147,60,0.04)]">
            🧠 Subconsciente
          </button>
          <button className="font-sans px-6 py-[11px] rounded-[var(--radius-sm)] text-sm font-semibold border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] cursor-pointer transition-all duration-300 hover:border-[var(--mystical)] hover:bg-[rgba(107,80,120,0.04)]">
            👁️ Real
          </button>
          <button className="font-sans px-6 py-[11px] rounded-[var(--radius-sm)] text-sm font-semibold border-[1.5px] border-[var(--border)] bg-white text-[var(--on-neutral)] cursor-pointer transition-all duration-300 hover:border-[var(--primary)] hover:bg-[rgba(45,74,62,0.04)]">
            ✨ Las dos
          </button>
        </div>
        <a
          href="#"
          className="inline-block px-8 py-[14px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-all duration-300 bg-[var(--tertiary)] text-[var(--on-primary)] hover:bg-[#a07d2e] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,147,60,0.3)] relative"
        >
          Encargar pieza personalizada
        </a>
      </div>
    </section>
  );
}
