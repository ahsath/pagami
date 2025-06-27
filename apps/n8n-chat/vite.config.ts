import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vueDevTools from "vite-plugin-vue-devtools";

const __dirname = dirname(fileURLToPath(import.meta.url));
const includesRuntime = process.env.INCLUDE_RUNTIME === "true";

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": process.env.NODE_ENV
      ? `"${process.env.NODE_ENV}"`
      : '"development"',
  },
  build: {
    lib: {
      entry: {
        "n8n-chat": resolve(__dirname, "src/n8n-chat.ts"),
      },
      fileName: (format) => {
        return includesRuntime
          ? `n8n-chat.${format}.js`
          : `n8n-chat.${format}-bundler.js`;
      },
      cssFileName: "n8n-chat",
      formats: ["es"],
    },
    rollupOptions: {
      external: includesRuntime ? [] : ["vue"],
    },
    emptyOutDir: !includesRuntime,
  },
});
