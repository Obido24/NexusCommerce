"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WishlistToggleButton({ productId, productName }: { productId: string; productName: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });
    const result = await response.json();
    if (result.ok) setSaved(result.data.productIds.includes(productId));
    setLoading(false);
  }

  return (
    <Button type="button" variant="ghost" size="icon" onClick={toggle} disabled={loading} aria-label={`${saved ? "Remove" : "Add"} ${productName} ${saved ? "from" : "to"} wishlist`}>
      <Heart className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
    </Button>
  );
}
