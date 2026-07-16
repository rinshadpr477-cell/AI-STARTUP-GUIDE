"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog";

export function ConfirmDeleteButton({
  onDelete,
  itemLabel,
}: {
  onDelete: () => Promise<void>;
  itemLabel: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await onDelete();
        toast.success(`"${itemLabel}" deleted.`);
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error(`Failed to delete "${itemLabel}".`);
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={pending} className="inline-flex items-center gap-1 text-sm text-destructive hover:underline disabled:opacity-60" >
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{itemLabel}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}