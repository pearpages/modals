# 0013. `Modal` renders no element of its own

- **Date:** 2026-10-16
- **Status:** Accepted

## Context

While open, `Modal` rendered `<div className data-modal-id {...rest}>` where the consumer wrote it, and only `Modal.Content` was portalled. Its child portals away, so the div was always empty, but it was still in the consumer's layout. In a grid, a flex row with `gap` or a `<ul>`, it became an extra item the moment the modal opened, and the page behind the dialog reflowed. In bitepals, a feed card that mounts its sheet next to its `<li>` in a two-column grid pushed every later card down one slot. Nothing in the library or the docs site styled the div; it existed only to carry `ModalProps`' HTML attributes.

Two fixes were considered:

- **(a) Keep the div and give it `display: contents`.** No API change, a patch release. But it hides an element that has no job, and `className` on it would keep doing nothing visible.
- **(b) Remove the div.** `Modal` renders its providers around `children`. `ModalProps` loses its HTML attributes, which is breaking (P5).

## Decision

(b). `Modal` renders no DOM of its own, and `ModalProps` is `id`, `open`, `onOpenChange` and `children`. `Modal.Content` puts `data-modal-id` on the dialog, so selecting a modal by id still works and now selects the element that is actually on screen. Released as 0.5.0 with migration notes in the README, following 0.2.0's removal of `ModalSystem`'s wrapper div.

## Consequences

+ An open `Modal` can be written anywhere, including between grid or list items, without moving the page.
+ `data-modal-id` is on the dialog, where a stylesheet or a test can use it.
− Consumers who passed `className` or other attributes to `Modal` must move them to `Modal.Content`. TypeScript flags each one.
