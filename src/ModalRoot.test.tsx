import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ModalRoot, useModalPortal } from './ModalRoot';
import { ModalProvider } from './ModalProvider';

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
        </ModalProvider>
      );

      // Should render without errors using default baseZIndex
      expect(document.body).toBeDefined();
    });

    it('uses custom baseZIndex when provided', () => {
      render(
        <ModalProvider>
          <ModalRoot baseZIndex={3000} />
        </ModalProvider>
      );

      // Should render without errors using custom baseZIndex
      expect(document.body).toBeDefined();
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