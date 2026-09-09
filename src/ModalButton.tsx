import React, { forwardRef } from 'react';
import { ModalButtonProps } from './types';
import { renderAsChild } from './asChild';

/**
 * Modal.Button component for consistent button styling in modal footers.
 *
 * Features:
 * - Semantic variants (primary, secondary, danger)
 * - Loading state with built-in spinner
 * - Disabled state handling
 * - Proper focus management and accessibility
 * - asChild pattern support for custom elements
 */
export const ModalButton = forwardRef<HTMLButtonElement, ModalButtonProps>(({
  variant = 'secondary',
  size = 'medium',
  loading = false,
  disabled = false,
  children,
  asChild = false,
  className,
  ...props
}, ref) => {
  const baseClasses = 'modalButton';
  const variantClass = `modalButton--${variant}`;
  const sizeClass = `modalButton--${size}`;
  const loadingClass = loading ? 'modalButton--loading' : '';
  const disabledClass = (disabled || loading) ? 'modalButton--disabled' : '';

  const combinedClassName = [
    baseClasses,
    variantClass,
    sizeClass,
    loadingClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;

  // asChild pattern: render the child in place of our button.
  if (asChild) {
    return renderAsChild('Modal.Button', children, {
      ...props,
      disabled: isDisabled,
      className: combinedClassName,
      'aria-disabled': isDisabled,
      'data-loading': loading,
    }, ref);
  }

  return (
    <button
      {...props}
      ref={ref}
      type={props.type || 'button'}
      disabled={isDisabled}
      className={combinedClassName}
      aria-disabled={isDisabled}
      data-loading={loading}
    >
      {loading && (
        <span className="modalButton__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="modalButton__spinnerIcon">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
            />
          </svg>
        </span>
      )}
      <span className={loading ? 'modalButton__content--loading' : 'modalButton__content'}>
        {children}
      </span>
    </button>
  );
});

ModalButton.displayName = 'Modal.Button';