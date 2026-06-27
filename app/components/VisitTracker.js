"use client";

import { useEffect } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function VisitTracker() {
  useEffect(() => {
    const supabase = getBrowserSupabase();
    const path = window.location.pathname;
    const referrer = document.referrer || "";

    supabase.from("visitas").insert({
      path,
      referrer,
    }).then(({ error }) => {
      if (error) console.debug("Visit track error:", error.message);
    });
  }, []);

  return null; // invisible
}
