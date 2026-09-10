import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContentProps } from './types';
import { useModalContext, useModalDismissConfig } from './ModalProvider';
import { useModalPortal } from './ModalRoot';
import { useModalId } from './ModalIdContext';
import { useModalAria } from './ModalAriaContext';
import { useFocusTrap } from './useFocusTrap';
import { renderAsChild } from './asChild';

/**
 * Modal.Content component that handles the modal dialog container.
 * 
 * Features:
 * - Portal rendering via ModalRoot
 * - Size variants: 'auto', 'md', 'full'
 * - Animation support with data-state attributes
 * - Backdrop and escape key handling
 * - Accessibility attributes (role, aria-modal, etc.)
 * - CSS module styling with BEM classes
 */
export const ModalContent: React.FC<ModalContentProps> = ({
  asChild = false,
  size = 'md',
  animated = true,
  className,
  closeOnBackdrop = true,
  closeOnEscape = true,
  onInteractOutside,
  style,
  children,
  ...rest
}) => {
  const modalContext = useModalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [dataState, setDataState] = useState<'opening' | 'open' | 'closing'>('opening');
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get the modal ID from context
  const modalId = useModalId();

  // Get aria IDs from aria context
  const { titleId, descriptionId } = useModalAria();

  const { getModalEntry, baseZIndex } = modalContext;
  const modalEntry = getModalEntry(modalId);
  const isModalOpen = modalEntry?.open ?? false;
  const isTopmost = modalEntry?.isTop ?? false;
  
  // Calculate z-index based on base + stack index
  const zIndex = modalEntry ? baseZIndex + modalEntry.stackIndex : baseZIndex;

  // Get portal container for this modal
  const portalContainer = useModalPortal(modalId);

  // Focus trap - only active when modal is open and topmost.
  // The portal container is discovered asynchronously, and until it exists this
  // component renders null, so contentRef is still empty. Gating on it as well
  // means the trap activates on the render that actually attaches the ref —
  // useFocusTrap only re-runs when this flag changes, not when the ref fills in.
  useFocusTrap(contentRef, isModalOpen && isTopmost && !!portalContainer);

  // Configure dismiss behavior
  useModalDismissConfig(modalId, {
    closeOnBackdrop,
    closeOnEscape,
    onInteractOutside
  });

  // Manage data-state lifecycle for CSS animations
  useEffect(() => {
    if (isModalOpen) {
      setIsOpen(true);
      if (animated) {
        // Start with opening state
        setDataState('opening');
        // Transition to open state after small delay (allows CSS to see the opening state)
        const timer = setTimeout(() => setDataState('open'), 10);
        return () => clearTimeout(timer);
      } else {
        setDataState('open');
      }
    } else {
      if (animated && isOpen) {
        // Start closing animation
        setDataState('closing');
        // Delay unmount to allow CSS exit animation to complete
        const timer = setTimeout(() => setIsOpen(false), 250);
        return () => clearTimeout(timer);
      } else {
        setIsOpen(false);
      }
    }
  }, [isModalOpen, animated, isOpen]);

  // Don't render if not open or no portal container
  if (!isOpen || !portalContainer) {
    return null;
  }

  // Generate CSS classes
  const contentClasses = [
    'modal',
    size && `modal--${size}`,
    animated && 'modal--animated',
    className
  ].filter(Boolean).join(' ');

  // No data state needed - CSS animation handles everything

  const dialogProps = {
    className: contentClasses,
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': titleId,
    'aria-describedby': descriptionId,
    'data-state': dataState,
    // The consumer's style is merged, not substituted: a themed modal that sets
    // CSS variables inline must not lose its z-index.
    style: {
      zIndex: zIndex,
      pointerEvents: 'auto' as const,
      ...style,
    },
    ...rest,
  };

  // renderAsChild merges contentRef with any ref already on the child, so the
  // focus trap keeps working without clobbering the consumer's own ref.
  const content = asChild ? (
    renderAsChild('Modal.Content', children, dialogProps, contentRef)
  ) : (
    <div ref={contentRef} {...dialogProps}>
      {children}
    </div>
  );

  // Render into the proper portal container for backdrop centering
  return ReactDOM.createPortal(content, portalContainer);
};

ModalContent.displayName = 'Modal.Content';