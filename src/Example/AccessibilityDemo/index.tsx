import "./index.scss";
import { Demo } from "@/Example/Demo";
import { CompleteAccessibilityModal } from "./CompleteAccessibilityModal";
import { TitleOnlyModal } from "./TitleOnlyModal";
import { CustomIdsModal } from "./CustomIdsModal";

const FeatureBox = () => (
  <div className="accessibility-demo__feature-box">
    <strong>✅ Accessibility Features Implemented:</strong>
    <ul className="accessibility-demo__list">
      <li>
        <code>role="dialog"</code> on Modal.Content
      </li>
      <li>
        <code>aria-modal="true"</code>
      </li>
      <li>
        <code>aria-labelledby</code> automatically linked to Modal.Title
      </li>
      <li>
        <code>aria-describedby</code> automatically linked to Modal.Description
      </li>
      <li>Focus trap and focus restoration</li>
      <li>Keyboard navigation (Escape key)</li>
    </ul>
  </div>
);

const AccessibiltyTestBox = () => (
  <div className="accessibility-demo__test-box">
    <strong>🔍 How to test accessibility:</strong>
    <ol className="accessibility-demo__list">
      <li>Use screen reader (VoiceOver on Mac, NVDA on Windows)</li>
      <li>Open modal and listen to announcements</li>
      <li>Inspect element to see ARIA attributes</li>
      <li>Tab through elements to test focus trap</li>
      <li>Press Escape to test keyboard navigation</li>
    </ol>
  </div>
);

export function AccessibilityDemo() {
  return (
    <Demo
      title="♿ Accessibility Demo"
      description="Demonstrates proper ARIA linking and accessibility features."
      defaultExpanded={false}
    >
      <FeatureBox />
      <AccessibiltyTestBox />

      <div className="accessibility-demo__button-group">
        <CompleteAccessibilityModal.Trigger />
        <TitleOnlyModal.Trigger />
        <CustomIdsModal.Trigger />
      </div>

      <CompleteAccessibilityModal />
      <TitleOnlyModal />
      <CustomIdsModal />
    </Demo>
  );
}
