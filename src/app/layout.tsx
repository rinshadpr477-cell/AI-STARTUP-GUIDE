import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthSessionProvider } from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startup Navigator — Comprehensive Guide to Startups",
  description:
    "AI-powered knowledge platform helping entrepreneurs navigate registration, funding, compliance, hiring, branding, marketing, taxation and growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <AuthSessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthSessionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}