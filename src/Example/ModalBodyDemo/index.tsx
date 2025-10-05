import React from "react";
import { Demo } from "@/Example/Demo";
import { SimpleBodyModal } from "./SimpleBodyModal";
import { ScrollableBodyModal } from "./ScrollableBodyModal";
import { CustomBodyModal } from "./CustomBodyModal";
import "./index.scss";
import { FlexGroup } from "../FlexGroup";
import { Box } from "../Box";

export function ModalBodyDemo() {
  return (
    <Demo
      title="📄 Modal.Body Component"
      description="Demonstrates the new Modal.Body component with overflow handling and semantic structure."
      defaultExpanded={false}
    >
      <FlexGroup>
        <SimpleBodyModal.Trigger>Simple Modal.Body</SimpleBodyModal.Trigger>
        <ScrollableBodyModal.Trigger>
          Scrollable Content
        </ScrollableBodyModal.Trigger>
        <CustomBodyModal.Trigger>Custom Styled Body</CustomBodyModal.Trigger>
      </FlexGroup>

      <Box variant="success" title="✨ Modal.Body Benefits:">
        <ul>
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
      </Box>

      <SimpleBodyModal />
      <ScrollableBodyModal />
      <CustomBodyModal />
    </Demo>
  );
}
