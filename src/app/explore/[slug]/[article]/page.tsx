import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug } from "@/lib/queries";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; article: string }>;
}) {
  const { slug, article: articleSlug } = await params;
  const article = await getArticleBySlug(slug, articleSlug);

  if (!article) notFound();

  return (
    <div className="w-full px-10 py-16">
      <div className="max-w-3xl">
        <Link href={`/explore/${slug}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to {article.topic.name}
        </Link>

        <h1 className="mt-4 text-3xl font-medium tracking-tight">{article.title}</h1>

        <div className="mt-2 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground" >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <p className="leading-relaxed text-foreground/90">{article.content}</p>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Have a specific question about this?</p>
          <Link href="/ai-search" className="mt-2 inline-block text-sm font-medium text-accent hover:underline">
            Ask the AI Search →
          </Link>
        </div>
      </div>
    </div>
  );
}