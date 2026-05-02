import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    /** @required Title for the page */
    title: z.string(),
    /** @required Description for the page */
    description: z.string(),
  }),
});

export const collections = {
  docs,
};
