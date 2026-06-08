import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export const { handlers, auth, signIn: nextAuthSignIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await signIn(parsed.data.email, parsed.data.password);
        return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = String(token.role ?? "CUSTOMER");
      }
      return session;
    }
  }
});
