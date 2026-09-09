import React from 'react';
import { ModalFooterProps } from './types';
import { renderAsChild } from './asChild';

/**
 * Modal.Footer component - provides layout for action buttons
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const footerClasses = ['modalFooter', className].filter(Boolean).join(' ');

  if (asChild) {
    return renderAsChild('Modal.Footer', children, { className: footerClasses, ...rest });
  }

  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  );
};

ModalFooter.displayName = 'Modal.Footer';