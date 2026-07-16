import { ResourceForm } from "@/components/admin/resource-form";
import { createResource } from "@/lib/actions/admin";

export default function NewResourcePage() {
  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-lg font-medium">New Resource</h2>
      <ResourceForm action={createResource} submitLabel="Create Resource" />
    </div>
  );
}
