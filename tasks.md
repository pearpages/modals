# Tasks

This file tracks every action taken on the project. Open items at the top, finished ones
logged below with a date. CLAUDE.md session notes keep the _why_; this file keeps the _what_.

## Open

### 1. `/publish` project skill — `.claude/skills/publish/SKILL.md`

Why: the release checklist lives only in prose, and 0.4.0 skipped its last step (no GitHub
Release). Usage: `/publish patch|minor|major`, or `/publish resume vX.Y.Z` to finish a
half-done release. Each step checks its result before the next runs; confirm before anything
outward-facing.

- [x] 0. Preflight: on `main`, clean tree, `main == origin/main`, `gh auth status`, Node matches
      `.nvmrc`; list commits since the last tag and propose the bump level.
- [x] 1. Docs before the bump: README `## What's new in X.Y.Z` (migration notes if breaking),
      `specs.md` for API changes, docs site covers new props/behaviour, CLAUDE.md session note,
      this file.
- [x] 2. Local gates: lint, `test:run`, build, `check:package`, playground build,
      `test:playground`, `e2e -w playground`, `npm pack --dry-run`.
- [x] 3. `npm version <level>` → `chore(release): X.Y.Z` + tag `vX.Y.Z`.
- [x] 4. Push `main`; watch "Deploy to GitHub Pages" for that SHA until it goes green.
- [x] 5. Only then push the tag; watch "Publish to npm"; fail if its steps were skipped
      (the v0.1.1 trap).
- [x] 6. Verify npm: `npm view @pearpages/modals version` == X.Y.Z, provenance attached.
- [x] 7. Verify the site: modals.pearpages.com returns 200 and the deployed bundle contains new
      content.
- [x] 8. `gh release create vX.Y.Z --latest` with the README section as notes; `gh release view`.
- [x] 9. Wrap-up: clean tree, date the CLAUDE.md note, add the release to Done below.
- [x] Recovery rules: a failed publish is re-run with `gh workflow run publish.yml --ref vX.Y.Z`;
      never move a tag npm already consumed.
- [x] Point README "Releasing" and the CLAUDE.md checklist at `/publish` so they stay in sync.

### 2. Finish the 0.4.0 release (first real run of `/publish resume v0.4.0`)

Tag, npm 0.4.0 and both CI runs are done (2026-09-21). Missing:

- [x] README `## What's new in 0.4.0` (replaces the 0.3.0 section): `data-modal-keep-active`,
      visual-viewport following (`--modal-vvh`, `--modal-vv-offset-top`), no `@charset` in the
      stylesheet. Additive, no migration needed.
- [x] GitHub Release `v0.4.0` from that section; `gh release list` still shows 0.3.0 as Latest.
- [x] CLAUDE.md session note for 0.4.0; the 0.3.0 note is undated (released 2026-09-17).
- [x] Commit the uncommitted CLAUDE.md diff (prettier formatting only) along with the note.

### 3. specs.md behind the API

- [ ] `placement` under Modal.Content (`center|start|end|top|bottom`, sheet variables).
- [ ] Inert-outside behaviour and `data-modal-keep-active` under Accessibility.
- [ ] Mobile keyboard / visual viewport under Responsive.
- [ ] Docs site: visual-viewport behaviour is not mentioned on any page.

### 4. Carried over from CLAUDE.md

- [ ] Decide whether `deploy.yml` moves to Node 22 (publish already runs 22) and whether
      `pnpm-lock.yaml` stays next to `package-lock.json` (CI is npm-only).
- [ ] Fix the 10 React `act()` warnings from `Modal.Content` in the suite (231 tests pass).
- [ ] `placement` slides with physical `translateX/Y`, so it is wrong in RTL.
- [ ] `keepMounted` prop (future, per specs.md).
- [ ] Point the unchecked lists in CLAUDE.md (Session 6 pending, Option A) here instead of
      keeping two copies.

## Done

- [x] 2026-09-22 — Released 0.4.0 (e0091ad): README notes, GitHub Release, first `/publish resume` run (task 2).
- [x] 2026-09-22 — `/publish` skill written; CLAUDE.md "Releasing" rule and README point to it (task 1).
- [x] 2026-09-22 — Audit of missing tasks; created this file.
- [x] 2026-09-21 — Released 0.4.0 to npm (visual viewport, `data-modal-keep-active`, `@charset`
      fix). No GitHub Release yet (see 2).
- [x] 2026-09-17 — Released 0.3.0 (`placement` on Modal.Content), GitHub Release made.
- [x] 2026-09-12 — `NPM_TOKEN` secret deleted, `big-refactor` branch removed.
- [x] 2026-09-11 — Released 0.2.0 (first npm trusted publishing), GitHub Release made.
