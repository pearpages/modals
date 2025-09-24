import { useState } from "react";
import { ModalSystem } from "@/ModalSystem";
import { LongContentModal } from "./LongContentModal";
import { MixedContentModal } from "./MixedContentModal";
import { TableContentModal } from "./TableContentModal";
import "./index.scss";
import { Demo } from "@/Example/Demo";

/**
 * Demo component to test and showcase optimized modal content overflow/scrolling behavior
 */
export function ScrollOptimizationDemo() {
  const [longContentOpen, setLongContentOpen] = useState(false);
  const [mixedContentOpen, setMixedContentOpen] = useState(false);
  const [tableContentOpen, setTableContentOpen] = useState(false);

  return (
    <ModalSystem>
      <Demo
        title="📜 Scroll Optimization Demo"
        description="Testing optimized modal content overflow and scrolling behavior."
        defaultExpanded={false}
      >
        <div className="scroll-optimization-demo__actions">
          <LongContentModal.Trigger onOpenChange={setLongContentOpen} />
          <MixedContentModal.Trigger onOpenChange={setMixedContentOpen} />
          <TableContentModal.Trigger onOpenChange={setTableContentOpen} />
        </div>

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
    </ModalSystem>
  );
}
