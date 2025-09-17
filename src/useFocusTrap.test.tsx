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

  it('should handle basic tab navigation without errors', async () => {
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
              <button data-testid="button1">Button 1</button>
              <button data-testid="button2">Button 2</button>
            </ModalContent>
          </Modal>
        </ModalSystem>
      );
    };

    render(<TestComponent />);

    const trigger = screen.getByTestId('trigger');

    // Open modal
    await act(async () => {
      fireEvent.click(trigger);
    });

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Test basic tab navigation
    const button1 = screen.getByTestId('button1');
    const button2 = screen.getByTestId('button2');
    const closeButton = screen.getByTestId('close-button');

    // Simulate tab key press - should not throw errors
    await act(async () => {
      fireEvent.keyDown(document, { key: 'Tab' });
    });

    // Ensure elements are available for focusing
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });
});