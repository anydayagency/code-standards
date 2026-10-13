// Anyday ESLint config for Next.js: Next's own rules (core web vitals + TypeScript) + Anyday base.
// Usage in eslint.config.mjs:  export { default } from "@anydayagency/code-standards/eslint/next";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig } from "eslint/config";
import base from "./index.js";

export default defineConfig([...nextVitals, ...nextTs, ...base]);
