import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ModalFooter } from './ModalFooter';
describe('ModalFooter', () => {
  it('should render with default div element', () => {
    render(
      <ModalFooter>
        <button>Cancel</button>
        <button>Confirm</button>
      </ModalFooter>
    );

    const footer = screen.getByText('Cancel').parentElement;
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('modalFooter');
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <ModalFooter className="custom-footer">
        <span>Content</span>
      </ModalFooter>
    );

    const footer = screen.getByText('Content').parentElement;
    expect(footer).toHaveClass('modalFooter', 'custom-footer');
  });

  it('should forward additional props', () => {
    render(
      <ModalFooter data-testid="footer" role="contentinfo">
        <span>Content</span>
      </ModalFooter>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });

  it('should support asChild pattern', () => {
    render(
      <ModalFooter asChild>
        <section data-testid="custom-footer">
          <button>Action</button>
        </section>
      </ModalFooter>
    );

    const footer = screen.getByTestId('custom-footer');
    expect(footer.tagName).toBe('SECTION');
    expect(footer).toHaveClass('modalFooter');
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should merge className when using asChild', () => {
    render(
      <ModalFooter asChild className="extra-class">
        <div className="original-class" data-testid="footer">
          Content
        </div>
      </ModalFooter>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('original-class', 'modalFooter', 'extra-class');
  });

  it('should handle multiple action buttons', () => {
    render(
      <ModalFooter>
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
        <button type="button">Delete</button>
      </ModalFooter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Cancel');
    expect(buttons[1]).toHaveTextContent('Save');
    expect(buttons[2]).toHaveTextContent('Delete');
  });

  it('should have correct displayName', () => {
    expect(ModalFooter.displayName).toBe('Modal.Footer');
  });

  it('should render complex footer content', () => {
    render(
      <ModalFooter>
        <div data-testid="left-actions">
          <button>Help</button>
        </div>
        <div data-testid="right-actions">
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </ModalFooter>
    );

    expect(screen.getByTestId('left-actions')).toBeInTheDocument();
    expect(screen.getByTestId('right-actions')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});