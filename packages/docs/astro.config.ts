import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import i18nLoader from "./src/integrations/i18n-loader";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss(), Icons({ compiler: "vue3" })],
  },
  integrations: [vue(), mdx(), i18nLoader()],
});
