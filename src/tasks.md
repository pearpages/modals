# 🧩 Milestone 1 — Core

### 1. Define API contracts & IDs

Describe public types/props (TS interfaces), `id` uniqueness rules per `<ModalSystem>`. Add `events` shape.
*Deliverable:* `types.ts`, ADR note.

### 2. Create `<ModalSystem>` wrapper

Compose `<ModalProvider>` + `<ModalRoot>`, pass config (`baseZIndex`, container).
*Deliverable:* component + minimal smoke test.

### 3. `<ModalProvider>` state & stack

Context with registry `{[id]: {open,isTop}}`, push/pop on open/close.
*Deliverable:* context + reducer + tests for nesting.

### 4. `<ModalRoot>` portal & z-index

Render active modals into portal, compute `z = base + index`. Support custom container.
*Deliverable:* portal util + tests.

### 5. `<Modal />` controlled/uncontrolled

Support `open`, `defaultOpen`, `onOpenChange`, unmount when closed.
*Deliverable:* component + controlled/uncontrolled tests.

### 6. `<Modal.Trigger />` sugar

Resolve `target`, wire click/Enter/Space to open. Respect disabled/`asChild`.
*Deliverable:* component + keyboard tests.

### 7. `<Modal.Content />` with sizes

Props: `size`, `animated`, `className`. Mount lifecycle hooks, data-state attrs.
*Deliverable:* layout + snapshots.

### 8. Header/Title/Description/Close/Footer

Lightweight slots; Title/Description set IDs for aria links; Close triggers context close.
*Deliverable:* subcomponents + a11y tests.

---

# ♿ Milestone 2 — UX & Accessibility

### 9. Focus trap + return focus

Trap only when topmost; store last active element per `id`; restore on close.
*Deliverable:* trap util + e2e test.

### 10. Escape/backdrop handlers (topmost only)

Global keydown listens via provider; backdrop closes only if topmost.
*Deliverable:* handler module + tests.

### 11. Body scroll-lock across stack

Ref-count lock; add/remove `overflow:hidden` only when stack transitions 0↔1.
*Deliverable:* lock util + tests.

### 12. SSR-safe behavior

Server renders `null`; client hydrates portals. Provide `useIsClient` guard.
*Deliverable:* SSR fixture (Next.js) + test.

### 17. Accessibility wiring

`role="dialog"`, `aria-modal`, `aria-labelledby/descby`, focus order, tab loop.
*Deliverable:* axe checks + screen-reader notes.

---

# 🎨 Milestone 3 — Styling & Theming

### 13. `useModalStack()` hook

Return dictionary of `open/close/isOpen` per id; stable refs; warn on unknown id.
*Deliverable:* hook + unit tests.

### 14. Animations (`animated`, fade CSS)

CSS transitions with `[data-state=open|closed]`; allow custom class hooks.
*Deliverable:* default fade + docs.

### 15. SCSS module + CSS vars + tokens

Implement BEM classes; expose tokens (`--modal-*`); ensure theming.
*Deliverable:* `Modal.module.scss` + tokens table.

### 16. Responsive rules

Mobile full-screen, desktop centered with max-width; safe area insets.
*Deliverable:* CSS + viewport tests.

---

# ✅ Milestone 4 — QA & Release

### 18. Tests matrix

Unit (state, hooks), a11y (axe), SSR, nested stacks, controlled/uncontrolled, escape/backdrop, scroll-lock.
*Deliverable:* Vitest/RTL + Playwright.

### 19. Docs + usage examples + CSS override examples

Storybook stories for all patterns; copy-paste TS snippets; CSS override section (vars, Tailwind, custom anim).
*Deliverable:* MDX + stories.

### 20. Build/CI/release

Tsup config, type exports, sideEffects settings, tree-shake, size-limit, release script, semantic versioning.
*Deliverable:* CI pipeline + npm publish dry-run.
