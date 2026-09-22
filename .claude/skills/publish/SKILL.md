---
name: publish
description: Release @pearpages/modals end to end and verify every step — docs, local gates, version bump, push main, wait for the Pages deploy, push the tag, wait for the npm publish, confirm npm and the live site, create the GitHub Release, record it in tasks.md. Use for any request to release, publish, cut/bump a version, tag, or ship to npm, or when the user invokes /publish. `/publish patch|minor|major` starts a release; `/publish resume vX.Y.Z` finishes a half-done one.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git fetch:*), Bash(git describe:*), Bash(git rev-parse:*), Bash(git rev-list:*), Bash(git tag:*), Bash(git ls-remote:*), Bash(gh auth status:*), Bash(gh run list:*), Bash(gh run view:*), Bash(gh run watch:*), Bash(gh release view:*), Bash(gh release list:*), Bash(npm view:*), Bash(npm run:*), Bash(npm pack --dry-run:*), Bash(node -v), Bash(curl:*), Read, Grep, Glob
---

# publish — release @pearpages/modals and prove each step happened

A release here is ten steps, and CI reports green even when one of them silently did
nothing (v0.1.1 was tagged, the publish run passed in 7 s, npm never got it; 0.4.0 reached
npm with no GitHub Release). This skill runs the steps **in order**, checks the **result** of
each one against reality, and **stops at the first failure** with a report. Never skip ahead,
never "fix forward" past a failed check without the user saying so.

**Confirm before every outward-facing step** — marked ⚠ below: the version bump, each push,
and `gh release create`. Everything else runs without asking.

## Arguments

- `patch | minor | major` — start a new release.
- `resume vX.Y.Z` — finish a release that stopped part-way (see **Resume**).
- none — run step 0, then propose a level from the commits since the last tag and ask:
  any `feat` → **minor**; only `fix` / `docs` / `chore` / `ci` / `test` → **patch**; a `!` in
  a subject or `BREAKING CHANGE` in a body → **major**, which also requires migration notes
  in step 1. While the version is `0.x`, say so if a breaking change is going out as minor.

## Steps

### 0. Preflight

```bash
git rev-parse --abbrev-ref HEAD          # must be main
git status --porcelain                   # must be empty
git fetch origin --tags
git rev-list --count HEAD..origin/main   # must be 0 (not behind origin)
git rev-list --count origin/main..HEAD   # commits ahead; pushed in step 4
gh auth status
node -v; cat .nvmrc                      # must match
git describe --tags --abbrev=0           # previous tag, vPREV
git log vPREV..HEAD --oneline            # what is being released
```

Stop if the range is empty (nothing to release) or any check fails. Being *ahead* of
origin is fine (docs or tooling commits not pushed yet); step 4 pushes them. Being behind
means someone else pushed: stop and let the user pull.

### 1. Docs — draft, the user approves, commit

Draft each item from the commits and diffs in `vPREV..HEAD`, show all drafts together,
apply them once approved, and commit as `docs: prepare X.Y.Z`.

- **README** — replace the existing `## What's new in <prev>` section with
  `## What's new in X.Y.Z`, in the style of the one it replaces: short prose per change, at
  most one code sample, then either `Additive, no migration needed.` or a migration list.
  This section is reused verbatim as the GitHub Release notes in step 8.
- **architecture.md** — diff `src/types.ts`, `src/index.ts` and `src/styles/` over the range;
  for every new or changed public prop, export, data attribute or CSS variable that
  `architecture.md` does not mention, draft the line in the matching section (principles.md
  P16). A choice between alternatives made in the range needs an ADR in `docs/adr/` + a line
  in `decisions.md`.
- **Docs site** — for the same list, `grep` under `playground/src`. If something has no page
  or example, **stop and ask**; do not invent pages inside a release.
- **CLAUDE.md** — nothing; session notes do not go there (principles.md P21).
- **tasks.md** — tick the Open items this release completes.

### 2. Local gates

Run in this order; any failure stops the release.

```bash
npm run lint
npm run test:run
npm run build
npm run check:package
npm run build -w playground
npm run test:playground
npm run e2e -w playground
npm pack --dry-run
```

For `npm pack --dry-run`, show the file list and flag anything that is not under `dist/`,
`README.md`, `LICENSE` or `package.json`.

### 3. ⚠ Bump

```bash
npm version <level> -m "chore(release): %s"
```

Check: `git log -1 --format=%s` is `chore(release): X.Y.Z`, `git tag --points-at HEAD` is
`vX.Y.Z`, and `package.json` says `X.Y.Z`. The version lives in `package.json`; the tag does
not set it.

### 4. ⚠ Push main, wait for the deploy

```bash
git push origin main
gh run list --workflow deploy.yml --commit <sha> --json databaseId,status
gh run watch <id> --exit-status
```

The run can take a few seconds to appear; poll `gh run list` briefly. Stop unless it ends in
`success`.

### 5. ⚠ Push the tag — only after step 4 is green

The publish workflow skips every step (and still reports success) when the tagged commit is
not yet an ancestor of `origin/main`. That is why main goes first.

```bash
git push origin vX.Y.Z
gh run list --workflow publish.yml --branch vX.Y.Z --json databaseId,status
gh run watch <id> --exit-status
gh run view <id> --json jobs --jq '.jobs[].steps[] | select(.name=="Publish") | .conclusion'
```

The last line must print `success`. `skipped` means nothing was published — stop and see
**Recovery**.

### 6. Verify npm

```bash
npm view @pearpages/modals@X.Y.Z version            # must print X.Y.Z
npm view @pearpages/modals@X.Y.Z dist.attestations  # must be non-empty (provenance)
```

The registry can lag several minutes after a successful publish (0.4.1 took ~3). Retry for
up to ~10 minutes with `--prefer-online` (or read `https://registry.npmjs.org/@pearpages%2fmodals`
directly, which bypasses the local cache). While waiting, confirm the Publish step log ends
with `+ @pearpages/modals@X.Y.Z` and a provenance line
(`gh run view <id> --log | grep '+ @pearpages/modals@'`). If that line is there the publish
happened and it is only lag; if it is missing, stop and see **Recovery**.

### 7. Verify the site

```bash
curl -sI https://modals.pearpages.com/ | head -1     # 200
```

Then fetch the page, follow its main JS asset, and check it contains a string introduced
by this release (a new prop name, a heading from the What's new section). If the release
changed nothing visible on the site, say so and accept the 200.

### 8. ⚠ GitHub Release

Write the README `## What's new in X.Y.Z` section body to a file in the scratchpad
directory (BSD `sed` on macOS; this awk works everywhere), then:

```bash
awk "/^## What's new in X.Y.Z/{f=1;next} /^## /{f=0} f" README.md \
  | awk 'NR==1 && /^$/ {next} {print}' > <scratchpad>/notes-X.Y.Z.md
gh release create vX.Y.Z --title X.Y.Z --notes-file <scratchpad>/notes-X.Y.Z.md --latest
gh release view vX.Y.Z
gh release list --limit 3                             # vX.Y.Z marked Latest
```

### 9. Wrap-up

- Add `- [x] YYYY-MM-DD: Released X.Y.Z (<short sha>)` to the top of **Done** in
  `tasks.md`, and make sure architecture.md reflects the release.
- Commit `docs: record the X.Y.Z release`, then ⚠ push main (a docs-only deploy re-runs;
  that is fine).
- Final check: `git status --porcelain` empty, `HEAD == origin/main`.
- Print a summary table: step · result · link (deploy run, publish run, npm page, release).

## Resume

`/publish resume vX.Y.Z` checks each step against reality and restarts at the first one
that is not true:

| Step | Already done when                                                                 |
| ---- | --------------------------------------------------------------------------------- |
| 1    | README has `## What's new in X.Y.Z`                                                |
| 3    | tag `vX.Y.Z` exists locally and `package.json` is `X.Y.Z` at that tag              |
| 4    | the tagged commit is on `origin/main` and its deploy run succeeded                |
| 5    | `git ls-remote --tags origin vX.Y.Z` finds it and a publish run for it succeeded  |
| 6    | `npm view @pearpages/modals@X.Y.Z version` prints it                               |
| 8    | `gh release view vX.Y.Z` succeeds                                                  |
| 9    | `tasks.md` Done has the exact line `: Released X.Y.Z (<sha>)`                      |

Match the step-9 line exactly: a looser note such as "Released X.Y.Z to npm" written before
the release was finished does not count. Skip step 2 on resume if the tag already exists (the release commit was gated then). If
step 1 is missing after the tag, write the docs on `main` as a normal `docs:` commit — the
release notes do not need to be inside the tagged commit.

## Recovery

- **Publish run failed, or `Publish` was skipped** → fix on `main`, push, then re-run for the
  same tag without re-tagging: `gh workflow run publish.yml --ref vX.Y.Z`. A tag may be moved
  only if nothing was published from it; once npm has `X.Y.Z`, never move or reuse it —
  release the next patch instead.
- **`ENEEDAUTH` / "OIDC token exchange error - package not found"** → the Trusted Publisher
  entry on npmjs.com does not match `pearpages/modals` + `publish.yml`. The publish step runs
  with `--loglevel verbose` so the exchange error is in the log. The user has to fix it on
  npmjs.com; then re-run as above.
- **`check:package` fails in CI but not locally** → publint picks the package manager from
  the lockfile; `check:package` already forces `--pack npm`. Look for a new lockfile or
  a changed script.
- **Deploy failed** → do not push the tag. Fix, push main again, wait for green.
