import eslint from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import _import from "eslint-plugin-import";
import tseslint from "typescript-eslint";
/** @type {import('eslint').Linter.Config} */
export default tseslint.config(
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/.turbo/**"],
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.cjs",
    ],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      ...pluginQuery.configs['flat/recommended'],
    ],
    plugins: {
      import: _import,
      prettier: prettier,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "no-console": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "~/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    plugins: { "@next/next": pluginNext },
    rules: { ...pluginNext.configs.recommended.rules },
  }
);
