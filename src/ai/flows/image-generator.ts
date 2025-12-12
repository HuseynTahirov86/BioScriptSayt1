'use server';
/**
 * @fileOverview An image generator AI flow.
 *
 * - generateImage - A function that handles image generation.
 * - ImageGeneratorInput - The input type for the generateImage function.
 * - ImageGeneratorOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for the image to be generated.'),
});
export type ImageGeneratorInput = z.infer<typeof ImageGeneratorInputSchema>;

const ImageGeneratorOutputSchema = z.object({
    imageUrl: z.string().describe("The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ImageGeneratorOutput = z.infer<typeof ImageGeneratorOutputSchema>;

export async function generateImage(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  return imageGeneratorFlow(input);
}

const imageGeneratorFlow = ai.defineFlow(
  {
    name: 'imageGeneratorFlow',
    inputSchema: ImageGeneratorInputSchema,
    outputSchema: ImageGeneratorOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A professional, high-quality, realistic photograph for a health-tech blog post about: ${input.prompt}. The image should be clean, modern, and inspiring.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    
    if (!media?.url) {
        throw new Error('Image generation failed to produce an image.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
