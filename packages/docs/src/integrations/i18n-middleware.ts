import { defineMiddleware } from "astro:middleware";
import { getCollection } from "astro:content";
import i18next from "i18next";
import type { Resource } from "i18next";

export const onRequest = defineMiddleware(async (context, next) => {
  // Load resources from the i18n content collection
  const i18nEntries = await getCollection("i18n");
  const resources: Resource = {};

  for (const entry of i18nEntries) {
    resources[entry.id] = { translation: entry.data };
  }

  const currentLocale =
    context.currentLocale || import.meta.env.DEFAULT_LOCALE || "es";

  // Create a new i18next instance for this request
  const i18nInstance = i18next.createInstance();
  await i18nInstance.init({
    lng: currentLocale,
    fallbackLng: import.meta.env.DEFAULT_LOCALE || "es",
    resources,
    interpolation: {
      escapeValue: false, // not needed for react/astro as it escapes by default
    },
  });

  // Add the t function to locals
  context.locals.t = i18nInstance.t.bind(i18nInstance);

  return next();
});
