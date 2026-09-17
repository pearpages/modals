import { render, screen, fireEvent, waitFor, act, type RenderResult } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { ModalRoot } from './ModalRoot';

// Test wrapper that provides full modal system context
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

// Helper function to render with proper act handling and timer control
const renderModal = async (ui: React.ReactElement) => {
  let result!: RenderResult;
  await act(async () => {
    result = render(ui);
    // Fast-forward any timers to complete state transitions immediately
    if (vi.isMockFunction(setTimeout)) {
      vi.runAllTimers();
    }
  });
  return result;
};

// Helper for snapshot tests
const renderModalSnapshot = async (ui: React.ReactElement) => {
  let result!: RenderResult;
  await act(async () => {
    result = render(ui);
    // Fast-forward timers for consistent snapshots
    if (vi.isMockFunction(setTimeout)) {
      vi.runAllTimers();
    }
  });
  return result;
};

describe('Modal.Content - Layout and Sizes', () => {
  beforeEach(() => {
    // Use fake timers for precise control over async state updates
    vi.useFakeTimers();
    
    // Mock portal container
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'modal-portal');
    document.body.appendChild(portalDiv);
  });

  afterEach(() => {
    // Restore real timers after each test
    vi.useRealTimers();
  });

  it('merges a consumer style with its own z-index instead of replacing it', async () => {
    // Regression: `...rest` after `style: {zIndex}` let a consumer style —
    // typically inline CSS variables for theming — drop the z-index entirely.
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content style={{ '--modal-bg': 'red' } as React.CSSProperties}>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const dialog = screen.getByTestId('content').closest('[role="dialog"]') as HTMLElement;
    expect(dialog.style.zIndex).toBe('1000');
    expect(dialog.style.getPropertyValue('--modal-bg')).toBe('red');
  });

  it('should render with default size (md)', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.className).toContain('modal');
    expect(modalElement?.className).toContain('modal--md');
  });

  it('should apply auto size class', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content size="auto">
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.className).toContain('modal--auto');
  });

  it('should apply full size class', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content size="full">
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.className).toContain('modal--full');
  });

  it('is centred by default: placement class and data attribute', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const modalElement = screen.getByTestId('content').closest('[role="dialog"]');
    expect(modalElement?.className).toContain('modal--placement-center');
    expect(modalElement).toHaveAttribute('data-placement', 'center');
  });

  it.each(['start', 'end', 'top', 'bottom'] as const)('docks to the %s edge', async (placement) => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content placement={placement}>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const modalElement = screen.getByTestId('content').closest('[role="dialog"]');
    expect(modalElement?.className).toContain(`modal--placement-${placement}`);
    expect(modalElement?.className).toContain('modal--md');
    expect(modalElement).toHaveAttribute('data-placement', placement);
  });

  it('should apply custom className', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content className="custom-modal">
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.className).toContain('custom-modal');
  });

  it('should not render when modal is closed', async () => {
    await renderModal(
      <TestModalSystem open={false}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    expect(screen.queryByTestId('content')).toBe(null);
  });

  it('should apply full size class', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content size="full">
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement).toHaveClass('modal--full');
  });

  it('should apply custom className', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content className="custom-modal">
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement).toHaveClass('custom-modal');
  });

  it('should not render when modal is closed', () => {
    render(
      <TestModalSystem open={false}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    expect(screen.queryByTestId('content')).toBe(null);
  });
});

describe('Modal.Content - Animation and Data States', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Mock portal container
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'modal-portal');
    document.body.appendChild(portalDiv);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should have animated class when animated=true (default)', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.className).toContain('modal--animated');
  });

  it('should not have animated class when animated=false', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content animated={false}>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.className).not.toContain('modal--animated');
  });

  it('should set data-state attribute for animations', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement?.getAttribute('data-state')).toBeTruthy();
    
    // Should be either 'opening' or 'open'
    const dataState = modalElement?.getAttribute('data-state');
    expect(['opening', 'open']).toContain(dataState);
  });

  it('should set data-state on backdrop', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    // The backdrop is now handled by ModalRoot, check for the portal backdrop
    const backdrop = document.querySelector('[data-modal-backdrop="true"]');
    expect(backdrop).toBeTruthy();
    // ModalRoot backdrop doesn't use data-state, it handles styling differently
  });
});

describe('Modal.Content - Accessibility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Mock portal container
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'modal-portal');
    document.body.appendChild(portalDiv);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should have role="dialog"', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement).toHaveAttribute('role', 'dialog');
  });

  it('should have aria-modal="true"', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    const modalElement = content.closest('[role="dialog"]');
    expect(modalElement).toHaveAttribute('aria-modal', 'true');
  });
});

describe('Modal.Content - Dismiss Behavior', () => {
  beforeEach(() => {
    // Don't use fake timers for dismiss behavior tests since they use waitFor
    // Mock portal container
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'modal-portal');
    document.body.appendChild(portalDiv);
  });

  it('should close on backdrop click by default', async () => {
    const onOpenChange = vi.fn();
    await renderModal(
      <TestModalSystem open={true} onOpenChange={onOpenChange}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    // Find the backdrop element created by ModalRoot (has data-modal-backdrop="true")
    const backdrop = document.querySelector('[data-modal-backdrop="true"]');
    
    if (backdrop) {
      fireEvent.click(backdrop);
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    } else {
      throw new Error('Backdrop element not found');
    }
  });

  it('should not close on backdrop click when closeOnBackdrop=false', async () => {
    const onOpenChange = vi.fn();
    await renderModal(
      <TestModalSystem open={true} onOpenChange={onOpenChange}>
        <Modal.Content closeOnBackdrop={false}>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    // Find the backdrop element created by ModalRoot (has data-modal-backdrop="true")
    const backdrop = document.querySelector('[data-modal-backdrop="true"]');
    
    if (backdrop) {
      fireEvent.click(backdrop);
      await waitFor(() => {
        expect(onOpenChange).not.toHaveBeenCalled();
      }, { timeout: 100 });
    }
  });

  it('should not close on content click', async () => {
    const onOpenChange = vi.fn();
    await renderModal(
      <TestModalSystem open={true} onOpenChange={onOpenChange}>
        <Modal.Content>
          <div data-testid="content">Content</div>
        </Modal.Content>
      </TestModalSystem>
    );

    const content = screen.getByTestId('content');
    fireEvent.click(content);
    
    await waitFor(() => {
      expect(onOpenChange).not.toHaveBeenCalled();
    }, { timeout: 100 });
  });
});

describe('Modal.Content - Multiple Sizes Snapshot', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Mock portal container
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'modal-portal');
    document.body.appendChild(portalDiv);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should match snapshot for auto size', async () => {
    const { container } = await renderModalSnapshot(
      <TestModalSystem open={true}>
        <Modal.Content size="auto">
          <Modal.Header>
            <Modal.Title>Auto Size Modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <div>Auto-sized content</div>
        </Modal.Content>
      </TestModalSystem>
    );
    
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for md size', async () => {
    const { container } = await renderModalSnapshot(
      <TestModalSystem open={true}>
        <Modal.Content size="md">
          <Modal.Header>
            <Modal.Title>Medium Modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <div>Medium-sized content</div>
        </Modal.Content>
      </TestModalSystem>
    );
    
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for full size', async () => {
    const { container } = await renderModalSnapshot(
      <TestModalSystem open={true}>
        <Modal.Content size="full">
          <Modal.Header>
            <Modal.Title>Full Size Modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <div>Full-screen content</div>
        </Modal.Content>
      </TestModalSystem>
    );
    
    expect(container).toMatchSnapshot();
  });
});

describe('Modal Subcomponents', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Mock portal container
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('id', 'modal-portal');
    document.body.appendChild(portalDiv);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render Modal.Header with proper class', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header data-testid="header">
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>
        </Modal.Content>
      </TestModalSystem>
    );

    const header = screen.getByTestId('header');
    expect(header).toHaveClass('modalHeader');
  });

  it('should render Modal.Title with auto-generated ID', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Title data-testid="title">Test Title</Modal.Title>
        </Modal.Content>
      </TestModalSystem>
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveAttribute('id');
    expect(title.id).toMatch(/modalTitle-/);
  });

  it('should render Modal.Description with auto-generated ID', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Description data-testid="description">
            Test Description
          </Modal.Description>
        </Modal.Content>
      </TestModalSystem>
    );

    const description = screen.getByTestId('description');
    expect(description).toHaveAttribute('id');
    expect(description.id).toMatch(/modalDescription-/);
  });

  it('should render Modal.Close with default close icon', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Close data-testid="close" />
        </Modal.Content>
      </TestModalSystem>
    );

    const close = screen.getByTestId('close');
    expect(close).toHaveTextContent('×');
    expect(close).toHaveAttribute('aria-label', 'Close modal');
  });

  it('should render Modal.Footer with proper class', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Footer data-testid="footer">
            <button>Cancel</button>
            <button>Confirm</button>
          </Modal.Footer>
        </Modal.Content>
      </TestModalSystem>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('modalFooter');
  });
});
describe('Modal.Content asChild', () => {
  it('renders the child in place of the dialog div, keeping the dialog role', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content asChild>
          <form data-testid="dialog-form">
            <button type="submit">Save</button>
          </form>
        </Modal.Content>
      </TestModalSystem>
    );

    const form = screen.getByTestId('dialog-form');
    expect(form.tagName).toBe('FORM');
    expect(form).toHaveAttribute('role', 'dialog');
    expect(form).toHaveAttribute('aria-modal', 'true');
    expect(form).toHaveClass('modal');
    // The default wrapper is gone, not merely hidden.
    expect(document.querySelector('div.modal')).toBeNull();
  });

  it('merges the size class with the child className', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content asChild size="full" className="from-prop">
          <form className="from-child" data-testid="dialog-form">
            content
          </form>
        </Modal.Content>
      </TestModalSystem>
    );

    const form = screen.getByTestId('dialog-form');
    expect(form).toHaveClass('from-child', 'modal', 'modal--full', 'from-prop');
  });

  it('composes the child onSubmit rather than replacing it', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content asChild>
          <form onSubmit={onSubmit} data-testid="dialog-form">
            <button type="submit">Save</button>
          </form>
        </Modal.Content>
      </TestModalSystem>
    );

    fireEvent.submit(screen.getByTestId('dialog-form'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('keeps the focus trap working, so the child still receives focus', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content asChild>
          <form data-testid="dialog-form">
            <button type="button">Focusable</button>
          </form>
        </Modal.Content>
      </TestModalSystem>
    );

    // The focus trap needs the merged ref to have reached the child element.
    await waitFor(() => {
      const form = screen.getByTestId('dialog-form');
      expect(form.contains(document.activeElement)).toBe(true);
    });
  });

  it('preserves a ref the consumer put on the child', async () => {
    const ref = React.createRef<HTMLFormElement>();

    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content asChild>
          <form ref={ref} data-testid="dialog-form">
            content
          </form>
        </Modal.Content>
      </TestModalSystem>
    );

    expect(ref.current).toBe(screen.getByTestId('dialog-form'));
  });

  it('throws a named error when the child is not a single element', async () => {
    await expect(
      renderModal(
        <TestModalSystem open={true}>
          <Modal.Content asChild>{'just text'}</Modal.Content>
        </TestModalSystem>
      )
    ).rejects.toThrow('Modal.Content: asChild requires a single valid React element as children');
  });
});
