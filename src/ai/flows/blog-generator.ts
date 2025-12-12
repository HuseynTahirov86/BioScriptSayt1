'use server';
/**
 * @fileOverview A blog post generator AI flow.
 *
 * - generateBlogPost - A function that handles the blog post generation process.
 * - BlogPostGeneratorInput - The input type for the generateBlogPost function.
 * - BlogPostGeneratorOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogPostGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post.'),
});
export type BlogPostGeneratorInput = z.infer<typeof BlogPostGeneratorInputSchema>;

const BlogPostGeneratorOutputSchema = z.object({
  title: z.string().describe('The generated title for the blog post.'),
  excerpt: z.string().describe('A short, engaging excerpt for the blog post.'),
  content: z.string().describe('The full content of the blog post, formatted in rich HTML. Use tags like <p>, <h3>, <h4>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote> and <img>. For images, use "https://placehold.co/600x400.png" as the src and always include a descriptive alt attribute.'),
});
export type BlogPostGeneratorOutput = z.infer<typeof BlogPostGeneratorOutputSchema>;

export async function generateBlogPost(input: BlogPostGeneratorInput): Promise<BlogPostGeneratorOutput> {
  return blogPostGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'blogPostGeneratorPrompt',
  input: {schema: BlogPostGeneratorInputSchema},
  output: {schema: BlogPostGeneratorOutputSchema},
  prompt: `You are a professional content writer for BioScript, a health-tech company providing a biometric prescription system. Your task is to write a blog post in Azerbaijani about the given topic.

The blog post should be informative, engaging, and aligned with BioScript's brand voice, which is professional, innovative, and trustworthy.

The output must be in a rich HTML format. You can use the following tags to structure the content:
- <p> for paragraphs.
- <h3> and <h4> for subheadings.
- <ul> for unordered lists and <ol> for ordered lists, with <li> for list items.
- <strong> for bold text and <em> for italic text to emphasize key points.
- <blockquote> for highlighting important quotes or statements.
- <img> for images where appropriate in the text. Use "https://placehold.co/600x400.png" as the src for any images you include, and always provide a descriptive alt attribute for the image.
- Do not use any other HTML tags like <head>, <body>, or <style>.

Generate a compelling title, a short excerpt (2-3 sentences), and the full content for the blog post based on the topic.

Topic: {{topic}}`,
});

const blogPostGeneratorFlow = ai.defineFlow(
  {
    name: 'blogPostGeneratorFlow',
    inputSchema: BlogPostGeneratorInputSchema,
    outputSchema: BlogPostGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
