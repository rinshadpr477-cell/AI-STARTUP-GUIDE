"use client";

import { ConfirmDeleteButton } from "./confirm-delete-button";
import { deleteArticle } from "@/lib/actions/admin";

export function ArticleDeleteButton({
  articleId,
  title,
}: {
  articleId: string;
  title: string;
}) {
  return <ConfirmDeleteButton itemLabel={title} onDelete={() => deleteArticle(articleId)} />;
}