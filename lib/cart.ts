import type { CartItem } from "@/lib/types";

export function getCartItemCount(cartItems: Array<Pick<CartItem, "quantity">> | null | undefined) {
  return (cartItems ?? []).reduce((count, item) => {
    const quantity = Number(item.quantity);
    return count + (Number.isFinite(quantity) && quantity > 0 ? quantity : 0);
  }, 0);
}
