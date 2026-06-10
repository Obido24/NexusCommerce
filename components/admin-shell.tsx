import Link from "next/link";
import { BarChart3, Boxes, FolderTree, LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 }
];

export function AdminShell({ children, title, actions }: { children: React.ReactNode; title: string; actions?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 hidden w-[280px] border-r border-outline-variant bg-white p-5 lg:block">
        <Link href="/" className="text-xl font-bold text-primary">
          Midr Store
        </Link>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-secondary">Admin Portal</p>
        <nav className="mt-8 space-y-1">
          {items.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="w-full justify-start">
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-[280px]">
        <header className="sticky top-0 z-30 border-b border-outline-variant bg-surface/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div>
              <p className="label">Midr Store Admin</p>
              <h1 className="text-2xl font-semibold text-on-surface">{title}</h1>
            </div>
            <div className="flex items-center gap-2">{actions}</div>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
