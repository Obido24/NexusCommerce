import { type NextRequest } from "next/server";
import { createOrder, store } from "@/lib/store";
import { checkoutSchema } from "@/lib/validators";
import { createPaymentIntent } from "@/lib/payments";
import { handleApiError, jsonOk, parseJson, rateLimit } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    return jsonOk({ orders: store.orders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 40);
    const input = await parseJson(request, checkoutSchema);
    const address = {
      ...input.address,
      id: input.address.id ?? "addr_checkout",
      userId: input.address.userId ?? "usr_customer",
      label: input.address.label ?? "Shipping"
    };
    const order = createOrder({ address, provider: input.provider, couponCode: input.couponCode });
    const payment = await createPaymentIntent({
      provider: input.provider,
      amount: order.total,
      currency: "USD",
      orderNumber: order.orderNumber,
      customerEmail: order.customerEmail
    });
    return jsonOk({ order, payment }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
