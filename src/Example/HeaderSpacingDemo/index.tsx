import "./index.scss";
import { Demo } from "@/Example/Demo";
import { TitleOnlyModal } from "./TitleOnlyModal";
import { TitleDescriptionModal } from "./TitleDescriptionModal";
import { LongTitleModal } from "./LongTitleModal";
import { MultiLineDescriptionModal } from "./MultiLineDescriptionModal";
import { GridGroup } from "../GridGroup";
import { Box } from "../Box";

export function HeaderSpacingDemo() {
  return (
    <Demo
      title="📐 Header Spacing Optimization"
      description="Testing optimized header spacing for different content combinations."
      defaultExpanded={false}
    >
      <GridGroup>
        <TitleOnlyModal.Trigger />
        <TitleDescriptionModal.Trigger />
        <LongTitleModal.Trigger />
        <MultiLineDescriptionModal.Trigger />
      </GridGroup>

      <Box variant="success" title="🎯 Optimizations Applied:">
        <ul>
          <li>
            ✅ <strong>Smart alignment:</strong> Center-aligned when title only,
            flex-start when with description
          </li>
          <li>
            ✅ <strong>Responsive spacing:</strong> Reduced padding and gaps on
            mobile devices
          </li>
          <li>
            ✅ <strong>Optical alignment:</strong> Close button positioned for
            better visual balance
          </li>
          <li>
            ✅ <strong>Consistent sizing:</strong> Min-height adjustments for
            different content types
          </li>
          <li>
            ✅ <strong>Mobile typography:</strong> Smaller font sizes for better
            mobile experience
          </li>
          <li>
            ✅ <strong>Gap optimization:</strong> Reduced from 1.5rem to 1rem
            for better balance
          </li>
        </ul>
      </Box>

      <TitleOnlyModal />
      <TitleDescriptionModal />
      <LongTitleModal />
      <MultiLineDescriptionModal />
    </Demo>
  );
}
