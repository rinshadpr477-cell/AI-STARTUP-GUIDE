import { getTopics } from "@/lib/queries";
import { TopicCard } from "@/components/site/topic-card";
import { EmptyState } from "@/components/site/empty-state";

export const metadata = { title: "Explore Topics — Startup Navigator" };

export default async function ExplorePage() {
  const topics = await getTopics();

  return (
    <div className="w-full px-10 py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-medium tracking-tight">Explore Topics</h1>
        <p className="mt-2 text-muted-foreground">
          Browse startup knowledge by category, from registration to growth.
        </p>
      </div>

      {topics.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="No topics yet" description="Topics will appear here once the knowledge base is seeded."/>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.id} name={topic.name} slug={topic.slug} description={topic.description} articleCount={topic._count.articles} />
          ))}
        </div>
      )}
    </div>
  );
}