"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { DeleteSummaryAction } from "@/actions/SummaryActions";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId : string,
}
export default function DeleteButton({ summaryId } : DeleteButtonProps){
  const handleSummaryDelete = async() => {
    startTransitioin(async ()=> { const result = await DeleteSummaryAction({summaryId});
    if(!result.success){
      toast("Error", {
        description : "Failed to delete the summary"
      })
    }});
    setOpen(false);
  }
  const [isPending, startTransitioin] = useTransition();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-gray-500 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
          variant={"ghost"}
          size="icon"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the summary?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button
          className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
          variant="ghost"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="bg-gray-900 hover:bg-gray-700"
          variant="destructive"
          onClick={handleSummaryDelete}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
