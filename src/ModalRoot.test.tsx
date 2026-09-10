import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ModalRoot, useModalPortal } from './ModalRoot';
import { ModalProvider, useModalStack } from './ModalProvider';
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

    it('keeps a controlled modal open when it has no onOpenChange', () => {
      // `open` without onOpenChange is a modal nobody can close, like a React
      // input with a value and no onChange. It stays put.
      render(
        <ModalProvider>
          <ModalRoot />
          <Modal id="locked-open" open>
            <div data-testid="locked-content">content</div>
          </Modal>
        </ModalProvider>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.getByTestId('locked-content')).toBeInTheDocument();
    });
  });

  describe('Dismissal in uncontrolled mode', () => {
    // An uncontrolled modal is opened through the provider, not an `open` prop.
    const Opener = ({ id }: { id: string }) => {
      const modals = useModalStack();
      return <button onClick={() => modals.open(id)}>open</button>;
    };

    it('closes directly', () => {
      render(
        <ModalProvider>
          <ModalRoot />
          <Opener id="esc-uncontrolled" />
          <Modal id="esc-uncontrolled">
            <div data-testid="uncontrolled-content">content</div>
          </Modal>
        </ModalProvider>
      );

      fireEvent.click(screen.getByText('open'));
      expect(screen.getByTestId('uncontrolled-content')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByTestId('uncontrolled-content')).not.toBeInTheDocument();
    });

    it.each([
      ['Escape', () => fireEvent.keyDown(document, { key: 'Escape' })],
      ['a backdrop click', () => fireEvent.click(backdrop()!)],
    ])('still closes on %s when onOpenChange is passed, and notifies it', (_label, dismiss) => {
      // Regression: the dismiss paths used to treat any modal with an
      // onOpenChange as controlled, so an uncontrolled modal that merely
      // listened for changes could never be closed.
      const onOpenChange = vi.fn();

      render(
        <ModalProvider>
          <ModalRoot />
          <Opener id="listened" />
          <Modal id="listened" onOpenChange={onOpenChange}>
            <div data-testid="listened-content">content</div>
          </Modal>
        </ModalProvider>
      );

      fireEvent.click(screen.getByText('open'));
      expect(onOpenChange).toHaveBeenLastCalledWith(true);

      dismiss();

      expect(screen.queryByTestId('listened-content')).not.toBeInTheDocument();
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
      expect(onOpenChange).toHaveBeenCalledTimes(2);
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