import type { PaymentProvider } from "@/lib/types";

export type PaymentIntentInput = {
  provider: PaymentProvider;
  amount: number;
  currency: string;
  orderNumber?: string;
  customerEmail?: string;
};

export type PaymentIntentResult = {
  provider: PaymentProvider;
  reference: string;
  status: "PENDING" | "PAID";
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
      redirectUrl: `/checkout/success?provider=${this.provider}&amount=${input.amount}`
    };
  }
}

export function getPaymentGateway(provider: PaymentProvider): PaymentGateway {
  switch (provider) {
    case "stripe":
    case "paypal":
    case "flutterwave":
    case "paystack":
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
