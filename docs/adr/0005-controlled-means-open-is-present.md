# 0005. A modal is controlled exactly when `open` is present

- **Date:** 2026-09-10
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

Dismiss paths decided "controlled" by whether `onOpenChange` was passed, so an uncontrolled modal with a listener could never close. Meanwhile `useModalStack` and `Modal.Trigger` wrote straight to the provider even on controlled modals, and Escape closed a modal whose parent had declined.

## Decision

A modal is controlled exactly when it has an `open` prop, recorded as `controlled` in its registry entry. Every library path goes through the provider's `requestOpen(id)` / `requestClose(id)`. On a controlled modal these only call `onOpenChange`. On an uncontrolled one they act, and `Modal` notifies `onOpenChange` afterwards.

## Consequences

+ One predictable rule, mirroring `<input value>`.
− `<Modal open>` without `onOpenChange` is locked open. That is documented, and tests that want dismissal use uncontrolled modals.
