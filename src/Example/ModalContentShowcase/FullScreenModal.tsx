import React from "react";
import { Modal } from "@/Modal";

const FullScreenModal = () => {
  const dashboardCards = [
    {
      title: "Analytics",
      description:
        "View detailed analytics and reports with plenty of space for charts and graphs.",
    },
    {
      title: "Settings Panel",
      description:
        "Complex configuration interfaces with multiple tabs and sections.",
    },
    {
      title: "Data Tables",
      description:
        "Large datasets that need maximum screen real estate for optimal viewing.",
    },
    {
      title: "Media Viewers",
      description:
        "Image galleries, video players, or document viewers benefit from full screen.",
    },
  ];

  const handleExitFullScreen = () => {
    console.log("Exiting full screen modal...");
  };

  return (
    <Modal id="full-modal">
      <Modal.Content size="full">
        <Modal.Header>
          <Modal.Title>Full Screen Modal</Modal.Title>
          <Modal.Description>
            Takes up the entire viewport for immersive experiences
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>

        <div className="full-modal__content">
          <h3 className="full-modal__title">Dashboard Overview</h3>
          <p className="full-modal__description">
            Full screen modals are perfect for:
          </p>

          <div className="full-modal__cards-grid">
            {dashboardCards.map((card, index) => (
              <div key={index} className="full-modal__card">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Modal.Footer>
          <button
            className="full-modal__footer-button"
            onClick={handleExitFullScreen}
          >
            Exit Full Screen
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// Create compound component with Trigger
FullScreenModal.Trigger = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & React.ComponentProps<"div">) => {
  const handleClick = () => {
    console.log("Opening full screen modal...");
    onClick?.();
  };

  return (
    <Modal.Trigger target="full-modal" {...props} asChild>
      <Modal.Button variant="danger" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};

export default FullScreenModal;
