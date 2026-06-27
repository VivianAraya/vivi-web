"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#colecciones", label: "Colecciones" },
  { href: "#animales", label: "Animales de Poder" },
  { href: "#tintes", label: "Tintes" },
  { href: "#encargos", label: "Encargos" },
  { href: "#sobre", label: "Sobre Vivi" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-[100] backdrop-blur-[12px] transition-all duration-300 ${
          scrolled
            ? "border-b border-[rgba(0,0,0,0.06)] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            : "border-b border-transparent"
        }`}
        style={{ background: "rgba(250,248,245,0.92)" }}
      >
        <div className="flex items-center justify-between px-6 max-w-[1200px] mx-auto py-4">
          <div className="text-[1.4rem] font-bold text-[var(--primary)] tracking-[-0.02em] serif">
            Vivián Araya
          </div>

          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-underline text-[var(--on-neutral)] text-sm font-medium transition-colors duration-300 hover:text-[var(--whisper)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="bg-[var(--primary)] text-[var(--on-primary)] px-5 py-[10px] rounded-[var(--radius-sm)] text-sm font-semibold no-underline transition-all duration-300 hover:bg-[var(--whisper)]"
            >
              Tienda
            </a>
            <a
              href="/login"
              className="text-[var(--on-neutral)]/30 text-xs font-medium transition-colors duration-300 hover:text-[var(--on-neutral)]/50 ml-1"
            >
              Iniciar sesión
            </a>
          </div>

          <button
            className="flex md:hidden flex-col gap-[5px] cursor-pointer bg-none border-none p-1 z-[101]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span
              className={`w-[22px] h-[2px] bg-[var(--primary)] rounded-[2px] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-[22px] h-[2px] bg-[var(--primary)] rounded-[2px] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-[22px] h-[2px] bg-[var(--primary)] rounded-[2px] transition-all duration-300 ${
                menuOpen ? "-rotate-45 translate-y-[-7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[99] flex-col items-center justify-center gap-8 ${
          menuOpen ? "flex" : "hidden"
        }`}
        style={{
          background: "rgba(250,248,245,0.98)",
          backdropFilter: "blur(16px)",
        }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="no-underline text-[var(--primary)] serif text-[1.6rem] font-semibold transition-colors duration-300 hover:text-[var(--tertiary)]"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#"
          onClick={closeMenu}
          className="no-underline text-[var(--tertiary)] serif text-[1.6rem] font-semibold"
        >
          Tienda
        </a>
        <a
          href="/login"
          onClick={closeMenu}
          className="no-underline text-[var(--on-neutral)]/30 serif text-[1.2rem] font-medium mt-4"
        >
          Iniciar sesión
        </a>
      </div>
    </>
  );
}
