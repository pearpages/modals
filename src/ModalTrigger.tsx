import React, { useCallback, KeyboardEvent, MouseEvent, isValidElement } from 'react';
import { ModalTriggerProps } from './types';
import { useModalContext } from './ModalProvider';
import { renderAsChild } from './asChild';

/**
 * Modal.Trigger component for declarative modal opening.
 * 
 * Features:
 * - Asks the target modal to open on click (a controlled target is only
 *   notified through its onOpenChange)
 * - Keyboard accessibility (Enter/Space)
 * - Respects disabled state
 * - Support for asChild pattern to compose with existing elements
 *
 * Props follow the same rule in both render paths: attributes belong to the
 * consumer, `on*` handlers compose — yours runs first, and calling
 * preventDefault() in it stops the modal from opening.
 */
export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  target,
  children,
  asChild = false,
  disabled = false,
  className,
  onClick,
  onKeyDown,
  ...props
}) => {
  const { requestOpen, isRegistered } = useModalContext();

  const handleOpenModal = useCallback(() => {
    if (disabled) return;
    
    // Warn if target modal is not registered
    if (!isRegistered(target)) {
      console.warn(`Modal.Trigger: target modal "${target}" is not registered. Make sure a Modal with id="${target}" exists.`);
      return;
    }
    
    requestOpen(target);
  }, [target, disabled, requestOpen, isRegistered]);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    handleOpenModal();
  }, [onClick, handleOpenModal]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    // Handle Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenModal();
    }
  }, [onKeyDown, handleOpenModal]);

  // asChild pattern: render the child in place of our button. renderAsChild
  // composes the child's own onClick/onKeyDown with ours and merges className.
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

  // Default rendering: a real button. The consumer's onClick/onKeyDown were
  // pulled out above and composed into the handlers, so the spread cannot
  // replace them; every other attribute is theirs to set.
  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      aria-haspopup="dialog"
      data-modal-trigger={target}
      {...props}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
};

ModalTrigger.displayName = 'Modal.Trigger';
