import type { AstroIntegration } from "astro";

export default function i18nLoader(): AstroIntegration {
  return {
    name: "i18n-loader",
    hooks: {
      "astro:config:setup": ({ config, addMiddleware, logger }) => {
        const defaultLocale = config.i18n?.defaultLocale || "es";

        // Pass the defaultLocale to the middleware via vite define
        config.vite.define = {
          ...config.vite.define,
          "import.meta.env.DEFAULT_LOCALE": JSON.stringify(defaultLocale),
        };

        addMiddleware({
          entrypoint: new URL("./i18n-middleware.ts", import.meta.url),
          order: "pre",
        });

        logger.info(
          `i18n-loader initialized with defaultLocale: ${defaultLocale}`,
        );
      },
    },
  };
}
