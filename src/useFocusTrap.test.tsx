import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalSystem } from './ModalSystem';
import { Modal } from './Modal';
import { ModalContent } from './ModalContent';
import { ModalTitle } from './ModalTitle';
import { ModalHeader } from './ModalHeader';
import { ModalClose } from './ModalClose';

describe('Focus Management', () => {
  it('should render modal with focus management', async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <ModalSystem>
          <button data-testid="trigger" onClick={() => setIsOpen(true)}>
            Open Modal
          </button>
          
          <Modal id="test-modal" open={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Test Modal</ModalTitle>
                <ModalClose data-testid="close-button" />
              </ModalHeader>
              <button data-testid="inside-button">Inside Button</button>
            </ModalContent>
          </Modal>
        </ModalSystem>
      );
    };

    render(<TestComponent />);

    const trigger = screen.getByTestId('trigger');

    // Modal should not be open initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open modal
    await act(async () => {
      fireEvent.click(trigger);
    });

    // Modal should be open
    await waitFor(
      () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Modal should have proper accessibility attributes
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('role', 'dialog');
  });

  it('moves focus into the modal when it opens', async () => {
    // Regression: useFocusTrap only re-runs when its isActive flag changes, and
    // ModalContent rendered null until useModalPortal found the portal, so on
    // the render where the modal "opened" the container ref was still empty and
    // the trap silently did nothing — no autofocus and no Tab containment.
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <ModalSystem>
          <button data-testid="trigger" onClick={() => setIsOpen(true)}>
            Open Modal
          </button>

          <Modal id="focus-modal" open={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Test Modal</ModalTitle>
                <ModalClose data-testid="close-button" />
              </ModalHeader>
              <button data-testid="button1">Button 1</button>
              <button data-testid="button2">Button 2</button>
            </ModalContent>
          </Modal>
        </ModalSystem>
      );
    };

    render(<TestComponent />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('trigger'));
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);
    });
  });

  it('wraps focus from the last focusable element back to the first', async () => {
    const TestComponent = () => (
      <ModalSystem>
        <Modal id="wrap-modal" open>
          <ModalContent>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </ModalContent>
        </Modal>
      </ModalSystem>
    );

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const last = screen.getByTestId('last');
    await act(async () => {
      last.focus();
      fireEvent.keyDown(document, { key: 'Tab' });
    });

    expect(document.activeElement).toBe(screen.getByTestId('first'));
  });

  it('wraps focus backwards from the first element to the last', async () => {
    const TestComponent = () => (
      <ModalSystem>
        <Modal id="wrap-back-modal" open>
          <ModalContent>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </ModalContent>
        </Modal>
      </ModalSystem>
    );

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const first = screen.getByTestId('first');
    await act(async () => {
      first.focus();
      fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    });

    expect(document.activeElement).toBe(screen.getByTestId('last'));
  });
});
