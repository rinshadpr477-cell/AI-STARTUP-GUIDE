import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  topicId: z.string().min(1, "Select a topic"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  tags: z.string().optional(),
  published: z.boolean().default(true),
});

export const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  url: z.string().url("Enter a valid URL"),
  type: z.string().min(2, "Enter a resource type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});