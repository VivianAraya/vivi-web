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
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return Response.json({ error: "Falta firma o webhook secret" }, { status: 400 });
  }

  let event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature error:", error.message);
    return Response.json({ error: error.message }, { status: 400 });
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
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.log(`✅ Pedido guardado: ${session.id}`);
  }

  return Response.json({ received: true });
}
