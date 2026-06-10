"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoAccounts = {
  customer: {
    email: "customer@midr.store",
    password: "Password123!",
    path: "/account"
  },
  admin: {
    email: "admin@midr.store",
    password: "Password123!",
    path: "/admin"
  }
};

export function DemoLoginButtons() {
  const router = useRouter();
  const [loading, setLoading] = useState<"customer" | "admin" | null>(null);

  async function loginAs(role: "customer" | "admin") {
    setLoading(role);
    const account = demoAccounts[role];
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: account.email, password: account.password })
    });
    setLoading(null);
    if (response.ok) router.push(account.path);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="secondary" size="lg" onClick={() => loginAs("customer")} disabled={loading !== null}>
        <UserCircle className="h-4 w-4" />
        {loading === "customer" ? "Opening customer" : "Login as Customer"}
      </Button>
      <Button type="button" variant="secondary" size="lg" onClick={() => loginAs("admin")} disabled={loading !== null}>
        <ShieldCheck className="h-4 w-4" />
        {loading === "admin" ? "Opening admin" : "Login as Admin"}
      </Button>
    </div>
  );
}
