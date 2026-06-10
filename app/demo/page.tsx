import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, LayoutDashboard, MessageCircle, PackageCheck, ShoppingBag, UserCircle } from "lucide-react";
import { CopyDemoMessage } from "@/components/copy-demo-message";
import { DemoLoginButtons } from "@/components/demo-login-buttons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { WhatsAppSupport } from "@/components/whatsapp-support";

const customerSteps = [
  {
    title: "Browse clothes, bags, and perfume",
    description: "Open the shop, search for a product, filter by category, and open a product detail page.",
    href: "/shop",
    icon: ShoppingBag
  },
  {
    title: "Add products to cart",
    description: "Add one or two products, update quantities, and review the cart summary.",
    href: "/cart",
    icon: PackageCheck
  },
  {
    title: "Try checkout",
    description: "Use the demo checkout form, confirm the order, and open the printable invoice. Payments are simulated.",
    href: "/checkout",
    icon: CreditCard
  },
  {
    title: "View customer account",
    description: "Check profile information, order history, wishlist, and saved address.",
    href: "/account",
    icon: UserCircle
  }
];

const adminSteps = [
  "Open the admin dashboard and review total products, orders, customers, and revenue.",
  "Go to Products and create a sample fashion item.",
  "Open Orders and test changing an order status.",
  "Open Inventory and check which items need restocking.",
  "Open Analytics and review product performance."
];

export default function DemoGuidePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-blue-200 bg-blue-50">
          <div className="page-shell py-4">
            <p className="text-sm font-semibold text-primary">Demo Mode: Midr Store is for client testing only. Payments are simulated and no real order will be charged.</p>
          </div>
        </section>

        <section className="page-shell grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="label">Client testing guide</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">Test Midr Store in about 10 minutes.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-secondary">
              Use this page as the walkthrough for your WhatsApp group. It gives testers a simple customer path and a simple admin path.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/shop">
                  Start shopping test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <WhatsAppSupport label="Ask on WhatsApp" />
              <CopyDemoMessage />
            </div>
          </div>

          <aside className="surface-card h-fit p-5">
            <h2 className="text-xl font-semibold">Demo logins</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div className="rounded-md bg-surface-container-low p-3">
                <p className="font-semibold">Customer</p>
                <p className="mt-1 font-label text-secondary">customer@midr.store</p>
                <p className="font-label text-secondary">Password123!</p>
              </div>
              <div className="rounded-md bg-surface-container-low p-3">
                <p className="font-semibold">Admin</p>
                <p className="mt-1 font-label text-secondary">admin@midr.store</p>
                <p className="font-label text-secondary">Password123!</p>
                <p className="mt-2 text-xs font-semibold text-primary">Or use Admin Demo Login with no password.</p>
              </div>
            </div>
            <div className="mt-5">
              <DemoLoginButtons />
            </div>
          </aside>
        </section>

        <section className="border-y border-outline-variant bg-surface-container-low">
          <div className="page-shell py-12">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="label">Customer checklist</p>
                <h2 className="mt-2 text-3xl font-semibold">What clients should test first</h2>
              </div>
              <Button asChild variant="secondary">
                <Link href="/shop">Open shop</Link>
              </Button>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {customerSteps.map((step, index) => (
                <Link key={step.title} href={step.href} className="surface-card p-5 transition hover:-translate-y-0.5 hover:shadow-ambient">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-primary">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="font-label text-sm font-bold text-secondary">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{step.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-blue-50 text-primary">
                <LayoutDashboard className="h-5 w-5" />
              </span>
              <div>
                <p className="label">Admin checklist</p>
                <h2 className="text-2xl font-semibold">What the business owner should test</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {adminSteps.map((step) => (
                <div key={step} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                  <p className="text-sm leading-6 text-secondary">{step}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6">
              <Link href="/admin">Open admin dashboard</Link>
            </Button>
          </div>

          <div className="rounded-lg bg-slate-950 p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-200">Feedback to collect</p>
            <h2 className="mt-3 text-3xl font-semibold">Ask testers for specific feedback.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Was the homepage clear?",
                "Could you find clothes, bags, and perfume quickly?",
                "Was adding to cart easy?",
                "Was checkout understandable?",
                "Did the admin dashboard make sense?",
                "What should be improved before real launch?"
              ].map((question) => (
                <div key={question} className="rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  {question}
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/2348106464613?text=Hi%2C%20I%20tested%20the%20Midr%20Store%20demo%20and%20I%20have%20feedback."
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-bold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Send feedback on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
