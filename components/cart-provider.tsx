"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartState = {
  count: number;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartState>({ count: 0, refresh: async () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  async function refresh() {
    const response = await fetch("/api/cart", { cache: "no-store" });
    const payload = await response.json();
    setCount(payload.data?.cart?.items?.length ?? 0);
  }

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(() => ({ count, refresh }), [count]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
