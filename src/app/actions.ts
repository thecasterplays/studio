'use server';

import { summarizeReports, SummarizeReportsInput } from '@/ai/flows/summarize-reports-for-supervisors';

export async function generateSummaryAction(input: SummarizeReportsInput) {
  try {
    const result = await summarizeReports(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('AI summary generation failed:', error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}
