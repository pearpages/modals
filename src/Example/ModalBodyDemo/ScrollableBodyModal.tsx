import React, { useState } from 'react';
import { Modal } from '@/Modal';

const ScrollableBodyModal = () => {
  const [contentBlocks] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      title: `Content Block ${i + 1}`,
      text: `This is example content to demonstrate the scrolling behavior.
             The Modal.Body component automatically adds overflow: auto and
             includes beautiful custom scrollbars. The header and footer
             remain fixed while this content area scrolls.`
    }))
  );

  return (
    <Modal id="scrollable-body-modal">
      <Modal.Content size="md">
        <Modal.Header>
          <Modal.Title>📜 Scrollable Modal.Body</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>
          <p className="scrollable-modal__intro">
            <strong>
              This Modal.Body automatically handles overflow with scrolling!
            </strong>
          </p>

          {contentBlocks.map((block) => (
            <div
              key={block.id}
              className={`scrollable-modal__content-block scrollable-modal__content-block--${
                block.id % 2 === 0 ? 'even' : 'odd'
              }`}
            >
              <h6 className="scrollable-modal__block-title">
                {block.title}
              </h6>
              <p className="scrollable-modal__block-text">
                {block.text}
              </p>
            </div>
          ))}

          <div className="scrollable-modal__end-section">
            <div className="scrollable-modal__end-title">
              🎯 End of scrollable content!
            </div>
            <p className="scrollable-modal__end-text">
              Notice how the header stayed at the top and the footer stays at
              the bottom, while this middle content area scrolled
              independently.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="scrollable-modal__footer-button">
            Perfect!
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
ScrollableBodyModal.Trigger = ({ children, onClick, ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<'div'>) => {
  const handleClick = () => {
    console.log('Opening scrollable Modal.Body example...');
    onClick?.();
  };

  return (
    <Modal.Trigger target="scrollable-body-modal" {...props}>
      <button
        className="modal-body-demo__trigger-button modal-body-demo__trigger-button--success"
        onClick={handleClick}
      >
        {children}
      </button>
    </Modal.Trigger>
  );
};

export default ScrollableBodyModal;