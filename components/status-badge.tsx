import { Badge } from "@/components/ui/badge";
import type { OrderStatus, ProductStatus } from "@/lib/types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const tone = status === "DELIVERED" || status === "SHIPPED" || status === "PAID" ? "success" : status === "CANCELLED" || status === "REFUNDED" ? "danger" : "warning";
  return <Badge tone={tone}>{status.toLowerCase()}</Badge>;
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const tone = status === "ACTIVE" ? "success" : status === "ARCHIVED" ? "danger" : "warning";
  return <Badge tone={tone}>{status.toLowerCase()}</Badge>;
}
