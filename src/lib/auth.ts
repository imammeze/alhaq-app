import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Laravel API",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(credentials),
          });
          const data = await res.json();
          if (res.ok && data.success && data.data.token) {
            return {
              id: data.data.user.id.toString(),
              name: data.data.user.name,
              email: data.data.user.email,
              accessToken: data.data.token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        if (token?.accessToken) {
          await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.accessToken}`,
            },
          });
        }
      } catch (error) {
        console.error("Gagal menghapus token di Laravel:", error);
      }
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
