"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/UploadActions";
import { useRef, useState } from "react";
const Schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast("Error occurred during upload", {
        description: err.message,
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form submitted");
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = Schema.safeParse({ file });
      if (!validatedFields.success) {
        toast("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File",
        });
        setIsLoading(false);
        return;
      }
      toast("📄 Uploading PDF...", {
        description: "We are uploading your PDF! ✨",
      });
      const res = await startUpload([file]);
      if (!res) {
        toast("❌ Something went wrong", {
          description: "Please use different file",
        });
        setIsLoading(false);
        return;
      }
      toast("📄 Processing PDF...", {
        description: "Hang tight! Our AI is reading through your document! ✨",
      });
      const summary = await generatePdfSummary(res);
      console.log({ summary });
      const { data = null, message = null } = summary || {};
      if (data) {
        toast("📄 Saving PDF...", {
          description: "Hang tight! We are saving your summary! ✨",
        });
        formRef.current?.reset();
      }
    } catch (error) {
      console.error("Error occurred", error);
      setIsLoading(false);
      formRef.current?.reset();
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput ref={formRef} isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
}
