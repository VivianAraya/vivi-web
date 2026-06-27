const animales = [
  {
    name: "Zorro",
    subconsciente: {
      avatar: "✨🦊",
      desc: "Astucia que baila en sueños. El zorro que susurra secretos al oído del alma.",
      precio: "28 €",
    },
    real: {
      avatar: "🦊",
      desc: "Pelaje rojizo, mirada viva. El zorro que cruza el bosque al atardecer.",
      precio: "28 €",
    },
  },
  {
    name: "Lobo",
    subconsciente: {
      avatar: "🌙🐺",
      desc: "El aullido que resuena en tu interior. Instinto puro, lealtad que no se ve.",
      precio: "32 €",
    },
    real: {
      avatar: "🐺",
      desc: "Caminante incansable de los bosques del norte. Fiel a su manada, libre en la nieve.",
      precio: "32 €",
    },
  },
  {
    name: "Búho",
    subconsciente: {
      avatar: "🔮🦉",
      desc: "El guardián silencioso de lo que sabes sin saber. Ve en la oscuridad de tu mente.",
      precio: "30 €",
    },
    real: {
      avatar: "🦉",
      desc: "Vigilante de la noche. Ojos grandes, vuelo mudo, presencia antigua en los árboles.",
      precio: "30 €",
    },
  },
];

function Gama({ tipo, data }) {
  const isSubconsciente = tipo === "subconsciente";

  return (
    <div
      className={`flex flex-col justify-center items-center py-9 px-8 ${
        isSubconsciente
          ? "bg-[var(--mystical-tint)]"
          : "bg-[#e8f0eb]"
      }`}
    >
      <span
        className={`gama-label-caps mb-1.5 ${
          isSubconsciente ? "text-[var(--mystical)]" : "text-[var(--primary)]"
        }`}
      >
        {isSubconsciente ? "🧠 El que llevas dentro" : "👁️ El que ves"}
      </span>
      <span
        className={`font-sans text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-center mb-1 ${
          isSubconsciente ? "text-[var(--mystical)]" : "text-[var(--primary)]"
        }`}
      >
        {isSubconsciente ? "Subconsciente" : "Real"}
      </span>
      <div
        className={`w-[130px] h-[130px] rounded-full mx-auto mb-4 flex items-center justify-center text-[3.5rem] relative z-[1] ${
          isSubconsciente
            ? "bg-gradient-to-br from-[#ede0f2] to-[#d8c8e8] border-2 border-[var(--mystical-tint)]"
            : "bg-gradient-to-br from-[#e8e0d0] to-[#d8cfba] border-2 border-[#d5cfc0]"
        }`}
      >
        {data.avatar}
      </div>
      <span
        className={`tag-pieza-unica mb-2 ${
          isSubconsciente
            ? "bg-[#f5eff8] text-[var(--mystical)]"
            : "bg-[#fef3e0] text-[var(--tertiary)]"
        }`}
      >
        Pieza única
      </span>
      <p className="text-sm text-[var(--secondary)] italic text-center mb-3">
        {data.desc}
      </p>
      <p className="serif font-bold text-[var(--tertiary)] text-[1.05rem] text-center mb-2.5">
        {data.precio}
      </p>
      <a
        href="#"
        className={`inline-block px-5 py-[7px] rounded-[var(--radius-sm)] text-xs font-semibold no-underline text-center transition-soft ${
          isSubconsciente
            ? "bg-[var(--mystical)] text-[var(--on-primary)] hover:bg-[#7d6290]"
            : "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--whisper)]"
        }`}
      >
        Comprar
      </a>
    </div>
  );
}

export default function AnimalesDePoder() {
  return (
    <section id="animales" className="py-[80px] px-6 md:px-12 bg-[var(--neutral)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="section-eyebrow mb-3">Colección principal</div>
          <h2 className="section-title mb-2">Animales de Poder</h2>
          <p className="section-subtitle">
            Cada animal tiene dos caras. La que ve tu subconsciente y la que
            camina por el mundo.
          </p>
        </div>

        {animales.map((animal, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow)] mb-7 last:mb-0"
          >
            <Gama tipo="subconsciente" data={animal.subconsciente} />
            <Gama tipo="real" data={animal.real} />
          </div>
        ))}
      </div>
    </section>
  );
}
