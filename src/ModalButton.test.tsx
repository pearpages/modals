import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ModalButton } from './ModalButton';

describe('ModalButton', () => {
  describe('rendering', () => {
    it('renders a button with the base class', () => {
      render(<ModalButton>Save</ModalButton>);

      const button = screen.getByRole('button', { name: 'Save' });
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('modalButton');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('defaults to the secondary variant at medium size', () => {
      render(<ModalButton>Save</ModalButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('modalButton--secondary', 'modalButton--medium');
    });

    it.each(['primary', 'secondary', 'danger', 'success', 'warning'] as const)(
      'applies the %s variant class',
      (variant) => {
        render(<ModalButton variant={variant}>Save</ModalButton>);
        expect(screen.getByRole('button')).toHaveClass(`modalButton--${variant}`);
      }
    );

    it.each(['small', 'medium', 'large'] as const)('applies the %s size class', (size) => {
      render(<ModalButton size={size}>Save</ModalButton>);
      expect(screen.getByRole('button')).toHaveClass(`modalButton--${size}`);
    });

    it('merges a custom className', () => {
      render(<ModalButton className="custom">Save</ModalButton>);
      expect(screen.getByRole('button')).toHaveClass('modalButton', 'custom');
    });

    it('forwards arbitrary button props', () => {
      render(
        <ModalButton type="submit" data-testid="submit">
          Save
        </ModalButton>
      );

      const button = screen.getByTestId('submit');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('has the expected displayName', () => {
      expect(ModalButton.displayName).toBe('Modal.Button');
    });
  });

  describe('disabled and loading', () => {
    it('disables the button when disabled is set', () => {
      render(<ModalButton disabled>Save</ModalButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveClass('modalButton--disabled');
    });

    it('disables the button while loading', () => {
      render(<ModalButton loading>Save</ModalButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('modalButton--loading');
      expect(button).toHaveAttribute('data-loading', 'true');
    });

    it('renders a spinner while loading, hidden from assistive tech', () => {
      const { container } = render(<ModalButton loading>Save</ModalButton>);

      const spinner = container.querySelector('.modalButton__spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not fire onClick while loading', () => {
      const onClick = vi.fn();
      render(
        <ModalButton loading onClick={onClick}>
          Save
        </ModalButton>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('fires onClick when enabled', () => {
      const onClick = vi.fn();
      render(<ModalButton onClick={onClick}>Save</ModalButton>);

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref forwarding', () => {
    it('forwards a ref to the underlying button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<ModalButton ref={ref}>Save</ModalButton>);

      expect(ref.current).toBe(screen.getByRole('button'));
    });

    it('forwards a ref through asChild without clobbering the child ref', () => {
      const ours = React.createRef<HTMLButtonElement>();
      const theirs = React.createRef<HTMLButtonElement>();

      render(
        <ModalButton ref={ours} asChild>
          <button ref={theirs} data-testid="child">
            Save
          </button>
        </ModalButton>
      );

      const child = screen.getByTestId('child');
      expect(ours.current).toBe(child);
      expect(theirs.current).toBe(child);
    });
  });

  describe('asChild', () => {
    it('renders the child instead of its own button', () => {
      render(
        <ModalButton asChild>
          <a href="/somewhere" data-testid="link">
            Go
          </a>
        </ModalButton>
      );

      const link = screen.getByTestId('link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveClass('modalButton');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('merges classNames, child first', () => {
      render(
        <ModalButton asChild className="from-prop" variant="danger">
          <a href="/x" className="from-child" data-testid="link">
            Go
          </a>
        </ModalButton>
      );

      expect(screen.getByTestId('link')).toHaveClass(
        'from-child',
        'modalButton',
        'modalButton--danger',
        'from-prop'
      );
    });

    it('composes the child onClick rather than replacing it', () => {
      const childClick = vi.fn();
      const ourClick = vi.fn();

      render(
        <ModalButton asChild onClick={ourClick}>
          <button onClick={childClick} data-testid="child">
            Save
          </button>
        </ModalButton>
      );

      fireEvent.click(screen.getByTestId('child'));
      expect(childClick).toHaveBeenCalledTimes(1);
      expect(ourClick).toHaveBeenCalledTimes(1);
    });

    it('skips our handler when the child prevents the event', () => {
      const ourClick = vi.fn();

      render(
        <ModalButton asChild onClick={ourClick}>
          <button onClick={(e) => e.preventDefault()} data-testid="child">
            Save
          </button>
        </ModalButton>
      );

      fireEvent.click(screen.getByTestId('child'));
      expect(ourClick).not.toHaveBeenCalled();
    });

    it('throws a named error when children is not a single element', () => {
      expect(() => {
        render(<ModalButton asChild>{'just text'}</ModalButton>);
      }).toThrow('Modal.Button: asChild requires a single valid React element as children');
    });
  });
});
