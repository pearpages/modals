// Build input, not a runtime side effect: this import is what pulls the SCSS
// into the tsup graph so esbuild extracts it to dist/index.css. The bundled
// dist/index.js carries no reference to the stylesheet, so consumers must
// import '@pearpages/modals/styles.css' themselves.
import './styles/index.scss';

export * from './types';
export { ModalSystem } from './ModalSystem';
export { ModalProvider, useModalContext, useModalDismissConfig, useModalStack } from './ModalProvider';
export { ModalRoot, useModalPortal } from './ModalRoot';
export { Modal } from './Modal';
export { ModalTrigger } from './ModalTrigger';
export { ModalContent } from './ModalContent';
export { ModalHeader } from './ModalHeader';
export { ModalTitle } from './ModalTitle';
export { ModalDescription } from './ModalDescription';
export { ModalClose } from './ModalClose';
export { ModalBody } from './ModalBody';
export { ModalFooter } from './ModalFooter';
export { ModalButton } from './ModalButton';
export { useModalId } from './ModalIdContext';
export type { ModalIdContextValue } from './ModalIdContext';
export { useModalAria } from './ModalAriaContext';
export type { ModalAriaContextValue } from './ModalAriaContext';
export { useFocusTrap } from './useFocusTrap';
export { useBodyScrollLock } from './useBodyScrollLock';
