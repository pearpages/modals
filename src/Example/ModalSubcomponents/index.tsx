import React from "react";
import { Demo } from "../Demo";
import { ConfirmationModal } from "./ConfirmationModal";
import { InfoModal } from "./InfoModal";
import { FlexGroup } from "../FlexGroup";

export const ModalSubcomponents: React.FC = () => {
  return (
    <Demo
      title="🧩 Modal Subcomponents"
      description="This example demonstrates the implemented subcomponents with accessibility features:"
      defaultExpanded={false}
    >
      <FlexGroup>
        <ConfirmationModal.Trigger />
        <InfoModal.Trigger />
      </FlexGroup>

      <ConfirmationModal />
      <InfoModal />
    </Demo>
  );
};
