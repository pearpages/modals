import React from "react";
import { Demo } from "@/Example/Demo";
import SimpleBodyModal from "./SimpleBodyModal";
import ScrollableBodyModal from "./ScrollableBodyModal";
import CustomBodyModal from "./CustomBodyModal";
import "./index.scss";

export function ModalBodyDemo() {
  return (
    <Demo
      title="📄 Modal.Body Component Demo"
      description="Demonstrates the new Modal.Body component with overflow handling and semantic structure."
      defaultExpanded={false}
    >
      <div className="modal-body-demo__trigger-buttons">
        <SimpleBodyModal.Trigger>Simple Modal.Body</SimpleBodyModal.Trigger>

        <ScrollableBodyModal.Trigger>
          Scrollable Content
        </ScrollableBodyModal.Trigger>

        <CustomBodyModal.Trigger>Custom Styled Body</CustomBodyModal.Trigger>
      </div>

      <div className="modal-body-demo__info-box">
        <div className="modal-body-demo__info-title">
          ✨ Modal.Body Benefits:
        </div>
        <ul className="modal-body-demo__info-list">
          <li>
            <strong>Semantic structure</strong> - Clear content organization
          </li>
          <li>
            <strong>Automatic overflow</strong> - Scrolling when content is too
            tall
          </li>
          <li>
            <strong>Consistent spacing</strong> - Proper padding and margins
          </li>
          <li>
            <strong>asChild support</strong> - Use custom elements while keeping
            functionality
          </li>
        </ul>
      </div>

      <SimpleBodyModal />
      <ScrollableBodyModal />
      <CustomBodyModal />
    </Demo>
  );
}
