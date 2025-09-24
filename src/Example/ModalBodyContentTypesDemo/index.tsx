import { Demo } from "@/Example/Demo";
import { ImageModal } from "./ImageModal";
import { VideoModal } from "./VideoModal";
import { IframeModal } from "./IframeModal";
import { CodeModal } from "./CodeModal";
import { DataVisualizationModal } from "./DataVisualizationModal";
import { WideContentModal } from "./WideContentModal";
import { FixedElementsModal } from "./FixedElementsModal";
import { EdgeCasesModal } from "./EdgeCasesModal";
import "./index.scss";

/**
 * Demo component to test Modal.Body support for various content types and edge cases
 */
export function ModalBodyContentTypesDemo() {
  return (
    <Demo
      title="🧪 Modal.Body Content Types Test"
      description="Testing Modal.Body support for various content types, media, and edge cases."
      defaultExpanded={false}
    >
      <div className="modal-body-content-types-demo__grid">
        <ImageModal.Trigger />
        <VideoModal.Trigger />
        <IframeModal.Trigger />
        <CodeModal.Trigger />
        <DataVisualizationModal.Trigger />
        <WideContentModal.Trigger />
        <FixedElementsModal.Trigger />
        <EdgeCasesModal.Trigger />
      </div>

      <div className="modal-body-content-types-demo__goals">
        <h4 className="modal-body-content-types-demo__goals-title">
          🎯 Content Type Testing Goals:
        </h4>
        <ul className="modal-body-content-types-demo__goals-list">
          <li className="modal-body-content-types-demo__goal">
            ✅ <strong>Media handling:</strong> Images, videos maintain aspect
            ratios
          </li>
          <li className="modal-body-content-types-demo__goal">
            ✅ <strong>Horizontal overflow:</strong> Wide content doesn't break
            modal layout
          </li>
          <li className="modal-body-content-types-demo__goal">
            ✅ <strong>Responsive behavior:</strong> Content adapts properly on
            mobile
          </li>
          <li className="modal-body-content-types-demo__goal">
            ✅ <strong>Scroll behavior:</strong> Proper scrolling for different
            content types
          </li>
          <li className="modal-body-content-types-demo__goal">
            ✅ <strong>Fixed positioning:</strong> Elements position correctly
            within modal
          </li>
          <li className="modal-body-content-types-demo__goal">
            ✅ <strong>Edge cases:</strong> Empty content, minimal content
            handled gracefully
          </li>
        </ul>
      </div>

      <ImageModal />
      <VideoModal />
      <IframeModal />
      <CodeModal />
      <DataVisualizationModal />
      <WideContentModal />
      <FixedElementsModal />
      <EdgeCasesModal />
    </Demo>
  );
}
