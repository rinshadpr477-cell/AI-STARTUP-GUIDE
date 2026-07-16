import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { EmptyState } from "@/components/site/empty-state";
import { ArticleDeleteButton } from "@/components/admin/article-delete-button";
import { ToastOnLoad } from "@/components/admin/toast-on-load";

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { topic: true },
  });

  return (
    <div>
      <Suspense fallback={null}>
        <ToastOnLoad />
      </Suspense>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium">Articles ({articles.length})</h2>
        <Link href="/admin/articles/new" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90">
          <Plus size={16} /> New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <EmptyState title="No articles yet" description="Create your first article to start building the knowledge base." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-secondary-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Topic</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-3">{article.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{article.topic.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        article.published
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-destructive/10 text-destructive"
                      }`}>
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/articles/${article.id}/edit`} className="text-sm text-muted-foreground hover:text-foreground">
                        Edit
                      </Link>
                      <ArticleDeleteButton articleId={article.id} title={article.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}