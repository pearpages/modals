import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContentProps } from './types';
import { useModalContext, useModalDismissConfig } from './ModalProvider';
import { useModalPortal } from './ModalRoot';
import { useModalId } from './ModalIdContext';
// import styles from './Modal.module.scss';

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

  const { getModalEntry, closeModal, baseZIndex } = modalContext;
  const modalEntry = getModalEntry(modalId);
  const isModalOpen = modalEntry?.open ?? false;
  const isTopmost = modalEntry?.isTop ?? false;
  
  // Calculate z-index based on base + stack index
  const zIndex = modalEntry ? baseZIndex + modalEntry.stackIndex : baseZIndex;

  // Get portal container for this modal
  const portalContainer = useModalPortal(modalId);

  // Configure dismiss behavior
  useModalDismissConfig(modalId, {
    closeOnBackdrop,
    closeOnEscape,
    onInteractOutside
  });

  // Handle mount/unmount animations
  useEffect(() => {
    if (isModalOpen && !isOpen) {
      setIsOpen(true);
      if (animated) {
        setIsAnimating(true);
        // Small delay to ensure DOM is ready for animation
        const timer = setTimeout(() => setIsAnimating(false), 10);
        return () => clearTimeout(timer);
      }
    } else if (!isModalOpen && isOpen) {
      if (animated) {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setIsOpen(false);
          setIsAnimating(false);
        }, 200); // Match CSS transition duration
        return () => clearTimeout(timer);
      } else {
        setIsOpen(false);
      }
    }
  }, [isModalOpen, isOpen, animated]);

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

  // Don't render if not open
  if (!isOpen || !portalContainer) {
    return null;
  }

  // Generate CSS classes - no backdrop classes needed since ModalRoot handles backdrop
  const contentClasses = [
    'modal',
    `modal--${size}`,
    animated && 'modal--animated',
    className
  ].filter(Boolean).join(' ');

  // Data state for CSS animations
  const dataState = isAnimating ? 'opening' : 'open';

  const content = (
    <div
      ref={contentRef}
      className={contentClasses}
      role="dialog"
      aria-modal="true"
      data-state={dataState}
      {...rest}
    >
      {children}
    </div>
  );

  // Render into portal
  return ReactDOM.createPortal(content, portalContainer);
};

ModalContent.displayName = 'Modal.Content';