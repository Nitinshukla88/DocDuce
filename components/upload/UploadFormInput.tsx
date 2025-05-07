"use client";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({ onSubmit, isLoading }, ref) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
          disabled={isLoading}
        />
        <Button className="bg-rose-500" disabled={isLoading}>{isLoading ? <>
        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
        </> : "Upload your PDF"}</Button>
      </div>
    </form>
  );
})

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;

