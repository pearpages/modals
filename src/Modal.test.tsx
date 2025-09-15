import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';

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

  it('should maintain className when provided', () => {
    const { container } = render(
      <ModalProvider>
        <Modal id="test-modal" open={true} className="custom-class">
          <div data-testid="modal-content">Content</div>
        </Modal>
      </ModalProvider>
    );

    const modalElement = container.querySelector('[data-modal-id="test-modal"]');
    expect(modalElement?.className).toContain('custom-class');
  });

  it('should set correct data attribute', () => {
    const { container } = render(
      <ModalProvider>
        <Modal id="unique-id" open={true}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      </ModalProvider>
    );

    expect(container.querySelector('[data-modal-id="unique-id"]')).toBeTruthy();
  });

  it('should handle undefined open prop', () => {
    // When open is undefined, modal should be closed by default
    render(<TestModalWrapper />);
    
    expect(screen.queryByTestId('modal-content')).toBe(null);
  });
});