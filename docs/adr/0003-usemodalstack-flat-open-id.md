# 0003. `useModalStack` keeps the flat `open(id)` form

- **Date:** 2026-09-09
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

specs.md sketched an indexed API (`modals['confirm'].open()`, `isOpen` as a value), while the hook returned `open(id)`, `close(id)`, `isOpen(id)`, `getModal(id)`.

## Decision

Keep the flat functions and change the docs and types to match. An indexed object cannot be typed honestly: any key type-checks, and a typo throws at runtime. `isOpen` as a value would also rebuild the returned object on every stack change.

## Consequences

+ Honest types; unknown ids warn at runtime instead of throwing.
− No per-modal handle object. Callers repeat the id string.
