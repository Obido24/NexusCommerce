import Link from "next/link";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Catalog" },
      { href: "/shop?sort=newest", label: "New arrivals" },
      { href: "/account?tab=wishlist", label: "Wishlist" }
    ]
  },
  {
    title: "Operate",
    links: [
      { href: "/admin", label: "Admin" },
      { href: "/admin/orders", label: "Orders" },
      { href: "/admin/analytics", label: "Analytics" }
    ]
  },
  {
    title: "Support",
    links: [
      { href: "/demo", label: "How to test" },
      { href: "/checkout", label: "Shipping" },
      { href: "https://wa.me/2348106464613", label: "Contact", external: true }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl font-bold text-on-background">
            Midr Store
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-secondary">
            A polished fashion store for clothes, bags, perfume, and a smooth customer shopping experience.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold">{group.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} className="transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
