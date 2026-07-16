"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/ai-search", label: "AI Search" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 w-full items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Startup <span className="text-accent">Navigator</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="text-sm font-medium text-accent hover:underline">
              Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {status === "authenticated" && session?.user ? (
            <>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-muted-foreground hover:text-foreground">
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
          )}
          <Link href="/ai-search" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90">
            Ask AI
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border px-6 pb-4 sm:px-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="block py-2 text-sm font-medium text-accent" onClick={() => setOpen(false)}>
              Admin
            </Link>
          )}
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="block py-2 text-left text-sm text-muted-foreground hover:text-foreground">
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="block py-2 text-sm text-muted-foreground hover:text-foreground" >
              Log in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}