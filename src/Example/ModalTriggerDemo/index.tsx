import { ModalSystem } from "@/ModalSystem";
import { Demo } from "@/Example/Demo";
import { BasicTriggerModal } from "./BasicTriggerModal";
import { CustomStyledModal } from "./CustomStyledModal";
import { DisabledTriggerModal } from "./DisabledTriggerModal";
import "./index.scss";

/**
 * Simple demonstration of Modal.Trigger functionality
 * This shows the new Modal.Trigger component working with the modal system
 */
export function ModalTriggerDemo() {
  return (
    <ModalSystem>
      <div className="modal-trigger-demo">
        <Demo
          title="✨ Modal.Trigger Demo"
          description="Task 6 implementation: Modal.Trigger sugar component"
          defaultExpanded={false}
        >
          <div className="modal-trigger-demo__sections">
            {/* Basic trigger section */}
            <div className="modal-trigger-demo__section">
              <h3 className="modal-trigger-demo__section-title">
                Basic Trigger
              </h3>
              <p className="modal-trigger-demo__section-description">
                Simple Modal.Trigger that renders as a default button
              </p>
              <BasicTriggerModal.Trigger />
            </div>

            {/* asChild trigger section */}
            <div className="modal-trigger-demo__section">
              <h3 className="modal-trigger-demo__section-title">
                asChild Pattern
              </h3>
              <p className="modal-trigger-demo__section-description">
                Modal.Trigger with asChild to preserve custom button styling
              </p>
              <CustomStyledModal.Trigger />
            </div>

            {/* Disabled trigger section */}
            <div className="modal-trigger-demo__section">
              <h3 className="modal-trigger-demo__section-title">
                Disabled Trigger
              </h3>
              <p className="modal-trigger-demo__section-description">
                Modal.Trigger in disabled state - won't open modal
              </p>
              <DisabledTriggerModal.Trigger />
            </div>

            {/* Advanced patterns section */}
            <div className="modal-trigger-demo__section">
              <h3 className="modal-trigger-demo__section-title">
                Advanced Patterns
              </h3>
              <p className="modal-trigger-demo__section-description">
                Multiple triggers for the same modal with different styles
              </p>
              <div className="modal-trigger-demo__advanced-triggers">
                <BasicTriggerModal.AlternateTrigger />
                <CustomStyledModal.IconTrigger />
              </div>
            </div>
          </div>

          <div className="modal-trigger-demo__features">
            <h4 className="modal-trigger-demo__features-title">
              🎯 Modal.Trigger Features:
            </h4>
            <ul className="modal-trigger-demo__features-list">
              <li className="modal-trigger-demo__feature">
                ✅ <strong>Declarative API:</strong> Simple target-based modal
                opening
              </li>
              <li className="modal-trigger-demo__feature">
                ✅ <strong>Keyboard accessibility:</strong> Enter and Space key
                support
              </li>
              <li className="modal-trigger-demo__feature">
                ✅ <strong>asChild pattern:</strong> Preserves custom styling
                and elements
              </li>
              <li className="modal-trigger-demo__feature">
                ✅ <strong>Disabled state:</strong> Prevents modal opening when
                needed
              </li>
              <li className="modal-trigger-demo__feature">
                ✅ <strong>Multiple triggers:</strong> Many triggers can target
                the same modal
              </li>
            </ul>
          </div>
        </Demo>

        <BasicTriggerModal />
        <CustomStyledModal />
        <DisabledTriggerModal />
      </div>
    </ModalSystem>
  );
}
