import React, { createContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModalTrigger } from './ModalTrigger';
import { ModalContextValue } from './types';

// Create a mock context
const MockModalContext = createContext<ModalContextValue | null>(null);

// Mock the ModalProvider context
const mockOpenModal = vi.fn();
const mockIsRegistered = vi.fn();

const MockModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockContext: ModalContextValue = {
    openModal: mockOpenModal,
    closeModal: vi.fn(),
    isRegistered: mockIsRegistered,
    register: vi.fn(),
    unregister: vi.fn(),
    getModalEntry: vi.fn(),
    registry: {},
    stack: [],
    baseZIndex: 1000,
    updateDismissConfig: vi.fn(),
  };

  return (
    <MockModalContext.Provider value={mockContext}>
      {children}
    </MockModalContext.Provider>
  );
};

// Mock the useModalContext hook
vi.mock('./ModalProvider', () => ({
  useModalContext: () => {
    const context = React.useContext(MockModalContext);
    if (!context) {
      throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
  }
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <MockModalProvider>
      {ui}
    </MockModalProvider>
  );
};

describe('ModalTrigger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsRegistered.mockReturnValue(true);
  });

  describe('Basic functionality', () => {
    it('renders a button with children', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
      expect(button.textContent).toBe('Click me');
      expect(button.getAttribute('data-modal-trigger')).toBe('test-modal');
      expect(button.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('opens modal on click', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOpenModal).toHaveBeenCalledWith('test-modal');
    });

    it('applies custom className', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" className="custom-class">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });
  });

  describe('Keyboard accessibility', () => {
    it('opens modal on Enter key', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

      expect(mockOpenModal).toHaveBeenCalledWith('test-modal');
    });

    it('opens modal on Space key', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });

      expect(mockOpenModal).toHaveBeenCalledWith('test-modal');
    });

    it('does not open modal on other keys', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Tab', code: 'Tab' });
      fireEvent.keyDown(button, { key: 'Escape', code: 'Escape' });

      expect(mockOpenModal).not.toHaveBeenCalled();
    });
  });

  describe('Disabled state', () => {
    it('does not open modal when disabled and clicked', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" disabled>
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      
      fireEvent.click(button);
      expect(mockOpenModal).not.toHaveBeenCalled();
    });

    it('does not open modal when disabled and Enter is pressed', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" disabled>
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

      expect(mockOpenModal).not.toHaveBeenCalled();
    });
  });

  describe('asChild prop', () => {
    it('renders as child element when asChild is true', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild>
          <div data-testid="custom-trigger">Custom trigger</div>
        </ModalTrigger>
      );

      const customTrigger = screen.getByTestId('custom-trigger');
      expect(customTrigger).toBeTruthy();
      expect(customTrigger.textContent).toBe('Custom trigger');
      expect(customTrigger.getAttribute('data-modal-trigger')).toBe('test-modal');
      expect(customTrigger.getAttribute('aria-haspopup')).toBe('dialog');
      
      // Should not render a button
      expect(screen.queryByRole('button')).toBe(null);
    });

    it('opens modal when asChild element is clicked', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild>
          <div data-testid="custom-trigger">Custom trigger</div>
        </ModalTrigger>
      );

      const customTrigger = screen.getByTestId('custom-trigger');
      fireEvent.click(customTrigger);

      expect(mockOpenModal).toHaveBeenCalledWith('test-modal');
    });

    it('preserves existing props when asChild is true', () => {
      const originalClick = vi.fn();
      
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild>
          <button onClick={originalClick} className="existing-class">
            Custom button
          </button>
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('existing-class');
      
      fireEvent.click(button);

      expect(originalClick).toHaveBeenCalled();
      expect(mockOpenModal).toHaveBeenCalledWith('test-modal');
    });

    it('merges classNames when asChild is true', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild className="trigger-class">
          <button className="existing-class">Custom button</button>
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('existing-class');
      expect(button.className).toContain('trigger-class');
    });

    it('respects disabled state on child element', () => {
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild disabled>
          <button>Custom button</button>
        </ModalTrigger>
      );

      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      
      fireEvent.click(button);
      expect(mockOpenModal).not.toHaveBeenCalled();
    });

    it('throws error when asChild is true but children is not a valid element', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderWithProvider(
          <ModalTrigger target="test-modal" asChild>
            Plain text
          </ModalTrigger>
        );
      }).toThrow('Modal.Trigger: asChild requires a single valid React element as children');

      console.error = originalError;
    });
  });

  describe('Target modal validation', () => {
    it('warns when target modal is not registered', () => {
      mockIsRegistered.mockReturnValue(false);
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      renderWithProvider(
        <ModalTrigger target="unregistered-modal">
          Click me
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Modal.Trigger: target modal "unregistered-modal" is not registered. Make sure a Modal with id="unregistered-modal" exists.'
      );
      expect(mockOpenModal).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Event prevention', () => {
    it('does not open modal if click event is prevented in asChild', () => {
      const preventDefault = vi.fn((e) => e.preventDefault());
      
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild>
          <button onClick={preventDefault}>Custom button</button>
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(preventDefault).toHaveBeenCalled();
      expect(mockOpenModal).not.toHaveBeenCalled();
    });

    it('does not open modal if keydown event is prevented in asChild', () => {
      const preventDefault = vi.fn((e) => e.preventDefault());
      
      renderWithProvider(
        <ModalTrigger target="test-modal" asChild>
          <button onKeyDown={preventDefault}>Custom button</button>
        </ModalTrigger>
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

      expect(preventDefault).toHaveBeenCalled();
      expect(mockOpenModal).not.toHaveBeenCalled();
    });
  });
});