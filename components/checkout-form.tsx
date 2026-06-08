"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function CheckoutForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
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
    if (result.ok) router.push(`/checkout/success?order=${result.data.order.orderNumber}`);
  }

  return (
    <form action={submit} className="surface-card p-5">
      <h2 className="text-xl font-semibold">Shipping and billing</h2>
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
            <input name={name} required defaultValue={name === "country" ? "US" : ""} className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
          </label>
        ))}
        <label>
          <span className="text-sm font-semibold">Payment</span>
          <Select name="provider" defaultValue="stripe" className="mt-1">
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="flutterwave">Flutterwave</option>
            <option value="paystack">Paystack</option>
            <option value="manual">Manual demo</option>
          </Select>
        </label>
        <label>
          <span className="text-sm font-semibold">Coupon</span>
          <input name="couponCode" defaultValue="WELCOME10" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
        </label>
      </div>
      <Button className="mt-6 w-full" disabled={loading}>
        <CreditCard className="h-4 w-4" />
        {loading ? "Placing order" : "Place secure order"}
      </Button>
    </form>
  );
}
