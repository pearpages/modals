import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ModalTitle } from './ModalTitle';
import { ModalAriaProvider } from './ModalAriaContext';

// Test wrapper that provides aria context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalAriaProvider>
      {children}
    </ModalAriaProvider>
  );
};

describe('ModalTitle', () => {
  it('should render as h2 by default', () => {
    render(
      <TestWrapper>
        <ModalTitle>Modal Title</ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('modalTitle');
    expect(title).toHaveTextContent('Modal Title');
  });

  it('should generate unique ID when none provided', () => {
    render(
      <TestWrapper>
        <ModalTitle>Title 1</ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByRole('heading');
    expect(title).toHaveAttribute('id');
    expect(title.id).toMatch(/^modalTitle-/);
  });

  it('should use provided ID', () => {
    render(
      <TestWrapper>
        <ModalTitle id="custom-title">Custom Title</ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByRole('heading');
    expect(title).toHaveAttribute('id', 'custom-title');
  });

  it('should apply custom className', () => {
    render(
      <TestWrapper>
        <ModalTitle className="custom-title">Title</ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByRole('heading');
    expect(title).toHaveClass('modalTitle', 'custom-title');
  });

  it('should forward additional props', () => {
    render(
      <TestWrapper>
        <ModalTitle data-testid="title" aria-level={3}>
          Title
        </ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveAttribute('aria-level', '3');
  });

  it('should support asChild pattern', () => {
    render(
      <TestWrapper>
        <ModalTitle asChild>
          <h1 data-testid="custom-title">Custom Title Element</h1>
        </ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByTestId('custom-title');
    expect(title.tagName).toBe('H1');
    expect(title).toHaveClass('modalTitle');
    expect(title).toHaveAttribute('id');
    expect(title.id).toMatch(/^modalTitle-/);
  });

  it('should merge className when using asChild', () => {
    render(
      <TestWrapper>
        <ModalTitle asChild className="extra-class">
          <h3 className="original-class" data-testid="title">
            Title
          </h3>
        </ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveClass('original-class', 'modalTitle', 'extra-class');
  });

  it('should preserve custom ID when using asChild', () => {
    render(
      <TestWrapper>
        <ModalTitle asChild id="preserved-id">
          <h3 data-testid="title">Title</h3>
        </ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveAttribute('id', 'preserved-id');
  });

  it('should have correct displayName', () => {
    expect(ModalTitle.displayName).toBe('Modal.Title');
  });

  it('should register ID with aria context', () => {
    // This test verifies the integration with ModalAriaProvider
    // We'll test the actual aria linking in integration tests
    render(
      <TestWrapper>
        <ModalTitle>Test Title</ModalTitle>
      </TestWrapper>
    );

    const title = screen.getByRole('heading');
    expect(title).toHaveAttribute('id');
    // The actual registration with context is tested in integration tests
  });
});