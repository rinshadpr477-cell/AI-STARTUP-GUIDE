"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

type ResourceFormState = { error?: string };

export function ResourceForm({
  action,
  initialData,
  submitLabel,
}: {
  action: (prevState: ResourceFormState | undefined, formData: FormData) => Promise<ResourceFormState>;
  initialData?: { title: string; url: string; type: string; description: string };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input id="title" name="title" defaultValue={initialData?.title} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div>
        <label htmlFor="url" className="text-sm font-medium">URL</label>
        <input id="url" name="url" type="url" defaultValue={initialData?.url} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
      </div>

      <div>
        <label htmlFor="type" className="text-sm font-medium">Type</label>
        <input id="type" name="type" placeholder="e.g. Guide, Government Portal, Tool" defaultValue={initialData?.type} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea id="description" name="description" rows={3} defaultValue={initialData?.description} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}