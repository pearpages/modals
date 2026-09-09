import React from 'react';
import { ModalCloseProps } from './types';
import { renderAsChild } from './asChild';
import { useModalContext } from './ModalProvider';
import { useModalId } from './ModalIdContext';

/**
 * Modal.Close component - triggers modal close
 */
export const ModalClose: React.FC<ModalCloseProps> = ({
  asChild = false,
  className,
  children,
  onClick,
  ...rest
}) => {
  const modalContext = useModalContext();
  const { closeModal, getModalEntry } = modalContext;
  
  // Get modal ID from context
  const modalId = useModalId();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call custom onClick first
    if (onClick) {
      onClick(e);
    }
    
    // If not prevented, close the modal
    if (!e.defaultPrevented) {
      const modalEntry = getModalEntry(modalId);
      
      // Use onOpenChange if available (controlled mode), otherwise closeModal
      if (modalEntry?.onOpenChange) {
        modalEntry.onOpenChange(false);
      } else {
        closeModal(modalId);
      }
    }
  };
  
  const closeClasses = ['modalClose', className].filter(Boolean).join(' ');

  if (asChild) {
    // renderAsChild composes the child's own onClick with ours, and skips ours
    // if the child called preventDefault().
    return renderAsChild('Modal.Close', children, {
      onClick: handleClick,
      className: closeClasses,
      ...rest,
    });
  }

  return (
    <button 
      type="button"
      className={closeClasses}
      onClick={handleClick}
      aria-label="Close modal"
      {...rest}
    >
      {children || '×'}
    </button>
  );
};

ModalClose.displayName = 'Modal.Close';