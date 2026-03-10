import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getServerSession(authOptions);

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  if (session && (session as any).accessToken) {
    headers.set("Authorization", `Bearer ${(session as any).accessToken}`);
  }

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}
