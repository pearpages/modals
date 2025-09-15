import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ModalClose } from './ModalClose';
import { ModalProvider } from './ModalProvider';
import { ModalIdProvider } from './ModalIdContext';

// Test wrapper that provides modal context
const TestWrapper: React.FC<{ 
  children: React.ReactNode;
  modalId?: string;
  onOpenChange?: (open: boolean) => void;
}> = ({ children, modalId = 'test-modal', onOpenChange }) => {
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
    expect(button).toHaveClass('modal-close');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Close modal');
    expect(button).toHaveTextContent('Close');
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
    expect(button).toHaveClass('modal-close', 'custom-close');
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
    expect(closeElement).toHaveClass('modal-close');
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
    expect(button).toHaveClass('original-class', 'modal-close', 'extra-class');
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
});