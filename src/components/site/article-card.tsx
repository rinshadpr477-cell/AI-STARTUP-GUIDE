import Link from "next/link";

export function ArticleListItem({
  title,
  slug,
  topicSlug,
  tags,
  content,
}: {
  title: string;
  slug: string;
  topicSlug: string;
  tags: string[];
  content: string;
}) {
  const excerpt = content.length > 160 ? content.slice(0, 160) + "…" : content;

  return (
    <Link href={`/explore/${topicSlug}/${slug}`} className="block rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}