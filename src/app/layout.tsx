import "./globals.css";
import type { Metadata } from "next";
import BottomNavigation from "@/components/BottomNavigation";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "My Alhaq App",
  description:
    "A comprehensive Islamic app built with Next.js, providing prayer times, Quranic verses, Hadith collections, and more to support your spiritual journey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-lg mx-auto relative bg-gray-50 min-h-screen shadow-2xl pb-20">
            <AuthProvider>{children}</AuthProvider>
          </div>

          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
