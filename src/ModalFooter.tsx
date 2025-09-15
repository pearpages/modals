import React from 'react';
import { ModalFooterProps } from './types';

/**
 * Modal.Footer component - provides layout for action buttons
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const footerClasses = ['modal-footer', className].filter(Boolean).join(' ');

  if (asChild) {
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: [child.props.className, footerClasses].filter(Boolean).join(' '),
      ...rest
    });
  }

  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  );
};

ModalFooter.displayName = 'Modal.Footer';