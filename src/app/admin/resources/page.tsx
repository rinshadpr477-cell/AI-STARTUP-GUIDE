import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { EmptyState } from "@/components/site/empty-state";
import { ResourceDeleteButton } from "@/components/admin/resource-delete-button";

export default async function AdminResourcesPage() {
  const resources = await db.resource.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium">Resources ({resources.length})</h2>
        <Link href="/admin/resources/new" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90">
          <Plus size={16} /> New Resource
        </Link>
      </div>

      {resources.length === 0 ? (
        <EmptyState title="No resources yet" description="Add your first external resource for founders to discover."/>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-secondary-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td className="px-4 py-3">{resource.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{resource.type}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/resources/${resource.id}/edit`} className="text-sm text-muted-foreground hover:text-foreground">
                        Edit
                      </Link>
                      <ResourceDeleteButton resourceId={resource.id} title={resource.title} />
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