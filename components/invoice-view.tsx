"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Printer, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/store";

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
    createdAt: string;
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

export function InvoiceView({ orderNumber }: { orderNumber?: string }) {
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

  const order = stored?.order;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-5 flex flex-wrap justify-between gap-3 print:hidden">
        <Button asChild variant="secondary">
          <Link href="/checkout/success">
            <ShoppingBag className="h-4 w-4" />
            Back to confirmation
          </Link>
        </Button>
        <Button type="button" onClick={() => window.print()}>
          <Printer className="h-4 w-4" />
          Print invoice
        </Button>
      </div>

      <section className="surface-card bg-white p-8 print:border-0 print:shadow-none">
        <div className="flex flex-col gap-6 border-b border-outline-variant pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">Midr Store</p>
            <p className="mt-2 text-sm leading-6 text-secondary">Clothes, bags, perfume, and accessories.</p>
            <p className="mt-1 text-sm text-secondary">WhatsApp: +2348106464613</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="label">Invoice</p>
            <h1 className="mt-1 text-3xl font-semibold">{order?.orderNumber ?? orderNumber ?? "Demo order"}</h1>
            <p className="mt-2 text-sm text-secondary">{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid gap-6 border-b border-outline-variant py-6 sm:grid-cols-2">
          <div>
            <p className="label">Bill to</p>
            <p className="mt-2 font-semibold">{order?.customerName ?? "Demo customer"}</p>
            <p className="text-sm text-secondary">{order?.customerEmail ?? "customer@midr.store"}</p>
          </div>
          <div>
            <p className="label">Ship to</p>
            {order ? (
              <p className="mt-2 text-sm leading-6 text-secondary">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                <br />
                {order.shippingAddress.line1}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-secondary">Complete checkout first to populate shipping details.</p>
            )}
          </div>
        </div>

        <div className="overflow-x-auto py-6">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-outline-variant text-xs uppercase tracking-[0.08em] text-secondary">
              <tr>
                <th className="py-3">Item</th>
                <th className="py-3 text-center">Qty</th>
                <th className="py-3 text-right">Unit</th>
                <th className="py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {(order?.items ?? []).map((item) => (
                <tr key={item.name}>
                  <td className="py-4 font-semibold">{item.name}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">{money(item.unitPrice)}</td>
                  <td className="py-4 text-right font-semibold">{money(item.total)}</td>
                </tr>
              ))}
              {!order ? (
                <tr>
                  <td className="py-8 text-center text-secondary" colSpan={4}>
                    No browser-saved checkout found yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="ml-auto max-w-sm space-y-2 border-t border-outline-variant pt-5 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{money(order?.subtotal ?? 0)}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>{money(order?.discount ?? 0)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>{money(order?.tax ?? 0)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{money(order?.shipping ?? 0)}</span></div>
          <div className="flex justify-between border-t border-outline-variant pt-3 text-xl font-bold"><span>Total</span><span>{money(order?.total ?? 0)}</span></div>
        </div>

        <div className="mt-8 rounded-md bg-blue-50 p-4 text-sm text-primary">
          Demo receipt only. Production launch would include verified payment status, tax rules, order fulfillment tracking, and email delivery.
        </div>
      </section>
    </div>
  );
}
