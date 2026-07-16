"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center sm:px-8">
      <AlertTriangle className="text-destructive" size={40} />
      <h1 className="mt-4 text-2xl font-medium">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">
        An unexpected error occurred. You can try again, or head back home.
      </p>
      <div className="mt-6 flex gap-3">
        <button onClick={reset} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90" >
          Try again
        </button>
        <Link href="/" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary" >
          Go home
        </Link>
      </div>
    </div>
  );
}