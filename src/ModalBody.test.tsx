import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalBody } from './ModalBody';

describe('ModalBody', () => {
  it('should render children correctly', () => {
    render(
      <ModalBody>
        <p>Test content</p>
      </ModalBody>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply the modalBody class', () => {
    render(
      <ModalBody data-testid="modal-body">
        <p>Content</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toHaveClass('modalBody');
  });

  it('should apply custom className along with modalBody class', () => {
    render(
      <ModalBody className="custom-class" data-testid="modal-body">
        <p>Content</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toHaveClass('modalBody');
    expect(bodyElement).toHaveClass('custom-class');
  });

  it('should pass through additional props', () => {
    render(
      <ModalBody data-testid="modal-body" role="region" aria-label="Main content">
        <p>Content</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toHaveAttribute('role', 'region');
    expect(bodyElement).toHaveAttribute('aria-label', 'Main content');
  });

  it('should support asChild pattern', () => {
    render(
      <ModalBody asChild>
        <section data-testid="custom-element">Custom content</section>
      </ModalBody>
    );

    const element = screen.getByTestId('custom-element');
    expect(element.tagName).toBe('SECTION');
    expect(element).toHaveClass('modalBody');
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('should merge className when using asChild', () => {
    render(
      <ModalBody asChild className="custom-class">
        <div className="existing-class" data-testid="custom-element">
          Content
        </div>
      </ModalBody>
    );

    const element = screen.getByTestId('custom-element');
    expect(element).toHaveClass('existing-class');
    expect(element).toHaveClass('modalBody');
    expect(element).toHaveClass('custom-class');
  });

  it('should have correct display name', () => {
    expect(ModalBody.displayName).toBe('Modal.Body');
  });
});