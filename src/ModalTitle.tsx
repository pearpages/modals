import React, { useId, useEffect } from 'react';
import { ModalTitleProps } from './types';
import { useModalAria } from './ModalAriaContext';

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
  const titleId = rest.id || `modalTitle-${autoId}`;
  const { registerTitleId, unregisterTitleId } = useModalAria();
  
  const titleClasses = ['modalTitle', className].filter(Boolean).join(' ');

  // Register/unregister title ID with aria context
  useEffect(() => {
    registerTitleId(titleId);
    return () => {
      unregisterTitleId(titleId);
    };
  }, [titleId, registerTitleId, unregisterTitleId]);

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