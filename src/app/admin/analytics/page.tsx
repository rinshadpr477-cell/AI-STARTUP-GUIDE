import { getAdminAnalytics } from "@/lib/queries/dashboard";
import { StatCard } from "@/components/dashboard/stat-card";

export default async function AdminAnalyticsPage() {
  const analytics = await getAdminAnalytics();
  const maxDayCount = Math.max(1, ...analytics.activityByDay.map((d) => d.count));

  return (
    <div>
      <h2 className="mb-6 text-lg font-medium">Analytics</h2>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Users" value={analytics.totalUsers} />
        <StatCard label="Total AI Searches" value={analytics.totalSearches} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Most Searched Topics</h3>
          {analytics.mostSearchedTopics.length === 0 ? (
            <p className="text-sm text-muted-foreground">No searches recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {analytics.mostSearchedTopics.map((t) => (
                <div key={t.topic} className="flex items-center justify-between text-sm">
                  <span className="capitalize">{t.topic.replace(/-/g, " ")}</span>
                  <span className="text-muted-foreground">{t.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Search Activity (Last 7 Days)
          </h3>
          <div className="flex items-end gap-2">
            {analytics.activityByDay.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-primary" style={{ height: `${Math.max(4, (d.count / maxDayCount) * 80)}px` }}/>
                <span className="text-[10px] text-muted-foreground">{d.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Recent Searches</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-secondary-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Question</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {analytics.recentSearches.map((search) => (
                <tr key={search.id}>
                  <td className="px-4 py-3">{search.user.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{search.question}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(search.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}