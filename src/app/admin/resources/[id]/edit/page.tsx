import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ResourceForm } from "@/components/admin/resource-form";
import { updateResource } from "@/lib/actions/admin";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await db.resource.findUnique({ where: { id } });

  if (!resource) notFound();

  const updateWithId = updateResource.bind(null, resource.id);

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-lg font-medium">Edit Resource</h2>
      <ResourceForm action={updateWithId} initialData={{ title: resource.title, url: resource.url, type: resource.type, description: resource.description, }} submitLabel="Save Changes"/>
    </div>
  );
}