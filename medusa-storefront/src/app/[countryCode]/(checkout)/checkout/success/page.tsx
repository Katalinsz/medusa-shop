"use client";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState<"working"|"done"|"error">("working");

  useEffect(() => {
    const cartId = new URL(window.location.href).searchParams.get("cart_id");
    if (!cartId) return setStatus("error");

    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_URL}/store/carts/${cartId}/complete`, {
          method: "POST",
        });
        if (!res.ok) throw new Error();
        setStatus("done");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  if (status === "working") return <p>Avslutar beställningen…</p>;
  if (status === "error")   return <p>Något gick fel. Kontakta oss.</p>;
  return <p>Tack! Din beställning är klar.</p>;
}
