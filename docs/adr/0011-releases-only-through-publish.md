# 0011. Releases go only through the `/publish` skill

- **Date:** 2026-09-22
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

The release checklist lived in prose (README + CLAUDE.md), and steps got skipped. 0.1.1 was tagged before main, and 0.4.0 shipped without a GitHub Release. Green CI does not prove a step happened.

## Decision

Every release runs through `.claude/skills/publish/SKILL.md`: `/publish patch|minor|major` or `/publish resume vX.Y.Z`. It orders the steps (docs → gates → bump → push main → deploy green → push tag → Publish step not skipped → npm + provenance → site → GitHub Release → tasks.md). It checks each result, stops at the first failure and confirms before outward steps. Manual `npm version`, `npm publish`, tag pushes and `gh release create` are not used.

## Consequences

+ Repeatable releases with evidence for each step.
− It needs Claude Code. The README keeps the manual two-push explanation for humans.
