// src/ai/flows/highlight-key-identities.ts
'use server';

/**
 * @fileOverview Highlights key identities on the complex plane based on the angle theta.
 *
 * - highlightKeyIdentities - A function that determines which key identity to highlight based on the given angle.
 * - HighlightKeyIdentitiesInput - The input type for the highlightKeyIdentities function.
 * - HighlightKeyIdentitiesOutput - The return type for the highlightKeyIdentities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const HighlightKeyIdentitiesInputSchema = z.object({
  theta: z
    .number()
    .describe("The angle theta in radians."),
});
export type HighlightKeyIdentitiesInput = z.infer<typeof HighlightKeyIdentitiesInputSchema>;

const HighlightKeyIdentitiesOutputSchema = z.object({
  identity: z.string().describe("The key identity to display, or null if none."),
  shouldHighlight: z.boolean().describe("Whether to highlight an identity or not."),
});
export type HighlightKeyIdentitiesOutput = z.infer<typeof HighlightKeyIdentitiesOutputSchema>;

export async function highlightKeyIdentities(input: HighlightKeyIdentitiesInput): Promise<HighlightKeyIdentitiesOutput> {
  return highlightKeyIdentitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightKeyIdentitiesPrompt',
  input: {schema: HighlightKeyIdentitiesInputSchema},
  output: {schema: HighlightKeyIdentitiesOutputSchema},
  prompt: `You are an expert mathematician specializing in complex analysis and Euler's formula.

  Given an angle theta, determine if a key identity related to Euler's formula should be highlighted.
  If the angle is near a significant point (e.g., 0, pi/2, pi, 3pi/2, 2pi), identify the corresponding identity and set shouldHighlight to true.
  Otherwise, set shouldHighlight to false and return null for the identity.

  Important identities include:
  - e^(i*0) = 1
  - e^(i*pi/2) = i
  - e^(i*pi) = -1 (Euler's Identity)
  - e^(i*3pi/2) = -i
  - e^(i*2pi) = 1

  Angle: {{{theta}}}

  Respond with the appropriate identity and whether it should be highlighted, formatted as JSON.
  `,
});

const highlightKeyIdentitiesFlow = ai.defineFlow(
  {
    name: 'highlightKeyIdentitiesFlow',
    inputSchema: HighlightKeyIdentitiesInputSchema,
    outputSchema: HighlightKeyIdentitiesOutputSchema,
  },
  async input => {
    // Determine if the angle is close to a key identity point
    const threshold = 0.1; // Define a threshold for "nearness" to key angles
    const theta = input.theta;

    let identity = null;
    let shouldHighlight = false;

    if (Math.abs(theta % (2 * Math.PI) - 0) < threshold) {
      identity = 'e^(i*0) = 1';
      shouldHighlight = true;
    } else if (Math.abs(theta % (2 * Math.PI) - Math.PI / 2) < threshold) {
      identity = 'e^(i*π/2) = i';
      shouldHighlight = true;
    } else if (Math.abs(theta % (2 * Math.PI) - Math.PI) < threshold) {
      identity = 'e^(i*π) = -1'; // Euler's Identity
      shouldHighlight = true;
    } else if (Math.abs(theta % (2 * Math.PI) - (3 * Math.PI) / 2) < threshold) {
      identity = 'e^(i*3π/2) = -i';
      shouldHighlight = true;
    } else if (Math.abs(theta % (2 * Math.PI) - 2 * Math.PI) < threshold) {
      identity = 'e^(i*2π) = 1';
      shouldHighlight = true;
    }

    return {identity: identity ?? '', shouldHighlight};
  }
);
