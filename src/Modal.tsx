import React, { useEffect } from 'react';
import { ModalProps } from './types';
import { useModalContext } from './ModalProvider';
import { ModalIdProvider } from './ModalIdContext';
import { ModalAriaProvider } from './ModalAriaContext';
import { ModalTrigger } from './ModalTrigger';
import { ModalContent } from './ModalContent';
import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';
import { ModalDescription } from './ModalDescription';
import { ModalClose } from './ModalClose';
import { ModalFooter } from './ModalFooter';
import { ModalBody } from './ModalBody';
import { ModalButton } from './ModalButton';

// Type for compound component
interface ModalComponent extends React.FC<ModalProps> {
  Trigger: typeof ModalTrigger;
  Content: typeof ModalContent;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Close: typeof ModalClose;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Button: typeof ModalButton;
}

/**
 * Modal component that supports controlled state management.
 * 
 * Features:
 * - Uncontrolled by default; passing `open` makes it controlled, after which
 *   every library path (Trigger, useModalStack, Close, Escape, backdrop) only
 *   calls `onOpenChange` and the provider follows the prop
 * - Automatically registers/unregisters with ModalProvider
 * - Unmounts children when closed (modal content is not rendered when closed)
 * - Integrates with modal stack for proper z-index and focus management
 */
const Modal: ModalComponent = ({ 
  id, 
  open, 
  onOpenChange, 
  children, 
  className,
  ...rest
}) => {
  const modalContext = useModalContext();

  const { 
    register, 
    unregister, 
    openModal, 
    closeModal, 
    updateControl,
    getModalEntry 
  } = modalContext;

  // Register modal on mount, unregister on unmount
  useEffect(() => {
    register(id);
    return () => {
      unregister(id);
    };
  }, [id, register, unregister]);

  // A modal is controlled when it has an `open` prop. The provider needs to
  // know, because every open/close request on a controlled modal must go to
  // onOpenChange instead of touching provider state.
  const isControlled = open !== undefined;
  useEffect(() => {
    updateControl(id, isControlled, onOpenChange);
  }, [id, isControlled, onOpenChange, updateControl]);

  // Get current modal state from provider
  const modalEntry = getModalEntry(id);
  const isProviderOpen = modalEntry?.open ?? false;

  // Use refs to avoid dependency loops
  const isControlledRef = React.useRef(isControlled);
  const onOpenChangeRef = React.useRef(onOpenChange);

  // Update refs on each render
  isControlledRef.current = isControlled;
  onOpenChangeRef.current = onOpenChange;

  // Sync controlled prop with provider state (only when controlled prop changes)
  useEffect(() => {
    if (open !== undefined && open !== isProviderOpen) {
      if (open) {
        openModal(id);
      } else {
        closeModal(id);
      }
    }
    // Deliberately depends on the controlled prop only. Including
    // isProviderOpen (or the provider actions, which are recreated per render)
    // makes this effect respond to its own writes and loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, id]);

  // Notify an uncontrolled modal's onOpenChange of provider state changes. A
  // controlled modal never needs this: provider state only ever follows its
  // `open` prop, so the parent already knows.
  const prevProviderOpenRef = React.useRef(isProviderOpen);
  useEffect(() => {
    const prevProviderOpen = prevProviderOpenRef.current;
    prevProviderOpenRef.current = isProviderOpen;

    if (isProviderOpen !== prevProviderOpen && !isControlledRef.current) {
      onOpenChangeRef.current?.(isProviderOpen);
    }
  }, [isProviderOpen]); // Only depend on isProviderOpen

  // Only render children when modal is open (unmount when closed)
  if (!isProviderOpen) {
    return null;
  }
  return (
    <ModalIdProvider modalId={id}>
      <ModalAriaProvider>
        <div className={className} data-modal-id={id} {...rest}>
          {children}
        </div>
      </ModalAriaProvider>
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
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Button = ModalButton;

export { Modal };
