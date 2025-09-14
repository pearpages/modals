import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModalContext, useModalDismissConfig } from "@/ModalProvider";

// Mock Modal components for demonstration (Task 5-7 implementations)
const MockModal: React.FC<{ 
  id: string; 
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  onInteractOutside?: (e: { target: EventTarget; preventDefault(): void }) => void;
}> = ({ 
  id, 
  children, 
  closeOnBackdrop, 
  closeOnEscape, 
  onInteractOutside 
}) => {
  const { registry, closeModal } = useModalContext();
  const modalState = registry[id];
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
  // Register dismiss configuration
  useModalDismissConfig(id, {
    closeOnBackdrop,
    closeOnEscape,
    onInteractOutside
  });
  
  // Find the portal element for this modal
  useEffect(() => {
    const element = document.querySelector(`[data-modal-portal="${id}"]`) as HTMLElement;
    setPortalElement(element);
  }, [id, modalState?.open]);
  
  if (!modalState?.open || !portalElement) return null;
  
  return createPortal(
    <div 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => {
        // Only close if this is the topmost modal and clicking outside content
        // Note: The actual closing logic is now handled by ModalRoot with proper configuration
        if (modalState.isTop && e.target === e.currentTarget) {
          // This click will be handled by ModalRoot's backdrop click handler
        }
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: '500px',
          margin: '1rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from bubbling
      >
        {children}
        <button 
          onClick={() => closeModal(id)}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#f5f5f5',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>,
    portalElement
  );
};

export { MockModal };
