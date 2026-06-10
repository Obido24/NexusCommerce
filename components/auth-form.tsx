"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setError("");
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload =
      mode === "login"
        ? { email: formData.get("email"), password: formData.get("password") }
        : { name: formData.get("name"), email: formData.get("email"), password: formData.get("password") };
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!result.ok) {
      setError(result.error?.message ?? "Authentication failed");
      return;
    }
    router.push(result.data.user.role === "ADMIN" ? "/admin" : "/account");
  }

  return (
    <form action={submit} className="surface-card w-full max-w-md p-6">
      <h1 className="text-2xl font-semibold">{mode === "login" ? "Secure login" : "Create account"}</h1>
      <p className="mt-2 text-sm text-secondary">Demo credentials: admin@midr.store or customer@midr.store with Password123!</p>
      <div className="mt-5 space-y-4">
        {mode === "register" ? (
          <label>
            <span className="text-sm font-semibold">Name</span>
            <input name="name" required className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
          </label>
        ) : null}
        <label>
          <span className="text-sm font-semibold">Email</span>
          <input name="email" type="email" required defaultValue={mode === "login" ? "admin@midr.store" : ""} className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
        </label>
        <label>
          <span className="text-sm font-semibold">Password</span>
          <input name="password" type="password" required defaultValue={mode === "login" ? "Password123!" : ""} className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
        </label>
      </div>
      {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <Button className="mt-5 w-full">
        <LogIn className="h-4 w-4" />
        {mode === "login" ? "Login" : "Register"}
      </Button>
    </form>
  );
}
