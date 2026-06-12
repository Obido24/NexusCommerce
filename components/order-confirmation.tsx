"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, Mail, MessageCircle, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/store";
import type { Order } from "@/lib/types";

type StoredOrder = {
  order: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: Array<{ name: string; quantity: number; unitPrice: number; total: number }>;
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
    paymentProvider: string;
    paymentStatus?: string;
    shippingAddress: {
      firstName: string;
      lastName: string;
      line1: string;
      city: string;
      state: string;
      country: string;
    };
  };
  payment: {
    reference: string;
    status: string;
  };
};

export function OrderConfirmation({ orderNumber, fallbackOrder }: { orderNumber?: string; fallbackOrder?: Order }) {
  const [stored, setStored] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("midr_latest_order");
    if (!raw) return;
    try {
      setStored(JSON.parse(raw) as StoredOrder);
    } catch {
      setStored(null);
    }
  }, []);

  const displayOrder = stored?.order ?? fallbackOrder;
  const whatsappText = useMemo(() => {
    const order = displayOrder?.orderNumber ?? orderNumber ?? "my demo order";
    return encodeURIComponent(`Hi, I tested Midr Store checkout. My demo order is ${order}.`);
  }, [displayOrder?.orderNumber, orderNumber]);

  const paymentStatus = stored?.payment.status ?? displayOrder?.paymentStatus ?? "PAID";
  const isPending = paymentStatus === "PENDING";

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_360px]">
      <section className="surface-card p-5 sm:p-8">
        <CheckCircle2 className={`h-12 w-12 sm:h-14 sm:w-14 ${isPending ? "text-warning" : "text-success"}`} />
        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{isPending ? "Payment started" : "Order confirmed"}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
          Order {displayOrder?.orderNumber ?? orderNumber ?? "created"} {isPending ? "is waiting for payment confirmation from the hosted checkout." : "has been added to the checkout flow."}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Payment", paymentStatus],
            ["Provider", displayOrder?.paymentProvider ?? "demo"],
            ["Reference", stored?.payment.reference ?? "demo-reference"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-md bg-surface-container-low p-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">{label}</p>
              <p className="mt-1 truncate font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {displayOrder ? (
          <div className="mt-7 overflow-hidden rounded-lg border border-outline-variant">
            <div className="bg-surface-container-low p-4">
              <h2 className="font-semibold">Order items</h2>
            </div>
            <div className="divide-y divide-outline-variant">
              {displayOrder.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4 p-4 text-sm">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-secondary">Qty {item.quantity} x {money(item.unitPrice)}</p>
                  </div>
                  <span className="font-semibold">{money(item.total)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-outline-variant bg-white p-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{money(displayOrder.subtotal)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>{money(displayOrder.discount)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{money(displayOrder.tax)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{money(displayOrder.shipping)}</span></div>
              <div className="flex justify-between border-t border-outline-variant pt-2 text-lg font-bold"><span>Total</span><span>{money(displayOrder.total)}</span></div>
            </div>
          </div>
        ) : (
          <div className="mt-7 rounded-md bg-blue-50 p-4 text-sm text-primary">
            Open this page immediately after checkout to see the full browser-saved order summary.
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/account">
              <PackageCheck className="h-4 w-4" />
              View account
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href={`/invoice?order=${displayOrder?.orderNumber ?? orderNumber ?? ""}`}>
              <Download className="h-4 w-4" />
              View invoice
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <a href={`https://wa.me/2348106464613?text=${whatsappText}`} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Send feedback
            </a>
          </Button>
        </div>
      </section>

      <aside className="surface-card h-fit p-5 lg:sticky lg:top-20">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-primary">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <p className="label">Launch behavior</p>
            <h2 className="font-semibold">What happens next</h2>
          </div>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-6 text-secondary">
          <p>In demo mode, checkout stores a test order and shows confirmation immediately.</p>
          <p>With Paystack keys configured, checkout redirects to Paystack and returns here after hosted payment.</p>
        </div>
        <Button asChild className="mt-5 w-full" variant="secondary">
          <Link href="/admin/orders">Open admin orders</Link>
        </Button>
      </aside>
    </div>
  );
}
