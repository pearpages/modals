import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalRootProps } from './types';
import { useModalContext } from './ModalProvider';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useInertOutside } from './useInertOutside';
import { useVisualViewport } from './useVisualViewport';

// SSR-safe check for client environment
const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

export const ModalRoot: React.FC<ModalRootProps> = ({ container }) => {
  const isClient = useIsClient();
  // baseZIndex comes from the provider only. ModalContent reads the same value,
  // which is what keeps a backdrop and its dialog in the same layer band.
  const { stack, registry, baseZIndex, requestClose } = useModalContext();

  // Lock body scroll when any modal is open
  const hasOpenModals = stack.length > 0;
  useBodyScrollLock(hasOpenModals);

  // Hide everything outside the modal root from assistive technology and the
  // tab order. The root div mounts on the same commit that makes the stack
  // non-empty, so the ref is populated by the time this effect runs.
  const rootRef = useRef<HTMLDivElement>(null);
  useInertOutside(rootRef, hasOpenModals);

  // Follow the software keyboard on iOS: a fixed element is laid out against
  // the layout viewport, which the keyboard covers rather than shrinks.
  useVisualViewport(rootRef, hasOpenModals);

  // Handle escape key events
  useEffect(() => {
    if (!isClient || stack.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const topmostModalId = stack[stack.length - 1];
        const topmostModal = registry[topmostModalId];
        
        if (topmostModal?.dismissConfig?.closeOnEscape !== false) {
          // Default is true, so close unless explicitly set to false
          event.preventDefault();
          event.stopPropagation();
          
          // Call onInteractOutside if provided
          if (topmostModal.dismissConfig?.onInteractOutside) {
            const preventClose = { prevented: false };
            const interactEvent = {
              target: event.target as EventTarget,
              preventDefault: () => { preventClose.prevented = true; }
            };
            
            topmostModal.dismissConfig.onInteractOutside(interactEvent);
            
            // Only close if preventDefault wasn't called
            if (!preventClose.prevented) {
              requestClose(topmostModalId);
            }
          } else {
            requestClose(topmostModalId);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isClient, stack, registry, requestClose]);

  // SSR safety: return null on server
  if (!isClient) {
    return null;
  }


  // Use provided container or default to document.body
  const portalContainer = container || document.body;

  // Only render if we have open modals
  if (stack.length === 0) {
    return null;
  }

  // Handler for backdrop clicks - only topmost modal should close
  const handleBackdropClick = (event: React.MouseEvent) => {
    // Only handle clicks on the backdrop itself, not its children
    if (event.target !== event.currentTarget) {
      return;
    }

    if (stack.length > 0) {
      const topmostModalId = stack[stack.length - 1];
      const topmostModal = registry[topmostModalId];
      
      if (topmostModal?.dismissConfig?.closeOnBackdrop !== false) {
        // Default is true, so close unless explicitly set to false
        
        // Call onInteractOutside if provided
        if (topmostModal.dismissConfig?.onInteractOutside) {
          const preventClose = { prevented: false };
          const interactEvent = {
            target: event.target as EventTarget,
            preventDefault: () => { preventClose.prevented = true; }
          };
          
          topmostModal.dismissConfig.onInteractOutside(interactEvent);
          
          // Only close if preventDefault wasn't called
          if (!preventClose.prevented) {
            requestClose(topmostModalId);
          }
        } else {
          requestClose(topmostModalId);
        }
      }
    }
  };

  return createPortal(
    <div 
      id="modal-root"
      ref={rootRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none', // Container doesn't interfere with events
        zIndex: baseZIndex
      }}
    >
      {/* Render portal containers for each open modal with z-index = baseZIndex + stackIndex (architecture.md › Stacking) */}
      {stack.map((modalId) => {
        const entry = registry[modalId];
        if (!entry || !entry.open) return null;

        const isTopmost = entry.isTop;

        return (
          <div
            key={modalId}
            className="modalBackdrop"
            style={{
              zIndex: baseZIndex + entry.stackIndex, // architecture.md › Stacking
              pointerEvents: isTopmost ? 'auto' : 'none'
            }}
            onClick={isTopmost ? handleBackdropClick : undefined}
            data-modal-backdrop={isTopmost ? "true" : "false"}
            data-state="open" // For CSS animations
          >
            {/* Content portal container - where ModalContent will render */}
            <div
              data-modal-portal={modalId}
              data-is-top={entry.isTop}
              style={{
                // Allow flexbox centering from backdrop
                display: 'contents' // This allows the modal to participate in backdrop's flex layout
              }}
            />
          </div>
        );
      })}
    </div>, 
    portalContainer
  );
};

// Utility hook to get the portal container for a specific modal
export const useModalPortal = (modalId: string): HTMLElement | null => {
  const isClient = useIsClient();
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isClient) return;

    const findPortal = () => {
      const element = document.querySelector(`[data-modal-portal="${modalId}"]`) as HTMLElement;
      setPortalElement(element);
    };

    // Initial check
    findPortal();

    // Set up observer to watch for portal creation/removal
    const observer = new MutationObserver(findPortal);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-modal-portal']
    });

    return () => {
      observer.disconnect();
    };
  }, [modalId, isClient]);

  return portalElement;
};
