"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Search, Loader2, Copy, Check, AlertCircle } from "lucide-react";
import { askQuestion, type SearchResult } from "@/lib/actions/ai-search";
import { FormattedAnswer } from "./formatted-answer";

const SUGGESTED_QUESTIONS = [
  "How do I register a private limited company?",
  "What's the difference between bootstrapping and raising VC?",
  "What legal documents does my startup need?",
  "How do I build an investor-ready pitch deck?",
];

export function AiSearchClient() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function runSearch(q: string) {
    setQuestion(q);
    setResult(null);
    setCopied(false);
    startTransition(async () => {
      const res = await askQuestion(q);
      setResult(res);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    runSearch(question);
  }

  async function handleCopy() {
    if (result && "answer" in result) {
      await navigator.clipboard.writeText(result.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div className="w-full px-10 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight">Ask Startup Navigator AI</h1>
        <p className="mt-2 text-muted-foreground">
          Answers are grounded in our curated startup knowledge base.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. How do I register a private limited company?" className="flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"/>
          <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Ask
          </button>
        </form>

        {!result && !isPending && (
          <div className="mt-6 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button key={q} onClick={() => runSearch(q)} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary">
                {q}
              </button>
            ))}
          </div>
        )}

        {isPending && (
          <div className="mt-8 animate-pulse space-y-3 rounded-lg border border-border bg-card p-6">
            <div className="h-4 w-1/3 rounded bg-secondary" />
            <div className="h-3 w-full rounded bg-secondary" />
            <div className="h-3 w-full rounded bg-secondary" />
            <div className="h-3 w-2/3 rounded bg-secondary" />
          </div>
        )}

        {result && !isPending && result.status === "error" && (
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-5">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{result.message}</p>
          </div>
        )}

        {result && !isPending && (result.status === "success" || result.status === "no-knowledge") && (
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <FormattedAnswer text={result.answer} />

            <button onClick={handleCopy} className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy answer"}
            </button>

            {result.status === "success" && result.sources.length > 0 && (
              <div className="mt-6 border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Sources
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source) => (
                    <Link key={source.slug} href={`/explore/${source.topicSlug}/${source.slug}`} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground hover:opacity-80">
                      {source.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}