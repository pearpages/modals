import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { ModalRoot } from './ModalRoot';

// Simple test wrapper for testing modal behavior
const TestModalWrapper: React.FC<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}> = ({ open, onOpenChange, id = "test-modal" }) => {
  return (
    <ModalProvider>
      <Modal id={id} open={open} onOpenChange={onOpenChange}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    </ModalProvider>
  );
};

describe('Modal - Controlled Behavior', () => {
  it('should unmount children when closed', () => {
    render(<TestModalWrapper open={false} />);
    
    expect(screen.queryByTestId('modal-content')).toBe(null);
  });

  it('should mount children when open', () => {
    render(<TestModalWrapper open={true} />);
    
    expect(screen.getByTestId('modal-content')).toBeTruthy();
  });

  it('should handle controlled open prop changes', () => {
    const { rerender } = render(<TestModalWrapper open={false} />);
    
    // Initially closed
    expect(screen.queryByTestId('modal-content')).toBe(null);

    // Change to open
    rerender(<TestModalWrapper open={true} />);
    expect(screen.getByTestId('modal-content')).toBeTruthy();

    // Change back to closed
    rerender(<TestModalWrapper open={false} />);
    expect(screen.queryByTestId('modal-content')).toBe(null);
  });

  it('should not call onOpenChange in controlled mode', () => {
    const onOpenChangeSpy = vi.fn();
    
    render(<TestModalWrapper open={false} onOpenChange={onOpenChangeSpy} />);
    
    // Should not call onOpenChange when controlled
    expect(onOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('should register and unregister correctly', () => {
    const { unmount } = render(<TestModalWrapper open={false} />);
    
    // Should not throw when unmounting
    expect(() => unmount()).not.toThrow();
  });

  it('should handle rapid state changes', () => {
    const { rerender } = render(<TestModalWrapper open={false} />);

    // Rapid changes should work without issues
    rerender(<TestModalWrapper open={true} />);
    expect(screen.getByTestId('modal-content')).toBeTruthy();

    rerender(<TestModalWrapper open={false} />);
    expect(screen.queryByTestId('modal-content')).toBe(null);

    rerender(<TestModalWrapper open={true} />);
    expect(screen.getByTestId('modal-content')).toBeTruthy();
  });

  // Modal.Content portals away, so an open Modal must leave nothing where it
  // was written: an element there becomes a grid cell or flex item and the
  // page behind the dialog reflows.
  it('renders no element of its own where it is written', () => {
    render(
      <ModalProvider>
        <ModalRoot />
        <ul data-testid="parent">
          <li>first</li>
          <Modal id="in-flow" open={true}>
            <Modal.Content>Content</Modal.Content>
          </Modal>
          <li>second</li>
        </ul>
      </ModalProvider>
    );

    const parent = screen.getByTestId('parent');
    expect(Array.from(parent.children).map((el) => el.tagName)).toEqual(['LI', 'LI']);
  });

  it('puts data-modal-id on the dialog', () => {
    render(
      <ModalProvider>
        <ModalRoot />
        <Modal id="unique-id" open={true}>
          <Modal.Content>Content</Modal.Content>
        </Modal>
      </ModalProvider>
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('data-modal-id', 'unique-id');
  });

  it('should handle undefined open prop', () => {
    // When open is undefined, modal should be closed by default
    render(<TestModalWrapper />);
    
    expect(screen.queryByTestId('modal-content')).toBe(null);
  });

  it('Modal.Trigger asks a controlled modal to open instead of opening it', () => {
    const onOpenChange = vi.fn();
    render(
      <ModalProvider>
        <Modal.Trigger target="ctrl">open</Modal.Trigger>
        <Modal id="ctrl" open={false} onOpenChange={onOpenChange}>
          <div data-testid="modal-content">Modal Content</div>
        </Modal>
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('open'));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByTestId('modal-content')).toBe(null);
  });
});
