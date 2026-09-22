# 0001. Direct class names, no CSS modules or namespace wrapper

- **Date:** 2025-09-28
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

The dialog is portalled out of the consumer's React tree into `#modal-root`. Scoped styles (CSS modules) and an ancestor namespace wrapper (`.pearpages-modals .modal`) both assume the element lives under the component that styled it. The wrapper was tried, and portal-rendered modals rendered unstyled.

## Decision

Style with global, direct class names: camelCase blocks (`.modal`, `.modalBackdrop`, `.modalHeader`) with BEM-style modifiers (`.modal--md`, `.modalClose--icon`). There are no CSS modules and no wrapper. Where a host's descendant selectors could win (a page's `h2` rule), raise specificity inside our own tree (`.modal .modalTitle`) rather than adding a wrapper.

## Consequences

+ Styles apply wherever the portal lands, including a custom `container`.
+ Consumers can target stable class names; tests assert them directly.
− The names are global, so a host could collide with `.modal`. A prefixed BEM rename would be a breaking change and is not planned.
