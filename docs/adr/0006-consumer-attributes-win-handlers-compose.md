# 0006. Consumer attributes win; `on*` handlers compose

- **Date:** 2026-09-10
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

`Modal.Trigger` spread `{...props}` after its own `onClick`, so a consumer `onClick` silently replaced it. The docs example "Your onClick still runs" showed a modal that never opened. `asChild` merging behaved differently from the plain path.

## Decision

In both render paths (one `renderAsChild` helper for all nine parts): consumer attributes override ours, `on*` handlers compose with the consumer's first, and the consumer's `preventDefault()` cancels ours. className merges child-first and refs merge. `Modal.Content` merges `style` with its inline z-index.

## Consequences

+ Adding a handler never breaks the part.
+ One helper, one behaviour.
− A consumer can still override structural attributes (`role`, `aria-*`) and break semantics. That is their call.
