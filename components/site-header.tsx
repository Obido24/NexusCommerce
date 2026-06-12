import Link from "next/link";
import { Heart, Search, UserCircle } from "lucide-react";
import { CartIconLink } from "@/components/cart-icon-link";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Categories" },
  { href: "/#new-arrivals", label: "New Arrivals" },
  { href: "https://wa.me/2348106464613", label: "Contact", external: true }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-outline-variant bg-surface/95 backdrop-blur">
      <div className="page-shell flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-primary">
            Midr Store
          </Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} className="text-sm font-semibold text-secondary transition hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action="/shop" className="hidden w-full max-w-sm items-center rounded-full border border-outline-variant bg-surface-container-low px-3 md:flex">
          <Search className="h-4 w-4 text-secondary" />
          <input name="q" className="h-9 flex-1 bg-transparent px-2 text-sm outline-none" placeholder="Search products" />
        </form>
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Search products" className="sm:hidden">
            <Link href="/shop">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
            <Link href="/account?tab=wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <CartIconLink />
          <Button asChild variant="ghost" size="icon" aria-label="Account">
            <Link href="/account">
              <UserCircle className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
