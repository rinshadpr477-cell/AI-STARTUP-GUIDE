import { db } from "@/lib/db";

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export type RetrievedArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  topicName: string;
  topicSlug: string;
  score: number;
};

export async function retrieveKnowledge(
  question: string,
  limit = 3,
): Promise<RetrievedArticle[]> {
  const queryTokens = normalize(question);
  if (queryTokens.length === 0) return [];

  const articles = await db.article.findMany({
    where: { published: true },
    include: { topic: true },
  });

  const scored = articles.map((article) => {
    const titleTokens = normalize(article.title);
    const contentTokens = normalize(article.content);
    const tagTokens = article.tags.flatMap((tag) => normalize(tag));
    const topicTokens = normalize(article.topic.name);

    let score = 0;
    for (const token of queryTokens) {
      if (titleTokens.includes(token)) score += 3;
      if (tagTokens.includes(token)) score += 3;
      if (topicTokens.includes(token)) score += 2;
      score += contentTokens.filter((t) => t === token).length;
    }

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.content,
      tags: article.tags,
      topicName: article.topic.name,
      topicSlug: article.topic.slug,
      score,
    };
  });

  return scored
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}