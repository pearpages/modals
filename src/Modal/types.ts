export type ModalId = string;
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | { maxWidth: number };
export type CloseReason = 'esc' | 'backdrop' | 'button' | 'programmatic' | 'unmount' | 'route-change';

export interface ModalOptions {
  id?: ModalId;
  title?: string;
  role?: 'dialog' | 'alertdialog';
  size?: ModalSize;
  ariaLabel?: string;
  labelledBy?: string;
  describedBy?: string;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  initialFocus?: HTMLElement | null;
  returnFocus?: HTMLElement | null;
  trapFocus?: boolean;
  inertBackground?: boolean;
  preventScroll?: boolean;
  portalTarget?: HTMLElement;
  onClose?: (reason: CloseReason) => void;
  onOpen?: () => void;
  animations?: {
    enter?: string;
    exit?: string;
    backdropEnter?: string;
    backdropExit?: string;
    durationMs?: number;
  };
}

export interface OpenPayload extends ModalOptions {
  content: React.ReactNode | ((ctx: { close: () => void; id: ModalId }) => React.ReactNode);
}

export interface ModalEntry extends OpenPayload {
  id: ModalId;
  state: 'open' | 'closing';
  openedAt: number;
}

export interface ModalApi {
  open: (payload: OpenPayload) => ModalId;
  close: (id?: ModalId, reason?: CloseReason) => void;
  replace: (id: ModalId, next: OpenPayload) => void;
  update: (id: ModalId, patch: Partial<OpenPayload>) => void;
  isOpen: (id: ModalId) => boolean;
  subscribe: (fn: (stack: ModalEntry[]) => void) => () => void;
}
