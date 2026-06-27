"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/colecciones", label: "Colecciones", icon: "📂" },
  { href: "/admin/piezas", label: "Piezas", icon: "🎨" },
  { href: "/admin/encargos", label: "Encargos", icon: "📋" },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = getBrowserSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, [router]);

  async function handleLogout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--neutral)]">
        <p className="text-[var(--secondary)]">Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--neutral)]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-[rgba(0,0,0,0.06)] flex flex-col shrink-0">
        <div className="p-6 border-b border-[rgba(0,0,0,0.06)]">
          <h1 className="serif text-[1.1rem] font-bold text-[var(--primary)]">
            Admin
          </h1>
          <p className="text-xs text-[var(--secondary)] mt-0.5 truncate">
            {user?.email}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--on-neutral)] hover:bg-[rgba(0,0,0,0.04)]"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-[rgba(0,0,0,0.06)]">
          <a
            href="/"
            target="_blank"
            className="block text-xs text-[var(--secondary)] hover:text-[var(--primary)] mb-2 transition-colors"
          >
            🌐 Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-red-600 hover:text-red-800 transition-colors font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
