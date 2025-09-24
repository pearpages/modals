import "./index.scss";
import { Demo } from "@/Example/Demo";
import { NoBackdropModal } from "./NoBackdropModal";
import { NoEscapeModal } from "./NoEscapeModal";
import { CustomDismissModal } from "./CustomDismissModal";

export function ActionDemo() {
  return (
    <Demo
      title="⚡ Use Case 4: Dismiss Behavior"
      description="Test different dismiss configurations."
      defaultExpanded={false}
    >
      <div className="action-demo__button-group">
        <NoBackdropModal.Trigger />
        <NoEscapeModal.Trigger />
        <CustomDismissModal.Trigger />
      </div>

      <NoBackdropModal />
      <NoEscapeModal />
      <CustomDismissModal />
    </Demo>
  );
}
