import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticle } from "@/lib/actions/admin";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article, topics] = await Promise.all([
    db.article.findUnique({ where: { id } }),
    db.topic.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-lg font-medium">Edit Article</h2>
      <ArticleForm action={updateWithId} topics={topics} initialData={{title: article.title,topicId: article.topicId,content: article.content,tags: article.tags,published: article.published,}}submitLabel="Save Changes"/>
    </div>
  );
}