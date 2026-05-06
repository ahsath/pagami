import type { CollectionEntry } from "astro:content";

/**
 * Builds a locale → URL translation map for the language switcher.
 *
 * Finds all docs that share the same `key` frontmatter field as the provided
 * `keyedEntry`, then converts each match to a locale → path pair using the
 * provided `pathExtractor`.
 *
 * @param docs - Full collection of docs entries
 * @param keyedEntry - The reference entry used to look up translations (must have a `key`)
 * @param pathExtractor - Maps an entry `id` to the URL path for that locale
 */
export function buildTranslationMap(
  docs: CollectionEntry<"docs">[],
  keyedEntry: CollectionEntry<"docs"> | undefined,
  pathExtractor: (id: string) => string,
): Record<string, string> {
  if (!keyedEntry?.data.key) return {};

  return Object.fromEntries(
    docs
      .filter(
        (d) => d.data.key === keyedEntry.data.key && d.data.key !== undefined,
      )
      .map((t) => {
        const [loc] = t.id.split("/");
        return [loc, pathExtractor(t.id)];
      }),
  );
}
