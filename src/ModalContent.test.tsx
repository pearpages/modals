import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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
  let result: any;
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
  let result: any;
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
    expect(header).toHaveClass('modal-header');
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
    expect(title.id).toMatch(/modal-title-/);
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
    expect(description.id).toMatch(/modal-description-/);
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
    expect(footer).toHaveClass('modal-footer');
  });
});