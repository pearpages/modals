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
      <Modal.Body>...</Modal.Body>
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
- **Future enhancement**: Optional `keepMounted?: boolean` prop may be added for performance optimization in specific use cases.
- **Dismiss behavior (configurable):**
  - `closeOnBackdrop?: boolean` — default `true`; clicking backdrop closes topmost modal
  - `closeOnEscape?: boolean` — default `true`; pressing `Esc` closes topmost modal
  - `onInteractOutside?: (e) => void` — call `e.preventDefault()` to block dismissal

#### Modal
- `id: string` (required, must be unique per ModalSystem instance)
- `className?: string` — optional styling class
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

#### CSS Architecture (Direct Classes + CSS Variables)

- **Direct CSS classes** are used without modules (e.g. `.modalBackdrop`, `.modal`, `.modalHeader`) due to portal rendering requirements.
- Portal-rendered elements cannot inherit scoped CSS modules from their React component tree.
- Styles use semantic classnames for clarity and easy targeting.
- Key layout styles and theming values are exposed as **CSS variables**.
- Consumers can override via global CSS, utility classes, or theming systems like Tailwind.

```scss
// modal.scss
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
- Direct class-based styling with CSS variables
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

#### Modal.Body
- Main content area of the modal
- Handles overflow scrolling when content exceeds viewport height
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
        <Modal.Body>
          <p>This modal was triggered via code.</p>
        </Modal.Body>
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
    <Modal.Body>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    </Modal.Body>
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
    <Modal.Body>
      <ModalTrigger target="child">
        <button>Open Nested Modal</button>
      </ModalTrigger>
    </Modal.Body>
  </Modal.Content>
</Modal>

<Modal id="child">
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Child Modal</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>
      <p>This modal is stacked on top of the parent.</p>
    </Modal.Body>
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
        <Modal.Body>
          <p>This modal uses controlled state.</p>
        </Modal.Body>
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

## Error Handling & Edge Cases

### Common Edge Cases

#### 1. Duplicate Modal IDs
```tsx
// ❌ Problematic - duplicate IDs
<Modal id="myModal">...</Modal>
<Modal id="myModal">...</Modal>

// ✅ Solution - unique IDs per ModalSystem
<Modal id="confirmDialog">...</Modal>
<Modal id="infoDialog">...</Modal>
```

**Behavior**: Only the first modal with duplicate ID will be accessible via `useModalStack()`. The library logs warnings in development mode.

#### 2. Modal Not Registered
```tsx
// ❌ Will fail - modal doesn't exist
const modals = useModalStack();
modals['nonExistentModal'].open(); // Logs warning, no-op

// ✅ Check existence first
if (modals['myModal']) {
  modals['myModal'].open();
}
```

**Behavior**: Attempting to control non-existent modals logs warnings and performs no action.

#### 3. Controlled State Conflicts
```tsx
// ❌ Problematic - mixing controlled and uncontrolled
const [open, setOpen] = useState(true);
const modals = useModalStack();

// Both trying to control the same modal
<Modal id="mixed" open={open} onOpenChange={setOpen}>
modals['mixed'].open(); // May conflict with controlled state
```

**Behavior**: Controlled props (`open`/`onOpenChange`) take precedence over programmatic control.

#### 4. Missing ModalSystem Provider
```tsx
// ❌ Will fail - no provider context
function App() {
  return <Modal id="test">...</Modal>; // Throws error
}

// ✅ Wrap with ModalSystem
function App() {
  return (
    <ModalSystem>
      <Modal id="test">...</Modal>
    </ModalSystem>
  );
}
```

**Behavior**: Components throw clear error messages when used outside ModalSystem context.

#### 5. Large Content & Scroll Behavior
```tsx
// ✅ Handles automatically
<Modal.Body>
  <div style={{ height: '200vh' }}>
    Very tall content scrolls within modal
  </div>
</Modal.Body>
```

**Behavior**: Modal.Body automatically handles overflow with styled scrollbars. Modal itself remains properly sized.

#### 6. Rapid Open/Close Operations
```tsx
// ❌ Potential race condition
const modals = useModalStack();
modals['test'].open();
modals['test'].close(); // Called immediately
modals['test'].open();  // Called before close animation completes

// ✅ Better approach - check state
if (!modals['test'].isOpen) {
  modals['test'].open();
}
```

**Behavior**: Library handles rapid state changes gracefully with proper animation queuing.

### Error Recovery

#### 1. Portal Mount Failures
If the portal container is removed from DOM:
- Library attempts to recreate portal mount point
- Falls back to `document.body` if custom container fails
- Logs warnings for debugging

#### 2. Focus Trap Failures
If focus target elements are unmounted:
- Focus returns to document body as fallback
- Library attempts to find next focusable element in modal
- Maintains keyboard accessibility even with dynamic content

#### 3. CSS Variable Fallbacks
```css
/* ✅ Always provide fallbacks */
.modal {
  background: var(--modal-bg, #ffffff);
  color: var(--modal-color, #000000);
  border-radius: var(--modal-radius, 8px);
}
```

### Performance Considerations

#### 1. Memory Leaks Prevention
- Modals unmount when closed (default behavior)
- Event listeners automatically cleaned up
- Portal containers removed when empty

#### 2. Many Modals Performance
```tsx
// ✅ Acceptable - modals are lightweight when closed
{Array.from({ length: 100 }, (_, i) => (
  <Modal key={i} id={`modal-${i}`}>...</Modal>
))}
```

**Behavior**: Closed modals have minimal memory footprint. Only rendered modals impact performance.

#### 3. Animation Performance
- Uses CSS transitions (GPU accelerated)
- No JavaScript animation loops
- Respects `prefers-reduced-motion`

### Debugging Tips

#### 1. Development Warnings
Enable detailed logging in development:
```tsx
// Automatic in NODE_ENV=development
console.warn('Modal "xyz" not found in stack');
console.warn('Duplicate modal ID "abc" detected');
```

#### 2. Inspector Integration
Use browser dev tools:
- Modal state visible in React DevTools
- Portal elements marked with `data-modal-*` attributes
- CSS transitions debuggable in Elements panel

#### 3. Testing Edge Cases
```tsx
// Useful for testing
const modals = useModalStack();
console.log(Object.keys(modals)); // List all registered modals
console.log(modals['myModal']?.isOpen); // Check state
```

## Testing Strategy

### Test Framework & Setup

The modal library uses **Vitest** with **@testing-library/react** for comprehensive testing:

```bash
npm test -- --run  # Run all tests once (preferred)
npm test           # Watch mode (avoid in CI)
```

**Key dependencies:**
- `vitest` - Fast test runner with Vite integration
- `@testing-library/react` - Component testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `jsdom` - Browser environment simulation

### Test Architecture

#### 1. Test Wrappers
Standard test wrappers provide consistent modal context:

```tsx
// Simple wrapper for basic modal testing
const TestModalWrapper: React.FC<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}> = ({ open, onOpenChange, id = "test-modal" }) => {
  return (
    <ModalProvider>
      <Modal id={id} open={open} onOpenChange={onOpenChange}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    </ModalProvider>
  );
};

// Full system wrapper for integration testing
const TestModalSystem: React.FC<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  children?: React.ReactNode;
}> = ({ open = false, onOpenChange, id = 'test-modal', children }) => {
  return (
    <ModalProvider>
      <ModalRoot />
      <Modal id={id} open={open} onOpenChange={onOpenChange}>
        {children}
      </Modal>
    </ModalProvider>
  );
};
```

#### 2. Async Testing Helpers
Handle React state updates and animations properly:

```tsx
// Helper for proper act() handling
const renderModal = async (ui: React.ReactElement) => {
  let result: any;
  await act(async () => {
    result = render(ui);
    vi.runAllTimers(); // Fast-forward animations
  });
  return result;
};

// Wait for modal transitions
await waitFor(() => {
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

### Testing Patterns by Component Type

#### 1. Unit Tests (Individual Components)
Test isolated component behavior:

```tsx
// Example: ModalTitle.test.tsx
describe('ModalTitle', () => {
  it('should render title text', () => {
    render(
      <ModalProvider>
        <Modal.Title>Test Title</Modal.Title>
      </ModalProvider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should generate unique ID for accessibility', () => {
    render(
      <ModalProvider>
        <Modal.Title>Title</Modal.Title>
      </ModalProvider>
    );

    const title = screen.getByText('Title');
    expect(title).toHaveAttribute('id');
    expect(title.id).toMatch(/^modal-title-/);
  });
});
```

#### 2. Integration Tests (Component Interactions)
Test components working together:

```tsx
// Example: ModalSubcomponents.integration.test.tsx
describe('Modal Subcomponents Accessibility Integration', () => {
  it('should connect ModalTitle ID to ModalContent aria-labelledby', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Title>Test Title</Modal.Title>
        </Modal.Content>
      </TestModalSystem>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByText('Test Title');

    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
  });
});
```

#### 3. Behavioral Tests (User Interactions)
Test user-facing functionality:

```tsx
// Example: ModalContent.test.tsx
describe('Modal Interactions', () => {
  it('should close on backdrop click', async () => {
    const onOpenChange = vi.fn();

    await renderModal(
      <TestModalSystem open={true} onOpenChange={onOpenChange}>
        <Modal.Content closeOnBackdrop={true}>
          <div>Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const backdrop = document.querySelector('.modalBackdrop');
    fireEvent.click(backdrop!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
```

#### 4. Hook Tests (Custom Logic)
Test custom hooks in isolation:

```tsx
// Example: useModalStack.test.tsx
describe('useModalStack', () => {
  it('should allow opening and closing modals programmatically', () => {
    const TestComponent = () => {
      const modals = useModalStack();

      return (
        <div>
          <button onClick={() => modals['test-modal']?.open()}>
            Open
          </button>
          <span data-testid="is-open">
            {modals['test-modal']?.isOpen ? 'open' : 'closed'}
          </span>
        </div>
      );
    };

    render(
      <ModalProvider>
        <Modal id="test-modal"><div>Modal</div></Modal>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('open');
  });
});
```

### Testing Best Practices

#### 1. DOM Cleanup
Prevent test contamination:

```tsx
// vitest.config.ts setup
beforeEach(() => {
  document.body.innerHTML = ''; // Clean DOM between tests
  vi.clearAllMocks();           // Reset mocks
  vi.clearAllTimers();          // Clear pending timers
});
```

#### 2. Accessibility Testing
Verify ARIA compliance:

```tsx
it('should have proper accessibility attributes', () => {
  // Test role attributes
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Test aria connections
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby');

  // Test focus management
  expect(dialog).toHaveFocus();
});
```

#### 3. Animation Testing
Handle CSS transitions and timing:

```tsx
beforeEach(() => {
  // Mock timers for consistent animation testing
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runAllTimers();
  vi.useRealTimers();
});

it('should handle animation states', async () => {
  // Test data-state attributes for CSS animations
  const modal = screen.getByRole('dialog');
  expect(modal).toHaveAttribute('data-state', 'opening');

  // Fast-forward through animation
  act(() => {
    vi.runAllTimers();
  });

  await waitFor(() => {
    expect(modal).toHaveAttribute('data-state', 'open');
  });
});
```

#### 4. Portal Testing
Handle portal-rendered content:

```tsx
it('should render modal in portal', () => {
  render(<TestModalSystem open={true} />);

  // Portal content appears in document.body, not test container
  const modal = document.querySelector('.modal');
  expect(modal).toBeInTheDocument();
  expect(modal?.parentElement).toBe(document.body);
});
```

### Test Coverage Goals

**Current coverage: 173 tests across 16 test files**

#### Component Coverage
- ✅ All modal subcomponents (Header, Body, Footer, Title, etc.)
- ✅ Core modal logic (Modal, ModalContent, ModalProvider)
- ✅ Integration patterns (ModalSystem, ModalTrigger)
- ✅ Custom hooks (useModalStack, useBodyScrollLock, useFocusTrap)

#### Interaction Coverage
- ✅ Keyboard navigation (Escape, Tab, focus trap)
- ✅ Mouse interactions (backdrop click, close button)
- ✅ Programmatic control (open/close via hooks)
- ✅ State management (controlled vs uncontrolled)

#### Edge Case Coverage
- ✅ Multiple modals (stacking, z-index)
- ✅ Accessibility (ARIA attributes, screen readers)
- ✅ Portal behavior (mounting, unmounting)
- ✅ Error scenarios (missing context, invalid IDs)

### Running Tests

#### Development Workflow
```bash
# Run all tests once (recommended)
npm test -- --run

# Run specific test file
npm test -- --run ModalContent

# Run tests with coverage
npm test -- --run --coverage

# Run tests in watch mode (development only)
npm test

# Run with verbose output
npm test -- --run --reporter=verbose
```

#### CI/CD Integration
```bash
# Production test command (no watch mode)
npm test -- --run --reporter=junit --outputFile=test-results.xml
```

### Common Testing Scenarios

#### 1. New Component Testing
When adding a new modal subcomponent:

1. **Unit tests**: Component renders, props work
2. **Integration tests**: Works with modal context
3. **Accessibility tests**: ARIA attributes, focus behavior
4. **Edge cases**: Error states, missing props

#### 2. Behavioral Feature Testing
When adding new modal behavior:

1. **User interaction tests**: Click, keyboard events
2. **State transition tests**: Open/close, animation states
3. **Integration tests**: Multiple modals, stacking
4. **Cross-browser considerations**: Portal behavior, CSS support

#### 3. API Changes Testing
When modifying public APIs:

1. **Backward compatibility**: Existing usage patterns
2. **New prop validation**: Type checking, runtime validation
3. **Hook behavior**: State management, side effects
4. **Documentation examples**: Code samples actually work

This testing strategy ensures robust, accessible, and maintainable modal components with comprehensive coverage of user scenarios and edge cases.

## Async Operations & Loading States

### Common Async Patterns

Modals frequently handle asynchronous operations like API calls, form submissions, and confirmations. Here are proven patterns for managing loading states and async workflows.

#### 1. Loading States with Confirmation
```tsx
const DeleteConfirmationModal = ({ itemId, onDeleted }: {
  itemId: string;
  onDeleted: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modals = useModalStack();

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteItem(itemId);
      onDeleted();
      modals['deleteConfirm'].close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal id="deleteConfirm">
      <Modal.Content closeOnBackdrop={!isLoading} closeOnEscape={!isLoading}>
        <Modal.Header>
          <Modal.Title>Delete Item</Modal.Title>
          {!isLoading && <Modal.Close />}
        </Modal.Header>

        <Modal.Body>
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={() => modals['deleteConfirm'].close()}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="danger"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

#### 2. Form Submission with Loading
```tsx
const CreateUserModal = ({ onUserCreated }: {
  onUserCreated: (user: User) => void;
}) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modals = useModalStack();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const user = await createUser(formData);
      onUserCreated(user);
      modals['createUser'].close();

      // Reset form for next use
      setFormData({ name: '', email: '' });
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors(err.fieldErrors);
      } else {
        setErrors({ general: 'Failed to create user' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal id="createUser">
      <Modal.Content closeOnBackdrop={!isSubmitting} closeOnEscape={!isSubmitting}>
        <Modal.Header>
          <Modal.Title>Create New User</Modal.Title>
          {!isSubmitting && <Modal.Close />}
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-message" role="alert">
                {errors.general}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="user-name">Name</label>
              <input
                id="user-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={isSubmitting}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <div id="name-error" className="field-error" role="alert">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="user-email">Email</label>
              <input
                id="user-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <div id="email-error" className="field-error" role="alert">
                  {errors.email}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={() => modals['createUser'].close()}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name || !formData.email}
            className="primary"
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Creating...
              </>
            ) : (
              'Create User'
            )}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

#### 3. Multi-Step Async Workflow
```tsx
const DataImportModal = ({ onImportComplete }: {
  onImportComplete: (result: ImportResult) => void;
}) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'complete'>('upload');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modals = useModalStack();

  const handleFileUpload = async (file: File) => {
    setStep('processing');
    setError(null);

    try {
      // Simulate upload with progress
      const result = await uploadWithProgress(file, (progress) => {
        setProgress(progress);
      });

      setResult(result);
      setStep('complete');

      // Auto-close after success (optional)
      setTimeout(() => {
        onImportComplete(result);
        modals['dataImport'].close();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
      setStep('upload'); // Reset to allow retry
    }
  };

  const canClose = step !== 'processing';

  return (
    <Modal id="dataImport">
      <Modal.Content closeOnBackdrop={canClose} closeOnEscape={canClose}>
        <Modal.Header>
          <Modal.Title>Import Data</Modal.Title>
          {canClose && <Modal.Close />}
        </Modal.Header>

        <Modal.Body>
          {step === 'upload' && (
            <div>
              {error && (
                <div className="error-message" role="alert">
                  {error}
                </div>
              )}
              <FileUploader
                onFileSelect={handleFileUpload}
                accept=".csv,.json"
                disabled={false}
              />
            </div>
          )}

          {step === 'processing' && (
            <div className="processing-state">
              <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p>Processing... {progress}%</p>
              <p className="processing-note">Please don't close this window.</p>
            </div>
          )}

          {step === 'complete' && result && (
            <div className="success-state">
              <div className="success-icon" aria-hidden="true">✅</div>
              <h3>Import Complete!</h3>
              <p>Imported {result.recordsProcessed} records successfully.</p>
              {result.errors.length > 0 && (
                <details>
                  <summary>{result.errors.length} records had issues</summary>
                  <ul>
                    {result.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {step === 'upload' && (
            <button onClick={() => modals['dataImport'].close()}>
              Cancel
            </button>
          )}

          {step === 'processing' && (
            <p className="footer-note">Processing in progress...</p>
          )}

          {step === 'complete' && (
            <button
              onClick={() => {
                onImportComplete(result!);
                modals['dataImport'].close();
              }}
              className="primary"
            >
              Done
            </button>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

#### 4. Async Confirmation with Timeout
```tsx
const SessionTimeoutModal = ({ onExtendSession, onLogout }: {
  onExtendSession: () => Promise<void>;
  onLogout: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isExtending, setIsExtending] = useState(false);
  const modals = useModalStack();

  useEffect(() => {
    if (timeLeft <= 0) {
      onLogout();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onLogout]);

  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      await onExtendSession();
      modals['sessionTimeout'].close();
    } catch (err) {
      // Handle error - could show inline error or keep modal open
      console.error('Failed to extend session:', err);
    } finally {
      setIsExtending(false);
    }
  };

  return (
    <Modal id="sessionTimeout">
      <Modal.Content closeOnBackdrop={false} closeOnEscape={false}>
        <Modal.Header>
          <Modal.Title>Session Expiring</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Your session will expire in <strong>{timeLeft} seconds</strong>.</p>
          <p>Would you like to extend your session?</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={onLogout}
            disabled={isExtending}
          >
            Logout Now
          </button>
          <button
            onClick={handleExtendSession}
            disabled={isExtending}
            className="primary"
          >
            {isExtending ? 'Extending...' : 'Extend Session'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

### Best Practices for Async Modals

#### 1. Prevent Dismissal During Critical Operations
```tsx
// Disable backdrop/escape during loading
<Modal.Content
  closeOnBackdrop={!isLoading}
  closeOnEscape={!isLoading}
>
  {/* Hide close button during operations */}
  <Modal.Header>
    <Modal.Title>Processing</Modal.Title>
    {!isLoading && <Modal.Close />}
  </Modal.Header>
</Modal.Content>
```

#### 2. Provide Clear Loading Feedback
```tsx
// Visual loading indicators
const LoadingButton = ({ isLoading, children, ...props }) => (
  <button disabled={isLoading} {...props}>
    {isLoading && <span className="spinner" aria-hidden="true" />}
    {children}
  </button>
);

// Progress indicators for long operations
<div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
  <div style={{ width: `${progress}%` }} />
</div>
```

#### 3. Handle Errors Gracefully
```tsx
// Inline error display
{error && (
  <div className="error-message" role="alert">
    <strong>Error:</strong> {error}
    <button onClick={retryOperation}>Try Again</button>
  </div>
)}

// Field-specific validation errors
<input
  aria-invalid={!!fieldError}
  aria-describedby={fieldError ? 'field-error' : undefined}
/>
{fieldError && (
  <div id="field-error" role="alert">{fieldError}</div>
)}
```

#### 4. Manage Focus During State Changes
```tsx
// Focus management for screen readers
useEffect(() => {
  if (step === 'complete') {
    // Focus success message for screen readers
    document.getElementById('success-message')?.focus();
  }
}, [step]);

// Announce state changes
<div aria-live="polite" aria-atomic="true">
  {isLoading && 'Processing your request...'}
  {error && `Error: ${error}`}
  {success && 'Operation completed successfully'}
</div>
```

#### 5. Cleanup on Unmount
```tsx
useEffect(() => {
  // Cleanup function to cancel pending requests
  return () => {
    if (pendingRequest) {
      pendingRequest.abort();
    }
  };
}, []);
```

### CSS for Loading States

```css
/* Loading spinner */
.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-right: 0.5em;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Progress bar */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--modal-bg-secondary, #f0f0f0);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--modal-accent, #007bff);
  transition: width 0.3s ease;
}

/* Loading state styles */
.processing-state {
  text-align: center;
  padding: 2rem 1rem;
}

.success-state {
  text-align: center;
  padding: 1rem;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Error styling */
.error-message {
  background: var(--error-bg, #fee);
  color: var(--error-color, #c33);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 1px solid var(--error-border, #fcc);
}

.field-error {
  color: var(--error-color, #c33);
  font-size: 0.875em;
  margin-top: 0.25rem;
}

/* Disabled state */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input:disabled, textarea:disabled {
  background: var(--disabled-bg, #f5f5f5);
  cursor: not-allowed;
}
```

These patterns provide robust handling of async operations while maintaining accessibility and user experience best practices.

## Form Integration Patterns

### Form Handling in Modals

Forms are one of the most common use cases for modals. Here are proven patterns for different form scenarios, validation strategies, and user experience considerations.

#### 1. Basic Form Modal with Validation
```tsx
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactFormModal = ({ onSubmit }: {
  onSubmit: (data: ContactFormData) => Promise<void>;
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modals = useModalStack();

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus first error field for accessibility
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      modals['contactForm'].close();

      // Reset form for next use
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal id="contactForm">
      <Modal.Content closeOnBackdrop={!isSubmitting} closeOnEscape={!isSubmitting}>
        <Modal.Header>
          <Modal.Title>Contact Us</Modal.Title>
          {!isSubmitting && <Modal.Close />}
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">
                Name <span className="required" aria-label="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={updateField('name')}
                disabled={isSubmitting}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoFocus
              />
              {errors.name && (
                <div id="name-error" className="field-error" role="alert">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">
                Email <span className="required" aria-label="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={updateField('email')}
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <div id="email-error" className="field-error" role="alert">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="message">
                Message <span className="required" aria-label="required">*</span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={updateField('message')}
                disabled={isSubmitting}
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <div id="message-error" className="field-error" role="alert">
                  {errors.message}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={() => modals['contactForm'].close()}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="primary"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

#### 2. Multi-Step Form (Wizard Pattern)
```tsx
interface UserRegistrationData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;

  // Step 2: Account Details
  username: string;
  password: string;
  confirmPassword: string;

  // Step 3: Preferences
  newsletter: boolean;
  notifications: boolean;
  theme: 'light' | 'dark';
}

const RegistrationWizardModal = ({ onRegister }: {
  onRegister: (data: UserRegistrationData) => Promise<void>;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserRegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    notifications: true,
    theme: 'light'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modals = useModalStack();

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (currentStep === 2) {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';

      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
    setErrors({}); // Clear errors when going back
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      await onRegister(formData);
      modals['registration'].close();
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof UserRegistrationData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const canClose = !isSubmitting;

  return (
    <Modal id="registration">
      <Modal.Content closeOnBackdrop={canClose} closeOnEscape={canClose}>
        <Modal.Header>
          <Modal.Title>Create Account - Step {step} of 3</Modal.Title>
          {canClose && <Modal.Close />}
        </Modal.Header>

        <Modal.Body>
          {/* Progress indicator */}
          <div className="wizard-progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
            <div className="progress-steps">
              {[1, 2, 3].map(stepNumber => (
                <div
                  key={stepNumber}
                  className={`progress-step ${stepNumber <= step ? 'completed' : ''} ${stepNumber === step ? 'current' : ''}`}
                >
                  {stepNumber}
                </div>
              ))}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message" role="alert">
              {errors.submit}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="wizard-step">
              <h3>Basic Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={updateField('firstName')}
                    aria-invalid={!!errors.firstName}
                    autoFocus
                  />
                  {errors.firstName && (
                    <div className="field-error" role="alert">{errors.firstName}</div>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={updateField('lastName')}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <div className="field-error" role="alert">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={updateField('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <div className="field-error" role="alert">{errors.email}</div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <div className="wizard-step">
              <h3>Account Details</h3>

              <div className="form-field">
                <label htmlFor="username">Username *</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={updateField('username')}
                  aria-invalid={!!errors.username}
                  autoFocus
                />
                {errors.username && (
                  <div className="field-error" role="alert">{errors.username}</div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="password">Password *</label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={updateField('password')}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <div className="field-error" role="alert">{errors.password}</div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={updateField('confirmPassword')}
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <div className="field-error" role="alert">{errors.confirmPassword}</div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="wizard-step">
              <h3>Preferences</h3>

              <div className="form-field">
                <label htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  value={formData.theme}
                  onChange={updateField('theme')}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={updateField('newsletter')}
                  />
                  Subscribe to newsletter
                </label>
              </div>

              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={updateField('notifications')}
                  />
                  Enable notifications
                </label>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={() => modals['registration'].close()}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <div className="wizard-actions">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="primary"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="primary"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

#### 3. Dynamic Form with Conditional Fields
```tsx
interface EventFormData {
  title: string;
  type: 'online' | 'in-person' | 'hybrid';
  date: string;
  time: string;

  // Conditional fields based on type
  location?: string;        // in-person, hybrid
  address?: string;         // in-person, hybrid
  meetingLink?: string;     // online, hybrid
  maxAttendees?: number;    // all types
  requiresRegistration: boolean;
}

const EventFormModal = ({ onSave, initialData }: {
  onSave: (data: EventFormData) => Promise<void>;
  initialData?: Partial<EventFormData>;
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    type: 'in-person',
    date: '',
    time: '',
    requiresRegistration: false,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modals = useModalStack();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Event time is required';
    }

    // Conditional validation based on event type
    if (formData.type === 'in-person' || formData.type === 'hybrid') {
      if (!formData.location?.trim()) {
        newErrors.location = 'Location is required for this event type';
      }
      if (!formData.address?.trim()) {
        newErrors.address = 'Address is required for this event type';
      }
    }

    if (formData.type === 'online' || formData.type === 'hybrid') {
      if (!formData.meetingLink?.trim()) {
        newErrors.meetingLink = 'Meeting link is required for this event type';
      } else if (!/^https?:\/\//.test(formData.meetingLink)) {
        newErrors.meetingLink = 'Please enter a valid URL';
      }
    }

    if (formData.maxAttendees && formData.maxAttendees < 1) {
      newErrors.maxAttendees = 'Max attendees must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      modals['eventForm'].close();
    } catch (err) {
      setErrors({ submit: 'Failed to save event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof EventFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.type === 'number'
      ? parseInt(e.target.value) || undefined
      : e.target.value;

    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear related errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Clear conditional field errors when type changes
  useEffect(() => {
    setErrors(prev => {
      const { location, address, meetingLink, ...rest } = prev;
      return rest;
    });
  }, [formData.type]);

  const requiresLocation = formData.type === 'in-person' || formData.type === 'hybrid';
  const requiresMeetingLink = formData.type === 'online' || formData.type === 'hybrid';

  return (
    <Modal id="eventForm">
      <Modal.Content closeOnBackdrop={!isSubmitting} closeOnEscape={!isSubmitting}>
        <Modal.Header>
          <Modal.Title>{initialData ? 'Edit Event' : 'Create Event'}</Modal.Title>
          {!isSubmitting && <Modal.Close />}
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="error-message" role="alert">
                {errors.submit}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="title">Event Title *</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={updateField('title')}
                disabled={isSubmitting}
                aria-invalid={!!errors.title}
                autoFocus
              />
              {errors.title && (
                <div className="field-error" role="alert">{errors.title}</div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="type">Event Type *</label>
              <select
                id="type"
                value={formData.type}
                onChange={updateField('type')}
                disabled={isSubmitting}
              >
                <option value="in-person">In Person</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="date">Date *</label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={updateField('date')}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.date}
                />
                {errors.date && (
                  <div className="field-error" role="alert">{errors.date}</div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="time">Time *</label>
                <input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={updateField('time')}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.time}
                />
                {errors.time && (
                  <div className="field-error" role="alert">{errors.time}</div>
                )}
              </div>
            </div>

            {/* Conditional location fields */}
            {requiresLocation && (
              <>
                <div className="form-field">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location || ''}
                    onChange={updateField('location')}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.location}
                    placeholder="e.g., Conference Room A"
                  />
                  {errors.location && (
                    <div className="field-error" role="alert">{errors.location}</div>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    value={formData.address || ''}
                    onChange={updateField('address')}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.address}
                    rows={2}
                    placeholder="Full address for attendees"
                  />
                  {errors.address && (
                    <div className="field-error" role="alert">{errors.address}</div>
                  )}
                </div>
              </>
            )}

            {/* Conditional meeting link field */}
            {requiresMeetingLink && (
              <div className="form-field">
                <label htmlFor="meetingLink">Meeting Link *</label>
                <input
                  id="meetingLink"
                  type="url"
                  value={formData.meetingLink || ''}
                  onChange={updateField('meetingLink')}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.meetingLink}
                  placeholder="https://zoom.us/j/..."
                />
                {errors.meetingLink && (
                  <div className="field-error" role="alert">{errors.meetingLink}</div>
                )}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="maxAttendees">Max Attendees</label>
              <input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees || ''}
                onChange={updateField('maxAttendees')}
                disabled={isSubmitting}
                aria-invalid={!!errors.maxAttendees}
                min="1"
                placeholder="Leave empty for unlimited"
              />
              {errors.maxAttendees && (
                <div className="field-error" role="alert">{errors.maxAttendees}</div>
              )}
            </div>

            <div className="form-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.requiresRegistration}
                  onChange={updateField('requiresRegistration')}
                  disabled={isSubmitting}
                />
                Requires Registration
              </label>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={() => modals['eventForm'].close()}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="primary"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
```

### Form Best Practices

#### 1. Accessibility First
```tsx
// Proper labeling and error association
<label htmlFor="email">Email Address *</label>
<input
  id="email"
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : 'email-help'}
/>
<div id="email-help" className="field-help">
  We'll never share your email address
</div>
{errors.email && (
  <div id="email-error" className="field-error" role="alert">
    {errors.email}
  </div>
)}

// Required field indication
<span className="required" aria-label="required">*</span>

// Focus management
const firstErrorField = Object.keys(errors)[0];
document.getElementById(firstErrorField)?.focus();
```

#### 2. Real-time Validation
```tsx
const [touched, setTouched] = useState<Set<string>>(new Set());

const handleBlur = (field: string) => {
  setTouched(prev => new Set(prev).add(field));
  // Only show errors for touched fields
  if (touched.has(field)) {
    validateField(field);
  }
};

// Show errors only after user interaction
{touched.has('email') && errors.email && (
  <div className="field-error" role="alert">{errors.email}</div>
)}
```

#### 3. Loading States
```tsx
// Disable form during submission
<fieldset disabled={isSubmitting}>
  <input type="text" />
  <button type="submit">
    {isSubmitting ? 'Saving...' : 'Save'}
  </button>
</fieldset>

// Prevent modal dismissal during submission
<Modal.Content
  closeOnBackdrop={!isSubmitting}
  closeOnEscape={!isSubmitting}
>
```

#### 4. Form Reset and Cleanup
```tsx
const resetForm = () => {
  setFormData(initialFormData);
  setErrors({});
  setTouched(new Set());
};

// Reset on modal close
useEffect(() => {
  return () => {
    if (!modals['form'].isOpen) {
      resetForm();
    }
  };
}, [modals['form'].isOpen]);
```

### CSS for Forms

```css
/* Form layout */
.form-field {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

/* Input styling */
.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--input-border, #ccc);
  border-radius: 4px;
  font-size: 1rem;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--input-focus-border, #007bff);
  box-shadow: 0 0 0 2px var(--input-focus-shadow, rgba(0, 123, 255, 0.25));
}

/* Error states */
.form-field input[aria-invalid="true"],
.form-field select[aria-invalid="true"],
.form-field textarea[aria-invalid="true"] {
  border-color: var(--error-color, #dc3545);
}

.field-error {
  color: var(--error-color, #dc3545);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.field-help {
  color: var(--text-muted, #666);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Required field indicator */
.required {
  color: var(--error-color, #dc3545);
}

/* Checkbox styling */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
}

/* Wizard specific styles */
.wizard-progress {
  margin-bottom: 2rem;
}

.progress-steps {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.progress-step {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--progress-inactive, #ccc);
  background: var(--progress-inactive-bg, #fff);
  font-weight: bold;
}

.progress-step.completed {
  border-color: var(--progress-complete, #28a745);
  background: var(--progress-complete, #28a745);
  color: white;
}

.progress-step.current {
  border-color: var(--progress-current, #007bff);
  background: var(--progress-current, #007bff);
  color: white;
}

.wizard-actions {
  display: flex;
  gap: 0.5rem;
}

/* Disabled state */
fieldset:disabled {
  opacity: 0.6;
  pointer-events: none;
}
```

These patterns provide comprehensive form handling solutions for modals with proper validation, accessibility, and user experience considerations.

## Performance Considerations

### Bundle Size Optimization

The modal library is designed to be lightweight and tree-shakable:

```bash
# Current bundle sizes (after build)
ESM dist/index.js      176.68 KB  # Full library
ESM dist/index.css     13.87 KB   # Complete styles
DTS dist/index.d.ts    15.05 KB   # TypeScript definitions
```

#### Tree Shaking
```tsx
// ✅ Import only what you need
import { Modal, ModalSystem } from '@pearpages/modals';

// ❌ Avoid importing everything
import * as Modals from '@pearpages/modals';

// ✅ CSS is automatically included when you import any component
// No need to manually import CSS in most bundlers
```

#### Code Splitting
```tsx
// ✅ Lazy load complex modal components
const UserFormModal = lazy(() => import('./UserFormModal'));
const DataTableModal = lazy(() => import('./DataTableModal'));

function App() {
  return (
    <ModalSystem>
      <Suspense fallback={<div>Loading...</div>}>
        <UserFormModal />
        <DataTableModal />
      </Suspense>
    </ModalSystem>
  );
}
```

### Runtime Performance

#### 1. Modal Mounting Strategy
```tsx
// ✅ Default behavior - modals unmount when closed
<Modal id="lightweightModal">
  <Modal.Content>
    {/* Content is created/destroyed with open/close */}
  </Modal.Content>
</Modal>

// 🔧 Future optimization - keepMounted for expensive content
// This will be available in future versions
<Modal id="expensiveModal" keepMounted={true}>
  <Modal.Content>
    {/* Heavy charts, complex forms, etc. stay in DOM */}
  </Modal.Content>
</Modal>
```

#### 2. Minimize Re-renders
```tsx
// ✅ Memoize expensive modal content
const ExpensiveModalContent = memo(({ data }) => {
  return (
    <Modal.Body>
      <ComplexChart data={data} />
      <DataTable records={data.records} />
    </Modal.Body>
  );
});

// ✅ Use callback refs to avoid recreation
const handleSubmit = useCallback(async (formData) => {
  await saveData(formData);
  modals['form'].close();
}, [modals]);

// ✅ Stable modal IDs (avoid dynamic IDs)
const modalId = useMemo(() => `user-${userId}`, [userId]);
```

#### 3. Portal Performance
```tsx
// ✅ Portal containers are reused efficiently
// The library automatically manages portal lifecycle

// 🔧 Custom portal container for isolation
<ModalRoot container={customContainer} />

// ✅ Z-index management is automatic
// No need to manually calculate stacking order
```

### Memory Management

#### 1. Event Listener Cleanup
```tsx
// ✅ Automatic cleanup - no action needed
// Modal provider handles all event listener lifecycle

// ✅ Manual cleanup for custom modals
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [closeModal]);
```

#### 2. Modal State Management
```tsx
// ✅ Efficient state updates
const modals = useModalStack(); // Returns stable reference

// ✅ Avoid creating new objects in render
const modalConfig = useMemo(() => ({
  closeOnBackdrop: true,
  closeOnEscape: true,
  size: 'md'
}), []);

// ❌ Avoid inline objects (causes re-renders)
<Modal.Content closeOnBackdrop={true} size="md"> // Creates new object every render
```

#### 3. Large Data Sets
```tsx
// ✅ Virtualization for large lists in modals
import { FixedSizeList as List } from 'react-window';

const DataModal = ({ items }) => (
  <Modal.Body style={{ height: '400px' }}>
    <List
      height={400}
      itemCount={items.length}
      itemSize={35}
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </List>
  </Modal.Body>
);

// ✅ Pagination for large datasets
const [page, setPage] = useState(1);
const pageSize = 50;
const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);
```

### Animation Performance

#### 1. CSS-Only Animations
```css
/* ✅ GPU-accelerated transitions */
.modal {
  transition: opacity 200ms ease, transform 200ms ease;
  will-change: opacity, transform;
}

.modal[data-state="opening"] {
  opacity: 0;
  transform: scale(0.95);
}

.modal[data-state="open"] {
  opacity: 1;
  transform: scale(1);
}

/* ✅ Optimize for mobile performance */
@media (max-width: 768px) {
  .modal {
    transition-duration: 150ms; /* Faster on mobile */
  }
}

/* ✅ Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .modal {
    transition: none;
  }
}
```

#### 2. Animation Timing
```tsx
// ✅ Coordinated timing with CSS
const ANIMATION_DURATION = 200; // matches CSS transition

const handleClose = () => {
  // Modal starts closing animation immediately
  modals['example'].close();

  // Optional: delay navigation until animation completes
  setTimeout(() => {
    navigate('/dashboard');
  }, ANIMATION_DURATION);
};
```

### Network Performance

#### 1. Lazy Loading Modal Content
```tsx
// ✅ Load modal content on demand
const UserDetailsModal = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modals['userDetails'].isOpen && !userData) {
      setLoading(true);
      fetchUserData(userId)
        .then(setUserData)
        .finally(() => setLoading(false));
    }
  }, [modals['userDetails'].isOpen, userId, userData]);

  return (
    <Modal id="userDetails">
      <Modal.Content>
        {loading ? <Spinner /> : <UserDetails data={userData} />}
      </Modal.Content>
    </Modal>
  );
};
```

#### 2. Image Optimization in Modals
```tsx
// ✅ Lazy load images
const ImageModal = ({ imageSrc }) => (
  <Modal.Body>
    <img
      src={imageSrc}
      loading="lazy"
      alt="Modal content"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Modal.Body>
);

// ✅ Responsive images
const ResponsiveImageModal = ({ imageSet }) => (
  <Modal.Body>
    <picture>
      <source media="(max-width: 768px)" srcSet={imageSet.mobile} />
      <source media="(max-width: 1200px)" srcSet={imageSet.tablet} />
      <img src={imageSet.desktop} alt="Responsive content" />
    </picture>
  </Modal.Body>
);
```

### Accessibility Performance

#### 1. Focus Management Optimization
```tsx
// ✅ Efficient focus trap
// Library automatically manages focus without performance overhead

// ✅ Optimize focus queries for large modals
const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const getFocusableElements = useCallback((container) => {
  return container.querySelectorAll(focusableSelector);
}, []);
```

#### 2. Screen Reader Performance
```tsx
// ✅ Minimize DOM changes for screen readers
const [announcement, setAnnouncement] = useState('');

// Batch announcements to avoid spam
const announceChange = useCallback(
  debounce((message) => {
    setAnnouncement(message);
  }, 100),
  []
);

// ✅ Stable ARIA relationships
const titleId = useMemo(() => `modal-title-${modalId}`, [modalId]);
const descId = useMemo(() => `modal-desc-${modalId}`, [modalId]);
```

### Multi-Modal Performance

#### 1. Modal Stacking Efficiency
```tsx
// ✅ Efficient z-index calculation
// Library automatically manages stacking without performance impact

// ✅ Backdrop optimization
// Only the topmost modal renders backdrop

// ✅ Event handling optimization
// Only topmost modal handles escape/backdrop clicks
```

#### 2. Many Modals Strategy
```tsx
// ✅ For applications with many modal types
const ModalRegistry = lazy(() => import('./ModalRegistry'));

// Registry component handles all modal definitions
const App = () => (
  <ModalSystem>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>

    <Suspense fallback={null}>
      <ModalRegistry />
    </Suspense>
  </ModalSystem>
);
```

### Performance Monitoring

#### 1. Bundle Analysis
```bash
# Analyze bundle size impact
npm run build && npx webpack-bundle-analyzer dist/

# Check tree shaking effectiveness
npm run build -- --analyze
```

#### 2. Runtime Performance Monitoring
```tsx
// ✅ Performance monitoring in development
const ModalPerformanceMonitor = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('modal')) {
            console.log(`Modal ${entry.name}: ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });
      return () => observer.disconnect();
    }
  }, []);

  return children;
};
```

#### 3. Memory Leak Detection
```tsx
// ✅ Development helper for detecting leaks
const useModalMemoryCheck = (modalId) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const checkMemory = () => {
        if (performance.memory) {
          console.log(`Modal ${modalId} memory:`, {
            used: Math.round(performance.memory.usedJSHeapSize / 1048576),
            total: Math.round(performance.memory.totalJSHeapSize / 1048576)
          });
        }
      };

      const interval = setInterval(checkMemory, 5000);
      return () => clearInterval(interval);
    }
  }, [modalId]);
};
```

### Best Practices Summary

#### ✅ Do
- Use default unmount behavior for most modals
- Implement code splitting for complex modal content
- Memoize expensive calculations and stable references
- Use CSS transitions over JavaScript animations
- Implement virtualization for large data sets
- Monitor bundle size impact

#### ❌ Avoid
- Creating inline objects in render methods
- Manual portal management (use ModalSystem)
- JavaScript-based animations for modal transitions
- Rendering all modals upfront
- Dynamic modal IDs that change frequently
- Keeping heavy content mounted unnecessarily

### Performance Targets

**Bundle Size:**
- Modal library core: < 50KB gzipped
- Individual modal components: < 10KB each
- CSS overhead: < 5KB gzipped

**Runtime Performance:**
- Modal open/close: < 16ms (60fps)
- Large modal rendering: < 100ms
- Memory usage: < 5MB per modal instance

**Network Performance:**
- Lazy loading: < 200ms for modal content
- Image loading: Progressive with lazy loading
- API calls: Debounced and cancellable

These guidelines ensure optimal performance across all common modal use cases while maintaining the library's flexibility and ease of use.
