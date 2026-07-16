import { db } from "@/lib/db";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticle } from "@/lib/actions/admin";

export default async function NewArticlePage() {
  const topics = await db.topic.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-lg font-medium">New Article</h2>
      <ArticleForm action={createArticle} topics={topics} submitLabel="Create Article" />
    </div>
  );
}