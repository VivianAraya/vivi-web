const collections = [
  {
    icon: "🦊",
    bg: "bg-gradient-to-br from-[#e8d5b7] to-[#d4c5a9]",
    title: "Animales de Poder",
    desc: "Dos miradas de cada animal: la simbólica que habita tu interior y la real que camina el mundo.",
  },
  {
    icon: "🌿",
    bg: "bg-gradient-to-br from-[#d5e8d4] to-[#c5d9c4]",
    title: "Mini cuadros · Microcosmos",
    desc: "Piezas pequeñas, íntimas y llenas de identidad botánica.",
  },
  {
    icon: "🎨",
    bg: "bg-gradient-to-br from-[#e8e0d5] to-[#d9cec0]",
    title: "Color botánico",
    desc: "Obras donde el proceso del color vegetal es el protagonista.",
  },
  {
    icon: "🧦",
    bg: "bg-gradient-to-br from-[#d5dce8] to-[#c4cdd9]",
    title: "Textiles teñidos a mano",
    desc: "Calcetines y textiles con tintes extraídos de plantas y hongos.",
  },
];

export default function Colecciones() {
  return (
    <section id="colecciones" className="py-[80px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-2">Colecciones</h2>
          <p className="section-subtitle">
            Cuatro líneas donde la naturaleza toma forma
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, i) => (
            <a
              key={i}
              href="#"
              className="bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow)] no-underline text-inherit block transition-soft hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div
                className={`h-[200px] flex items-center justify-center text-5xl ${col.bg}`}
              >
                {col.icon}
              </div>
              <div className="p-5">
                <h3 className="text-[1.2rem] text-[var(--primary)] mb-1">
                  {col.title}
                </h3>
                <p className="text-sm text-[var(--secondary)]">{col.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
