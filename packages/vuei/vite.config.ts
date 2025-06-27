import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/vuei.ts"),
      fileName: (format) => `vuei.${format}-bundler.js`,
      formats: ["es"],
      cssFileName: "vuei",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
