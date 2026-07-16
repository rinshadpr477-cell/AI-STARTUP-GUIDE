"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email.";
    if (message.length < 10) nextErrors.message = "Message should be at least 10 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setTimeout(() => setStatus("success"), 800);
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center sm:px-8 lg:px-10">
        <CheckCircle2 className="mx-auto text-accent" size={40} />
        <h1 className="mt-4 text-2xl font-medium">Message sent</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16 sm:px-8 lg:px-10">
      <h1 className="text-3xl font-medium tracking-tight">Contact us</h1>
      <p className="mt-2 text-muted-foreground">
        Have a question or feedback? Send us a message.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input id="name" name="name" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={5} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>

        <button type="submit" disabled={status === "submitting"} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60">
          {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}