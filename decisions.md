# Decisions

Architecture Decision Records for `@pearpages/modals`. Each ADR in `docs/adr/` records one
choice, its context and its trade-off. The rules that follow from them are in
[principles.md](principles.md).

New ADR: copy the format below, take the next number, and add a line here. An accepted ADR
is not edited; reversing it means a new ADR whose status says `Supersedes NNNN`, and the old
one's status becomes `Superseded by NNNN`. ADRs are proposed to the user before they are
accepted.

| # | Decision | Status | Date |
|---|---|---|---|
| [0001](docs/adr/0001-direct-class-names-no-css-modules.md) | Direct class names, no CSS modules or namespace wrapper | Accepted | 2025-09-28 |
| [0002](docs/adr/0002-stylesheet-is-a-separate-import.md) | The stylesheet is a separate import, and the SCSS import is a build input | Accepted | 2026-09-09 |
| [0003](docs/adr/0003-usemodalstack-flat-open-id.md) | `useModalStack` keeps the flat `open(id)` form | Accepted | 2026-09-09 |
| [0004](docs/adr/0004-basezindex-lives-on-the-provider.md) | `baseZIndex` lives on the provider only | Accepted | 2026-09-09 |
| [0005](docs/adr/0005-controlled-means-open-is-present.md) | A modal is controlled exactly when `open` is present | Accepted | 2026-09-10 |
| [0006](docs/adr/0006-consumer-attributes-win-handlers-compose.md) | Consumer attributes win; `on*` handlers compose | Accepted | 2026-09-10 |
| [0007](docs/adr/0007-inert-and-aria-hidden-outside-the-modal.md) | The page outside the modal gets `inert` and `aria-hidden`; `data-modal-keep-active` opts out | Accepted | 2026-09-10 (keep-active 2026-09-20) |
| [0008](docs/adr/0008-modal-close-aschild-adds-no-class.md) | `Modal.Close asChild` adds no library class | Accepted | 2026-09-10 |
| [0009](docs/adr/0009-placement-through-backdrop-has.md) | `placement` is laid out through the backdrop's `:has()` | Accepted | 2026-09-17 |
| [0010](docs/adr/0010-trusted-publishing-main-before-tag.md) | npm trusted publishing; push `main` before the tag | Accepted | 2026-09-10 |
| [0011](docs/adr/0011-releases-only-through-publish.md) | Releases go only through the `/publish` skill | Accepted | 2026-09-22 |
| [0012](docs/adr/0012-project-knowledge-files.md) | Project knowledge lives in architecture, principles, decisions and tasks | Accepted | 2026-09-22 |

## Format

```md
# NNNN. Title

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by NNNN

## Context
What forces the choice.

## Decision
What we do.

## Consequences
What gets better (+) and what it costs (−).
```
