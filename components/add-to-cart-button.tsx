"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ productId, quantity = 1, className }: { productId: string; quantity?: number; className?: string }) {
  const [loading, setLoading] = useState(false);
  const { refresh } = useCart();

  async function add() {
    setLoading(true);
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity })
    });
    await refresh();
    setLoading(false);
  }

  return (
    <Button className={className ?? "w-full"} onClick={add} disabled={loading}>
      <ShoppingCart className="h-4 w-4" />
      {loading ? "Adding" : "Add to cart"}
    </Button>
  );
}
