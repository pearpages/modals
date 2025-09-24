import React from "react";
import { Demo } from "../Demo";
import ConfirmationModal from "./ConfirmationModal";
import InfoModal from "./InfoModal";
import "./index.scss";

/**
 * Example demonstrating Task 8 implementation:
 * Header/Title/Description/Close/Footer subcomponents with accessibility
 */
export const Task8Example: React.FC = () => {
  return (
    <Demo
      title="Task 8: Modal Subcomponents"
      description="This example demonstrates the implemented subcomponents with accessibility features:"
      defaultExpanded={false}
    >
      <div className="task8-example__trigger-buttons">
        <ConfirmationModal.Trigger>
          Show Confirmation Modal
        </ConfirmationModal.Trigger>

        <InfoModal.Trigger>Show Info Modal</InfoModal.Trigger>
      </div>

      <ConfirmationModal />
      <InfoModal />
    </Demo>
  );
};
