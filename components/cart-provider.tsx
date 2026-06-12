"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCartItemCount } from "@/lib/cart";
import type { Product } from "@/lib/types";

export type CartPayload = {
  items: Array<{ productId: string; quantity: number; product: Product; total: number }>;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
};

type CartState = {
  cart: CartPayload | null;
  count: number;
  loading: boolean;
  refresh: () => Promise<void>;
  replaceCart: (cart: CartPayload) => void;
};

const CartContext = createContext<CartState>({
  cart: null,
  count: 0,
  loading: true,
  refresh: async () => {},
  replaceCart: () => {}
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartPayload | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const response = await fetch("/api/cart", { cache: "no-store" });
      const payload = await response.json();
      setCart(payload.data?.cart ?? null);
    } finally {
      setLoading(false);
    }
  }

  function replaceCart(nextCart: CartPayload) {
    setCart(nextCart);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const count = getCartItemCount(cart?.items);
  const value = useMemo(() => ({ cart, count, loading, refresh, replaceCart }), [cart, count, loading]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
