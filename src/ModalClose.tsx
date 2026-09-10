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
  const { requestClose } = useModalContext();
  
  // Get modal ID from context
  const modalId = useModalId();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call custom onClick first
    if (onClick) {
      onClick(e);
    }
    
    // If not prevented, ask the modal to close. A controlled modal gets
    // onOpenChange(false) and decides for itself; an uncontrolled one closes.
    if (!e.defaultPrevented) {
      requestClose(modalId);
    }
  };
  
  // With no children we render the × glyph, which is what the fixed 32px
  // icon look is for. A text label gets an ordinary button; a child of yours
  // (asChild) keeps its own look entirely — a Modal.Button in a footer must not
  // inherit the icon's size and be clipped to "ance" and "ublis".
  const isIcon = children === undefined || children === null || children === false || children === '';
  const closeClasses = ['modalClose', isIcon && 'modalClose--icon', className]
    .filter(Boolean)
    .join(' ');

  if (asChild) {
    // renderAsChild composes the child's own onClick with ours, and skips ours
    // if the child called preventDefault().
    return renderAsChild('Modal.Close', children, {
      onClick: handleClick,
      className,
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
      {isIcon ? '×' : children}
    </button>
  );
};

ModalClose.displayName = 'Modal.Close';