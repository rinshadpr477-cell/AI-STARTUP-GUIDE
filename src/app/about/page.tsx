import { Layers, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = { title: "About — Startup Navigator" };

export default function AboutPage() {
  return (
    <div className="w-full px-10 py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-medium tracking-tight">About Startup Navigator</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Startup Navigator is a knowledge platform built for entrepreneurs and
          early-stage founders navigating company registration, funding, legal
          compliance, hiring, branding, marketing, taxation, fundraising, AI
          tools, and business growth — all in one place.
        </p>

        <div className="mt-10 space-y-6">
          <div className="flex gap-4">
            <Layers className="mt-1 shrink-0 text-accent" size={20} />
            <div>
              <h2 className="font-medium">What it does</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A curated knowledge base of startup topics, paired with an AI
                search that answers questions grounded strictly in that
                knowledge base — not open-ended guesses.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <ShieldCheck className="mt-1 shrink-0 text-accent" size={20} />
            <div>
              <h2 className="font-medium">How the AI search works</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A question is matched against stored articles by relevance, the
                best-matching knowledge is sent as context to the AI model, and
                the answer is generated strictly from that context — with
                sources shown alongside the response.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Sparkles className="mt-1 shrink-0 text-accent" size={20} />
            <div>
              <h2 className="font-medium">Who maintains the knowledge</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Admins manage the knowledge base directly — creating, editing,
                and retiring articles and resources as startup guidance
                evolves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}