# 0009. `placement` is laid out through the backdrop's `:has()`

- **Date:** 2026-09-17
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

pulp needed a dialog docked to an edge (a sheet) and themes this library through its `--modal-*` variables. Positioning is the backdrop's job (a flex container), but the placement prop lives on `Modal.Content`.

## Decision

`Modal.Content placement="center|start|end|top|bottom"` adds `modal--placement-<x>` and `data-placement` to the dialog. The backdrop lays itself out with `:has(.modal--placement-<x>)`, the same technique as the `--full` rule, so `ModalRoot` knows nothing about placement. Docked rules sit last in `.modal` so they win at equal specificity. New tokens: `--modal-width-sheet`, `--modal-height-sheet`, `--modal-animation-translate-sheet`.

## Consequences

+ Additive; no provider or root changes.
− It needs `:has()` (all current browsers).
− The slide direction uses physical `translateX/Y`, so `start`/`end` slide the wrong way in RTL (open task).
