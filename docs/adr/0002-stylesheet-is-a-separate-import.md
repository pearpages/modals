# 0002. The stylesheet is a separate import, and the SCSS import is a build input

- **Date:** 2026-09-09
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

Consumers need a CSS file, and bundlers tree-shake better when the JS entry has no side effects. An earlier plan was to delete `import './styles/index.scss'` from `src/index.ts` as "unused". But that import is what puts the SCSS into the tsup graph, so esbuild emits `dist/index.css`.

## Decision

Keep the import in `src/index.ts` as a documented build input. tsup extracts it to `dist/index.css`, exported as `@pearpages/modals/styles.css`. `dist/index.js` never references the CSS, and `package.json` declares `sideEffects: false`. Consumers import `@pearpages/modals/styles.css` once, themselves.

## Consequences

+ JS stays side-effect free and tree-shakable. CSS is one cacheable file.
+ It works in any bundler and with CSS cascade layers.
− One extra import for consumers, and forgetting it gives unstyled modals. The README quick start shows it.
