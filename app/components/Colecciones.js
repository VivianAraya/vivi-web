const collections = [
  {
    title: "Animales de Poder",
    desc: "Dos miradas de cada animal: la simbólica que habita tu interior y la real que camina el mundo.",
    bg: "bg-gradient-to-br from-[#ece3f2] to-[#e0d5e8]",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50 text-current">
        <path d="M40 75 C25 70 15 50 20 35 C25 20 35 10 40 15 C45 20 40 35 45 50 C50 60 55 70 40 75Z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="30" cy="22" r="2.5" /><circle cx="48" cy="28" r="2" />
        <path d="M40 15 C38 25 42 35 40 50" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Mini cuadros · Microcosmos",
    desc: "Piezas pequeñas, íntimas y llenas de identidad botánica. Un mundo en cada trazo.",
    bg: "bg-gradient-to-br from-[#dce8db] to-[#cdd9cc]",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50 text-current">
        <ellipse cx="40" cy="65" rx="30" ry="8" stroke="currentColor" strokeWidth="1" />
        <path d="M40 65 L40 20 M40 35 C25 30 20 18 30 12 C40 18 40 28 40 35 M40 35 C55 30 60 18 50 12 C40 18 40 28 40 35" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="28" cy="30" r="3" opacity="0.6" /><circle cx="52" cy="30" r="2.5" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Color botánico",
    desc: "Obras donde el proceso del color vegetal es el protagonista. La paleta de la tierra.",
    bg: "bg-gradient-to-br from-[#efe8d8] to-[#e2d9c4]",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50 text-current">
        <circle cx="35" cy="30" r="14" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="45" r="10" stroke="currentColor" strokeWidth="1" />
        <circle cx="28" cy="52" r="7" stroke="currentColor" strokeWidth="0.8" />
        <path d="M22 45 C25 42 28 40 32 38 M42 38 C46 42 48 46 49 48" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Textiles teñidos a mano",
    desc: "Calcetines y textiles con tintes extraídos de plantas y hongos. Color que se siente.",
    bg: "bg-gradient-to-br from-[#dce2e8] to-[#ccd3d9]",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50 text-current">
        <path d="M20 25 L60 25 M20 40 L60 40 M20 55 L60 55" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M40 20 L40 60 M25 20 L25 60 M55 20 L55 60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="32" r="4" opacity="0.5" /><circle cx="48" cy="48" r="3" opacity="0.4" />
      </svg>
    ),
  },
];

export default function Colecciones() {
  return (
    <section id="colecciones" className="py-[100px] px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="section-eyebrow reveal">Colecciones</div>
          <h2 className="text-[var(--primary)] mt-2 reveal reveal-delay-1">
            Cuatro líneas donde la naturaleza toma forma
          </h2>
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {collections.map((col, i) => (
            <a
              key={i}
              href="#"
              className={`bg-[var(--neutral)] rounded-[var(--radius-md)] overflow-hidden no-underline text-inherit transition-all duration-300 border border-transparent hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] hover:border-[rgba(107,99,91,0.1)] reveal reveal-delay-${Math.min(i + 1, 3)}`}
            >
              <div className={`h-[180px] flex items-center justify-center ${col.bg}`}>
                {col.svg}
              </div>
              <div className="p-6">
                <h3 className="text-[1.15rem] text-[var(--primary)] mb-1.5">
                  {col.title}
                </h3>
                <p className="text-sm text-[var(--secondary)] leading-relaxed">
                  {col.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
