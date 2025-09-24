import React from 'react';
import { Modal } from '@/Modal';

const ScrollLockTestModal = () => {
  return (
    <Modal id="scroll-lock-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>🔒 Scroll Lock Active</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <div className="scroll-lock-modal__content">
          <p className="scroll-lock-modal__main-text">
            <strong>Background scroll is now locked!</strong>
          </p>
          <p className="scroll-lock-modal__description">
            Try scrolling the page behind this modal - it should be prevented.
            This demonstrates the body scroll lock functionality.
          </p>

          <div className="scroll-lock-modal__technical-details">
            <h6 className="scroll-lock-modal__technical-title">🛠 Technical Details:</h6>
            <ul className="scroll-lock-modal__technical-list">
              <li>Desktop: Uses <code>overflow: hidden</code> on body</li>
              <li>iOS: Uses <code>position: fixed</code> approach</li>
              <li>Scrollbar width compensation prevents layout shifts</li>
              <li>Scroll position restored when modal closes</li>
            </ul>
          </div>

          <p className="scroll-lock-modal__closing-note">
            Close this modal with the X button, Escape key, or by clicking the backdrop
            to restore scrolling.
          </p>
        </div>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
ScrollLockTestModal.Trigger = ({ children, ...props }: { children: React.ReactNode } & React.ComponentProps<'div'>) => {
  return (
    <Modal.Trigger target="scroll-lock-modal" {...props}>
      {children}
    </Modal.Trigger>
  );
};

export default ScrollLockTestModal;