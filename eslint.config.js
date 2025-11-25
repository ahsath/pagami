import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import globals from "globals";

export default defineConfig(
  { ignores: ["*.d.ts", "**/dist"] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"],
      ...pluginVueA11y.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals["shared-node-browser"],
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      "vuejs-accessibility/form-control-has-label": [
        "error",
        {
          controlComponents: ["BaseRadio", "BaseCheckbox"],
        },
      ],
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vuejs-accessibility/label-has-for": "off",
      // This rule is already handled by the Vue plugin, but this disables
      // the base TypeScript rule to prevent false positives.
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Prettier config comes last to override styling rules
  eslintConfigPrettier,
);
