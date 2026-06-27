export default function SobreVivi() {
  return (
    <section id="sobre" className="py-[100px] px-6 bg-[var(--neutral)]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[3/4] bg-gradient-to-br from-[#e8dcc8] to-[#d4c9b0] to-[#c8bda0] rounded-[var(--radius-md)] flex items-center justify-center text-7xl relative overflow-hidden reveal">
          <div className="absolute inset-3 border border-[rgba(255,255,255,0.4)] rounded-[calc(var(--radius-md)-2px)] pointer-events-none" />
          <span className="opacity-50">🌸</span>
        </div>
        <div className="reveal reveal-delay-1">
          <h2 className="text-[var(--primary)] mb-5">Sobre Vivi</h2>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-3 leading-relaxed">
            Soy artista y creadora. Trabajo con tintes naturales que extraigo de
            plantas, hongos y cortezas, transformando materia viva en piezas que
            cuentan historias.
          </p>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-3 leading-relaxed">
            Cada animal, cada color y cada textura nacen de un proceso lento y
            consciente. Me inspiran los ciclos de la naturaleza, los símbolos y
            la conexión con lo salvaje.
          </p>
          <p className="text-[var(--secondary)] text-[0.95rem] mb-5 leading-relaxed">
            Mis piezas no se producen en serie: cada una es única, hecha a mano,
            con la huella del momento en que fue creada.
          </p>
          <a
            href="#sobre"
            className="inline-block px-8 py-[14px] rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-all duration-300 bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
          >
            Conocer más
          </a>
        </div>
      </div>
    </section>
  );
}
