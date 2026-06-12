import type { PaymentProvider } from "@/lib/types";

export type PaymentIntentInput = {
  provider: PaymentProvider;
  amount: number;
  currency: string;
  orderNumber?: string;
  customerEmail?: string;
  callbackUrl?: string;
};

export type PaymentIntentResult = {
  provider: PaymentProvider;
  reference: string;
  status: "PENDING" | "PAID";
  mode: "demo" | "live";
  redirectUrl?: string;
};

export interface PaymentGateway {
  createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult>;
}

class MockGateway implements PaymentGateway {
  constructor(private provider: PaymentProvider) {}

  async createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult> {
    return {
      provider: this.provider,
      reference: `${this.provider}_${Date.now()}`,
      status: "PAID",
      mode: "demo",
      redirectUrl: `/checkout/success?provider=${this.provider}&amount=${input.amount}`
    };
  }
}

class PaystackGateway implements PaymentGateway {
  async createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult> {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) return new MockGateway("paystack").createIntent(input);

    const callbackUrl = input.callbackUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/checkout/success`;
    const amountMultiplier = Number(process.env.PAYSTACK_AMOUNT_MULTIPLIER ?? "1");
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: input.customerEmail ?? "customer@midr.store",
        amount: Math.round(input.amount * amountMultiplier * 100),
        currency: process.env.PAYSTACK_CURRENCY ?? "NGN",
        reference: input.orderNumber,
        callback_url: callbackUrl,
        metadata: {
          orderNumber: input.orderNumber,
          store: "Midr Store"
        }
      })
    });

    if (!response.ok) {
      throw new Error("Paystack checkout could not be initialized.");
    }

    const payload = (await response.json()) as {
      data?: {
        authorization_url?: string;
        reference?: string;
      };
    };

    return {
      provider: "paystack",
      reference: payload.data?.reference ?? input.orderNumber ?? `paystack_${Date.now()}`,
      status: "PENDING",
      mode: "live",
      redirectUrl: payload.data?.authorization_url
    };
  }
}

export function getPaymentGateway(provider: PaymentProvider): PaymentGateway {
  switch (provider) {
    case "paystack":
      return new PaystackGateway();
    case "stripe":
    case "paypal":
    case "flutterwave":
    case "manual":
      return new MockGateway(provider);
    default:
      return new MockGateway("manual");
  }
}

export async function createPaymentIntent(input: PaymentIntentInput) {
  const gateway = getPaymentGateway(input.provider);
  return gateway.createIntent(input);
}
