import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTopicBySlug } from "@/lib/queries";
import { ArticleListItem } from "@/components/site/article-card";
import { EmptyState } from "@/components/site/empty-state";

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) notFound();

  return (
    <div className="w-full px-10 py-16">
      <div className="max-w-4xl">
        <Link href="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to Explore
        </Link>

        <h1 className="mt-4 text-3xl font-medium tracking-tight">{topic.name}</h1>
        <p className="mt-2 text-muted-foreground">{topic.description}</p>
      </div>

      <div className="mt-10 max-w-4xl space-y-4">
        {topic.articles.length === 0 ? (
          <EmptyState title="No articles yet" description="Articles for this topic are coming soon."/>
        ) : (
          topic.articles.map((article) => (
            <ArticleListItem
              key={article.id}
              title={article.title}
              slug={article.slug}
              topicSlug={topic.slug}
              tags={article.tags}
              content={article.content}/>
          ))
        )}
      </div>
    </div>
  );
}