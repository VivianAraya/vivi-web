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
    <section id="tintes" className="py-[80px] px-6 md:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        <div className="grid grid-cols-3 gap-3">
          {swatches.map((bg, i) => (
            <div
              key={i}
              className={`h-[100px] rounded-[var(--radius-sm)] ${bg}`}
            />
          ))}
        </div>
        <div>
          <h3 className="font-sans text-base font-semibold text-[var(--tertiary)] uppercase tracking-[0.08em] mb-2">
            El color nace de la naturaleza
          </h3>
          <h2 className="text-[var(--primary)] mb-4">Tintes naturales</h2>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-5">
            Cada tono proviene de plantas, hongos, cortezas y raíces. No hay dos
            tintes iguales: el agua, la estación y la mano de quien tiñe hacen
            cada color irrepetible.
          </p>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-5">
            De la cúrcuma al añil, de la cáscara de nuez al eucalipto. Un
            proceso lento, artesanal y profundamente conectado con la tierra.
          </p>
          <a
            href="#"
            className="inline-block px-7 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-soft bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
          >
            Descubrir los tintes
          </a>
        </div>
      </div>
    </section>
  );
}
