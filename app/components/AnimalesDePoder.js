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
      className={`flex flex-col justify-center items-center py-12 px-9 text-center relative overflow-hidden ${
        isSubconsciente
          ? "bg-[#faf7fc]"
          : "bg-[#f8faf7]"
      }`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background: isSubconsciente
            ? "radial-gradient(circle at 50% 30%, var(--mystical), transparent 70%)"
            : "radial-gradient(circle at 50% 30%, var(--primary), transparent 70%)",
        }}
      />
      <span
        className={`font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-1.5 px-3.5 py-1 rounded-[20px] ${
          isSubconsciente
            ? "text-[var(--mystical)] bg-[rgba(107,80,120,0.08)]"
            : "text-[var(--primary)] bg-[rgba(45,74,62,0.06)]"
        }`}
      >
        {isSubconsciente ? "🧠 El que llevas dentro" : "👁️ El que ves"}
      </span>
      <span
        className={`font-sans text-[0.68rem] font-semibold uppercase tracking-[0.1em] mb-4 ${
          isSubconsciente ? "text-[var(--mystical)]" : "text-[var(--primary)]"
        }`}
      >
        {isSubconsciente ? "Subconsciente" : "Real"}
      </span>
      <div
        className={`w-[120px] h-[120px] rounded-full flex items-center justify-center text-[3.2rem] mb-4 relative z-[1] ${
          isSubconsciente
            ? "bg-gradient-to-br from-[#f0e8f5] to-[#e2d5eb] border-2 border-[rgba(107,80,120,0.15)]"
            : "bg-gradient-to-br from-[#e8efe8] to-[#d5e0d5] border-2 border-[rgba(45,74,62,0.12)]"
        }`}
      >
        {data.avatar}
      </div>
      <span
        className={`tag-pieza-unica mb-3 ${
          isSubconsciente
            ? "bg-[#f5eff8] text-[var(--mystical)]"
            : "bg-[#fef3e0] text-[var(--tertiary)]"
        }`}
      >
        Pieza única
      </span>
      <p className="text-sm text-[var(--secondary)] italic text-center mb-3.5 max-w-[260px] leading-relaxed">
        {data.desc}
      </p>
      <p className="serif font-bold text-[var(--tertiary)] text-[1.05rem] mb-4">
        {data.precio}
      </p>
      <a
        href="#"
        className={`inline-block text-[0.82rem] px-[22px] py-[9px] rounded-[var(--radius-sm)] font-semibold no-underline transition-all duration-300 ${
          isSubconsciente
            ? "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--whisper)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(45,74,62,0.25)]"
            : "bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
        }`}
      >
        Comprar
      </a>
    </div>
  );
}

export default function AnimalesDePoder() {
  return (
    <section id="animales" className="py-[100px] px-6 bg-[var(--neutral)]">
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-14">
          <div className="section-eyebrow reveal">Colección principal</div>
          <h2 className="text-[var(--primary)] mt-2 reveal reveal-delay-1">
            Animales de Poder
          </h2>
          <p className="text-[var(--secondary)] text-[1.05rem] max-w-[550px] mx-auto reveal reveal-delay-1">
            Cada animal tiene dos caras. La que ve tu subconsciente y la que
            camina por el mundo.
          </p>
        </div>

        {animales.map((animal, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow)] mb-7 last:mb-0 border border-[rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 reveal"
          >
            <Gama tipo="subconsciente" data={animal.subconsciente} />
            <Gama tipo="real" data={animal.real} />
          </div>
        ))}
      </div>
    </section>
  );
}
