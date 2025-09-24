import "./index.scss";
import { SingleButtonModal } from "./SingleButtonModal";
import { MultiButtonModal } from "./MultiButtonModal";
import { FormModal } from "./FormModal";
import { FullscreenModal } from "./FullscreenModal";
import { Demo } from "@/Example/Demo";
import { GridGroup } from "../GridGroup";
import { Box } from "../Box";

export function FooterMobileDemo() {
  return (
    <Demo
      title="💡 Mobile Footer Optimization"
      description="Modals with optimized footers for mobile devices."
      defaultExpanded={false}
    >
      <GridGroup>
        <SingleButtonModal.Trigger />
        <MultiButtonModal.Trigger />
        <FormModal.Trigger />
        <FullscreenModal.Trigger />
      </GridGroup>

      <Box variant="success" title="📱 Mobile Optimizations Applied:">
        <ul>
          <li>
            ✅ <strong>Compact spacing:</strong> Reduced padding and min-height
            on mobile
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
      </Box>

      <SingleButtonModal />
      <MultiButtonModal />
      <FormModal />
      <FullscreenModal />
    </Demo>
  );
}
