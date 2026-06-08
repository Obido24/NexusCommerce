import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl font-bold text-on-background">
            NexusCommerce
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-secondary">
            A complete commerce operating system for premium storefronts, high-density inventory teams, and modern checkout workflows.
          </p>
        </div>
        {[
          ["Shop", "Catalog", "Best sellers", "Wishlist"],
          ["Operate", "Admin", "Orders", "Analytics"],
          ["Support", "Docs", "Shipping", "Contact"]
        ].map(([title, ...items]) => (
          <div key={title}>
            <h3 className="text-sm font-bold">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
