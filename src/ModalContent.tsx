import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContentProps } from './types';
import { useModalContext, useModalDismissConfig } from './ModalProvider';
import { useModalPortal } from './ModalRoot';
import { useModalId } from './ModalIdContext';
import { useModalAria } from './ModalAriaContext';
import { useFocusTrap } from './useFocusTrap';
import styles from './Modal.module.scss';

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
  size = 'md',
  animated = true,
  className,
  closeOnBackdrop = true,
  closeOnEscape = true,
  onInteractOutside,
  children,
  ...rest
}) => {
  const modalContext = useModalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get the modal ID from context
  const modalId = useModalId();

  // Get aria IDs from aria context
  const { titleId, descriptionId } = useModalAria();

  const { getModalEntry, closeModal, baseZIndex } = modalContext;
  const modalEntry = getModalEntry(modalId);
  const isModalOpen = modalEntry?.open ?? false;
  const isTopmost = modalEntry?.isTop ?? false;
  
  // Calculate z-index based on base + stack index
  const zIndex = modalEntry ? baseZIndex + modalEntry.stackIndex : baseZIndex;

  // Focus trap - only active when modal is open and topmost
  useFocusTrap(contentRef, isModalOpen && isTopmost);

  // Get portal container for this modal
  const portalContainer = useModalPortal(modalId);

  // Configure dismiss behavior
  useModalDismissConfig(modalId, {
    closeOnBackdrop,
    closeOnEscape,
    onInteractOutside
  });

  // Simple mount/unmount logic - CSS handles animation
  useEffect(() => {
    if (isModalOpen) {
      setIsOpen(true);
    } else {
      if (animated) {
        // Delay unmount to allow exit animation
        const timer = setTimeout(() => setIsOpen(false), 250);
        return () => clearTimeout(timer);
      } else {
        setIsOpen(false);
      }
    }
  }, [isModalOpen, animated]);

  // Handle backdrop clicks
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop && isTopmost) {
      if (onInteractOutside) {
        const event = {
          target: e.target as EventTarget,
          preventDefault: () => e.preventDefault()
        };
        onInteractOutside(event);
        if (e.defaultPrevented) return;
      }
      closeModal(modalId);
    }
  };

  // Don't render if not open or no portal container
  if (!isOpen || !portalContainer) {
    return null;
  }

  // Generate CSS classes
  const contentClasses = [
    styles.modal,
    size && styles[`modal--${size}`],
    animated && styles['modal--animated'],
    className
  ].filter(Boolean).join(' ');

  // No data state needed - CSS animation handles everything

  const content = (
    <div
      ref={contentRef}
      className={contentClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      style={{
        zIndex: zIndex,
        pointerEvents: 'auto'
      }}
      {...rest}
    >
      {children}
    </div>
  );

  // Render into the proper portal container for backdrop centering
  return ReactDOM.createPortal(content, portalContainer);
};

ModalContent.displayName = 'Modal.Content';