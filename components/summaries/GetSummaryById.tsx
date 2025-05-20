import { getDbConnection } from "@/lib/db";

export async function GetSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [result] =
      await sql`SELECT id, user_id, title, original_file_url, summary_text, status, created_at, updated_at, file_name, LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count FROM pdf_summaries where id=${id}`;
    return result;
  } catch (error) {
    console.error("Error fetching summary by id", error);
    return null;
  }
}
