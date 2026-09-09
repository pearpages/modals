import React, { useCallback, KeyboardEvent, MouseEvent, isValidElement } from 'react';
import { ModalTriggerProps } from './types';
import { useModalContext } from './ModalProvider';
import { renderAsChild } from './asChild';

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

  // asChild pattern: render the child in place of our button. renderAsChild
  // composes onClick/onKeyDown with the child's own and merges className.
  if (asChild) {
    // `disabled` is the one prop that merges rather than overrides: a child
    // that is already disabled stays disabled even if the trigger is not.
    const childDisabled = isValidElement(children)
      ? (children.props as { disabled?: boolean }).disabled
      : undefined;

    return renderAsChild('Modal.Trigger', children, {
      ...props,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      disabled: disabled || childDisabled,
      className,
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