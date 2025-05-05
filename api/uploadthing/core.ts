import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import { FileRouter } from "uploadthing/types";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } }).middleware(async({ req })=> {
    const user = await currentUser();
    if(!user) throw new UploadThingError("Unauthorized");
  }).onUploadComplete(async(metadata, file)=> {
    console.log("File is uploaded successfully for user id", metadata.userId );
    return { userId : metadata.userId}
  })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;
