import React from "react";
import { Modal } from "@/Modal";
import { useModalStack } from "@/index";
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

export const FullScreenModal = () => {
  const modals = useModalStack();

  const handleExitFullScreen = () => {
    modals.close(FullScreenModal.ID);
  };

  return (
    <Modal id={FullScreenModal.ID}>
      <Modal.Content size="full">
        <Modal.Header>
          <Modal.Title>Full Screen Modal</Modal.Title>
          <Modal.Description>
            Takes up the entire viewport for immersive experiences
          </Modal.Description>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
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
        </Modal.Body>

        <Modal.Footer>
          <Modal.Button
            variant="danger"
            className="full-modal__footer-button"
            onClick={handleExitFullScreen}
          >
            Exit Full Screen
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

FullScreenModal.ID = "full-modal" as const;

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
    <Modal.Trigger target={FullScreenModal.ID} {...props} asChild>
      <Modal.Button variant="danger" onClick={handleClick}>
        {children}
      </Modal.Button>
    </Modal.Trigger>
  );
};
