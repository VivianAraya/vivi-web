export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60 py-12 px-6 md:px-12 text-center text-sm">
      <div className="serif text-[1.2rem] text-[var(--on-primary)] mb-4">
        Vivián Araya
      </div>
      <p>Arte y tintes naturales · Galicia</p>
      <p className="mt-2">
        <a href="#" className="text-white/60 no-underline transition-soft hover:text-[var(--tertiary)]">
          Inicio
        </a>{" "}
        ·{" "}
        <a href="#colecciones" className="text-white/60 no-underline transition-soft hover:text-[var(--tertiary)]">
          Colecciones
        </a>{" "}
        ·{" "}
        <a href="#encargos" className="text-white/60 no-underline transition-soft hover:text-[var(--tertiary)]">
          Encargos
        </a>{" "}
        ·{" "}
        <a href="#" className="text-white/60 no-underline transition-soft hover:text-[var(--tertiary)]">
          Tienda
        </a>{" "}
        ·{" "}
        <a href="#" className="text-white/60 no-underline transition-soft hover:text-[var(--tertiary)]">
          Contacto
        </a>
      </p>
      <p className="mt-4 opacity-40">
        © 2026 Vivián Araya. Piezas únicas hechas a mano.
      </p>
    </footer>
  );
}
