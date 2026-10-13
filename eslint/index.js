// Anyday base ESLint config (flat config). Framework-agnostic.
// Usage in eslint.config.mjs:  export { default } from "@anydayagency/code-standards/eslint";
import js from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import checkFile from "eslint-plugin-check-file";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export const ignores = [
  "**/node_modules/**",
  "**/.next/**",
  "**/dist/**",
  "**/build/**",
  "**/out/**",
  "**/coverage/**",
  "**/.sanity/**",
  "**/next-env.d.ts",
];

export default defineConfig([
  { ignores },
  { linterOptions: { reportUnusedDisableDirectives: "error" } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  comments.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { "check-file": checkFile },
    rules: {
      // No `any`. If one is unavoidable, the disable comment must say why:
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any -- third-party type is wrong
      "@typescript-eslint/no-explicit-any": "error",
      "@eslint-community/eslint-comments/require-description": "error",
      "@eslint-community/eslint-comments/no-unlimited-disable": "error",

      // No console.log in production code. console.warn / console.error are allowed.
      "no-console": ["error", { allow: ["warn", "error"] }],

      // No unused code. Prefix with _ to mark something intentionally unused.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "no-unreachable": "error",

      // Naming: kebab-case files and folders, PascalCase components and types.
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{js,jsx,ts,tsx,mjs,cjs}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "{src,app,components,lib,hooks,utils,sanity}/**/": "NEXT_JS_APP_ROUTER_CASE" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
      ],
    },
  },
]);
