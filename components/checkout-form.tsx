"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useCart } from "@/components/cart-provider";

export function CheckoutForm() {
  const router = useRouter();
  const { refresh } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setError("");
    setLoading(true);
    const payload = {
      provider: formData.get("provider"),
      couponCode: formData.get("couponCode"),
      address: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        line1: formData.get("line1"),
        city: formData.get("city"),
        state: formData.get("state"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
        label: "Shipping"
      }
    };
    const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    setLoading(false);
    if (!result.ok) {
      setError(result.error?.message ?? "Could not place the order. Please try again.");
      return;
    }
    window.sessionStorage.setItem("midr_latest_order", JSON.stringify(result.data));
    await refresh();
    if (result.data.payment?.mode === "live" && result.data.payment?.redirectUrl) {
      window.location.assign(result.data.payment.redirectUrl);
      return;
    }
    router.push(`/checkout/success?order=${result.data.order.orderNumber}`);
  }

  return (
    <form action={submit} className="surface-card p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Shipping and billing</h2>
          <p className="mt-1 text-sm leading-6 text-secondary">Choose Paystack for real hosted checkout when live keys are configured. Otherwise this creates a safe demo order.</p>
        </div>
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">Demo or live-ready</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          ["firstName", "First name"],
          ["lastName", "Last name"],
          ["line1", "Address"],
          ["city", "City"],
          ["state", "State"],
          ["postalCode", "Postal code"],
          ["country", "Country"]
        ].map(([name, label]) => (
          <label key={name} className={name === "line1" ? "sm:col-span-2" : ""}>
            <span className="text-sm font-semibold">{label}</span>
            <input
              name={name}
              required
              defaultValue={
                name === "country"
                  ? "NG"
                  : name === "city"
                    ? "Lekki"
                    : name === "state"
                      ? "Lagos"
                      : name === "postalCode"
                        ? "105102"
                        : ""
              }
              className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm"
            />
          </label>
        ))}
        <label>
          <span className="text-sm font-semibold">Payment</span>
          <Select name="provider" defaultValue="paystack" className="mt-1">
            <option value="paystack">Paystack live-ready</option>
            <option value="stripe">Stripe demo</option>
            <option value="paypal">PayPal demo</option>
            <option value="flutterwave">Flutterwave demo</option>
            <option value="manual">Pay on delivery demo</option>
          </Select>
        </label>
        <label>
          <span className="text-sm font-semibold">Coupon</span>
          <input name="couponCode" defaultValue="WELCOME10" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
        </label>
      </div>
      <div className="mt-5 flex gap-3 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <p>Paystack redirects to a real payment page only after PAYSTACK_SECRET_KEY is added in Vercel. Until then, checkout stays in demo mode.</p>
      </div>
      {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
      <Button className="mt-6 w-full" disabled={loading}>
        <CreditCard className="h-4 w-4" />
        {loading ? "Preparing checkout" : "Continue to checkout"}
      </Button>
    </form>
  );
}
