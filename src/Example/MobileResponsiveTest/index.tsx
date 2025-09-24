import { Modal } from "@/Modal";
import { ModalTrigger } from "@/ModalTrigger";
import { Demo } from "@/Example/Demo";
import { AutoSizeModal } from "./AutoSizeModal";
import { MediumSizeModal } from "./MediumSizeModal";
import { FullscreenModal } from "./FullscreenModal";
import "./index.scss";

export function MobileResponsiveTest() {
  return (
    <Demo
      title="📱 Mobile Responsive Test"
      description="Test modal behavior on mobile vs desktop. Resize your browser window or use dev tools device emulation."
      defaultExpanded={false}
    >
      <div className="mobile-responsive-test__instructions">
        <strong className="mobile-responsive-test__instructions-title">
          📋 Test Instructions:
        </strong>
        <ol className="mobile-responsive-test__instructions-list">
          <li className="mobile-responsive-test__instruction">
            <strong>Desktop</strong> (&gt;768px): Modal should be centered,
            sized normally
          </li>
          <li className="mobile-responsive-test__instruction">
            <strong>Mobile</strong> (≤768px): Modal should be fullscreen (100vw
            × 100vh)
          </li>
          <li className="mobile-responsive-test__instruction">
            Try both auto and md size variants
          </li>
          <li className="mobile-responsive-test__instruction">
            Test with content that requires scrolling
          </li>
        </ol>
      </div>

      <div className="mobile-responsive-test__actions">
        <AutoSizeModal.Trigger />
        <MediumSizeModal.Trigger />
        <FullscreenModal.Trigger />
      </div>

      <AutoSizeModal />
      <MediumSizeModal />
      <FullscreenModal />
    </Demo>
  );
}
