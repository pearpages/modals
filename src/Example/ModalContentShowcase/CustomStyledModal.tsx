import React from 'react';
import { Modal } from '@/Modal';

const CustomStyledModal = () => {
  const features = [
    'Custom gradient background',
    'Custom typography and colors',
    'Backdrop blur effects',
    'Maintained accessibility',
    'Full animation support'
  ];

  const handleClose = () => {
    console.log('Closing custom styled modal...');
  };

  return (
    <Modal id="custom-modal">
      <Modal.Content
        size="md"
        className="custom-modal__content"
      >
        <Modal.Header className="custom-modal__header">
          <Modal.Title>Custom Styled Modal</Modal.Title>
          <Modal.Description className="custom-modal__description">
            Demonstrates custom styling capabilities
          </Modal.Description>
          <Modal.Close className="custom-modal__close" />
        </Modal.Header>

        <div className="custom-modal__body">
          <h3 className="custom-modal__title">
            Beautiful Custom Design
          </h3>
          <p className="custom-modal__intro">
            Modal.Content accepts custom className and style props, allowing
            you to create stunning designs while maintaining all the
            accessibility and behavior features.
          </p>

          <div className="custom-modal__features-box">
            <div className="custom-modal__features-title">
              <strong>Features demonstrated:</strong>
            </div>
            <ul className="custom-modal__features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <Modal.Footer className="custom-modal__footer">
          <button
            className="custom-modal__footer-button"
            onClick={handleClose}
          >
            Amazing! Close Modal
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
CustomStyledModal.Trigger = ({ children, onClick, ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<'div'>) => {
  const handleClick = () => {
    console.log('Opening custom styled modal...');
    onClick?.();
  };

  return (
    <Modal.Trigger target="custom-modal" {...props}>
      <button
        className="modal-content-showcase__trigger-button modal-content-showcase__trigger-button--purple"
        onClick={handleClick}
      >
        {children}
      </button>
    </Modal.Trigger>
  );
};

export default CustomStyledModal;