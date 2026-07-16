import { db } from "@/lib/db";

export async function getTopics() {
  return db.topic.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });
}

export async function getFeaturedTopics(limit = 6) {
  return db.topic.findMany({
    take: limit,
    orderBy: { name: "asc" },
  });
}

export async function getTopicBySlug(slug: string) {
  return db.topic.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getArticleBySlug(topicSlug: string, articleSlug: string) {
  return db.article.findFirst({
    where: {
      slug: articleSlug,
      published: true,
      topic: { slug: topicSlug },
    },
    include: { topic: true },
  });
}

export async function getResources() {
  return db.resource.findMany({ orderBy: { createdAt: "desc" } });
}