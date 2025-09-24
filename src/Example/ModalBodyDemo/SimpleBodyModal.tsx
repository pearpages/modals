import React from 'react';
import { Modal } from '@/Modal';

const SimpleBodyModal = () => {
  return (
    <Modal id="simple-body-modal">
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>📄 Simple Modal.Body</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p>
            This content is inside a <code>Modal.Body</code> component,
            providing semantic structure and consistent styling.
          </p>
          <p>
            Notice how the content has proper spacing and is clearly separated
            from the header and footer areas.
          </p>
          <div className="simple-modal__code-example">
            <div className="simple-modal__code-title"><strong>Code structure:</strong></div>
            <pre className="simple-modal__code-block">
{`<Modal.Content>
  <Modal.Header>...</Modal.Header>
  <Modal.Body>
    <p>Content goes here</p>
  </Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal.Content>`}
            </pre>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="simple-modal__footer-button">
            Got it!
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
SimpleBodyModal.Trigger = ({ children, onClick, ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<'div'>) => {
  const handleClick = () => {
    console.log('Opening simple Modal.Body example...');
    onClick?.();
  };

  return (
    <Modal.Trigger target="simple-body-modal" {...props}>
      <button
        className="modal-body-demo__trigger-button modal-body-demo__trigger-button--primary"
        onClick={handleClick}
      >
        {children}
      </button>
    </Modal.Trigger>
  );
};

export default SimpleBodyModal;