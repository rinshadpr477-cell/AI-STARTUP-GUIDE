"use client";

import { ConfirmDeleteButton } from "./confirm-delete-button";
import { deleteResource } from "@/lib/actions/admin";

export function ResourceDeleteButton({
  resourceId,
  title,
}: {
  resourceId: string;
  title: string;
}) {
  return <ConfirmDeleteButton itemLabel={title} onDelete={() => deleteResource(resourceId)} />;
}