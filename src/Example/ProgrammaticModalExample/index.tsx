import { useState } from "react";
import { useModalStack } from "@/ModalProvider";
import { Demo } from "@/Example/Demo";
import { InfoModal } from "./InfoModal";
import { ConfirmModal } from "./ConfirmModal";
import "./index.scss";

export function ProgrammaticModalExample() {
  const modalStack = useModalStack();
  const [message, setMessage] = useState("");

  const handleOpenInfo = () => {
    modalStack.open("info-modal");
    setMessage("Info modal opened programmatically! 🚀");
  };

  const handleOpenConfirm = () => {
    modalStack.open("confirm-modal");
    setMessage("Confirm modal opened programmatically! ⚡");
  };

  const handleCloseAll = () => {
    modalStack.close("info-modal");
    modalStack.close("confirm-modal");
    setMessage("All modals closed programmatically! 🎯");
  };

  const handleConfirmAction = () => {
    setMessage("Action confirmed successfully! ✅");
    modalStack.close("confirm-modal");
  };

  const handleCancel = () => {
    setMessage("Action cancelled by user ❌");
    modalStack.close("confirm-modal");
  };

  const clearMessage = () => {
    setMessage("");
  };

  return (
    <Demo
      title="🎯 Programmatic Modal Control"
      description="Using useModalStack() hook to control modals programmatically."
      defaultExpanded={false}
    >
      <div className="programmatic-modal-example__actions">
        <button
          onClick={handleOpenInfo}
          className="programmatic-modal-example__button programmatic-modal-example__button--info"
        >
          Open Info Modal
        </button>

        <button
          onClick={handleOpenConfirm}
          className="programmatic-modal-example__button programmatic-modal-example__button--success"
        >
          Open Confirm Modal
        </button>

        <button
          onClick={handleCloseAll}
          className="programmatic-modal-example__button programmatic-modal-example__button--secondary"
        >
          Close All Modals
        </button>

        <button
          onClick={clearMessage}
          className="programmatic-modal-example__button programmatic-modal-example__button--warning"
        >
          Clear Status
        </button>
      </div>

      {message && (
        <div className="programmatic-modal-example__status">
          <span className="programmatic-modal-example__status-text">
            {message}
          </span>
          <button
            onClick={clearMessage}
            className="programmatic-modal-example__status-close"
            aria-label="Clear status message"
          >
            ✕
          </button>
        </div>
      )}

      <div className="programmatic-modal-example__states">
        <strong className="programmatic-modal-example__states-title">
          Modal States:
        </strong>
        <ul className="programmatic-modal-example__states-list">
          <li className="programmatic-modal-example__state">
            <span className="programmatic-modal-example__state-label">
              Info Modal:
            </span>
            <span
              className={`programmatic-modal-example__state-indicator ${
                modalStack.isOpen("info-modal")
                  ? "programmatic-modal-example__state-indicator--open"
                  : "programmatic-modal-example__state-indicator--closed"
              }`}
            >
              {modalStack.isOpen("info-modal") ? "🟢 Open" : "🔴 Closed"}
            </span>
          </li>
          <li className="programmatic-modal-example__state">
            <span className="programmatic-modal-example__state-label">
              Confirm Modal:
            </span>
            <span
              className={`programmatic-modal-example__state-indicator ${
                modalStack.isOpen("confirm-modal")
                  ? "programmatic-modal-example__state-indicator--open"
                  : "programmatic-modal-example__state-indicator--closed"
              }`}
            >
              {modalStack.isOpen("confirm-modal") ? "🟢 Open" : "🔴 Closed"}
            </span>
          </li>
        </ul>
      </div>

      <div className="programmatic-modal-example__usage">
        <strong className="programmatic-modal-example__usage-title">
          💡 Usage Examples:
        </strong>
        <ul className="programmatic-modal-example__usage-list">
          <li>
            <code>modalStack.open('modal-id')</code> - Opens a modal
          </li>
          <li>
            <code>modalStack.close('modal-id')</code> - Closes a modal
          </li>
          <li>
            <code>modalStack.isOpen('modal-id')</code> - Checks if modal is open
          </li>
          <li>
            <code>modalStack.toggle('modal-id')</code> - Toggles modal state
          </li>
        </ul>
      </div>

      <InfoModal />
      <ConfirmModal onConfirm={handleConfirmAction} onCancel={handleCancel} />
    </Demo>
  );
}
