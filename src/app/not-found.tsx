import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center sm:px-8">
      <Compass className="text-muted-foreground" size={40} />
      <h1 className="mt-4 text-2xl font-medium">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
          Go home
        </Link>
        <Link href="/explore" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary">
          Explore topics
        </Link>
      </div>
    </div>
  );
}