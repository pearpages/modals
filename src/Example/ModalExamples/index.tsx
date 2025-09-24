import { useState } from "react";
import { useModalContext } from "@/ModalProvider";
import { ConfirmationModal } from "../UsageExamples/ConfirmationModal";
import { InfoModal } from "../UsageExamples/InfoModal";
import { NestedModals } from "./NestedModals";
import { ActionDemo } from "../UsageExamples/ActionDemo";
import { InteractiveActions } from "./InteractiveActions";
import { Demo } from "../Demo";
import "./index.scss";

const ModalExamples: React.FC = () => {
  const { registry, stack } = useModalContext();
  const [demoData, setDemoData] = useState({
    userCount: 42,
    lastAction: "None",
  });

  return (
    <Demo title="🚀 Modal Library Usage Examples" defaultExpanded={false}>
      <div className="modal-examples__state-section">
        <h3 className="modal-examples__state-title">📊 Modal System State</h3>
        <div className="modal-examples__state-info">
          <div className="modal-examples__state-item">
            <strong>Active Stack:</strong> [{stack.join(", ") || "empty"}]
          </div>
          <div className="modal-examples__state-item">
            <strong>Registered Modals:</strong> {Object.keys(registry).length}
          </div>
          <div className="modal-examples__state-item">
            <strong>Open Modals:</strong>{" "}
            {Object.values(registry).filter((m) => m.open).length}
          </div>
        </div>
      </div>

      <div className="modal-examples__examples-grid">
        <ConfirmationModal demoData={demoData} />
        <InfoModal demoData={demoData} stack={stack} />
        <NestedModals registry={registry} />
        <ActionDemo />
        <InteractiveActions setDemoData={setDemoData} />
      </div>

      <div className="modal-examples__status-section">
        <h4 className="modal-examples__status-title">
          🔧 Implementation Status
        </h4>
        <ul className="modal-examples__status-list">
          <li>
            ✅ <strong>ModalSystem:</strong> Functional provider + portal setup
          </li>
          <li>
            ✅ <strong>Context API:</strong> State management and modal registry
          </li>
          <li>
            ✅ <strong>Modal Stacking:</strong> Z-index calculation and stack
            management
          </li>
          <li>
            ✅ <strong>SSR Safety:</strong> Client-side only rendering
          </li>
          <li>
            ✅ <strong>Modal.Content:</strong> Complete implementation with
            sizes, animations, and subcomponents
          </li>
          <li>
            🎯 <strong>All Core Tasks Complete!</strong> Ready for production
            use
          </li>
        </ul>
      </div>
    </Demo>
  );
};

export { ModalExamples };
