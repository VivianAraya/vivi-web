export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-12 py-5 bg-[var(--neutral)] border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-[100]">
      <div className="text-[1.4rem] font-bold text-[var(--primary)] tracking-[-0.02em] serif">
        Vivián Araya
      </div>
      <div className="flex gap-4 md:gap-8 items-center">
        <a href="#" className="no-underline text-[var(--on-neutral)] text-sm font-medium transition-soft hover:text-[var(--whisper)] hidden sm:inline">
          Inicio
        </a>
        <a href="#colecciones" className="no-underline text-[var(--on-neutral)] text-sm font-medium transition-soft hover:text-[var(--whisper)] hidden sm:inline">
          Colecciones
        </a>
        <a href="#animales" className="no-underline text-[var(--on-neutral)] text-sm font-medium transition-soft hover:text-[var(--whisper)] hidden sm:inline">
          Animales de Poder
        </a>
        <a href="#tintes" className="no-underline text-[var(--on-neutral)] text-sm font-medium transition-soft hover:text-[var(--whisper)] hidden sm:inline">
          Tintes
        </a>
        <a href="#encargos" className="no-underline text-[var(--on-neutral)] text-sm font-medium transition-soft hover:text-[var(--whisper)] hidden sm:inline">
          Encargos
        </a>
        <a href="#" className="bg-[var(--primary)] text-[var(--on-primary)] px-5 py-2 rounded-[var(--radius-sm)] text-sm font-semibold no-underline transition-soft hover:bg-[var(--whisper)]">
          Tienda
        </a>
        <span className="text-xs text-[var(--secondary)] ml-4">
          <span className="cursor-pointer text-[var(--primary)] font-semibold">ES</span>{" "}
          · <span className="cursor-pointer">GL</span>
        </span>
      </div>
    </nav>
  );
}
