import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client — for data fetching at build time
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// Helper: fetch all active collections
export async function getColecciones() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("colecciones")
    .select("*")
    .eq("activa", true)
    .order("orden");
  if (error) throw error;
  return data;
}

// Helper: fetch all available piezas with their gamas
export async function getPiezas() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("piezas")
    .select("*, gamas(*)")
    .eq("disponible", true)
    .order("created_at");
  if (error) throw error;
  return data;
}

// Helper: fetch animal de poder piezas with gamas
export async function getAnimalesDePoder() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("piezas")
    .select("*, gamas(*)")
    .eq("tipo", "animal_de_poder")
    .eq("disponible", true)
    .order("created_at");
  if (error) throw error;
  return data;
}
