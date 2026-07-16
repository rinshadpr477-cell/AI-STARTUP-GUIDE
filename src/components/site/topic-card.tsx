import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopicCard({
  name,
  slug,
  description,
  articleCount,
}: {
  name: string;
  slug: string;
  description: string;
  articleCount?: number;
}) {
  return (
    <Link href={`/explore/${slug}`} className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{articleCount ?? 0} articles</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}