# 0004. `baseZIndex` lives on the provider only

- **Date:** 2026-09-09
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

`ModalRoot` defaulted its own `baseZIndex` prop to 1000 and used it for backdrops, while `Modal.Content` read the provider's value. Setting it on the provider moved dialogs but not their backdrops, so the two ended up in different layer bands. The fix was later reversed by re-enabling the prop.

## Decision

`baseZIndex` is a prop of `ModalSystem` / `ModalProvider` only. `ModalRoot` and `Modal.Content` read it from context. `z-index = baseZIndex + stackIndex` for both backdrop and dialog. There is no z-index CSS variable.

## Consequences

+ A backdrop and its dialog always share a band.
− `ModalRoot` users who passed `baseZIndex` had to move it (a 0.2.0 migration note).
