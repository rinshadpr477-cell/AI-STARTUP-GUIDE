"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { retrieveKnowledge } from "@/lib/ai/retrieval";
import { buildGroundedPrompt } from "@/lib/ai/prompts";
import { generateGroundedAnswer } from "@/lib/ai/gemini";

export type SearchSource = { title: string; topicSlug: string; slug: string };

export type SearchResult =
  | { status: "success"; answer: string; sources: SearchSource[] }
  | { status: "no-knowledge"; answer: string }
  | { status: "error"; message: string };

export async function askQuestion(question: string): Promise<SearchResult> {
  const trimmed = question.trim();

  if (trimmed.length < 3) {
    return { status: "error", message: "Please enter a more specific question." };
  }
  if (trimmed.length > 300) {
    return {
      status: "error",
      message: "Question is too long — please keep it under 300 characters.",
    };
  }

  const matches = await retrieveKnowledge(trimmed, 3);

  if (matches.length === 0) {
    const answer =
      "I don't have enough information in the Startup Navigator knowledge base to answer that confidently yet. Try rephrasing, or explore the Topics page for related guidance.";

    const session = await auth();
    if (session?.user?.id) {
      await db.searchHistory.create({
        data: { question: trimmed, answer, userId: session.user.id },
      });
    }

    return { status: "no-knowledge", answer };
  }

  const context = matches
    .map((m, i) => `[Source ${i + 1}: ${m.title} (Topic: ${m.topicName})]\n${m.content}`)
    .join("\n\n");

  try {
    const prompt = buildGroundedPrompt(context, trimmed);
    const rawAnswer = await generateGroundedAnswer(prompt);
    const answer = rawAnswer || "The AI did not return a usable answer. Please try again.";

    const session = await auth();
    if (session?.user?.id) {
      await db.searchHistory.create({
        data: {
          question: trimmed,
          answer,
          userId: session.user.id,
          topics: Array.from(new Set(matches.map((m) => m.topicSlug))),
        },
      });
    }

    return {
      status: "success",
      answer,
      sources: matches.map((m) => ({
        title: m.title,
        topicSlug: m.topicSlug,
        slug: m.slug,
      })),
    };
  } catch (err) {
    console.error("Gemini generation failed:", err);
    return {
      status: "error",
      message: "The AI is temporarily unavailable. Please try again in a moment.",
    };
  }
}