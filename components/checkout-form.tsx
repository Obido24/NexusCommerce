"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function CheckoutForm() {
  const router = useRouter();
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
        label: "Shipping",
        userId: "usr_customer"
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
    router.push(`/checkout/success?order=${result.data.order.orderNumber}`);
  }

  return (
    <form action={submit} className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Shipping and billing</h2>
          <p className="mt-1 text-sm text-secondary">Demo checkout creates a test order only. No real payment is taken.</p>
        </div>
        <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary sm:inline-flex">Demo payment</span>
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
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="flutterwave">Flutterwave</option>
            <option value="paystack">Paystack</option>
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
        <p>This prototype simulates Paystack, Flutterwave, Stripe, PayPal, and pay-on-delivery flows so clients can test checkout safely.</p>
      </div>
      {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
      <Button className="mt-6 w-full" disabled={loading}>
        <CreditCard className="h-4 w-4" />
        {loading ? "Placing demo order" : "Place demo order"}
      </Button>
    </form>
  );
}
