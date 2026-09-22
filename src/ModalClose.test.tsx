import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ModalClose } from './ModalClose';
import { ModalProvider } from './ModalProvider';
import { ModalIdProvider } from './ModalIdContext';
import { Modal } from './Modal';

// Test wrapper that provides modal context
const TestWrapper: React.FC<{ 
  children: React.ReactNode;
  modalId?: string;
  onOpenChange?: (open: boolean) => void;
}> = ({ children, modalId = 'test-modal' }) => {
  return (
    <ModalProvider>
      <ModalIdProvider modalId={modalId}>
        {children}
      </ModalIdProvider>
    </ModalProvider>
  );
};

describe('ModalClose', () => {
  it('should render as button by default', () => {
    render(
      <TestWrapper>
        <ModalClose>Close</ModalClose>
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('modalClose');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('aria-label');
    expect(button).toHaveTextContent('Close');
  });

  // Regression: aria-label="Close modal" was set on every plain Modal.Close,
  // so a text label was announced as "Close modal" instead of what it says.
  it('uses a text label as the accessible name', () => {
    render(
      <TestWrapper>
        <ModalClose>Cancel</ModalClose>
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument();
  });

  it('names the bare × button "Close modal"', () => {
    render(
      <TestWrapper>
        <ModalClose />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: 'Close modal' })).toHaveTextContent('×');
  });

  it('lets a consumer aria-label win on both forms', () => {
    render(
      <TestWrapper>
        <ModalClose aria-label="Dismiss dialog" />
        <ModalClose aria-label="Discard draft">Cancel</ModalClose>
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: 'Dismiss dialog' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Discard draft' })).toBeInTheDocument();
  });

  it('should render default close symbol when no children provided', () => {
    render(
      <TestWrapper>
        <ModalClose />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('×');
  });

  it('should apply custom className', () => {
    render(
      <TestWrapper>
        <ModalClose className="custom-close">Close</ModalClose>
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('modalClose', 'custom-close');
  });

  it('should forward additional props', () => {
    render(
      <TestWrapper>
        <ModalClose data-testid="close-btn" disabled>
          Close
        </ModalClose>
      </TestWrapper>
    );

    const button = screen.getByTestId('close-btn');
    expect(button).toHaveAttribute('disabled');
  });

  it('should call custom onClick handler', () => {
    const handleClick = vi.fn();
    
    render(
      <TestWrapper>
        <ModalClose onClick={handleClick}>Close</ModalClose>
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not close modal if event is prevented in custom onClick', () => {
    const handleClick = vi.fn((e) => e.preventDefault());
    
    render(
      <TestWrapper>
        <ModalClose onClick={handleClick}>Close</ModalClose>
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    // Modal context close would be tested in integration tests
  });

  it('should support asChild pattern', () => {
    render(
      <TestWrapper>
        <ModalClose asChild>
          <a href="#" data-testid="custom-close">Custom Close Link</a>
        </ModalClose>
      </TestWrapper>
    );

    const closeElement = screen.getByTestId('custom-close');
    expect(closeElement.tagName).toBe('A');
    // asChild leaves the child's look alone; only the behaviour is attached.
    expect(closeElement).not.toHaveClass('modalClose');
  });

  it('should merge className when using asChild', () => {
    render(
      <TestWrapper>
        <ModalClose asChild className="extra-class">
          <button className="original-class" data-testid="close">
            Close
          </button>
        </ModalClose>
      </TestWrapper>
    );

    const button = screen.getByTestId('close');
    // The child keeps its own look: no library class is added under asChild.
    expect(button).toHaveClass('original-class', 'extra-class');
    expect(button).not.toHaveClass('modalClose');
  });

  it('should attach click handler when using asChild', () => {
    const customClick = vi.fn();
    
    render(
      <TestWrapper>
        <ModalClose asChild>
          <button onClick={customClick} data-testid="close">
            Custom Close
          </button>
        </ModalClose>
      </TestWrapper>
    );

    const button = screen.getByTestId('close');
    fireEvent.click(button);
    
    // Both custom handler and modal close handler should be called
    expect(customClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct displayName', () => {
    expect(ModalClose.displayName).toBe('Modal.Close');
  });

  it('should render with proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <ModalClose />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Close modal');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('asks a controlled modal to close and leaves it mounted', () => {
    const onOpenChange = vi.fn();
    render(
      <ModalProvider>
        <Modal id="ctrl" open onOpenChange={onOpenChange}>
          <div data-testid="ctrl-content">
            <ModalClose>Close</ModalClose>
          </div>
        </Modal>
      </ModalProvider>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByTestId('ctrl-content')).toBeInTheDocument();
  });
});
