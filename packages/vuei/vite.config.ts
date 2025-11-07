import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), tailwindcss(), Icons({ compiler: "vue3" })],
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
        "theme.css": resolve(__dirname, "src/assets/css/theme.css"),
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
