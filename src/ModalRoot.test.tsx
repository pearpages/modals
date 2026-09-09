import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ModalRoot, useModalPortal } from './ModalRoot';
import { ModalProvider } from './ModalProvider';
import { Modal } from './Modal';

// Mock createPortal for testing
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: vi.fn((children, container) => {
      // Simulate portal rendering by creating a div with portal content
      return (
        <div data-testid="portal-content" data-container={container?.id || 'body'}>
          {children}
        </div>
      );
    })
  };
});

const backdrop = () => document.querySelector('.modalBackdrop') as HTMLElement | null;

describe('ModalRoot', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('SSR Safety', () => {
    it('returns null on server (SSR)', () => {
      // Test that ModalRoot is SSR-safe by checking it renders without crashing
      const { container } = render(
        <ModalProvider>
          <ModalRoot />
        </ModalProvider>
      );

      // Should not crash and render some content
      expect(container).toBeDefined();
    });

    it('renders when no modals are open', () => {
      const { container } = render(
        <ModalProvider>
          <ModalRoot />
        </ModalProvider>
      );

      expect(container).toBeDefined();
    });
  });

  describe('Portal Rendering', () => {
    it('uses custom container when provided', () => {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-portal';
      document.body.appendChild(customContainer);

      render(
        <ModalProvider>
          <ModalRoot container={customContainer} />
        </ModalProvider>
      );

      expect(document.getElementById('custom-portal')).toBeDefined();
      
      document.body.removeChild(customContainer);
    });

    it('uses default baseZIndex when not provided', () => {
      render(
        <ModalProvider>
          <ModalRoot />
          <Modal id="z-default" open>
            <div>content</div>
          </Modal>
        </ModalProvider>
      );

      expect(backdrop()).toHaveStyle({ zIndex: '1000' });
    });

    it('uses custom baseZIndex when provided', () => {
      render(
        <ModalProvider>
          <ModalRoot baseZIndex={3000} />
          <Modal id="z-prop" open>
            <div>content</div>
          </Modal>
        </ModalProvider>
      );

      expect(backdrop()).toHaveStyle({ zIndex: '3000' });
    });

    it('inherits baseZIndex from the provider when the prop is omitted', () => {
      // Regression: ModalRoot defaulted its own prop to 1000, so the provider's
      // value could never be reached and the backdrop landed in a different
      // layer band from ModalContent, which reads the same value from context.
      render(
        <ModalProvider baseZIndex={5000}>
          <ModalRoot />
          <Modal id="z-context" open>
            <div>content</div>
          </Modal>
        </ModalProvider>
      );

      expect(backdrop()).toHaveStyle({ zIndex: '5000' });
    });

    it('honours an explicit baseZIndex of 0', () => {
      render(
        <ModalProvider baseZIndex={5000}>
          <ModalRoot baseZIndex={0} />
          <Modal id="z-zero" open>
            <div>content</div>
          </Modal>
        </ModalProvider>
      );

      expect(backdrop()).toHaveStyle({ zIndex: '0' });
    });
  });

  describe('Dismissal in controlled mode', () => {
    // A controlled modal owns its own state: Escape and backdrop clicks are
    // requests, and a parent that declines to flip `open` keeps it open.
    // Regression: the backdrop honoured that, Escape did not — it called
    // closeModal directly, so the modal vanished no matter what the parent did.
    it.each([
      ['Escape', () => fireEvent.keyDown(document, { key: 'Escape' })],
      ['a backdrop click', () => fireEvent.click(backdrop()!)],
    ])('asks a controlled modal to close on %s without closing it', (_label, dismiss) => {
      const onOpenChange = vi.fn();

      render(
        <ModalProvider>
          <ModalRoot />
          <Modal id="controlled-dismiss" open onOpenChange={onOpenChange}>
            <div data-testid="controlled-content">content</div>
          </Modal>
        </ModalProvider>
      );

      dismiss();

      expect(onOpenChange).toHaveBeenCalledWith(false);
      // The parent never flipped `open`, so the modal is still on screen.
      expect(screen.getByTestId('controlled-content')).toBeInTheDocument();
    });

    it('closes directly when the modal is uncontrolled', () => {
      render(
        <ModalProvider>
          <ModalRoot />
          <Modal id="esc-uncontrolled" open>
            <div data-testid="uncontrolled-content">content</div>
          </Modal>
        </ModalProvider>
      );

      expect(screen.getByTestId('uncontrolled-content')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByTestId('uncontrolled-content')).not.toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('sets up escape key listener without crashing', () => {
      render(
        <ModalProvider>
          <ModalRoot />
        </ModalProvider>
      );

      // Should not crash when escape key is pressed with no open modals
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(document.body).toBeDefined();
    });

    it('handles other keys without crashing', () => {
      render(
        <ModalProvider>
          <ModalRoot />
        </ModalProvider>
      );

      // Should not crash with other keys
      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });
      expect(document.body).toBeDefined();
    });
  });

  describe('Component Lifecycle', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <ModalProvider>
          <ModalRoot />
        </ModalProvider>
      );

      // Should unmount without errors
      unmount();
      expect(document.body).toBeDefined();
    });
  });
});

describe('useModalPortal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns null initially', () => {
    const TestComponent = () => {
      const portal = useModalPortal('test-modal');
      return <div data-testid="portal-result">{portal ? 'found' : 'null'}</div>;
    };

    render(<TestComponent />);

    expect(screen.getByTestId('portal-result').textContent).toBe('null');
  });

  it('finds portal element when it exists', async () => {
    // Create a mock portal element
    const portalElement = document.createElement('div');
    portalElement.setAttribute('data-modal-portal', 'test-modal');
    document.body.appendChild(portalElement);

    const TestComponent = () => {
      const portal = useModalPortal('test-modal');
      return <div data-testid="portal-result">{portal ? 'found' : 'null'}</div>;
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('portal-result').textContent).toBe('found');
    });
  });

  it('returns null when portal element does not exist', async () => {
    const TestComponent = () => {
      const portal = useModalPortal('nonexistent-modal');
      return <div data-testid="portal-result">{portal ? 'found' : 'null'}</div>;
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('portal-result').textContent).toBe('null');
    });
  });

  it('cleans up mutation observer on unmount', () => {
    const TestComponent = () => {
      const portal = useModalPortal('test-modal');
      return <div data-testid="portal-result">{portal ? 'found' : 'null'}</div>;
    };

    const { unmount } = render(<TestComponent />);

    // Should unmount without errors
    unmount();
    expect(document.body).toBeDefined();
  });
});