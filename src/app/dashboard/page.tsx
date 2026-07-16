import Link from "next/link";
import { auth } from "@/auth";
import { getUserDashboardStats } from "@/lib/queries/dashboard";
import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/site/empty-state";
import { stripMarkdown } from "@/lib/strip-markdown";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const stats = await getUserDashboardStats(session.user.id);

  return (
    <div className="w-full px-10 py-12">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-medium tracking-tight">
          Welcome back, {session.user.name?.split(" ")[0] ?? "there"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s your activity so far.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
        <StatCard label="Total Searches" value={stats.totalSearches} />
        <StatCard label="This Month" value={stats.thisMonthSearches} />
        <StatCard label="Topics Explored" value={stats.topicsExplored} />
        <StatCard label="Recent" value={stats.recentSearches.length} />
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="mb-4 text-lg font-medium">Recent Searches</h2>
        {stats.recentSearches.length === 0 ? (
          <EmptyState title="No searches yet" description="Ask a question on AI Search to see your history here."/>
        ) : (
          <div className="space-y-3">
            {stats.recentSearches.map((search) => (
              <div key={search.id} className="rounded-lg border border-border bg-card p-4">
                <p className="font-medium">{search.question}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {stripMarkdown(search.answer)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(search.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/ai-search" className="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:opacity-90">
            Ask another question
          </Link>
        </div>
      </div>
    </div>
  );
}