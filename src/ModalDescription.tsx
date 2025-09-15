import React, { useId } from 'react';
import { ModalDescriptionProps } from './types';

/**
 * Modal.Description component - provides accessibility description for modal
 */
export const ModalDescription: React.FC<ModalDescriptionProps> = ({
  asChild = false,
  className,
  id,
  children,
  ...rest
}) => {
  const autoId = useId();
  const descriptionId = id || `modal-description-${autoId}`;
  
  const descriptionClasses = ['modal-description', className].filter(Boolean).join(' ');

  if (asChild) {
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      id: descriptionId,
      className: [child.props.className, descriptionClasses].filter(Boolean).join(' '),
      ...rest
    });
  }

  return (
    <p id={descriptionId} className={descriptionClasses} {...rest}>
      {children}
    </p>
  );
};

ModalDescription.displayName = 'Modal.Description';