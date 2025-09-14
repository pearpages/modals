# Modal Component

A comprehensive, accessible, and flexible modal system for React applications built according to the specifications in `specs.md`.

## Features

- ✅ **Accessible**: Full WAI-ARIA compliance with proper focus management
- ✅ **Flexible**: Support for programmatic usage, stacked modals, and custom content
- ✅ **Keyboard-first**: ESC to close, tab trapping, focus return
- ✅ **Animation-ready**: Built-in animation states and CSS hooks
- ✅ **TypeScript**: Full type safety with comprehensive interfaces
- ✅ **Headless**: Minimal default styles, easy to customize
- ✅ **Promise-based confirm**: Utility for confirmation dialogs
- ✅ **Portal-based**: Renders outside component tree to avoid z-index issues

## Quick Start

### 1. Setup the Provider

Wrap your app with `ModalProvider` and include `ModalRoot`:

```tsx
import { ModalProvider, ModalRoot } from './components/Modal';

function App() {
  return (
    <ModalProvider>
      <div id="app">
        {/* Your app content */}
        <ModalRoot />
      </div>
    </ModalProvider>
  );
}
```

### 2. Use the Modal Hook

```tsx
import { useModal } from './components/Modal';

function MyComponent() {
  const { open, close } = useModal();

  const openModal = () => {
    open({
      title: 'My Modal',
      content: ({ close }) => (
        <div>
          <p>Modal content here</p>
          <button onClick={close}>Close</button>
        </div>
      ),
    });
  };

  return <button onClick={openModal}>Open Modal</button>;
}
```

## API Reference

### ModalProvider

The root provider that manages modal state.

```tsx
<ModalProvider>{children}</ModalProvider>
```

### ModalRoot

Component that renders all open modals. Should be placed once in your app.

```tsx
<ModalRoot className="custom-modal-root" />
```

### useModal()

Hook that returns the modal API:

```tsx
const {
  open, // (payload: OpenPayload) => ModalId
  close, // (id?: ModalId, reason?: CloseReason) => void
  replace, // (id: ModalId, next: OpenPayload) => void
  update, // (id: ModalId, patch: Partial<OpenPayload>) => void
  isOpen, // (id: ModalId) => boolean
  subscribe, // (fn: (stack: ModalEntry[]) => void) => () => void
} = useModal();
```

## Modal Options

All modals accept these options:

```tsx
interface ModalOptions {
  id?: string; // Auto-generated if omitted
  title?: string; // Modal title
  role?: 'dialog' | 'alertdialog'; // Default: 'dialog'
  size?: 'sm' | 'md' | 'lg' | 'xl' | { maxWidth: number };
  ariaLabel?: string; // Accessibility label
  labelledBy?: string; // aria-labelledby override
  describedBy?: string; // aria-describedby override
  closeOnEsc?: boolean; // Default: true
  closeOnBackdrop?: boolean; // Default: true
  initialFocus?: HTMLElement; // Element to focus on open
  returnFocus?: HTMLElement; // Element to focus on close
  trapFocus?: boolean; // Default: true
  inertBackground?: boolean; // Default: true
  preventScroll?: boolean; // Default: true
  portalTarget?: HTMLElement; // Default: document.body
  onClose?: (reason: CloseReason) => void;
  onOpen?: () => void;
  animations?: {
    enter?: string; // CSS class for enter animation
    exit?: string; // CSS class for exit animation
    backdropEnter?: string; // Backdrop enter animation
    backdropExit?: string; // Backdrop exit animation
    durationMs?: number; // Animation duration (default: 200ms)
  };
}
```

## Examples

### Basic Modal

```tsx
const { open } = useModal();

open({
  title: 'Basic Modal',
  content: 'Hello, world!',
});
```

### Modal with Form

```tsx
const { open } = useModal();

open({
  title: 'Edit Profile',
  size: 'lg',
  content: ({ close }) => (
    <ProfileForm
      onSubmit={(data) => {
        // Handle form submission
        close();
      }}
      onCancel={close}
    />
  ),
});
```

### Stacked Modals

```tsx
const { open } = useModal();

// Open first modal
const firstId = open({
  title: 'First Modal',
  content: ({ close }) => (
    <div>
      <p>First modal content</p>
      <button
        onClick={() => {
          // Open second modal on top
          open({
            title: 'Second Modal',
            content: 'This is on top!',
          });
        }}
      >
        Open Another
      </button>
    </div>
  ),
});
```

### Replace Modal Content

```tsx
const { open, replace } = useModal();

const id = open({
  title: 'Step 1',
  content: ({ close }) => (
    <div>
      <p>First step content</p>
      <button
        onClick={() => {
          replace(id, {
            title: 'Step 2',
            content: 'Second step content',
          });
        }}
      >
        Next
      </button>
    </div>
  ),
});
```

## Styling

The component uses CSS classes and data attributes for styling:

```scss
// Backdrop
.modal-backdrop {
  // Backdrop styles

  &[data-state='open'] {
    // Open state
  }

  &[data-state='closing'] {
    // Closing state
  }
}

// Dialog
.modal-dialog {
  // Dialog styles

  &[data-size='sm'] {
    /* Small modal */
  }
  &[data-size='md'] {
    /* Medium modal */
  }
  &[data-size='lg'] {
    /* Large modal */
  }
  &[data-size='xl'] {
    /* Extra large modal */
  }
}

// Header
.modal-header {
  .modal-title {
    /* Title styles */
  }
  .modal-close {
    /* Close button styles */
  }
}

// Content
.modal-content {
  /* Content area styles */
}
```

## Accessibility

The modal system follows WAI-ARIA guidelines:

- ✅ Proper `role` attributes (`dialog` or `alertdialog`)
- ✅ Focus trapping within modal
- ✅ Focus returns to trigger element on close
- ✅ ESC key closes modal
- ✅ Background becomes inert
- ✅ Screen reader announcements
- ✅ Keyboard navigation support

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers
- ✅ Server-side rendering (SSR) safe

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all props, options, and return types.
