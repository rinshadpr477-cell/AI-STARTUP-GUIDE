import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AiSearchClient } from "@/components/ai/ai-search-client";

export const metadata = { title: "AI Search — Startup Navigator" };

export default async function AiSearchPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <AiSearchClient />;
}