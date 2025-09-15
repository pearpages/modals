import React, { useEffect, useCallback } from 'react';
import { ModalProps } from './types';
import { useModalContext } from './ModalProvider';

/**
 * Modal component that supports controlled state management.
 * 
 * Features:
 * - Controlled via `open` prop and `onOpenChange` callback
 * - Automatically registers/unregisters with ModalProvider
 * - Unmounts children when closed (modal content is not rendered when closed)
 * - Integrates with modal stack for proper z-index and focus management
 */
export const Modal: React.FC<ModalProps> = ({ 
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
    getModalEntry 
  } = modalContext;

  // Register modal on mount, unregister on unmount
  useEffect(() => {
    register(id);
    return () => {
      unregister(id);
    };
  }, [id, register, unregister]);

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
    
    // Only notify if provider state changed and it's not just syncing our controlled prop
    if (onOpenChange && isProviderOpen !== prevProviderOpen && open === undefined) {
      onOpenChange(isProviderOpen);
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
    <div className={className} data-modal-id={id}>
      {children}
    </div>
  );
};

Modal.displayName = 'Modal';
