import React from 'react';
import { ModalBodyProps } from './types';
import { renderAsChild } from './asChild';

/**
 * Modal.Body component - provides main content area with overflow handling
 *
 * Key features:
 * - Handles overflow scrolling when content exceeds viewport height
 * - Provides consistent spacing and layout
 * - Supports asChild pattern for custom elements
 */
export const ModalBody: React.FC<ModalBodyProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const bodyClasses = ['modalBody', className].filter(Boolean).join(' ');

  if (asChild) {
    return renderAsChild('Modal.Body', children, { className: bodyClasses, ...rest });
  }

  return (
    <div className={bodyClasses} {...rest}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'Modal.Body';