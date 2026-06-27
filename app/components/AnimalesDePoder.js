function Gama({ tipo, data }) {
  const isSubconsciente = tipo === "subconsciente";

  return (
    <div
      className={`flex flex-col justify-center items-center py-12 px-9 text-center relative overflow-hidden ${
        isSubconsciente
          ? "bg-[#faf7fc]"
          : "bg-[#f8faf7]"
      }`}
      style={
        isSubconsciente
          ? { background: "radial-gradient(circle at 50% 30%, rgba(107,80,120,0.04), transparent 70%), #faf7fc" }
          : { background: "radial-gradient(circle at 50% 30%, rgba(45,74,62,0.04), transparent 70%), #f8faf7" }
      }
    >
      <span
        className={`font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-1.5 px-3.5 py-1 rounded-full ${
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
      {data.emoji && (
        <div
          className={`w-[120px] h-[120px] rounded-full mx-auto mb-4 flex items-center justify-center text-[3.2rem] relative z-[1] ${
            isSubconsciente
              ? "bg-gradient-to-br from-[#f0e8f5] to-[#e2d5eb] border-2 border-[rgba(107,80,120,0.15)]"
              : "bg-gradient-to-br from-[#e8efe8] to-[#d5e0d5] border-2 border-[rgba(45,74,62,0.12)]"
          }`}
        >
          {data.emoji}
        </div>
      )}
      <span
        className={`inline-block px-3 py-[3px] rounded-full text-[0.62rem] font-bold uppercase tracking-[0.06em] mb-3 ${
          isSubconsciente
            ? "bg-[#f5eff8] text-[var(--mystical)]"
            : "bg-[#fef3e0] text-[var(--tertiary)]"
        }`}
      >
        Pieza única
      </span>
      <p className="text-sm text-[var(--secondary)] italic text-center mb-3.5 max-w-[260px] leading-relaxed">
        {data.descripcion}
      </p>
      {data.precio && (
        <p className="serif font-bold text-[var(--tertiary)] text-[1.05rem] text-center mb-4">
          {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(data.precio)}
        </p>
      )}
      <a
        href="#"
        className={`inline-block px-[22px] py-[9px] rounded-[var(--radius-sm)] text-xs font-semibold no-underline transition-all duration-300 ${
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

export default function AnimalesDePoder({ animales = [] }) {
  const hasData = animales.length > 0;

  return (
    <section id="animales" className="py-[100px] px-6 md:px-12 bg-[var(--neutral)]">
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-14">
          <div className="section-eyebrow mb-3 reveal">Colección principal</div>
          <h2 className="section-title mb-2 reveal reveal-delay-1">Animales de Poder</h2>
          <p className="section-subtitle reveal reveal-delay-1 max-w-[550px] mx-auto">
            Cada animal tiene dos caras. La que ve tu subconsciente y la que camina por el mundo.
          </p>
        </div>

        {hasData ? (
          animales.map((animal) => {
            const subconsciente = animal.gamas?.find((g) => g.tipo === "subconsciente");
            const real = animal.gamas?.find((g) => g.tipo === "real");
            return (
              <div
                key={animal.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-[var(--radius-md)] overflow-hidden shadow-[var(--shadow)] mb-7 last:mb-0 border border-[rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:translate-y-[-2px] reveal"
              >
                <Gama tipo="subconsciente" data={subconsciente || {}} />
                <Gama tipo="real" data={real || {}} />
              </div>
            );
          })
        ) : (
          <div className="text-center text-[var(--secondary)] py-12 reveal">
            <p className="section-subtitle">Próximamente...</p>
          </div>
        )}
      </div>
    </section>
  );
}
