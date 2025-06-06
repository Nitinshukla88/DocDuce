"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryWithDeepInfra } from "@/lib/deepInfra";
import { fetchAndExtractPDFText } from "@/lib/langChain";
import { formatFileNameAsTitle } from "@/utils/formatUtils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}
export async function generatePdfSummary(
  uploadResponse:
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }[]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPDFText(pdfUrl);
    console.log({ pdfText });
    let summary;
    try {
      summary = await generateSummaryWithDeepInfra(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      throw error;
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePdfSummary(
  userId: string,
  fileUrl: string,
  summary: string,
  title: string,
  fileName: string
) {
  try {
    const sql = await getDbConnection();
    const [savedSummaryJustNow] = await sql`INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
) VALUES (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
)RETURNING id, summary_text`;
    return savedSummaryJustNow;
  } catch (error) {
    console.error("Error saving PDF Summary", error);
    throw error;
  }
}

export async function generatePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary(
      userId,
      fileUrl,
      summary,
      title,
      fileName
    );
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF Summary, Try again later",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF Summary",
    };
  }
  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF Summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
