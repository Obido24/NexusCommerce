import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: {
    default: "NexusCommerce",
    template: "%s | NexusCommerce"
  },
  description: "A production-ready commerce prototype with storefront, checkout, admin operations, and API workflows.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
