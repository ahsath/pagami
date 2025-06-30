import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
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
        "vuei.css": resolve(__dirname, "src/assets/css/index.css"),
        "vuei.base.css": resolve(__dirname, "src/assets/css/index.base.css"),
      },
      fileName: (format) => `vuei.${format}-bundler.js`,
      formats: ["es"],
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ["vue"],
    },
  },
});
