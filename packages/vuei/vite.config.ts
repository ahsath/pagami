import { fromFileUrl, resolve, dirname } from "@std/path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fromFileUrl(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
});
