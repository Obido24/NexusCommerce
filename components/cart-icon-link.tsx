"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function CartIconLink() {
  const { count } = useCart();

  return (
    <Button asChild variant="ghost" size="icon" aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}>
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
