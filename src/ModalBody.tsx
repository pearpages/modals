import React from 'react';
import { ModalBodyProps } from './types';

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
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: [child.props.className, bodyClasses].filter(Boolean).join(' '),
      ...rest
    });
  }

  return (
    <div className={bodyClasses} {...rest}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'Modal.Body';