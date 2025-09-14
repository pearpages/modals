import React, { useState } from 'react';
import { ModalProvider } from '../ModalProvider';
import { ModalRoot } from '../ModalRoot';
import { useModal } from '../useModal';

// Sample form component for modal content
const ProfileForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="name"
          style={{ display: 'block', marginBottom: '0.5rem' }}
        >
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="email"
          style={{ display: 'block', marginBottom: '0.5rem' }}
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div className="modal-actions modal-actions-right">
        <button type="submit" className="btn-primary">
          Save Profile
        </button>
      </div>
    </form>
  );
};

// Help panel component
const HelpPanel: React.FC = () => (
  <div>
    <p>This is a help panel with some useful information.</p>
    <ul>
      <li>Feature 1: Description of feature</li>
      <li>Feature 2: Description of feature</li>
      <li>Feature 3: Description of feature</li>
    </ul>
    <p>For more help, contact support.</p>
  </div>
);

// Success modal component
const SuccessModal: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => (
  <div>
    <p style={{ color: 'green', fontWeight: 'bold', margin: '0 0 1rem 0' }}>
      {message}
    </p>
    <div className="modal-actions modal-actions-center">
      <button onClick={onClose} autoFocus className="btn-primary">
        Close
      </button>
    </div>
  </div>
);

// Main demo component that uses the modal
export const ModalDemoContent: React.FC = () => {
  const { open, close } = useModal();

  // Example A: Programmatic open
  const openProfileModal = () => {
    open({
      title: 'Edit Profile',
      size: 'xl',
      content: ({ close }) => <ProfileForm onSuccess={close} />,
    });
  };

  // Example B: Simple confirm dialog
  const handleDelete = () => {
    open({
      title: 'Delete Item?',
      content: ({ close }) => (
        <div>
          <p>This action cannot be undone.</p>
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-actions modal-actions-right">
            <button onClick={() => close()}>Cancel</button>
            <button
              onClick={() => {
                // Simulate deletion
                close();
                open({
                  title: 'Success',
                  content: () => (
                    <SuccessModal
                      message="Item deleted successfully!"
                      onClose={() => close()}
                    />
                  ),
                });
              }}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      role: 'alertdialog',
    });
  };

  // Example C: Help modal
  const openHelpModal = () => {
    open({
      title: 'Help',
      size: 'md',
      content: <HelpPanel />,
    });
  };

  // Example D: Stacked modals
  const openStackedModal = () => {
    open({
      id: 'first-modal',
      title: 'First Modal',
      content: () => (
        <div>
          <p>This is the first modal.</p>
          <div className="modal-actions modal-actions-center">
            <button
              onClick={() => {
                open({
                  id: 'second-modal',
                  title: 'Second Modal',
                  content: () => (
                    <div>
                      <p>This is the second modal on top of the first!</p>
                      <div className="modal-actions modal-actions-center">
                        <button
                          onClick={() => close('second-modal')}
                          className="btn-primary"
                        >
                          Close Second Modal
                        </button>
                      </div>
                    </div>
                  ),
                });
              }}
              className="btn-primary"
            >
              Open Second Modal
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Modal Examples</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={openProfileModal}>Open Profile Modal</button>
        <button onClick={handleDelete}>Delete Item (Confirm)</button>
        <button onClick={openHelpModal}>Open Help</button>
        <button onClick={openStackedModal}>Open Stacked Modals</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Programmatic modal opening</li>
          <li>✅ Manual confirm dialogs</li>
          <li>✅ Different modal sizes</li>
          <li>✅ Focus trapping</li>
          <li>✅ ESC and backdrop closing</li>
          <li>✅ Stacked modals</li>
          <li>✅ Custom content via render functions</li>
          <li>✅ Accessibility features (ARIA labels, focus management)</li>
          <li>✅ Scroll locking</li>
          <li>✅ Animation support</li>
          <li>✅ ModalTrigger component</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Modal size recommendations:</h3>
        <ul>
          <li>
            'sm' (Small): Quick alerts, simple confirmations, short messages,
            minimal input
          </li>
          <li>
            'md' (Medium): Help panels, moderate forms, multi-step
            confirmations, moderate content
          </li>
          <li>
            'xl' (Extra Large): Complex forms, rich content, wizards, anything
            requiring substantial space
          </li>
        </ul>
      </div>
    </div>
  );
};

// Root example component that provides the modal context
function ModalExample(): React.ReactNode {
  return (
    <ModalProvider>
      <ModalDemoContent />
      <ModalRoot />
    </ModalProvider>
  );
}

export { ModalExample };
