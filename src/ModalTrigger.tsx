import React, { useCallback, KeyboardEvent, MouseEvent, cloneElement, isValidElement } from 'react';
import { ModalTriggerProps } from './types';
import { useModalContext } from './ModalProvider';

/**
 * Modal.Trigger component for declarative modal opening.
 * 
 * Features:
 * - Opens target modal on click
 * - Keyboard accessibility (Enter/Space)
 * - Respects disabled state
 * - Support for asChild pattern to compose with existing elements
 * - Stores reference for focus return on modal close
 */
export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  target,
  children,
  asChild = false,
  disabled = false,
  className,
  ...props
}) => {
  const { openModal, isRegistered } = useModalContext();

  const handleOpenModal = useCallback(() => {
    if (disabled) return;
    
    // Warn if target modal is not registered
    if (!isRegistered(target)) {
      console.warn(`Modal.Trigger: target modal "${target}" is not registered. Make sure a Modal with id="${target}" exists.`);
      return;
    }
    
    openModal(target);
  }, [target, disabled, openModal, isRegistered]);

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    handleOpenModal();
  }, [handleOpenModal]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Handle Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenModal();
    }
  }, [handleOpenModal]);

  // asChild pattern: clone the child element and add our props
  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('Modal.Trigger: asChild requires a single valid React element as children');
    }

    const childProps = children.props as any;
    
    return cloneElement(children as React.ReactElement<any>, {
      ...props,
      onClick: (event: MouseEvent) => {
        // Call original onClick if it exists
        if (childProps.onClick) {
          childProps.onClick(event);
        }
        // Don't trigger modal if event was prevented
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      },
      onKeyDown: (event: KeyboardEvent) => {
        // Call original onKeyDown if it exists
        if (childProps.onKeyDown) {
          childProps.onKeyDown(event);
        }
        // Don't trigger modal if event was prevented
        if (!event.defaultPrevented) {
          handleKeyDown(event);
        }
      },
      disabled: disabled || childProps.disabled,
      className: className ? `${childProps.className || ''} ${className}`.trim() : childProps.className,
      'aria-haspopup': 'dialog',
      'data-modal-trigger': target,
    });
  }

  // Default rendering: create a button element
  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      data-modal-trigger={target}
      {...props}
    >
      {children}
    </button>
  );
};

ModalTrigger.displayName = 'Modal.Trigger';