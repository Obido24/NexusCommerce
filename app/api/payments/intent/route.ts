import { type NextRequest } from "next/server";
import { createPaymentIntent } from "@/lib/payments";
import { handleApiError, jsonOk, rateLimit } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 40);
    const input = await request.json();
    const payment = await createPaymentIntent(input);
    return jsonOk({ payment });
  } catch (error) {
    return handleApiError(error);
  }
}
