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
  const supabase = getSupabaseAdmin();

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
    const { pieza_id, gama_id } = session.metadata || {};

    const { error } = await supabase.from("pedidos").insert({
      stripe_session_id: session.id,
      stripe_customer_email: session.customer_details?.email || "",
      pieza_id: pieza_id || null,
      gama_id: gama_id || null,
      cantidad: 1,
      total: session.amount_total || 0,
      estado: "pagado",
      nombre_cliente: session.customer_details?.name || "",
      metadata: session.metadata || {},
    });

    if (error) {
      console.error("Error guardando pedido:", error.message);
      return new Response("Webhook error", { status: 500 });
    }

    console.log(`✅ Pedido guardado: ${session.id}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
