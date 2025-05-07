'use server'

import { generateSummaryWithGemini } from "@/lib/geminiai"
import { fetchAndExtractPDFText } from "@/lib/langChain"
import { generatSummaryFromOpenAI } from "@/lib/openai"

export async function generatePdfSummary(uploadResponse : [{
    serverData : {
        userId : string,
        file : {
            url : string,
            name : string
        }
    }
}]){
    if(!uploadResponse){
        return {
            success : false,
            message : "File upload failed",
            data : null
        }
    }
    const {serverData: {userId, file: {url: pdfUrl, name: fileName}}} = uploadResponse[0];

    if(!pdfUrl){
        return {
            success : false,
            message : "File upload failed",
            data : null
        }
    }
    try{
        const pdfText = await fetchAndExtractPDFText(pdfUrl);
        console.log({pdfText});
        let summary;
        try{
            summary = await generatSummaryFromOpenAI(pdfText);
            console.log({ summary });
        }catch(error){
            console.log(error);
            if(error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED"){
                try{
                    summary = await generateSummaryWithGemini(pdfText);
                }catch(geminiError){
                    console.log("Gemini error after openai quota exceeded", geminiError);
                    throw new Error("Failed to generate summary with available AI providers");
                }
            }
            throw error;
        }
        if(!summary){
            return {
                success : false,
                message : "Failed to generate summary",
                data : null
            }
        }
        return {
            success : true,
            message : "Summary generated successfully",
            data : {
                summary,
            }
        }
    }catch(error){
        return {
            success : false,
            message : "File upload failed",
            data : null
        }
    }
}