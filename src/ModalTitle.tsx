import React, { useId } from 'react';
import { ModalTitleProps } from './types';

/**
 * Modal.Title component - provides accessibility labeling for modal
 */
export const ModalTitle: React.FC<ModalTitleProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const autoId = useId();
  const titleId = rest.id || `modal-title-${autoId}`;
  
  const titleClasses = ['modal-title', className].filter(Boolean).join(' ');

  if (asChild) {
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      id: titleId,
      className: [child.props.className, titleClasses].filter(Boolean).join(' '),
      ...rest
    });
  }

  return (
    <h2 id={titleId} className={titleClasses} {...rest}>
      {children}
    </h2>
  );
};

ModalTitle.displayName = 'Modal.Title';