import "./index.scss";
import { ModalSystem } from "@/ModalSystem";
import { SingleButtonModal } from "./SingleButtonModal";
import { MultiButtonModal } from "./MultiButtonModal";
import { FormModal } from "./FormModal";
import { FullscreenModal } from "./FullscreenModal";
import { Demo } from "@/Example/Demo";

export function FooterMobileDemo() {
  return (
    <ModalSystem>
      <Demo
        title="💡 Use Case 4: Mobile Footer Optimization"
        description="Modals with optimized footers for mobile devices."
      >
        <div className="footer-mobile-demo__grid">
          <SingleButtonModal.Trigger />
          <MultiButtonModal.Trigger />
          <FormModal.Trigger />
          <FullscreenModal.Trigger />
        </div>

        <div className="footer-mobile-demo__info-box">
          <h4>📱 Mobile Optimizations Applied:</h4>
          <ul>
            <li>
              ✅ <strong>Compact spacing:</strong> Reduced padding and
              min-height on mobile
            </li>
            <li>
              ✅ <strong>Safe area support:</strong> Automatic padding for iOS
              devices (env(safe-area-inset-bottom))
            </li>
            <li>
              ✅ <strong>Button stacking:</strong> Multiple buttons stack
              vertically on mobile
            </li>
            <li>
              ✅ <strong>Full-width buttons:</strong> Easier touch targets on
              mobile (44px min-height)
            </li>
            <li>
              ✅ <strong>Responsive sizing:</strong> Different optimizations for
              ≤768px and ≤480px
            </li>
            <li>
              ✅ <strong>Smart layout:</strong> Primary action button appears at
              bottom when stacked
            </li>
          </ul>
        </div>

        <SingleButtonModal />
        <MultiButtonModal />
        <FormModal />
        <FullscreenModal />
      </Demo>
    </ModalSystem>
  );
}
