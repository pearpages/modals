import React from 'react';
import { ModalHeaderProps } from './types';
// import styles from './Modal.module.scss';

/**
 * Modal.Header component - provides layout for title and close button
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const headerClasses = ['modal-header', className].filter(Boolean).join(' ');

  if (asChild) {
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: [child.props.className, headerClasses].filter(Boolean).join(' '),
      ...rest
    });
  }

  return (
    <div className={headerClasses} {...rest}>
      {children}
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';