export default function SobreVivi() {
  return (
    <section className="py-[80px] px-6 md:px-12 bg-[var(--neutral)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        <div className="h-[350px] bg-gradient-to-br from-[#e8dcc8] to-[#d4c9b0] rounded-[var(--radius-md)] flex items-center justify-center text-7xl">
          🌸
        </div>
        <div>
          <h2 className="text-[var(--primary)] mb-4">Sobre Vivi</h2>
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
          <p className="text-[var(--secondary)] text-[0.95rem] mb-6 leading-relaxed">
            Mis piezas no se producen en serie: cada una es única, hecha a mano,
            con la huella del momento en que fue creada.
          </p>
          <a
            href="#"
            className="inline-block px-7 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-semibold no-underline transition-soft bg-transparent text-[var(--primary)] border border-[1.5px] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
          >
            Conocer más
          </a>
        </div>
      </div>
    </section>
  );
}
