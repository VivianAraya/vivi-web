import { createClient } from "@supabase/supabase-js";

// Browser-side Supabase client
let supabase = null;

export function getBrowserSupabase() {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  supabase = createClient(url, key);
  return supabase;
}

// Submit a custom order (anon INSERT — no SELECT to avoid RLS block)
export async function submitEncargo({ nombre, email, animal, gama, mensaje }) {
  const client = getBrowserSupabase();
  const { error } = await client
    .from("encargos")
    .insert({ nombre, email, animal, gama, mensaje });
  if (error) throw error;
  return { ok: true };
}
