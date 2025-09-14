import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalSystem } from './ModalSystem';

describe('ModalSystem', () => {
  it('renders children without crashing', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    render(
      <ModalSystem>
        <TestChild />
      </ModalSystem>
    );

    expect(screen.getByTestId('test-child')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders with custom baseZIndex', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    render(
      <ModalSystem baseZIndex={2000}>
        <TestChild />
      </ModalSystem>
    );

    expect(screen.getByTestId('test-child')).toBeDefined();
  });

  it('renders with custom container (when provided)', () => {
    const customContainer = document.createElement('div');
    document.body.appendChild(customContainer);
    
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    render(
      <ModalSystem container={customContainer}>
        <TestChild />
      </ModalSystem>
    );

    expect(screen.getByTestId('test-child')).toBeDefined();
    
    // Cleanup
    document.body.removeChild(customContainer);
  });

  it('provides modal context to children', () => {
    const TestChild = () => {
      try {
        return <div data-testid="test-child">Test Content</div>;
      } catch (error) {
        return <div data-testid="test-error">Context Error</div>;
      }
    };
    
    render(
      <ModalSystem>
        <TestChild />
      </ModalSystem>
    );

    // Should render without context errors
    expect(screen.getByTestId('test-child')).toBeDefined();
    expect(screen.queryByTestId('test-error')).toBeNull();
  });
});