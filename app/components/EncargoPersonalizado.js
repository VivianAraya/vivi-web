export default function EncargoPersonalizado() {
  return (
    <section id="encargos" className="py-[80px] px-6 md:px-12 bg-white text-center">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[700px] mx-auto py-10 px-8 md:px-12 bg-white rounded-[var(--radius-md)] shadow-[var(--shadow)]">
          <h2 className="text-[var(--primary)] mb-2">
            Crear mi animal de poder
          </h2>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-6 max-w-[500px] mx-auto">
            Elige un animal —de la saga o uno nuevo— y la gama que más te hable.
            Vivi creará tu pieza única, hecha a mano con tintes naturales.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mb-6">
            <span className="font-sans px-[22px] py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold border-[1.5px] border-[rgba(0,0,0,0.06)] bg-white text-[var(--on-neutral)] cursor-pointer transition-soft hover:border-[var(--mystical)] hover:bg-[var(--mystical-tint)]">
              🧠 Subconsciente
            </span>
            <span className="font-sans px-[22px] py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold border-[1.5px] border-[rgba(0,0,0,0.06)] bg-white text-[var(--on-neutral)] cursor-pointer transition-soft hover:border-[var(--primary)] hover:bg-[#e8f0eb]">
              👁️ Real
            </span>
            <span className="font-sans px-[22px] py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold border-[1.5px] border-[rgba(0,0,0,0.06)] bg-white text-[var(--on-neutral)] cursor-pointer transition-soft hover:border-[var(--tertiary)]">
              ✨ Las dos
            </span>
          </div>
          <a
            href="#"
            className="inline-block px-7 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-soft bg-[var(--tertiary)] text-[var(--on-primary)] hover:bg-[#a07d2e] hover:-translate-y-px"
          >
            Encargar pieza personalizada
          </a>
        </div>
      </div>
    </section>
  );
}
