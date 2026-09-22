# 0008. `Modal.Close asChild` adds no library class

- **Date:** 2026-09-10
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

`Modal.Close asChild` merged `modalClose`, the 32px icon-button class, onto its child. Every footer built as `Modal.Close asChild` + `Modal.Button`, including the README quick start, clipped its labels ("ance", "ublis"). A text `<Modal.Close>Not now</Modal.Close>` became a square.

## Decision

With `asChild` the child keeps its own look and only gains the behaviour. The fixed square is the `modalClose--icon` modifier, applied only to a bare `<Modal.Close />` (the × glyph). A `Modal.Close` with a text label renders an ordinary quiet button.

## Consequences

+ Wrapping any button in `Modal.Close asChild` is safe.
− Consumers who relied on `asChild` inheriting the icon look must add it themselves.
