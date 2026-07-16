"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

type Topic = { id: string; name: string };
type ArticleFormState = { error?: string };

export function ArticleForm({
  action,
  topics,
  initialData,
  submitLabel,
}: {
  action: (prevState: ArticleFormState | undefined, formData: FormData) => Promise<ArticleFormState>;
  topics: Topic[];
  initialData?: {
    title: string;
    topicId: string;
    content: string;
    tags: string[];
    published: boolean; };
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
        <label htmlFor="topicId" className="text-sm font-medium">Topic</label>
        <select id="topicId" name="topicId" defaultValue={initialData?.topicId ?? ""} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="" disabled>Select a topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>{topic.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium">Content</label>
        <textarea id="content" name="content" rows={8} defaultValue={initialData?.content} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
      </div>

      <div>
        <label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</label>
        <input id="tags" name="tags" defaultValue={initialData?.tags?.join(", ")} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"/>
      </div>

      <div className="flex items-center gap-2">
        <input id="published" name="published" type="checkbox" defaultChecked={initialData?.published ?? true} className="h-4 w-4 rounded border-input"/>
        <label htmlFor="published" className="text-sm">Published</label>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}