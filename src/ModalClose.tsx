import React from 'react';
import { ModalCloseProps } from './types';
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
  
  const closeClasses = ['modal-close', className].filter(Boolean).join(' ');

  if (asChild) {
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    const originalOnClick = child.props.onClick;
    
    const composedOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Call the original onClick first if it exists
      if (originalOnClick) {
        originalOnClick(e);
      }
      
      // If not prevented, call our handler
      if (!e.defaultPrevented) {
        handleClick(e);
      }
    };
    
    return React.cloneElement(child, {
      onClick: composedOnClick,
      className: [child.props.className, closeClasses].filter(Boolean).join(' '),
      ...rest
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