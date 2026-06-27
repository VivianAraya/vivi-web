"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--neutral)] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-[var(--radius-md)] shadow-[var(--shadow)] p-8 md:p-10">
        <h1 className="serif text-[1.8rem] font-bold text-[var(--primary)] text-center mb-2">
          Vivián Araya
        </h1>
        <p className="text-center text-sm text-[var(--secondary)] mb-8">
          Panel de administración
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--on-neutral)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              placeholder="vivi@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--on-neutral)] mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-[var(--radius-sm)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--primary)] text-white rounded-[var(--radius-sm)] font-semibold text-sm transition-all hover:bg-[var(--whisper)] disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-xs text-[var(--secondary)] text-center mt-6 opacity-60">
          Acceso exclusivo para administración
        </p>
      </div>
    </div>
  );
}
