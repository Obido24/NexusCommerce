import Link from "next/link";
import { Heart, LayoutDashboard, Search, ShoppingCart, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/store";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/demo", label: "Demo Guide" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" }
];

export function SiteHeader() {
  const cart = getCart();
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-outline-variant bg-surface/95 backdrop-blur">
      <div className="page-shell flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-primary">
            Midr Store
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-secondary transition hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action="/shop" className="hidden w-full max-w-sm items-center rounded-full border border-outline-variant bg-surface-container-low px-3 sm:flex">
          <Search className="h-4 w-4 text-secondary" />
          <input name="q" className="h-9 flex-1 bg-transparent px-2 text-sm outline-none" placeholder="Search products" />
        </form>
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
            <Link href="/account?tab=wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {cart.items.length}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Account">
            <Link href="/account">
              <UserCircle className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="hidden lg:inline-flex">
            <Link href="/admin">
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
