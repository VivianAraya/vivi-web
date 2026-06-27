// Default illustrations for each collection (fallback when no image_url)
const defaultIllustrations = {
  "animales-de-poder": (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50">
      <path d="M40 75 C25 70 15 50 20 35 C25 20 35 10 40 15 C45 20 40 35 45 50 C50 60 55 70 40 75Z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="30" cy="22" r="2.5"/><circle cx="48" cy="28" r="2"/>
      <path d="M40 15 C38 25 42 35 40 50" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
    </svg>
  ),
  "mini-cuadros": (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50">
      <ellipse cx="40" cy="65" rx="30" ry="8" stroke="currentColor" strokeWidth="1"/>
      <path d="M40 65 L40 20 M40 35 C25 30 20 18 30 12 C40 18 40 28 40 35 M40 35 C55 30 60 18 50 12 C40 18 40 28 40 35" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="28" cy="30" r="3" opacity="0.6"/><circle cx="52" cy="30" r="2.5" opacity="0.6"/>
    </svg>
  ),
  "color-botanico": (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50">
      <circle cx="35" cy="30" r="14" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="50" cy="45" r="10" stroke="currentColor" strokeWidth="1"/>
      <circle cx="28" cy="52" r="7" stroke="currentColor" strokeWidth="0.8"/>
      <path d="M22 45 C25 42 28 40 32 38 M42 38 C46 42 48 46 49 48" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
    </svg>
  ),
  "textiles": (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] opacity-50">
      <path d="M20 25 L60 25 M20 40 L60 40 M20 55 L60 55" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <path d="M40 20 L40 60 M25 20 L25 60 M55 20 L55 60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" opacity="0.5"/><circle cx="48" cy="48" r="3" opacity="0.4"/>
    </svg>
  ),
};

const backgroundColors = ["bg-1", "bg-2", "bg-3", "bg-4"];

export default function Colecciones({ colecciones = [] }) {
  // If no data from Supabase, don't render (avoids showing empty grid)
  const hasData = colecciones.length > 0;

  return (
    <section id="colecciones" className="py-[100px] px-6 md:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="section-eyebrow mb-3">Colecciones</div>
          <h2 className="section-title mb-2">Cuatro líneas donde la naturaleza toma forma</h2>
        </div>

        {hasData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colecciones.map((col, i) => (
              <a
                key={col.id}
                href={`#${col.slug}`}
                className="bg-[var(--neutral)] rounded-[var(--radius-md)] overflow-hidden no-underline text-inherit block transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[var(--shadow-hover)] border border-transparent hover:border-[rgba(107,99,91,0.1)] reveal"
              >
                <div className={`h-[180px] flex items-center justify-center ${backgroundColors[i % 4]}`}>
                  {col.imagen_url ? (
                    <img src={col.imagen_url} alt={col.nombre} className="w-full h-full object-cover" />
                  ) : (
                    defaultIllustrations[col.slug] || (
                      <span className="text-5xl opacity-30">🌿</span>
                    )
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[1.15rem] text-[var(--primary)] mb-1.5">{col.nombre}</h3>
                  <p className="text-sm text-[var(--secondary)] leading-relaxed">{col.descripcion}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--secondary)]">Cargando colecciones...</p>
        )}
      </div>
    </section>
  );
}
