import { defineMiddleware } from "astro:middleware";
import { getCollection } from "astro:content";
import i18next from "i18next";
import type { Resource, i18n } from "i18next";

let masterInstance: i18n | null = null;
let lastResourceHash = "";

export const onRequest = defineMiddleware(async (context, next) => {
  const i18nEntries = await getCollection("i18n");

  // Simple check to see if we need to re-initialize (useful for HMR in dev)
  // We hash the IDs and a stringified version of the data to detect changes
  const currentResourceHash = JSON.stringify(
    i18nEntries.map((e) => ({ id: e.id, data: e.data })),
  );

  if (!masterInstance || currentResourceHash !== lastResourceHash) {
    const resources: Resource = {};

    for (const entry of i18nEntries) {
      resources[entry.id] = { translation: entry.data };
    }

    const newInstance = i18next.createInstance();
    await newInstance.init({
      resources,
      fallbackLng: import.meta.env.DEFAULT_LOCALE || "es",
      interpolation: {
        escapeValue: false,
      },
    });

    masterInstance = newInstance;
    lastResourceHash = currentResourceHash;
  }

  const locale = context.currentLocale || import.meta.env.DEFAULT_LOCALE || "es";

  // Use getFixedT to get a locale-specific translation function without overhead
  context.locals.t = masterInstance.getFixedT(locale);

  return next();
});
