const links = [
  { icon: "💬", label: "WhatsApp", href: "#" },
  { icon: "✉️", label: "Email", href: "#" },
  { icon: "📸", label: "Instagram", href: "#" },
];

export default function Contacto() {
  return (
    <section id="contacto" className="py-[100px] px-6 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--primary), #243b32)" }}
    >
      <svg
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        viewBox="0 0 600 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 150 C150 100 200 200 300 150 C400 100 450 200 600 150"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M0 180 C150 130 200 230 300 180 C400 130 450 230 600 180"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <circle cx="300" cy="100" r="3" opacity="0.3" />
      </svg>
      <div className="max-w-[600px] mx-auto relative z-[1] reveal">
        <h2 className="text-[var(--on-primary)] mb-3">
          ¿Hablamos?
        </h2>
        <p className="text-white/70 mb-8">
          Para encargos personalizados, preguntas o lo que necesites. Cada pieza
          empieza con una conversación.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-[var(--on-primary)] rounded-[var(--radius-sm)] no-underline text-sm font-medium transition-all duration-300 border border-white/10 hover:bg-white/20 hover:border-white/30 hover:-translate-y-px"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
