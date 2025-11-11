'use server';

/**
 * @fileOverview Summarizes production reports for supervisors, highlighting key insights and potential bottlenecks.
 *
 * - summarizeReports - A function that generates a summary of the reports.
 * - SummarizeReportsInput - The input type for the summarizeReports function.
 * - SummarizeReportsOutput - The return type for the summarizeReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReportsInputSchema = z.object({
  dailyReport: z.string().describe('The daily production report.'),
  weeklyReport: z.string().describe('The weekly production report.'),
  monthlyReport: z.string().describe('The monthly production report.'),
});
export type SummarizeReportsInput = z.infer<typeof SummarizeReportsInputSchema>;

const SummarizeReportsOutputSchema = z.object({
  summary: z.string().describe('The AI-generated summary of the production reports.'),
});
export type SummarizeReportsOutput = z.infer<typeof SummarizeReportsOutputSchema>;

export async function summarizeReports(input: SummarizeReportsInput): Promise<SummarizeReportsOutput> {
  return summarizeReportsFlow(input);
}

const getSensitiveInfo = ai.defineTool({
  name: 'getSensitiveInfo',
  description: 'Decide if the summary should contain sensitive staff performance info, like bottlenecks',
  inputSchema: z.object({
    role: z.string().describe('The role of the requestor, which is supervisor'),
  }),
  outputSchema: z.boolean(),
}, async (input) => {
  return input.role === 'Admin';
});

const summarizeReportsPrompt = ai.definePrompt({
  name: 'summarizeReportsPrompt',
  input: {schema: SummarizeReportsInputSchema},
  output: {schema: SummarizeReportsOutputSchema},
  tools: [getSensitiveInfo],
  system: `You are an AI assistant that summarizes production reports for supervisors.  \n
  You will receive daily, weekly, and monthly production reports and generate a concise summary highlighting key insights and potential bottlenecks. \n
  You must decide if the summary can contain sensitive information based on the users role.
  If you are allowed to use sensitive information then you should also include a list of staff performance issues as well as a bottleneck analysis in the summary. \n
  Here are the production reports:\n  Daily Report: {{{dailyReport}}}\n  Weekly Report: {{{weeklyReport}}}\n  Monthly Report: {{{monthlyReport}}}`, 
});

const summarizeReportsFlow = ai.defineFlow(
  {
    name: 'summarizeReportsFlow',
    inputSchema: SummarizeReportsInputSchema,
    outputSchema: SummarizeReportsOutputSchema,
  },
  async input => {
    const {output} = await summarizeReportsPrompt(input);
    return output!;
  }
);
