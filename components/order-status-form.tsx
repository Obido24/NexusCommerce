"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { OrderStatus } from "@/lib/types";

export function OrderStatusForm({ orderId, initialStatus }: { orderId: string; initialStatus: OrderStatus }) {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("");
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: formData.get("status") })
    });
    const result = await response.json();
    setMessage(result.ok ? "Updated" : "Login as admin to update");
  }

  return (
    <form action={submit} className="flex items-center gap-2">
      <Select name="status" defaultValue={initialStatus} className="h-8 w-36 text-xs">
        {["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"].map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </Select>
      <Button size="sm" variant="secondary">
        <Save className="h-3.5 w-3.5" />
      </Button>
      {message ? <span className="text-xs font-semibold text-primary">{message}</span> : null}
    </form>
  );
}
