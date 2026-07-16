"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const MESSAGES: Record<string, string> = {
  "article-created": "Article created.",
  "article-updated": "Article updated.",
  "resource-created": "Resource created.",
  "resource-updated": "Resource updated.",
};

export function ToastOnLoad() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastKey = searchParams.get("toast");

  useEffect(() => {
    if (toastKey && MESSAGES[toastKey]) {
      toast.success(MESSAGES[toastKey]);
      router.replace(window.location.pathname);
    }
  }, [toastKey, router]);

  return null;
}