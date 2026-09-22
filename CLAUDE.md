# Modal Library Project

`@pearpages/modals`: a React 19 modal library. Compound parts (`Modal.*`), an id-addressed
provider and stack, portal rendering, accessible by default, styled through CSS variables.
`playground/` is both the dev sandbox and the docs site (modals.pearpages.com).

## Project documents — read before working

| File | Holds |
|---|---|
| [principles.md](principles.md) | The rules every change must follow (P1–P22) |
| [architecture.md](architecture.md) | How the library, docs site, tests and CI are built |
| [decisions.md](decisions.md) | Index of ADRs in `docs/adr/`: why each choice was made |
| [tasks.md](tasks.md) | Open work and the dated log of what was done |

The README and the docs site are the user-facing API reference. There is no separate spec.

## Working rules

1. **Read `principles.md` before changing code or docs.** If a change would break a
   principle, stop and ask; don't work around it.
2. **Every change updates `tasks.md`**: tick or add Open items, and add a dated line at the
   top of Done.
3. **A structural or behavioural change updates `architecture.md` in the same commit**, and
   the README and docs site too when users can see it (P16).
4. **A choice between real alternatives** (API shape, dependency, convention, process) gets
   a new ADR in `docs/adr/` plus a line in `decisions.md`. Propose it to the user before
   marking it Accepted. Never edit an accepted ADR; supersede it with a new one.
5. **At the end of a session, outcomes go to those four files, not here.** This file keeps
   only how to work and pointers. This overrides the global "session summary in CLAUDE.md"
   habit for this repository.
6. Confirm before anything outward-facing: pushes, releases, publishing.

## Releasing — always use `/publish`

Any request to release, publish, cut a version, bump or tag goes through the `publish`
skill (`.claude/skills/publish/SKILL.md`): `/publish patch|minor|major`, or
`/publish resume vX.Y.Z` to finish a half-done release. Don't run `npm version`,
`npm publish`, push a `v*` tag or `gh release create` by hand; the skill orders the steps
(main before tag), verifies each one, and records the release in `tasks.md`.

## Development commands

- `npm run test:run`: library test suite (one-shot; never plain `npm test`, which watches)
- `npm run lint`: eslint over `src/` and `playground/src/`
- `npm run build`: build the library (tsup)
- `npm run test:playground`: render every docs route against `dist/` (build first)
- `npm run playground`: docs site against `src/`, with HMR
- `npm run playground:dist`: docs site against the built package
- `npm run build -w playground`: build the site
- `npm run e2e -w playground`: Playwright against the built site (build both first)
- `npm run e2e:shots -w playground`: review screenshots into `playground/e2e/shots/`; Read
  the `--open` frames after any visual change

## Pitfalls that have bitten before

- Modal styles missing → a selector was scoped or namespaced; the dialog is portalled, so
  use the direct classes (ADR-0001).
- Tests failing on classes → assert direct class names (`'modalBackdrop'`), not modules.
- Role queries find nothing once a modal is open → the page is `aria-hidden`; pass
  `{ hidden: true }` or query within the dialog.
- Geometry or colour measured wrong in Playwright → wait for `document.getAnimations()` to
  finish (`waitOpen` in `playground/e2e/helpers.ts`).
- A dismissible modal in a test → open it uncontrolled; `<Modal open>` without
  `onOpenChange` is locked open (P1).
