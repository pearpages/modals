// Import styles to ensure they're bundled
import './modal.scss';

export * from './types';
export { ModalSystem } from './ModalSystem';
export { ModalProvider, useModalContext, useModalDismissConfig } from './ModalProvider';
export { ModalRoot, useModalPortal } from './ModalRoot';
export { Modal } from './Modal';
export { ModalTrigger } from './ModalTrigger';
export { ModalContent } from './ModalContent';
export { ModalHeader } from './ModalHeader';
export { ModalTitle } from './ModalTitle';
export { ModalDescription } from './ModalDescription';
export { ModalClose } from './ModalClose';
export { ModalFooter } from './ModalFooter';
export { useModalId } from './ModalIdContext';
export { ModalAriaProvider, useModalAria } from './ModalAriaContext';
export { useFocusTrap, useFocusRestore } from './useFocusTrap';
export { Example } from './Example';
