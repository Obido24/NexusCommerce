import Link from "next/link";
import { Heart, MapPin, Package, User, type LucideIcon } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/status-badge";
import { getWishlistProducts, store } from "@/lib/store";

export default function AccountPage() {
  const orders = store.orders.filter((order) => order.userId === "usr_customer");
  const wishlist = getWishlistProducts();
  const user = store.users.find((item) => item.id === "usr_customer")!;
  const accountItems: Array<{ icon: LucideIcon; label: string }> = [
    { icon: User, label: "Profile management" },
    { icon: Package, label: "Order history" },
    { icon: Heart, label: "Wishlist" },
    { icon: MapPin, label: "Saved addresses" }
  ];

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-10">
        <p className="label">Customer dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold">Welcome back, {user.name.split(" ")[0]}</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="surface-card h-fit p-4">
            {accountItems.map(({ icon: Icon, label }) => (
              <button key={label} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold hover:bg-surface-container-low">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </button>
            ))}
          </aside>
          <section className="space-y-6">
            <div className="surface-card p-5">
              <h2 className="text-xl font-semibold">Profile</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div><p className="label">Name</p><p className="mt-1 font-semibold">{user.name}</p></div>
                <div><p className="label">Email</p><p className="mt-1 font-semibold">{user.email}</p></div>
                <div><p className="label">Phone</p><p className="mt-1 font-semibold">{user.phone}</p></div>
                <div><p className="label">Role</p><p className="mt-1 font-semibold">{user.role}</p></div>
              </div>
            </div>
            <div className="surface-card overflow-hidden">
              <div className="border-b border-outline-variant p-5"><h2 className="text-xl font-semibold">Order history</h2></div>
              <div className="divide-y divide-outline-variant">
                {orders.map((order) => (
                  <div key={order.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
                    <div><p className="font-semibold">{order.orderNumber}</p><p className="text-sm text-secondary">{order.items.length} items · {new Date(order.createdAt).toLocaleDateString()}</p></div>
                    <OrderStatusBadge status={order.status} />
                    <Button asChild variant="secondary" size="sm"><Link href={`/api/orders/${order.id}`}>View JSON</Link></Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card p-5">
              <h2 className="text-xl font-semibold">Wishlist</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {wishlist.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`} className="flex gap-3 rounded-md border border-outline-variant p-3">
                    <img src={product.images[0].url} alt={product.images[0].alt} className="h-16 w-16 rounded-md object-cover" />
                    <div><p className="font-semibold">{product.name}</p><p className="text-sm text-secondary">{product.category}</p></div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
