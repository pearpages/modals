import React, { useEffect, useCallback } from 'react';
import { ModalProps } from './types';
import { useModalContext } from './ModalProvider';
import { ModalIdProvider } from './ModalIdContext';
import { ModalTrigger } from './ModalTrigger';
import { ModalContent } from './ModalContent';
import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';
import { ModalDescription } from './ModalDescription';
import { ModalClose } from './ModalClose';
import { ModalFooter } from './ModalFooter';

// Type for compound component
interface ModalComponent extends React.FC<ModalProps> {
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Close: typeof ModalClose;
  Footer: typeof ModalFooter;
}

/**
 * Modal component that supports controlled state management.
 * 
 * Features:
 * - Controlled via `open` prop and `onOpenChange` callback
 * - Automatically registers/unregisters with ModalProvider
 * - Unmounts children when closed (modal content is not rendered when closed)
 * - Integrates with modal stack for proper z-index and focus management
 */
const Modal: ModalComponent = ({ 
  id, 
  open, 
  onOpenChange, 
  children, 
  className 
}) => {
  const modalContext = useModalContext();

  const { 
    register, 
    unregister, 
    openModal, 
    closeModal, 
    updateOnOpenChange,
    getModalEntry 
  } = modalContext;

  // Register modal on mount, unregister on unmount
  useEffect(() => {
    register(id);
    return () => {
      unregister(id);
    };
  }, [id, register, unregister]);

  // Update onOpenChange callback in registry
  useEffect(() => {
    updateOnOpenChange(id, onOpenChange);
  }, [id, onOpenChange, updateOnOpenChange]);

  // Get current modal state from provider
  const modalEntry = getModalEntry(id);
  const isProviderOpen = modalEntry?.open ?? false;

  // Sync controlled prop with provider state
  useEffect(() => {
    if (open !== undefined && open !== isProviderOpen) {
      if (open) {
        openModal(id);
      } else {
        closeModal(id);
      }
    }
  }, [open, isProviderOpen, id, openModal, closeModal]);

  // Notify parent of provider state changes (for uncontrolled usage or external changes)
  const prevProviderOpenRef = React.useRef(isProviderOpen);
  useEffect(() => {
    const prevProviderOpen = prevProviderOpenRef.current;
    prevProviderOpenRef.current = isProviderOpen;
    
    // Notify if provider state changed
    if (onOpenChange && isProviderOpen !== prevProviderOpen) {
      // In uncontrolled mode (open === undefined), always notify
      // In controlled mode, notify if the provider state differs from the controlled prop
      // This handles external changes like backdrop clicks or escape key
      if (open === undefined || isProviderOpen !== open) {
        onOpenChange(isProviderOpen);
      }
    }
  }, [isProviderOpen, onOpenChange, open]);

  // Handle controlled close via onOpenChange
  const handleClose = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      closeModal(id);
    }
  }, [onOpenChange, closeModal, id]);

  // Only render children when modal is open (unmount when closed)
  if (!isProviderOpen) {
    return null;
  }

  return (
    <ModalIdProvider modalId={id}>
      <div className={className} data-modal-id={id}>
        {children}
      </div>
    </ModalIdProvider>
  );
};

Modal.displayName = 'Modal';

// Compound component pattern
Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Close = ModalClose;
Modal.Footer = ModalFooter;

export { Modal };
