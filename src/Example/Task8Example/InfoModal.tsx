import React from 'react';
import { Modal } from '@/Modal';

const InfoModal = () => {
  const features = [
    '✅ Modal.Title automatically generates ID and links to dialog via aria-labelledby',
    '✅ Modal.Description automatically generates ID and links to dialog via aria-describedby',
    '✅ Modal.Close triggers proper close behavior for both controlled and uncontrolled modes',
    '✅ Modal.Header and Modal.Footer provide layout slots',
    '✅ All components support asChild pattern for customization',
    '✅ Comprehensive test coverage with accessibility integration tests'
  ];

  const handleClose = () => {
    console.log('Info modal closed - user acknowledged the features');
  };

  return (
    <Modal id="info-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Information</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Description>
          This modal demonstrates the accessibility features implemented in
          Task 8.
        </Modal.Description>

        <div className="info-modal__content">
          <h3 className="info-modal__features-title">Features demonstrated:</h3>
          <ul className="info-modal__features-list">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <p className="info-modal__inspect-note">
            <strong>Inspect the DOM:</strong> The dialog element should have
            aria-labelledby pointing to the title ID and aria-describedby
            pointing to the description ID.
          </p>
        </div>

        <Modal.Footer>
          <button
            className="info-modal__footer-button"
            onClick={handleClose}
          >
            Got it!
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
InfoModal.Trigger = ({ children, onClick, ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<'div'>) => {
  const handleClick = () => {
    console.log('Opening accessibility info modal...');
    onClick?.();
  };

  return (
    <Modal.Trigger target="info-modal" {...props}>
      <button
        className="task8-example__trigger-button task8-example__trigger-button--info"
        onClick={handleClick}
      >
        {children}
      </button>
    </Modal.Trigger>
  );
};

export default InfoModal;