const swatches = [
  "bg-[#d4a76a]",
  "bg-[#8b6b4a]",
  "bg-[#c4946c]",
  "bg-[#a0c49a]",
  "bg-[#c4a44a]",
  "bg-[#6b8b6b]",
];

export default function TintesNaturales() {
  return (
    <section id="tintes" className="py-[100px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-3 gap-3 reveal">
          {swatches.map((bg, i) => (
            <div
              key={i}
              className={`tintes-swatch rounded-[var(--radius-sm)] aspect-square transition-all duration-300 hover:scale-105 ${bg}`}
            />
          ))}
        </div>
        <div className="reveal reveal-delay-1">
          <div className="section-eyebrow mb-3">
            El color nace de la naturaleza
          </div>
          <h2 className="text-[var(--primary)] mb-5">Tintes naturales</h2>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-3.5 leading-relaxed">
            Cada tono proviene de plantas, hongos, cortezas y raíces. No hay dos
            tintes iguales: el agua, la estación y la mano de quien tiñe hacen
            cada color irrepetible.
          </p>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-3.5 leading-relaxed">
            De la cúrcuma al añil, de la cáscara de nuez al eucalipto. Un
            proceso lento, artesanal y profundamente conectado con la tierra.
          </p>
          <a
            href="#tintes"
            className="inline-block px-8 py-[14px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-all duration-300 bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
          >
            Descubrir los tintes
          </a>
        </div>
      </div>
    </section>
  );
}
