"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/lib/actions/auth";

const initialState: { error?: string; success?: boolean } = {};

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <div className="mx-auto max-w-sm px-6 py-24 sm:px-8 lg:px-10">
      <h1 className="text-3xl font-medium tracking-tight">Create an account</h1>
      <p className="mt-2 text-muted-foreground">
        Save your search history and track your progress.
      </p>

      <form action={formAction} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Full name</label>
          <input id="name" name="name" required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" required minLength={8} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <button type="submit" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60">
          {pending && <Loader2 size={16} className="animate-spin" />}
          {pending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}