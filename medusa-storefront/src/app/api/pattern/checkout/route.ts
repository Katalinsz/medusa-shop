// src/app/api/pattern/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime, not Edge

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL!; // e.g. http://localhost:9000
const PROVIDER_ID = "pp_stripe";                       // your Medusa payment provider id
const DEFAULT_REGION_COUNTRY = "SE";                   // pick the country for your region

// If you use VARIANTS for price tiers, fill these with real Medusa variant ids:
const TIER_VARIANTS: Record<
  "hat" | "sweater" | "cardigan" | "mittens",
  { basic: string; plus: string; pro: string }
> = {
  hat: { basic: "variant_id_hat_basic", plus: "variant_id_hat_plus", pro: "variant_id_hat_pro" },
  sweater: { basic: "", plus: "", pro: "" },
  cardigan: { basic: "", plus: "", pro: "" },
  mittens: { basic: "", plus: "", pro: "" },
};

// If you use CUSTOM LINE ITEMS instead, define prices in öre:
const TIER_PRICES_ORE = { basic: 4000, plus: 7900, pro: 11900 } as const;

export async function POST(req: NextRequest) {
  try {
    const { productType, tier, email, config, selectedImage } = await req.json() as {
      productType: "hat" | "sweater" | "cardigan" | "mittens";
      tier: "basic" | "plus" | "pro";
      email: string;
      config: any;
      selectedImage?: string | null;
    };

    if (!MEDUSA_URL) throw new Error("NEXT_PUBLIC_MEDUSA_URL is not set");
    if (!email) throw new Error("Missing email");
    if (!["basic", "plus", "pro"].includes(tier)) throw new Error("Invalid tier");

    // 1) Create cart
    const cartRes = await fetch(`${MEDUSA_URL}/store/carts`, { method: "POST" });
    if (!cartRes.ok) throw new Error("Failed to create cart");
    const { cart } = await cartRes.json();

    // 2) Set email + minimal addresses (sets region via country_code)
    const updRes = await fetch(`${MEDUSA_URL}/store/carts/${cart.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        shipping_address: { country_code: DEFAULT_REGION_COUNTRY },
        billing_address: { country_code: DEFAULT_REGION_COUNTRY },
      }),
    });
    if (!updRes.ok) throw new Error("Failed to set email/addresses");

    // 3) Add line item (pick ONE approach)

    // A) VARIANT approach (preferred if you created variants)
    const variantId = TIER_VARIANTS[productType]?.[tier];
    let addItemOk = true;

    if (variantId) {
      const addItemRes = await fetch(`${MEDUSA_URL}/store/carts/${cart.id}/line-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant_id: variantId,
          quantity: 1,
          metadata: {
            product_type: productType,
            tier,
            config,
            selected_image: selectedImage ?? null,
            is_digital_pattern: true,
          },
        }),
      });
      addItemOk = addItemRes.ok;
    } else {
      // B) CUSTOM LINE ITEM approach
      const addItemRes = await fetch(`${MEDUSA_URL}/store/carts/${cart.id}/line-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${productType} pattern (${tier})`,
          unit_price: TIER_PRICES_ORE[tier],
          quantity: 1,
          requires_shipping: false,
          metadata: {
            product_type: productType,
            tier,
            config,
            selected_image: selectedImage ?? null,
            is_digital_pattern: true,
          },
        }),
      });
      addItemOk = addItemRes.ok;
    }

    if (!addItemOk) throw new Error("Failed to add line item");

    // 4) Create + select payment session
    const sessRes = await fetch(`${MEDUSA_URL}/store/carts/${cart.id}/payment-sessions`, { method: "POST" });
    if (!sessRes.ok) throw new Error("Failed to create payment sessions");

    const selectRes = await fetch(`${MEDUSA_URL}/store/carts/${cart.id}/payment-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider_id: PROVIDER_ID }),
    });
    if (!selectRes.ok) throw new Error("Failed to select payment session");

    // 5) Read client secret
    const cartAfterRes = await fetch(`${MEDUSA_URL}/store/carts/${cart.id}`);
    const { cart: cartAfter } = await cartAfterRes.json();
    const clientSecret = cartAfter?.payment_session?.data?.client_secret;

    return NextResponse.json({ clientSecret, cartId: cart.id });
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Error" }, { status: 400 });
  }
}
