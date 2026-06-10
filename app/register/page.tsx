import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 block text-center text-2xl font-bold text-primary">Midr Store</Link>
        <AuthForm mode="register" />
        <p className="mt-4 text-center text-sm text-secondary">Already registered? <Link className="font-semibold text-primary" href="/login">Login</Link></p>
      </div>
    </main>
  );
}
