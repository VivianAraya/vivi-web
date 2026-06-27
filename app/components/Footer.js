const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#colecciones", label: "Colecciones" },
  { href: "#animales", label: "Animales de Poder" },
  { href: "#tintes", label: "Tintes" },
  { href: "#encargos", label: "Encargos" },
  { href: "#", label: "Tienda" },
  { href: "#", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60 py-14 px-6 text-center text-sm">
      <div className="serif text-[1.3rem] text-[var(--on-primary)] mb-2.5">
        Vivián Araya
      </div>
      <p>Arte y tintes naturales · Galicia</p>
      <div className="flex gap-5 justify-center flex-wrap my-4">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-white/45 no-underline transition-colors duration-300 hover:text-[var(--tertiary)] text-[0.82rem]"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="opacity-35 text-[0.78rem] mt-5">
        © 2026 Vivián Araya. Piezas únicas hechas a mano.
      </p>
    </footer>
  );
}
