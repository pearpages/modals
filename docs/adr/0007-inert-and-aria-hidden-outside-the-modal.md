# 0007. The page outside the modal gets `inert` and `aria-hidden`; `data-modal-keep-active` opts out

- **Date:** 2026-09-10 (keep-active 2026-09-20)
- **Status:** Accepted
- **Note:** Recorded 2026-09-22 from project history (CLAUDE.md session notes and commits).

## Context

Comparing with Radix showed a gap: while a modal was open, assistive tech could still reach the page behind it. Later, pulp showed that a toast region next to the dialog container ("Removed · Undo") became unreachable and unannounced while the dialog was open.

## Decision

While the stack is non-empty, `useInertOutside` marks every sibling on the chain from `#modal-root` up to `body` with both `inert` (tab order and a11y tree in current browsers) and `aria-hidden="true"` (older AT). It restores only the attributes it set. A sibling carrying `data-modal-keep-active` is skipped. The attribute is read on the sibling itself and is not inherited.

## Consequences

+ The page behind is truly unreachable, as `aria-modal` promises.
+ Toast regions can stay live.
− Anything the host renders beside `#modal-root` is inert unless it opts out. Keeping an opted-out region keyboard-reachable is the consumer's job, since nothing traps focus into it.
