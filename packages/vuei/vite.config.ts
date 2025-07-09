/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        vuei: resolve(__dirname, "src/vuei.ts"),
        "vuei.css": resolve(__dirname, "src/assets/css/index.base.css"),
      },
      fileName: (format) => `vuei.${format}-bundler.js`,
      formats: ["es"],
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ["vue"],
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
