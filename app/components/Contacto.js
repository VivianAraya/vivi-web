const links = [
  { icon: "💬", label: "WhatsApp", href: "#" },
  { icon: "✉️", label: "Email", href: "#" },
  { icon: "📸", label: "Instagram", href: "#" },
  { icon: "📝", label: "Formulario", href: "#" },
];

export default function Contacto() {
  return (
    <section className="py-[80px] px-6 md:px-12 bg-[var(--primary)] text-center">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="section-title text-[var(--on-primary)] mb-2">
          ¿Hablamos?
        </h2>
        <p className="section-subtitle text-white/75 mb-6">
          Para encargos personalizados, preguntas o lo que necesites
        </p>
        <div className="flex gap-4 justify-center flex-wrap mt-6">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-[var(--on-primary)] rounded-[var(--radius-sm)] no-underline text-sm font-medium transition-soft hover:bg-white/20"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
