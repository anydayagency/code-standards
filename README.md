# @anydayagency/code-standards

Shared ESLint, Prettier and TypeScript config for every Anyday repo. CI enforces it; there is no separate style guide.

## Install

```bash
npm i -D github:anydayagency/code-standards#v1.0.0 eslint prettier typescript@~6.0
# Next.js repos also need: eslint-config-next
```

## Use

`eslint.config.mjs`
```js
export { default } from "@anydayagency/code-standards/eslint/next"; // Next.js
// export { default } from "@anydayagency/code-standards/eslint";    // anything else
```

`package.json`
```json
{ "prettier": "@anydayagency/code-standards/prettier" }
```

`tsconfig.json`
```json
{ "extends": "@anydayagency/code-standards/tsconfig/next" }
```

Copy `templates/dependabot.yml` to `.github/dependabot.yml`.

## Rules

| Rule | Fails on | Allowed |
|---|---|---|
| No `any` | `(x: any)` | `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason` |
| Disable comments need a reason | `// eslint-disable-next-line rule` | `... -- why` |
| No console logs | `console.log` | `console.warn`, `console.error` |
| No unused code | unused vars, imports, args, unused disable comments | prefix `_` to mark intentional |
| File names | `HeroCard.tsx` | `hero-card.tsx`, `next.config.ts` |
| Folder names | `BadFolder/` | `hero-section/`, `[slug]/`, `(marketing)/` |
| Names | `function hero_card` | `HeroCard`, `heroCard`, `MAX_ITEMS` |
| Strict TypeScript | implicit any, unchecked index access | |

Next.js repos also get Next's core web vitals and TypeScript rules.

## Changing a rule

Open a PR here, merge, tag a new version (`v1.1.0`), then Dependabot bumps it in every repo.
