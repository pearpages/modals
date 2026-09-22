# 0012. Project knowledge lives in architecture, principles, decisions and tasks

- **Date:** 2026-09-22
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

Knowledge sat in a 700-line CLAUDE.md of dated session notes and a 3,061-line specs.md. specs.md was mostly generic tutorial material and contradicted the code in about 20 places: an `@/` alias that doesn't exist, error recovery that doesn't exist, reduced motion that isn't handled. Open TODOs were scattered across sessions.

## Decision

Split by kind:
- `architecture.md`: how it is built.
- `principles.md`: rules every change follows.
- `decisions.md` + `docs/adr/`: why.
- `tasks.md`: open and done.

CLAUDE.md keeps only how to work here and pointers. specs.md is retired. Its accurate parts moved to architecture.md, and the docs site is the user-facing API reference. Session outcomes go to these files, not to CLAUDE.md (this overrides the global session-note habit for this repo).

## Consequences

+ Each fact has one home, and the rules are explicit and checkable.
+ New sessions load a short CLAUDE.md.
− Every change must touch tasks.md, and architecture.md when structure changes. That discipline is the point.
