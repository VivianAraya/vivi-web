import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let _stripe = null;
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return _stripe;
}

export async function POST(request) {
  try {
    const stripe = getStripe();
    const body = await request.json();
    const { pieza_id, gama_id, titulo, precio, emoji } = body;

    if (!pieza_id) {
      return Response.json({ error: "Falta pieza_id" }, { status: 400 });
    }

    // Construir nombre del producto para Stripe
    let productName = titulo || "Pieza única Vivián Araya";
    if (emoji) productName = `${emoji} ${productName}`;

    // Envío: 5 € (500 céntimos) — tarifa plana
    const shippingCents = 500;

    const baseUrl = "http://akzjbx2tnc2jgixao72blhm.185.185.82.16.sslip.io";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              description: "Pieza única hecha a mano · Vivián Araya",
            },
            unit_amount: precio, // en céntimos
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Gastos de envío",
              description: "Envío nacional certificado",
            },
            unit_amount: shippingCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/tienda?success=true`,
      cancel_url: `${baseUrl}/tienda?canceled=true`,
      metadata: {
        pieza_id,
        gama_id: gama_id || "",
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
