import React, { useState } from 'react';
import { Modal } from '@/Modal';

const MediumModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (field: 'name' | 'email') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    // Reset form
    setFormData({ name: '', email: '' });
  };

  const handleCancel = () => {
    console.log('Canceling form...');
    // Reset form
    setFormData({ name: '', email: '' });
  };

  return (
    <Modal id="md-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>Medium Modal</Modal.Title>
          <Modal.Description>
            A standard-sized modal for most use cases
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>

        <div className="md-modal__content">
          <p>This is the default medium size modal, perfect for:</p>
          <ul className="md-modal__use-cases">
            <li>Forms with multiple fields</li>
            <li>Content that needs more space</li>
            <li>Tables or lists</li>
            <li>Settings panels</li>
          </ul>

          <form className="md-modal__form">
            <div className="md-modal__form-field">
              <label className="md-modal__label">
                Name:
              </label>
              <input
                type="text"
                className="md-modal__input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange('name')}
              />
            </div>
            <div className="md-modal__form-field">
              <label className="md-modal__label">
                Email:
              </label>
              <input
                type="email"
                className="md-modal__input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
              />
            </div>
          </form>
        </div>

        <Modal.Footer>
          <button
            className="md-modal__footer-button md-modal__footer-button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="md-modal__footer-button md-modal__footer-button--save"
            onClick={handleSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
MediumModal.Trigger = ({ children, onClick, ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<'div'>) => {
  const handleClick = () => {
    console.log('Opening medium modal with form...');
    onClick?.();
  };

  return (
    <Modal.Trigger target="md-modal" {...props}>
      <button
        className="modal-content-showcase__trigger-button modal-content-showcase__trigger-button--success"
        onClick={handleClick}
      >
        {children}
      </button>
    </Modal.Trigger>
  );
};

export default MediumModal;