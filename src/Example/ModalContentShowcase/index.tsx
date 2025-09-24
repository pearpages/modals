import React from "react";
import { Demo } from "../Demo";
import AutoSizeModal from "./AutoSizeModal";
import MediumModal from "./MediumModal";
import FullScreenModal from "./FullScreenModal";
import CustomStyledModal from "./CustomStyledModal";
import NoBackdropModal from "./NoBackdropModal";
import "./index.scss";

/**
 * Showcase component demonstrating Modal.Content with different sizes
 */
export const ModalContentShowcase: React.FC = () => {
  return (
    <Demo title="🎨 Modal.Content Examples" defaultExpanded={false}>
      <div className="modal-content-showcase__trigger-buttons">
        <AutoSizeModal.Trigger>Auto Size Modal</AutoSizeModal.Trigger>

        <MediumModal.Trigger>Medium Modal</MediumModal.Trigger>

        <FullScreenModal.Trigger>Full Screen Modal</FullScreenModal.Trigger>

        <CustomStyledModal.Trigger>
          Custom Styled Modal
        </CustomStyledModal.Trigger>

        <NoBackdropModal.Trigger>
          No Backdrop Close Modal
        </NoBackdropModal.Trigger>
      </div>

      <AutoSizeModal />
      <MediumModal />
      <FullScreenModal />
      <CustomStyledModal />
      <NoBackdropModal />
    </Demo>
  );
};
