import React, { useId, useEffect } from 'react';
import { ModalDescriptionProps } from './types';
import { renderAsChild } from './asChild';
import { useModalAria } from './ModalAriaContext';

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
  const descriptionId = id || `modalDescription-${autoId}`;
  const { registerDescriptionId, unregisterDescriptionId } = useModalAria();
  
  const descriptionClasses = ['modalDescription', className].filter(Boolean).join(' ');

  // Register/unregister description ID with aria context
  useEffect(() => {
    registerDescriptionId(descriptionId);
    return () => {
      unregisterDescriptionId(descriptionId);
    };
  }, [descriptionId, registerDescriptionId, unregisterDescriptionId]);

  if (asChild) {
    return renderAsChild('Modal.Description', children, { id: descriptionId, className: descriptionClasses, ...rest });
  }

  return (
    <p id={descriptionId} className={descriptionClasses} {...rest}>
      {children}
    </p>
  );
};

ModalDescription.displayName = 'Modal.Description';