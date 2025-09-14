import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from './useModal';
import type { ModalEntry, CloseReason } from './types';
import './index.scss';

interface ModalRootProps {
  className?: string;
}

interface FocusTrapProps {
  children: React.ReactNode;
  enabled?: boolean;
  initialFocus?: HTMLElement | null;
  returnFocus?: HTMLElement | null;
}

const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  enabled = true,
  initialFocus,
  returnFocus,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(returnFocus);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const originalReturnFocus =
      returnFocusRef.current || (document.activeElement as HTMLElement);

    // Focus the initial element or first focusable element
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable =
      initialFocus || (focusableElements[0] as HTMLElement);
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (firstFocusable) {
      firstFocusable.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      if (originalReturnFocus && document.body.contains(originalReturnFocus)) {
        originalReturnFocus.focus();
      }
    };
  }, [enabled, initialFocus]);

  return (
    <div className="modal-focus-trap" ref={containerRef}>
      {children}
    </div>
  );
};

interface ModalDialogProps {
  modal: ModalEntry;
  index: number;
  onClose: (reason: CloseReason) => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ modal, index, onClose }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.closeOnEsc !== false) {
        onClose('esc');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modal.closeOnEsc, modal.closeOnBackdrop, onClose, isClient]);

  // Scroll lock effect
  useEffect(() => {
    if (!isClient) return;

    const originalOverflow = document.body.style.overflow;
    if (modal.preventScroll !== false) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modal.preventScroll, isClient]);

  // Background inert effect
  useEffect(() => {
    if (!isClient || !modal.inertBackground) return;

    const siblings = Array.from(document.body.children).filter(
      (child) => !child.hasAttribute('data-modal-root'),
    );

    siblings.forEach((sibling) => {
      sibling.setAttribute('aria-hidden', 'true');
    });

    return () => {
      siblings.forEach((sibling) => {
        sibling.removeAttribute('aria-hidden');
      });
    };
  }, [modal.inertBackground, isClient]);

  const getSizeStyles = (size: typeof modal.size) => {
    if (!size) return {};

    if (typeof size === 'object' && 'maxWidth' in size) {
      return { maxWidth: `${size.maxWidth}px` };
    }

    const sizeMap = {
      sm: { maxWidth: '400px' },
      md: { maxWidth: '600px' },
      lg: { maxWidth: '800px' },
      xl: { maxWidth: '1200px' },
    };

    return sizeMap[size] || sizeMap.md;
  };

  const renderContent = () => {
    if (typeof modal.content === 'function') {
      return modal.content({ close: () => onClose('button'), id: modal.id });
    }
    return modal.content;
  };

  const labelledBy =
    modal.labelledBy || (modal.title ? `${modal.id}-title` : undefined);
  const describedBy = modal.describedBy;

  const backdropClasses = [
    'modal-backdrop',
    modal.animations?.backdropEnter && modal.state === 'open'
      ? modal.animations.backdropEnter
      : '',
    modal.animations?.backdropExit && modal.state === 'closing'
      ? modal.animations.backdropExit
      : '',
    index > 0 ? 'modal-backdrop--stacked' : '', // Add class for stacked modals
  ]
    .filter(Boolean)
    .join(' ');

  const dialogClasses = [
    'modal-dialog',
    modal.size && typeof modal.size === 'string' ? `modal-${modal.size}` : '',
    modal.animations?.enter && modal.state === 'open'
      ? modal.animations.enter
      : '',
    modal.animations?.exit && modal.state === 'closing'
      ? modal.animations.exit
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!isClient) return null;

  return createPortal(
    <div
      className={backdropClasses}
      data-modal-root
      data-backdrop
      data-state={modal.state}
      data-index={index}
      style={{ zIndex: 1000 + index * 10 }}
      onClick={(e) => {
        if (e.target === e.currentTarget && modal.closeOnBackdrop !== false) {
          onClose('backdrop');
        }
      }}
    >
      <FocusTrap
        enabled={modal.trapFocus !== false}
        initialFocus={modal.initialFocus}
        returnFocus={modal.returnFocus}
      >
        <div
          className={dialogClasses}
          role={modal.role || 'dialog'}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          aria-label={modal.ariaLabel}
          aria-modal="true"
          data-state={modal.state}
          data-size={typeof modal.size === 'string' ? modal.size : 'custom'}
          style={{
            ...getSizeStyles(modal.size),
            zIndex: 1000 + index * 10 + 1,
          }}
        >
          {modal.title && (
            <div className="modal-header">
              <h2 id={`${modal.id}-title`} className="modal-title">
                {modal.title}
              </h2>
              {modal.closeOnEsc !== false && (
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => onClose('button')}
                  aria-label="Close modal"
                >
                  ×
                </button>
              )}
            </div>
          )}
          <div className="modal-content">{renderContent()}</div>
        </div>
      </FocusTrap>
    </div>,
    modal.portalTarget || document.body,
  );
};

export const ModalRoot: React.FC<ModalRootProps> = ({ className }) => {
  const { close, subscribe } = useModal();
  const [stack, setStack] = useState<ModalEntry[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe((newStack) => {
      setStack([...newStack]);
    });
    return unsubscribe;
  }, [subscribe]);

  const handleClose = useCallback(
    (modal: ModalEntry) => {
      return (reason: CloseReason) => {
        close(modal.id, reason);
      };
    },
    [close],
  );

  if (stack.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {stack.map((modal, index) => (
        <ModalDialog
          key={modal.id}
          modal={modal}
          index={index}
          onClose={handleClose(modal)}
        />
      ))}
    </div>
  );
};
