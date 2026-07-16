"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { articleSchema, resourceSchema } from "@/lib/validations/admin";
import { slugify } from "@/lib/slugify";

export async function createArticle(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized." };

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    topicId: formData.get("topicId"),
    content: formData.get("content"),
    tags: formData.get("tags"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { title, topicId, content, tags, published } = parsed.data;
  const slug = slugify(title);

  const existing = await db.article.findUnique({ where: { slug } });
  if (existing) return { error: "An article with a similar title already exists." };

  await db.article.create({
    data: {
      title,
      slug,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      published,
      topicId,
      authorId: session.user.id,
    },
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles?toast=article-created");
}

export async function updateArticle(
  articleId: string,
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized." };

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    topicId: formData.get("topicId"),
    content: formData.get("content"),
    tags: formData.get("tags"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { title, topicId, content, tags, published } = parsed.data;

  await db.article.update({
    where: { id: articleId },
    data: {
      title,
      content,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      published,
      topicId,
    },
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles?toast=article-updated");
}

export async function deleteArticle(articleId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await db.article.delete({ where: { id: articleId } });
  revalidatePath("/admin/articles");
}

export async function createResource(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized." };

  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    type: formData.get("type"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db.resource.create({
    data: { ...parsed.data, authorId: session.user.id },
  });

  revalidatePath("/admin/resources");
  redirect("/admin/resources?toast=resource-created");
}

export async function updateResource(
  resourceId: string,
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized." };

  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    type: formData.get("type"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db.resource.update({
    where: { id: resourceId },
    data: parsed.data,
  });

  revalidatePath("/admin/resources");
  redirect("/admin/resources?toast=resource-updated");
}

export async function deleteResource(resourceId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await db.resource.delete({ where: { id: resourceId } });
  revalidatePath("/admin/resources");
}