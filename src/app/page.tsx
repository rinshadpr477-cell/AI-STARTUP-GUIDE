import Link from "next/link";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { getFeaturedTopics } from "@/lib/queries";
import { TopicCard } from "@/components/site/topic-card";
import { AskAiButton } from "@/components/site/ask-ai-button";

export default async function HomePage() {
  const topics = await getFeaturedTopics(6);

  return (
    <div className="w-full">
      <section className="px-10 py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      
          <div className="max-w-4xl">
            <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Navigate your startup journey with clarity
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              Registration, funding, compliance, hiring, branding and more —
              grounded answers from a real knowledge base, not guesses.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <AskAiButton className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90" />

              <Link href="/explore" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm transition-colors hover:bg-secondary">
                Explore topics
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-10 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} />
                Answers grounded in a real knowledge base
              </span>

              <span className="flex items-center gap-2">
                <Sparkles size={14} />
                Built for founders, not lawyers
              </span>
            </div>
          </div>

          <div className="flex justify-start lg:justify-center">
            <div className="w-full max-w-md rounded-2xl border border-border bg-secondary/30 p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Startup Journey</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your path to building with clarity
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles size={17} className="text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">Register your startup</p>
                    <p className="text-xs text-muted-foreground">
                      Get your business started
                    </p>
                  </div>

                  <span className="text-xs text-primary">Done</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">Find funding</p>
                    <p className="text-xs text-muted-foreground">
                      Explore funding opportunities
                    </p>
                  </div>

                  <span className="text-xs text-primary">Done</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-muted-foreground/40">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">Stay compliant</p>
                    <p className="text-xs text-muted-foreground">
                      Keep your business on track
                    </p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Next
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-muted-foreground/40">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">Build your brand</p>
                    <p className="text-xs text-muted-foreground">
                      Create a strong identity
                    </p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Later
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    AI Knowledge Base
                  </span>

                  <span className="font-medium text-primary">
                    Ready to help
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 pb-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-medium">Explore by topic</h2>
          <Link href="/explore" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              name={topic.name}
              slug={topic.slug}
              description={topic.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}