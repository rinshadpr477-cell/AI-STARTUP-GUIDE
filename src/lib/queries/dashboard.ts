import { db } from "@/lib/db";

export async function getUserDashboardStats(userId: string) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalSearches, thisMonthSearches, recentSearches, allTopicsForUser] = await Promise.all([
    db.searchHistory.count({ where: { userId } }),
    db.searchHistory.count({ where: { userId, createdAt: { gte: startOfMonth } } }),
    db.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, question: true, answer: true, createdAt: true, topics: true },
    }),
    db.searchHistory.findMany({ where: { userId }, select: { topics: true } }),
  ]);

  const topicsExplored = new Set(allTopicsForUser.flatMap((s) => s.topics)).size;

  return { totalSearches, thisMonthSearches, topicsExplored, recentSearches };
}

export async function getAdminAnalytics() {
  const [totalUsers, totalSearches, recentSearches, allSearchTopics] = await Promise.all([
    db.user.count(),
    db.searchHistory.count(),
    db.searchHistory.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { user: { select: { name: true, email: true } } },
    }),
    db.searchHistory.findMany({ select: { topics: true, createdAt: true } }),
  ]);

  const topicCounts = new Map<string, number>();
  for (const s of allSearchTopics) {
    for (const t of s.topics) {
      topicCounts.set(t, (topicCounts.get(t) ?? 0) + 1);
    }
  }
  const mostSearchedTopics = [...topicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, count }));

  const dayBuckets = new Map<string, number>();
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dayBuckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const s of allSearchTopics) {
    const key = s.createdAt.toISOString().slice(0, 10);
    if (dayBuckets.has(key)) {
      dayBuckets.set(key, (dayBuckets.get(key) ?? 0) + 1);
    }
  }
  const activityByDay = [...dayBuckets.entries()].map(([date, count]) => ({ date, count }));

  return { totalUsers, totalSearches, mostSearchedTopics, activityByDay, recentSearches };
}