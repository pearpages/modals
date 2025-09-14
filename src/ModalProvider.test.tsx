import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ModalProvider, useModalContext } from './ModalProvider';
import { ModalContextValue } from './types';

// Test component to access and manipulate modal context
const TestModalComponent: React.FC<{
  onContextReady?: (context: ModalContextValue) => void;
  modalId?: string;
}> = ({ onContextReady, modalId = 'test-modal' }) => {
  const context = useModalContext();

  React.useEffect(() => {
    if (onContextReady) {
      onContextReady(context);
    }
  }, [context, onContextReady]);

  const modalEntry = context.getModalEntry(modalId);

  return (
    <div data-testid="test-component">
      <div data-testid="modal-open">{modalEntry?.open ? 'true' : 'false'}</div>
      <div data-testid="modal-is-top">{modalEntry?.isTop ? 'true' : 'false'}</div>
      <div data-testid="modal-stack-index">{modalEntry?.stackIndex ?? -1}</div>
      <div data-testid="stack-length">{context.stack.length}</div>
    </div>
  );
};

describe('ModalProvider', () => {
  let contextRef: { current: ModalContextValue | null };

  beforeEach(() => {
    contextRef = { current: null };
  });

  const renderWithProvider = (
    baseZIndex = 1000,
    children = <TestModalComponent onContextReady={(ctx) => { contextRef.current = ctx; }} />
  ) => {
    return render(
      <ModalProvider baseZIndex={baseZIndex}>
        {children}
      </ModalProvider>
    );
  };

  describe('Basic Provider Functionality', () => {
    it('provides context with initial state', () => {
      renderWithProvider();
      
      expect(contextRef.current).toBeTruthy();
      expect(contextRef.current!.registry).toEqual({});
      expect(contextRef.current!.stack).toEqual([]);
      expect(contextRef.current!.baseZIndex).toBe(1000);
    });

    it('accepts custom baseZIndex', () => {
      renderWithProvider(2000);
      
      expect(contextRef.current!.baseZIndex).toBe(2000);
    });

    it('throws error when used outside provider', () => {
      // Capture console.error to prevent test output pollution
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        render(<TestModalComponent />);
      }).toThrow('useModalContext must be used within a ModalProvider');

      console.error = originalError;
    });
  });

  describe('Modal Registration', () => {
    it('registers a new modal', () => {
      renderWithProvider();
      
      act(() => {
        contextRef.current!.register('modal-1');
      });

      expect(contextRef.current!.registry['modal-1']).toEqual({
        open: false,
        isTop: false,
        stackIndex: -1
      });
    });

    it('warns when registering duplicate modal', () => {
      renderWithProvider();
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      act(() => {
        contextRef.current!.register('modal-1');
        contextRef.current!.register('modal-1'); // Duplicate
      });

      expect(consoleSpy).toHaveBeenCalledWith('Modal with id "modal-1" is already registered');
      consoleSpy.mockRestore();
    });

    it('unregisters a modal', () => {
      renderWithProvider();
      
      act(() => {
        contextRef.current!.register('modal-1');
        contextRef.current!.unregister('modal-1');
      });

      expect(contextRef.current!.registry['modal-1']).toBeUndefined();
    });

    it('checks if modal is registered', () => {
      renderWithProvider();
      
      expect(contextRef.current!.isRegistered('modal-1')).toBe(false);
      
      act(() => {
        contextRef.current!.register('modal-1');
      });

      expect(contextRef.current!.isRegistered('modal-1')).toBe(true);
    });
  });

  describe('Modal Opening and Closing', () => {
    beforeEach(() => {
      renderWithProvider();
      act(() => {
        contextRef.current!.register('modal-1');
        contextRef.current!.register('modal-2');
        contextRef.current!.register('modal-3');
      });
    });

    it('opens a single modal', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
      });

      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      expect(modal1.open).toBe(true);
      expect(modal1.isTop).toBe(true);
      expect(modal1.stackIndex).toBe(0);
      expect(contextRef.current!.stack).toEqual(['modal-1']);
    });

    it('warns when opening unregistered modal', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      act(() => {
        contextRef.current!.openModal('nonexistent');
      });

      expect(consoleSpy).toHaveBeenCalledWith('Cannot open modal "nonexistent" - not registered');
      consoleSpy.mockRestore();
    });

    it('ignores opening already open modal', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.openModal('modal-1'); // Should be ignored
      });

      expect(contextRef.current!.stack).toEqual(['modal-1']);
    });

    it('closes a modal', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.closeModal('modal-1');
      });

      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      expect(modal1.open).toBe(false);
      expect(modal1.isTop).toBe(false);
      expect(modal1.stackIndex).toBe(-1);
      expect(contextRef.current!.stack).toEqual([]);
    });

    it('ignores closing already closed modal', () => {
      act(() => {
        contextRef.current!.closeModal('modal-1'); // Not open
      });

      expect(contextRef.current!.stack).toEqual([]);
    });
  });

  describe('Modal Stacking and Nesting', () => {
    beforeEach(() => {
      renderWithProvider();
      act(() => {
        contextRef.current!.register('modal-1');
        contextRef.current!.register('modal-2');
        contextRef.current!.register('modal-3');
      });
    });

    it('stacks multiple modals correctly', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.openModal('modal-2');
        contextRef.current!.openModal('modal-3');
      });

      expect(contextRef.current!.stack).toEqual(['modal-1', 'modal-2', 'modal-3']);
      
      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      const modal2 = contextRef.current!.getModalEntry('modal-2')!;
      const modal3 = contextRef.current!.getModalEntry('modal-3')!;

      // Modal 1: bottom of stack
      expect(modal1.open).toBe(true);
      expect(modal1.isTop).toBe(false);
      expect(modal1.stackIndex).toBe(0);

      // Modal 2: middle of stack
      expect(modal2.open).toBe(true);
      expect(modal2.isTop).toBe(false);
      expect(modal2.stackIndex).toBe(1);

      // Modal 3: top of stack
      expect(modal3.open).toBe(true);
      expect(modal3.isTop).toBe(true);
      expect(modal3.stackIndex).toBe(2);
    });

    it('closes topmost modal correctly', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.openModal('modal-2');
        contextRef.current!.openModal('modal-3');
        contextRef.current!.closeModal('modal-3'); // Close topmost
      });

      expect(contextRef.current!.stack).toEqual(['modal-1', 'modal-2']);
      
      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      const modal2 = contextRef.current!.getModalEntry('modal-2')!;
      const modal3 = contextRef.current!.getModalEntry('modal-3')!;

      // Modal 1: bottom of stack
      expect(modal1.open).toBe(true);
      expect(modal1.isTop).toBe(false);
      expect(modal1.stackIndex).toBe(0);

      // Modal 2: now top of stack
      expect(modal2.open).toBe(true);
      expect(modal2.isTop).toBe(true);
      expect(modal2.stackIndex).toBe(1);

      // Modal 3: closed
      expect(modal3.open).toBe(false);
      expect(modal3.isTop).toBe(false);
      expect(modal3.stackIndex).toBe(-1);
    });

    it('closes middle modal and recalculates stack', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.openModal('modal-2');
        contextRef.current!.openModal('modal-3');
        contextRef.current!.closeModal('modal-2'); // Close middle
      });

      expect(contextRef.current!.stack).toEqual(['modal-1', 'modal-3']);
      
      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      const modal2 = contextRef.current!.getModalEntry('modal-2')!;
      const modal3 = contextRef.current!.getModalEntry('modal-3')!;

      // Modal 1: bottom of stack (index 0)
      expect(modal1.open).toBe(true);
      expect(modal1.isTop).toBe(false);
      expect(modal1.stackIndex).toBe(0);

      // Modal 2: closed
      expect(modal2.open).toBe(false);
      expect(modal2.isTop).toBe(false);
      expect(modal2.stackIndex).toBe(-1);

      // Modal 3: now top of stack (index 1)
      expect(modal3.open).toBe(true);
      expect(modal3.isTop).toBe(true);
      expect(modal3.stackIndex).toBe(1);
    });

    it('closes bottom modal and recalculates stack', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.openModal('modal-2');
        contextRef.current!.openModal('modal-3');
        contextRef.current!.closeModal('modal-1'); // Close bottom
      });

      expect(contextRef.current!.stack).toEqual(['modal-2', 'modal-3']);
      
      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      const modal2 = contextRef.current!.getModalEntry('modal-2')!;
      const modal3 = contextRef.current!.getModalEntry('modal-3')!;

      // Modal 1: closed
      expect(modal1.open).toBe(false);
      expect(modal1.isTop).toBe(false);
      expect(modal1.stackIndex).toBe(-1);

      // Modal 2: now bottom of stack (index 0)
      expect(modal2.open).toBe(true);
      expect(modal2.isTop).toBe(false);
      expect(modal2.stackIndex).toBe(0);

      // Modal 3: still top of stack (index 1)
      expect(modal3.open).toBe(true);
      expect(modal3.isTop).toBe(true);
      expect(modal3.stackIndex).toBe(1);
    });

    it('handles unregistering modal from middle of stack', () => {
      act(() => {
        contextRef.current!.openModal('modal-1');
        contextRef.current!.openModal('modal-2');
        contextRef.current!.openModal('modal-3');
        contextRef.current!.unregister('modal-2'); // Unregister middle modal
      });

      expect(contextRef.current!.stack).toEqual(['modal-1', 'modal-3']);
      expect(contextRef.current!.registry['modal-2']).toBeUndefined();
      
      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      const modal3 = contextRef.current!.getModalEntry('modal-3')!;

      // Modal 1: bottom of stack (index 0)
      expect(modal1.open).toBe(true);
      expect(modal1.isTop).toBe(false);
      expect(modal1.stackIndex).toBe(0);

      // Modal 3: top of stack (index 1)
      expect(modal3.open).toBe(true);
      expect(modal3.isTop).toBe(true);
      expect(modal3.stackIndex).toBe(1);
    });
  });

  describe('Dismiss Configuration', () => {
    beforeEach(() => {
      renderWithProvider();
      act(() => {
        contextRef.current!.register('modal-1');
      });
    });

    it('updates dismiss configuration', () => {
      const dismissConfig = {
        closeOnBackdrop: false,
        closeOnEscape: true,
        onInteractOutside: () => {}
      };

      act(() => {
        contextRef.current!.updateDismissConfig('modal-1', dismissConfig);
      });

      const modal1 = contextRef.current!.getModalEntry('modal-1')!;
      expect(modal1.dismissConfig).toEqual(dismissConfig);
    });

    it('warns when updating dismiss config for unregistered modal', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      act(() => {
        contextRef.current!.updateDismissConfig('nonexistent', {});
      });

      expect(consoleSpy).toHaveBeenCalledWith('Cannot update dismiss config for modal "nonexistent" - not registered');
      consoleSpy.mockRestore();
    });
  });

  describe('Complex Nesting Scenarios', () => {
    beforeEach(() => {
      renderWithProvider();
      act(() => {
        ['A', 'B', 'C', 'D', 'E'].forEach(id => {
          contextRef.current!.register(id);
        });
      });
    });

    it('handles complex open/close sequence', () => {
      // Open A, B, C
      act(() => {
        contextRef.current!.openModal('A');
        contextRef.current!.openModal('B');
        contextRef.current!.openModal('C');
      });
      expect(contextRef.current!.stack).toEqual(['A', 'B', 'C']);
      expect(contextRef.current!.getModalEntry('C')!.isTop).toBe(true);

      // Close B (middle), then open D
      act(() => {
        contextRef.current!.closeModal('B');
        contextRef.current!.openModal('D');
      });
      expect(contextRef.current!.stack).toEqual(['A', 'C', 'D']);
      expect(contextRef.current!.getModalEntry('D')!.isTop).toBe(true);
      expect(contextRef.current!.getModalEntry('C')!.isTop).toBe(false);

      // Close A (now bottom), then open E
      act(() => {
        contextRef.current!.closeModal('A');
        contextRef.current!.openModal('E');
      });
      expect(contextRef.current!.stack).toEqual(['C', 'D', 'E']);
      expect(contextRef.current!.getModalEntry('E')!.isTop).toBe(true);

      // Verify stack indices are correct
      expect(contextRef.current!.getModalEntry('C')!.stackIndex).toBe(0);
      expect(contextRef.current!.getModalEntry('D')!.stackIndex).toBe(1);
      expect(contextRef.current!.getModalEntry('E')!.stackIndex).toBe(2);
    });

    it('correctly handles rapid open/close operations', () => {
      act(() => {
        // Rapid sequence of operations
        contextRef.current!.openModal('A');
        contextRef.current!.openModal('B');
        contextRef.current!.closeModal('A');
        contextRef.current!.openModal('C');
        contextRef.current!.closeModal('B');
        contextRef.current!.openModal('D');
      });

      expect(contextRef.current!.stack).toEqual(['C', 'D']);
      expect(contextRef.current!.getModalEntry('C')!.isTop).toBe(false);
      expect(contextRef.current!.getModalEntry('D')!.isTop).toBe(true);
      expect(contextRef.current!.getModalEntry('A')!.open).toBe(false);
      expect(contextRef.current!.getModalEntry('B')!.open).toBe(false);
    });
  });

  describe('Integration with Test Component', () => {
    it('displays modal state in test component', () => {
      render(
        <ModalProvider>
          <TestModalComponent modalId="test-modal" />
        </ModalProvider>
      );

      // Wait for context to be ready
      expect(screen.getByTestId('modal-open').textContent).toBe('false');
      expect(screen.getByTestId('modal-is-top').textContent).toBe('false');
      expect(screen.getByTestId('modal-stack-index').textContent).toBe('-1');
      expect(screen.getByTestId('stack-length').textContent).toBe('0');
    });
  });
});