import { getResources } from "@/lib/queries";
import { ResourceCard } from "@/components/site/resource-card";
import { EmptyState } from "@/components/site/empty-state";

export const metadata = { title: "Resources — Startup Navigator" };

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="w-full px-10 py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-medium tracking-tight">Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Curated external tools, guides, and portals for founders.
        </p>
      </div>

      {resources.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="No resources yet" description="Resources added by the team will appear here." />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              url={resource.url}
              type={resource.type}
              description={resource.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}