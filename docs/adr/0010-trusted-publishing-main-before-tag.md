# 0010. npm trusted publishing; push `main` before the tag

- **Date:** 2026-09-10
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

`v0.1.1` was tagged and its publish run was green in 7 s, but npm never got it. The tag was pushed before its commit reached `main`, so the ancestor guard skipped every step. Separately, the `NPM_TOKEN` secret had expired.

## Decision

`publish.yml` authenticates through npm trusted publishing (OIDC, provenance). It uses Node 22 with `npm@^11` and no `registry-url` in `setup-node` (it would shadow OIDC), publishes with `--loglevel verbose`, and has `workflow_dispatch` to re-run a tag. The release order is: push `main`, wait for the deploy, then push the tag.

## Consequences

+ No token to rotate, and provenance comes for free.
− The Trusted Publisher entry on npmjs.com must match repo + workflow exactly. A mismatch surfaces as `ENEEDAUTH` / "OIDC token exchange error".
− A tag pushed early still reports green, which is why ADR-0011 exists.
