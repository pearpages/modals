import { ModalSystem } from "@/ModalSystem";
import { Demo } from "@/Example/Demo";
import { BasicTriggerModal } from "./BasicTriggerModal";
import { CustomStyledModal } from "./CustomStyledModal";
import { DisabledTriggerModal } from "./DisabledTriggerModal";
import { Box } from "../Box";
import { Section } from "./Section";

export function ModalTriggerDemo() {
  return (
    <div className="modal-trigger-demo">
      <Demo
        title="✨ Modal.Trigger"
        description="Modal.Trigger sugar component"
        defaultExpanded={false}
      >
        <div className="sections">
          <Section
            title="Basic Trigger"
            description="Simple Modal.Trigger that renders as a default button"
          >
            <BasicTriggerModal.Trigger />
          </Section>

          <Section
            title="asChild Pattern"
            description="Modal.Trigger with asChild to preserve custom button styling"
          >
            <CustomStyledModal.Trigger />
          </Section>

          <Section
            title="Disabled Trigger"
            description="Modal.Trigger in disabled state - won't open modal"
          >
            <DisabledTriggerModal.Trigger />
          </Section>

          <Section
            title="Advanced Patterns"
            description="Multiple triggers for the same modal with different styles"
          >
            <BasicTriggerModal.AlternateTrigger />
            <CustomStyledModal.IconTrigger />
          </Section>
        </div>

        <Box variant="success" title="🎯 Modal.Trigger Features: ">
          <ul>
            <li>
              ✅ <strong>Declarative API:</strong> Simple target-based modal
              opening
            </li>
            <li>
              ✅ <strong>Keyboard accessibility:</strong> Enter and Space key
              support
            </li>
            <li>
              ✅ <strong>asChild pattern:</strong> Preserves custom styling and
              elements
            </li>
            <li>
              ✅ <strong>Disabled state:</strong> Prevents modal opening when
              needed
            </li>
            <li>
              ✅ <strong>Multiple triggers:</strong> Many triggers can target
              the same modal
            </li>
          </ul>
        </Box>
      </Demo>

      <BasicTriggerModal />
      <CustomStyledModal />
      <DisabledTriggerModal />
    </div>
  );
}
