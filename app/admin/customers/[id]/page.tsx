import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, Mail, MapPin, Package, Phone, ShoppingBag, UserCircle } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { CustomerStatusToggle } from "@/components/customer-status-toggle";
import { OrderStatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCustomerProfile, money } from "@/lib/store";

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = getCustomerProfile(id);
  if (!profile) notFound();
  const { user, orders, addresses, wishlist, lifetimeValue, lastOrderAt } = profile;

  return (
    <AdminShell
      title={user.name}
      actions={
        <>
          <Button asChild variant="secondary">
            <Link href="/admin/customers">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <CustomerStatusToggle customerId={user.id} disabled={user.disabled} />
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <section className="surface-card p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-primary">
                <UserCircle className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <Badge tone={user.disabled ? "danger" : "success"} className="mt-2">
                  {user.disabled ? "disabled" : "active"}
                </Badge>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-center gap-2 text-secondary"><Mail className="h-4 w-4" />{user.email}</p>
              <p className="flex items-center gap-2 text-secondary"><Phone className="h-4 w-4" />{user.phone ?? "No phone saved"}</p>
              <p className="flex items-center gap-2 text-secondary"><ShoppingBag className="h-4 w-4" />Joined {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </section>

          <section className="surface-card p-5">
            <p className="label">Customer metrics</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-surface-container-low p-3">
                <p className="text-xs font-semibold text-secondary">Orders</p>
                <p className="mt-1 text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="rounded-md bg-surface-container-low p-3">
                <p className="text-xs font-semibold text-secondary">Lifetime value</p>
                <p className="mt-1 text-2xl font-bold">{money(lifetimeValue)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-secondary">Last order: {lastOrderAt ? new Date(lastOrderAt).toLocaleDateString() : "No orders yet"}</p>
          </section>

          <section className="surface-card p-5">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Saved addresses</h2>
            </div>
            <div className="mt-4 space-y-3">
              {addresses.map((address) => (
                <div key={address.id} className="rounded-md bg-surface-container-low p-3 text-sm leading-6 text-secondary">
                  <p className="font-semibold text-on-surface">{address.label}</p>
                  {address.firstName} {address.lastName}<br />
                  {address.line1}<br />
                  {address.city}, {address.state} {address.postalCode}<br />
                  {address.country}
                </div>
              ))}
              {!addresses.length ? <p className="text-sm text-secondary">No saved addresses.</p> : null}
            </div>
          </section>
        </aside>

        <section className="space-y-6">
          <div className="surface-card overflow-hidden">
            <div className="border-b border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Purchase history</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.08em] text-secondary">
                  <tr><th className="p-4">Order</th><th className="p-4">Date</th><th className="p-4">Items</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Details</th></tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="p-4 font-semibold">{order.orderNumber}</td>
                      <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">{order.items.length}</td>
                      <td className="p-4 font-semibold">{money(order.total)}</td>
                      <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                      <td className="p-4"><Button asChild variant="secondary" size="sm"><Link href={`/admin/orders/${order.id}`}>Open</Link></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Wishlist</h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {wishlist.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="flex gap-3 rounded-md border border-outline-variant p-3 transition hover:bg-surface-container-low">
                  <img src={product.images[0].url} alt={product.images[0].alt} className="h-16 w-16 rounded-md object-cover" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-secondary">{product.category}</p>
                  </div>
                </Link>
              ))}
              {!wishlist.length ? <p className="text-sm text-secondary">No wishlist items.</p> : null}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
