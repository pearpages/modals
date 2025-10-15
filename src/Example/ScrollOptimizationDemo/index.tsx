import { useState } from "react";
import { LongContentModal } from "./LongContentModal";
import { MixedContentModal } from "./MixedContentModal";
import { TableContentModal } from "./TableContentModal";
import "./index.scss";
import { Demo } from "@/Example/Demo";
import { FlexGroup } from "../FlexGroup";

/**
 * Demo component to test and showcase optimized modal content overflow/scrolling behavior
 */
export function ScrollOptimizationDemo() {
  const [longContentOpen, setLongContentOpen] = useState(false);
  const [mixedContentOpen, setMixedContentOpen] = useState(false);
  const [tableContentOpen, setTableContentOpen] = useState(false);

  return (
    <Demo
      title="📜 Scroll Optimization"
      description="Testing optimized modal content overflow and scrolling behavior."
      defaultExpanded={false}
    >
      <FlexGroup>
        <LongContentModal.Trigger onOpenChange={setLongContentOpen} />
        <MixedContentModal.Trigger onOpenChange={setMixedContentOpen} />
        <TableContentModal.Trigger onOpenChange={setTableContentOpen} />
      </FlexGroup>

      <LongContentModal
        open={longContentOpen}
        onOpenChange={setLongContentOpen}
      />
      <MixedContentModal
        open={mixedContentOpen}
        onOpenChange={setMixedContentOpen}
      />
      <TableContentModal
        open={tableContentOpen}
        onOpenChange={setTableContentOpen}
      />
    </Demo>
  );
}
