"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/UploadActions";
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
    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validatedFields = Schema.safeParse({ file });
    if (!validatedFields.success) {
      toast("❌ Something went wrong", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid File",
      });
      return;
    }
    toast("📄 Uploading PDF...", {
      description: "We are uploading your PDF! ✨",
    });
    const res = await startUpload([file]);
    if (!res) {
      toast("❌ Something went wrong", {description : "Please use different file"});
      return;
    }
    toast("📄 Processing PDF", {
      description: "Hang tight! Our AI is reading through your document! ✨",
    });
    const summary = await generatePdfSummary(res);
    console.log({summary});
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
