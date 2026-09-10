import React, { useId, useEffect } from 'react';
import { ModalTitleProps } from './types';
import { renderAsChild } from './asChild';
import { useModalAria } from './ModalAriaContext';

/**
 * Modal.Title component - provides accessibility labeling for modal
 */
export const ModalTitle: React.FC<ModalTitleProps> = ({
  asChild = false,
  className,
  id,
  children,
  ...rest
}) => {
  const autoId = useId();
  const titleId = id || `modalTitle-${autoId}`;
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
    return renderAsChild('Modal.Title', children, { id: titleId, className: titleClasses, ...rest });
  }

  return (
    <h2 id={titleId} className={titleClasses} {...rest}>
      {children}
    </h2>
  );
};

ModalTitle.displayName = 'Modal.Title';