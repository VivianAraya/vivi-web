import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let _stripe = null;
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return _stripe;
}

let _supabase = null;
function getSupabaseAdmin() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return _supabase;
}

export async function POST(request) {
  const stripe = getStripe();

  // 1. Raw body — NUNCA request.json() con Stripe webhooks
  const body = await request.text();

  // 2. Firma del header
  const signature = request.headers.get("stripe-signature");

  // 3. Construir evento con verificación criptográfica
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Stripe webhook signature error:", err.message);
    return new Response("Webhook error", { status: 400 });
  }

  // Solo nos interesa checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extraer solo lo que existe en metadata
    const pieza_id = session.metadata?.pieza_id || null;
    const gama_id = session.metadata?.gama_id || null;

    // cantidad y total vienen del objeto session, NO de metadata
    const cantidad = 1;
    const total = session.amount_total || 0;
    const email = session.customer_details?.email || "";

    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("pedidos").insert({
        stripe_session_id: session.id,
        stripe_customer_email: email,
        pieza_id,
        gama_id,
        cantidad,
        total,
        estado: "pagado",
        nombre_cliente: session.customer_details?.name || "",
        metadata: session.metadata || {},
      });

      if (error) {
        console.error("❌ Error guardando pedido:", error.message, error.details);
      } else {
        console.log(`✅ Pedido guardado: ${session.id}`);
      }
    } catch (err) {
      console.error("❌ Excepción al guardar pedido:", err.message);
    }
  }

  // Siempre devolver 200 — si falla la BD, Stripe no debe reintentar
  return new Response("OK", { status: 200 });
}
