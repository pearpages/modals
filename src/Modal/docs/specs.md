# React Modal (TypeScript) — Iteration Spec

## 1) Goals

- Reusable, app-wide modal system.
- Triggerable from anywhere (buttons, effects, programmatic calls, routes).
- Accessible (WAI-ARIA), keyboard-first, focus-managed.
- Animations without coupling to a specific CSS/JS lib.
- Headless: default styles minimal; allow custom content.

## 2) High-level Design

**Pattern:** Context + Provider store + Portal-mounted `ModalRoot`.

- `ModalProvider` maintains a stack (LIFO) of open modals.
- `useModal()` returns imperative helpers: `open`, `close`, `replace`, `update`, and `isOpen`.
- `ModalRoot` renders the current stack in a portal (default: `document.body`).
- Each modal entry receives props + a render function or ReactNode children.
- Focus trap + return focus to the trigger.
- Scroll lock on body; click-outside & ESC close (configurable per modal).
- Works with multiple simultaneous modals (stack) and queued flows.

**Why Context over local state?**

- Centralized control, programmatic triggers, and cross-tree usage.
- Avoid prop-drilling; supports toasts/confirm flows.

## 3) Public API (TS)

```ts
export type ModalId = string;

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | { maxWidth: number };

export interface ModalOptions {
  id?: ModalId; // auto-generated if omitted
  title?: string; // used for aria-labelledby if no custom label
  role?: 'dialog' | 'alertdialog';
  size?: ModalSize;
  ariaLabel?: string; // if no visible title
  labelledBy?: string; // aria-labelledby override
  describedBy?: string; // aria-describedby override
  closeOnEsc?: boolean; // default: true
  closeOnBackdrop?: boolean; // default: true
  initialFocus?: HTMLElement | null; // default: first focusable
  returnFocus?: HTMLElement | null; // default: triggering element
  trapFocus?: boolean; // default: true
  inertBackground?: boolean; // default: true (or aria-hidden for siblings)
  preventScroll?: boolean; // default: true
  portalTarget?: HTMLElement; // default: document.body
  onClose?: (reason: CloseReason) => void;
  onOpen?: () => void;
  animations?: {
    enter?: string; // CSS class names or variants
    exit?: string;
    backdropEnter?: string;
    backdropExit?: string;
    durationMs?: number; // for unmount after exit
  };
}

export type CloseReason =
  | 'esc'
  | 'backdrop'
  | 'button'
  | 'programmatic'
  | 'unmount'
  | 'route-change';

export interface OpenPayload extends ModalOptions {
  content:
    | React.ReactNode
    | ((ctx: { close: () => void; id: ModalId }) => React.ReactNode);
}

export interface ModalApi {
  open: (payload: OpenPayload) => ModalId;
  close: (id?: ModalId, reason?: CloseReason) => void; // id omitted => closes top
  replace: (id: ModalId, next: OpenPayload) => void;
  update: (id: ModalId, patch: Partial<OpenPayload>) => void;
  isOpen: (id: ModalId) => boolean;
  subscribe: (fn: (stack: ModalEntry[]) => void) => () => void;
}
```

## 4) Components

- `<ModalProvider>{children}<ModalRoot /></ModalProvider>`
- `<ModalRoot />` — renders the stack; each entry:
  - Backdrop (clickable if `closeOnBackdrop`).
  - Container with role, aria attrs, size classes, focus trap.
  - Optional header with `title` and a close button.
  - Content via `content` render fn for access to `close`.

**Optional helpers**

- `confirm(options)` utility: promise-based alert/confirm modal built on `open`.

## 5) Usage Examples (TS)

```tsx
// A) Programmatic open from anywhere
const { open } = useModal();
const onClick = () => {
  open({
    title: 'Edit profile',
    size: 'lg',
    content: ({ close }) => <ProfileForm onSuccess={close} />,
  });
};
```

```tsx
// B) Promise-based confirm
const ok = await confirm({
  title: 'Delete item?',
  content: ({ close }) => (
    <div>
      <p>This cannot be undone.</p>
      <div className="actions">
        <button onClick={() => close('button')}>Cancel</button>
        <button data-variant="danger" onClick={() => resolveAndClose(true)}>
          Delete
        </button>
      </div>
    </div>
  ),
  role: 'alertdialog',
});
if (ok) deleteItem();
```

```tsx
// C) Route-driven modal
useEffect(() => {
  if (route.query.modal === 'help') {
    const id = open({ title: 'Help', content: <HelpPanel /> });
    return () => close(id, 'route-change');
  }
}, [route.query.modal]);
```

## 6) Accessibility & UX

- `role="dialog"` or `role="alertdialog"`.
- Label: prefer visible `<h2 id>` + `aria-labelledby`; fallback `aria-label`.
- Trap tab focus within modal; shift+tab loops.
- ESC closes if `closeOnEsc`.
- Click backdrop closes if `closeOnBackdrop`.
- Return focus to trigger element.
- Make background inert (or set `aria-hidden` for siblings).
- Avoid focus loss on unmount during exit animation; defer unmount by `durationMs`.
- Scroll lock (body `overflow: hidden`; restore on last modal close).

## 7) Animations

- Headless by default; expose `data-state="open|closing"` and `data-index` for stacking.
- CSS class hooks: container/backdrop enter/exit.
- Provide sensible defaults (opacity/scale) but keep overrideable.

## 8) Stacking & Z-index

- Maintain a numeric stack; top receives focus.
- `z-index` tokens (e.g., 1000 + index\*2).
- Backdrops per modal (stacked) or single shared backdrop (config option).

## 9) Performance

- Lazy-mount content on open; unmount on close (after exit delay).
- Offscreen measure avoided; no layouts in loops.
- Keep provider minimal (useReducer + context selector to avoid rerenders).

## 10) Error handling

- Swallow duplicate open if same `id` unless `replace` specified.
- Guard when portal target missing (SSR -> no-op until client).
- Warn when both `title` and `ariaLabel` missing.

## 11) SSR & Hydration

- No portal render on server; render `null`.
- Defer focus/scroll logic to `useEffect`.
- IDs stable across hydration.

## 12) Theming & Styling Hooks

- Minimal base CSS (tokens):
  - `[data-modal-root]` container; backdrop `[data-backdrop]`.
  - Size classes: `.m-sm|.m-md|.m-lg|.m-xl` or data-size.
  - State attrs: `[data-state="open"]`, `[data-state="closing"]`.

## 13) Testing Strategy

- RTL: open/close via API, ESC, backdrop, focus loop, return focus.
- Axe: no critical a11y violations.
- Snapshot minimal (structure only).

## 14) Extensibility

- `update(id, { content })` to morph flows (wizards).
- Support nested focus traps (only top active).
- Expose events: `onOpen`, `onClose(reason)`.

## 15) Minimal Implementation Plan

1. `ModalProvider` with reducer: add/remove/replace/update.
2. `useModal()` context.
3. `ModalRoot` with portal, backdrop, container, aria wiring.
4. Focus trap + return focus.
5. ESC/backdrop handling.
6. Scroll lock + inert background.
7. Anim exit timing + unmount.
8. Helpers: `confirm()`.

## 16) Open Questions (for iteration)

- Do we want a **queue** mode (serialize opens) vs **stack**? Default stack.
- Single shared backdrop vs per-modal backdrops?
- Provide default header/footer layout?
- Controlled usage: `<Modal open onClose>` wrapper needed?
- Add `useBlockClose(predicate)` for forms with dirty state?

---

## 17) Code Skeleton (TS, concise)

```tsx
// modal/ModalContext.tsx
export const ModalProvider: React.FC<{ children: React.ReactNode }>;
export const ModalRoot: React.FC<{ className?: string }>;
export function useModal(): ModalApi;
export function confirm(
  opts: Omit<OpenPayload, 'role'> & { role?: 'alertdialog' },
): Promise<boolean>;
```

```tsx
// Example style hooks (SCSS)
[data-modal-root] [data-backdrop] { /* opacity, pointer-events */ }
[data-modal-root] [data-dialog] {
  /* size via data-size, transitions via data-state */
}
```

## 18) Non-goals (v1)

- No built-in forms library integration (just examples).
- No enforced design system styles (headless by default).
- No drag-to-close (mobile) in v1 (candidate for v2).

---

## 19) Example: Delete flow with 3 modals (stacked + chained)

### A) Stacked modals (each opens the next)

```tsx
// api.ts
export async function deleteItem(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 600)); // mock
}

// DeleteFlow.tsx
import React from 'react';
import { useModal } from './modal/ModalContext';
import { deleteItem } from './api';

type Item = { id: string; name: string };

export const DeleteItemButton: React.FC<{ item: Item }> = ({ item }) => {
  const { open } = useModal();
  return (
    <button
      onClick={() => {
        open({
          id: `delete:${item.id}`,
          title: `Delete “${item.name}”`,
          content: ({ close }) => (
            <DeleteItemModal item={item} onCancel={() => close()} />
          ),
        });
      }}
    >
      Delete
    </button>
  );
};

const DeleteItemModal: React.FC<{ item: Item; onCancel: () => void }> = ({
  item,
  onCancel,
}) => {
  const { open } = useModal();
  return (
    <div>
      <p>
        You're about to delete <strong>{item.name}</strong>.
      </p>
      <div className="actions">
        <button onClick={onCancel}>Cancel</button>
        <button
          data-variant="danger"
          onClick={() => {
            // Open the confirmation modal on top of this one
            open({
              id: `confirm-delete:${item.id}`,
              role: 'alertdialog',
              title: 'Are you absolutely sure?',
              closeOnBackdrop: false,
              content: ({ close }) => (
                <ConfirmDeleteModal
                  item={item}
                  onCancel={() => close('button')}
                />
              ),
            });
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const ConfirmDeleteModal: React.FC<{ item: Item; onCancel: () => void }> = ({
  item,
  onCancel,
}) => {
  const { close, open } = useModal();
  const [busy, setBusy] = React.useState(false);

  const doDelete = async () => {
    setBusy(true);
    try {
      await deleteItem(item.id);
      // On success, open the success modal (top of stack)
      open({
        id: `delete-success:${item.id}`,
        title: 'Deleted successfully',
        content: ({ close }) => (
          <SuccessModal
            message={`“${item.name}” was deleted.`}
            onClose={() => close('button')}
          />
        ),
      });
      // Optionally close underlying modals programmatically
      close(`confirm-delete:${item.id}`, 'programmatic');
      close(`delete:${item.id}`, 'programmatic');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <p>This action cannot be undone.</p>
      <div className="actions">
        <button disabled={busy} onClick={onCancel}>
          Back
        </button>
        <button disabled={busy} data-variant="danger" onClick={doDelete}>
          {busy ? 'Deleting…' : 'Yes, delete'}
        </button>
      </div>
    </div>
  );
};

const SuccessModal: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => (
  <div>
    <p>{message}</p>
    <div className="actions">
      <button autoFocus onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);
```

**Flow:**

1. `DeleteItemModal` opens from button. 2) Its “Continue” opens `ConfirmDeleteModal`. 3) On confirm + success, we open `SuccessModal` and programmatically close the previous two (by `id`).

### B) Promise-based confirm helper (shorter)

```tsx
// confirm helper usage — implemented atop open/close
import { useModal, confirm } from './modal/ModalContext';

export const DeleteItemButton2: React.FC<{ item: Item }> = ({ item }) => {
  const { open } = useModal();
  const click = async () => {
    // 1) Show informational delete modal (optional)
    const infoId = open({
      title: `Delete “${item.name}”`,
      content: ({ close }) => (
        <div>
          <p>Preparing to delete. Press Continue.</p>
          <button onClick={() => close('button')}>Continue</button>
        </div>
      ),
    });

    // 2) Confirm
    const ok = await confirm({
      role: 'alertdialog',
      title: 'Confirm delete',
      content: ({ close }) => (
        <div>
          <p>This will permanently remove the item.</p>
          <div className="actions">
            <button
              onClick={() => close('button') /* resolve(false) inside helper */}
            >
              Cancel
            </button>
            {/* helper wires resolve(true) */}
            <button
              data-variant="danger"
              onClick={() => {
                /* resolve(true) */
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      closeOnBackdrop: false,
    });

    if (!ok) return;

    await deleteItem(item.id);

    // 3) Success modal (and close the first by id)
    open({
      title: 'Done',
      content: (
        <SuccessModal message={`“${item.name}” deleted.`} onClose={() => {}} />
      ),
    });
  };

  return <button onClick={click}>Delete</button>;
};
```

### C) Replace-in-place (single modal morphing through steps)

```tsx
// Use replace to avoid stacking
const DeleteFlowCompact: React.FC<{ item: Item }> = ({ item }) => {
  const { open, replace, close } = useModal();

  const start = () => {
    const id = open({
      id: `flow:${item.id}`,
      title: `Delete “${item.name}”`,
      content: ({}) => (
        <div>
          <p>First step. Continue?</p>
          <button
            onClick={() =>
              replace(`flow:${item.id}`, {
                title: 'Confirm',
                role: 'alertdialog',
                content: () => (
                  <div>
                    <p>Are you sure?</p>
                    <button onClick={() => close(`flow:${item.id}`, 'button')}>
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        await deleteItem(item.id);
                        replace(`flow:${item.id}`, {
                          title: 'Success',
                          content: () => (
                            <SuccessModal
                              message="Deleted."
                              onClose={() => close(`flow:${item.id}`, 'button')}
                            />
                          ),
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ),
              })
            }
          >
            Continue
          </button>
        </div>
      ),
    });
  };

  return <button onClick={start}>Delete</button>;
};
```

**Notes**

- A) demonstrates **stacked modals** with explicit ids and programmatic closing.
- B) shows a **promise-based confirm** helper to simplify the logic.
- C) shows **replace-in-place** to reuse a single modal id for multi-step flows.
