## Modal Library Specification

### Goals
- Provide reusable, accessible, customizable modal components
- Support animations, stacking, size variants, and responsive behavior
- Minimize external dependencies
- Maintain a minimalist but beautiful visual style

### Core Features
- `<Modal />` component with open/close state
- `<Modal.Trigger />` and `<Modal.Content />` composition
- Escape key and backdrop click to close (configurable)
- Focus trap and return to trigger
- Portal rendering

### Architecture

### SSR Behavior
- `<ModalSystem>` is **safe by default in server-side rendering environments**.
- On the server, it renders nothing (`null`) to avoid access to `window` or `document`.
- This avoids hydration errors and runtime crashes in frameworks like Next.js or Remix.
- On the client, hydration occurs normally and all portals/mounts function as expected.

**Advanced Usage:**
- If SSR modal rendering is needed (e.g. for modals that open on first load), you can:
  - Use `ModalProvider` and `ModalRoot` manually
  - Specify a custom `container?: HTMLElement` on `ModalRoot` for safe client-only injection
  - Or use a client-only wrapper (`useEffect`, `useIsClient`, etc.) to open on load
```tsx
<ModalSystem>
  <App />
</ModalSystem>
```
**Public API:**
- `<ModalSystem>` wraps both `<ModalProvider>` and `<ModalRoot>` for simpler DX.

**Internal Composition:**
- `<ModalProvider>` manages modal state and stacking context
- `<ModalRoot>` handles portal rendering and z-index layering

**You can still use them separately** if needed (e.g. to inject modals into a custom container).



### API Sketch
```tsx
<ModalSystem>
  <ModalTrigger target="confirmModal">
    <button>Open Modal</button>
  </ModalTrigger>

  <App />

  <Modal id="confirmModal">
    <Modal.Content closeOnBackdrop={true} closeOnEscape={true}>
      <Modal.Header>
        <Modal.Title>Confirm</Modal.Title>
        <Modal.Close />
      </Modal.Header>
      <Modal.Description>Are you sure you want to proceed?</Modal.Description>
      <div className="modal-body">...</div>
      <Modal.Footer>
        <button>Cancel</button>
        <button className="primary">Confirm</button>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
</ModalSystem>
```

### Props

### Modal Behavior
- Modals **unmount from the DOM when closed** by default.
- This ensures clean memory usage, prevents layout interference, and simplifies transitions.
- Future optional support for `keepMounted?: boolean` may be added.
- **Dismiss behavior (configurable):**
  - `closeOnBackdrop?: boolean` — default `true`; clicking backdrop closes topmost modal
  - `closeOnEscape?: boolean` — default `true`; pressing `Esc` closes topmost modal
  - `onInteractOutside?: (e) => void` — call `e.preventDefault()` to block dismissal

#### Modal
- `id: string` (required, must be unique per ModalSystem instance)
- `className?: string` — optional styling class
- `defaultOpen?: boolean`
- `open?: boolean` (controlled)
- `onOpenChange?: (open: boolean) => void`

#### ModalTrigger
- `target: string` (modal ID to open)
- Sugar component for declarative usage; equivalent to calling `useModalStack()['id'].open()`

#### Modal.Content
- `size?: 'auto' | 'md' | 'full'`  
  `auto`: fit content, `md`: standard (e.g. 480px), `full`: 100vw/h
- `animated?: boolean` — default: `true`, enables fade transitions
- `className?: string`
- `closeOnBackdrop?: boolean`
- `closeOnEscape?: boolean`
- `onInteractOutside?: (e: { target: EventTarget; preventDefault(): void }) => void`

### Accessibility
- `role="dialog"` on `Modal.Content`
- `aria-modal="true"`
- `aria-labelledby` linked to `Modal.Title` (if present)
- `aria-describedby` linked to `Modal.Description` (if present)
- Focus is trapped inside modal when open
- Focus is returned to `ModalTrigger` on close

### Responsive
- Fullscreen on mobile
- Centered modal on desktop

### Styling

#### CSS Architecture (SCSS Modules + Tokens)

- **SCSS modules** are used internally to scope modal styles cleanly.
- Styles use semantic classnames (e.g. `modal`, `modal__header`, `modal--md`).
- Key layout styles and theming values are exposed as **CSS variables**.
- Consumers can override via global CSS, utility classes, or theming systems like Tailwind.

```scss
// Modal.module.scss
.modal {
  background: var(--modal-bg);
  color: var(--modal-color);
  border-radius: var(--modal-radius);
  box-shadow: var(--modal-shadow);
  width: var(--modal-width, auto);
  max-width: 100%;
  transition: opacity 0.2s ease;

  &--md {
    --modal-width: var(--modal-width-md);
  }

  &--full {
    --modal-width: var(--modal-width-full);
    height: 100vh;
  }

  &__header,
  &__footer {
    padding: 1rem;
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    background: var(--modal-backdrop-bg);
    transition: opacity 0.2s ease;
  }
}
```

#### Recommended CSS Variables

```css
:root {
  --modal-bg: #fff;
  --modal-color: #111;
  --modal-radius: 12px;
  --modal-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  --modal-width-md: 480px;
  --modal-width-full: 100vw;
  --modal-backdrop-bg: rgba(0, 0, 0, 0.5);
  --modal-z-index-base: 1000;
}
```
- Default size tokens: `--modal-width-md: 480px`, `--modal-width-full: 100vw`, etc.
- Body scroll is locked when any modal is open
- Backdrop uses same fade transition as modal content
- SCSS modules or class-based styling
- Easy override via `className` or CSS vars
- Minimalist default theme with elegant typography and subtle shadows
- Theme-agnostic: inherits project styles or allows integration with design tokens (e.g. Tailwind)

### Animation
- Single default animation: `fade`
- Optional via `animated` prop
- Uses CSS transitions

### Hook API: `useModalStack()`
```ts
const modals = useModalStack();
modals['confirmModal'].open();
modals['confirmModal'].close();
modals['anyModal'].isOpen // => boolean
```

### Stacking
- `baseZIndex?: number` — configurable via `ModalProvider` or `ModalRoot` (default: 1000)
- ModalProvider internally tracks a stack of open modals
- Each modal is registered on open and unregistered on close
- Only the topmost modal:
  - Handles Escape key
  - Closes on backdrop click
- `z-index = baseZIndex + stackIndex`
- Backdrop is shown only for the topmost modal
- Nested modals supported; each new modal pushes onto the stack
- Scroll remains locked until the stack is empty

### Subcomponent Props

#### Modal.Header
- Layout-only wrapper for `Modal.Title` and `Modal.Close`
- `asChild?: boolean`
- `className?: string`

#### Modal.Title
- Provides `aria-labelledby` target for accessibility
- `asChild?: boolean`
- `className?: string`

#### Modal.Description
- Provides `aria-describedby` target for accessibility
- `asChild?: boolean`
- `className?: string`
- `id?: string` — optional, autogenerated

#### Modal.Close
- Renders a close button or element
- Calls internal close logic via context
- `asChild?: boolean`
- `className?: string`

#### Modal.Footer
- Layout slot for action buttons (e.g. Cancel / Confirm)
- `asChild?: boolean`
- `className?: string`

### Usage Examples

#### 1. Basic Confirmation Modal
```tsx
<ModalSystem>
  <ModalTrigger target="confirm">
    <button>Delete</button>
  </ModalTrigger>

  <Modal id="confirm">
    <Modal.Content>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
        <Modal.Close />
      </Modal.Header>
      <Modal.Description>This action cannot be undone.</Modal.Description>
      <Modal.Footer>
        <button>Cancel</button>
        <button className="danger">Delete</button>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
</ModalSystem>
```

#### 2. Programmatically Controlled Modal
```tsx
const { open, close, isOpen } = useModalStack()["info"];

return (
  <>
    <button onClick={open}>Show Info</button>

    <Modal id="info">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Information</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <p>This modal was triggered via code.</p>
      </Modal.Content>
    </Modal>
  </>
);
```

#### 3. Fullscreen Modal for Mobile
```tsx
<Modal id="mobileMenu">
  <Modal.Content size="full">
    <Modal.Header>
      <Modal.Title>Menu</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  </Modal.Content>
</Modal>
```

#### 4. Nested Modals
```tsx
<Modal id="parent">
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Parent Modal</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <ModalTrigger target="child">
      <button>Open Nested Modal</button>
    </ModalTrigger>
  </Modal.Content>
</Modal>

<Modal id="child">
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Child Modal</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <p>This modal is stacked on top of the parent.</p>
  </Modal.Content>
</Modal>
```

#### 5. Controlled Modal with `open` and `onOpenChange`
```tsx
const [open, setOpen] = useState(false);

return (
  <>
    <button onClick={() => setOpen(true)}>Open Controlled Modal</button>

    <Modal id="controlled" open={open} onOpenChange={setOpen}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Controlled</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <p>This modal uses controlled state.</p>
      </Modal.Content>
    </Modal>
  </>
);
```

### CSS Consumer Examples

#### 1. Override global CSS variables
```css
:root {
  --modal-bg: #1e1e1e;
  --modal-color: #eee;
  --modal-radius: 6px;
  --modal-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
```

#### 2. Add Tailwind utility classes with `className`
```tsx
<Modal.Content className="rounded-xl shadow-2xl dark:bg-zinc-900 p-6" />
<Modal.Footer className="flex justify-end gap-3 mt-4" />
```

#### 3. Responsive modal width
```tsx
<Modal.Content className="w-[90vw] max-w-md sm:max-w-lg" />
```

#### 4. Custom animation via class override
```css
.modal-fade[data-state="open"] {
  opacity: 1;
  transform: scale(1);
  transition: all 250ms ease-out;
}
.modal-fade {
  opacity: 0;
  transform: scale(0.95);
}
```
```tsx
<Modal.Content animated className="modal-fade" />
```

#### 5. Dark mode support
```css
@media (prefers-color-scheme: dark) {
  :root {
    --modal-bg: #121212;
    --modal-color: #f1f1f1;
    --modal-backdrop-bg: rgba(0, 0, 0, 0.7);
  }
}
```
