import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="w-full px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Startup Navigator. Comprehensive guide to startups.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
            <Link href="/resources" className="hover:text-foreground">Resources</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}