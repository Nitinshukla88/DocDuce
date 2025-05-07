import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { TextGeneration } from "deepinfra";

const DEEPINFRA_KEY = process.env.DEEPINFRA_API_KEY || "";
const MODEL_URL = "https://api.deepinfra.com/v1/inference/meta-llama/Meta-Llama-3-8B-Instruct";

export async function generateSummaryWithDeepInfra(pdfText: string) {
  try {
    const client = new TextGeneration(MODEL_URL, DEEPINFRA_KEY);

    const inputPrompt = `<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`;

    const res = await client.generate({
      input: inputPrompt,
      stop: ["<|eot_id|>"],
    });

    const generatedText = res.results?.[0]?.generated_text;

    if (!generatedText || generatedText.trim() === "") {
      throw new Error("Empty response from DeepInfra API");
    }

    return generatedText.trim();
  } catch (error: any) {
    console.error("Error generating summary with DeepInfra:", error);
    throw error;
  }
}
