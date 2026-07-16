import { ExternalLink } from "lucide-react";

export function ResourceCard({
  title,
  url,
  type,
  description,
}: {
  title: string;
  url: string;
  type: string;
  description: string;
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div>
        <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
          {type}
        </span>
        <h3 className="mt-3 font-medium">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
        Visit resource
        <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}