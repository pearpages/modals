import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ModalDescription } from './ModalDescription';
import styles from './Modal.module.scss';import { ModalAriaProvider } from './ModalAriaContext';

// Test wrapper that provides aria context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalAriaProvider>
      {children}
    </ModalAriaProvider>
  );
};

describe('ModalDescription', () => {
  it('should render as p by default', () => {
    render(
      <TestWrapper>
        <ModalDescription>Modal description text</ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByText('Modal description text');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass(styles.modalDescription);
  });

  it('should generate unique ID when none provided', () => {
    render(
      <TestWrapper>
        <ModalDescription>Description 1</ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByText('Description 1');
    expect(description).toHaveAttribute('id');
    expect(description.id).toMatch(/^modalDescription-/);
  });

  it('should use provided ID', () => {
    render(
      <TestWrapper>
        <ModalDescription id="custom-desc">Custom Description</ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByText('Custom Description');
    expect(description).toHaveAttribute('id', 'custom-desc');
  });

  it('should apply custom className', () => {
    render(
      <TestWrapper>
        <ModalDescription className="custom-desc">Description</ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByText('Description');
    expect(description).toHaveClass(styles.modalDescription, 'custom-desc');
  });

  it('should forward additional props', () => {
    render(
      <TestWrapper>
        <ModalDescription data-testid="description" aria-live="polite">
          Description
        </ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByTestId('description');
    expect(description).toHaveAttribute('aria-live', 'polite');
  });

  it('should support asChild pattern', () => {
    render(
      <TestWrapper>
        <ModalDescription asChild>
          <div data-testid="custom-desc">Custom Description Element</div>
        </ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByTestId('custom-desc');
    expect(description.tagName).toBe('DIV');
    expect(description).toHaveClass(styles.modalDescription);
    expect(description).toHaveAttribute('id');
    expect(description.id).toMatch(/^modalDescription-/);
  });

  it('should merge className when using asChild', () => {
    render(
      <TestWrapper>
        <ModalDescription asChild className="extra-class">
          <span className="original-class" data-testid="description">
            Description
          </span>
        </ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByTestId('description');
    expect(description).toHaveClass('original-class', styles.modalDescription, 'extra-class');
  });

  it('should preserve custom ID when using asChild', () => {
    render(
      <TestWrapper>
        <ModalDescription asChild id="preserved-desc-id">
          <div data-testid="description">Description</div>
        </ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByTestId('description');
    expect(description).toHaveAttribute('id', 'preserved-desc-id');
  });

  it('should handle id prop correctly when asChild is false', () => {
    render(
      <TestWrapper>
        <ModalDescription id="explicit-id">Description with explicit ID</ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByText('Description with explicit ID');
    expect(description).toHaveAttribute('id', 'explicit-id');
  });

  it('should have correct displayName', () => {
    expect(ModalDescription.displayName).toBe('Modal.Description');
  });

  it('should register ID with aria context', () => {
    // This test verifies the integration with ModalAriaProvider
    // We'll test the actual aria linking in integration tests
    render(
      <TestWrapper>
        <ModalDescription>Test Description</ModalDescription>
      </TestWrapper>
    );

    const description = screen.getByText('Test Description');
    expect(description).toHaveAttribute('id');
    // The actual registration with context is tested in integration tests
  });
});