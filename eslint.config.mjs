import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: ["dist/**", "coverage/**", "storybook-static/**", "*.config.js"],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...ts.configs.recommended],
    languageOptions: {
      parser: ts.parser,
      sourceType: "module",
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    extends: [
      reactPlugin.configs.flat.recommended,
      reactHooksPlugin.configs.flat["recommended-latest"],
    ],
    rules: {
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);
