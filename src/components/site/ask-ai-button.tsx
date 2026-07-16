"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { toast } from "sonner";

export function AskAiButton({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    if (status === "loading") {
      e.preventDefault();
      return;
    }
    if (!session?.user) {
      e.preventDefault();
      toast.error("Please log in to use AI Search.");
      router.push("/login");
    }
  }

  return (
    <Link href="/ai-search" onClick={handleClick} className={className}>
      <Search size={16} />
      Ask the AI
    </Link>
  );
}