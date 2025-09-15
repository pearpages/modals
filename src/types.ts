import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

// Core Modal Types
export type ModalSize = 'auto' | 'md' | 'full';

export interface ModalEvent {
  id: string;
  type: 'open' | 'close';
  timestamp: number;
}

export type ModalEventHandler = (event: ModalEvent) => void;

// Modal System Configuration
export interface ModalSystemConfig {
  baseZIndex?: number;
  container?: HTMLElement;
}

// Core Modal Props
export interface ModalProps {
  /** Unique identifier for the modal within a ModalSystem instance */
  id: string;
  /** Optional CSS class name */
  className?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Children components (typically Modal.Content) */
  children: ReactNode;
}

// Modal Trigger Props
export interface ModalTriggerProps {
  /** Modal ID to open when triggered */
  target: string;
  /** Child element to render as trigger */
  children: ReactNode;
  /** Whether to render as child element */
  asChild?: boolean;
  /** Whether the trigger is disabled */
  disabled?: boolean;
  /** Optional CSS class name */
  className?: string;
}

// Modal Content Props
export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Size variant of the modal */
  size?: ModalSize;
  /** Whether to enable fade animations */
  animated?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Whether clicking backdrop closes topmost modal (default: true) */
  closeOnBackdrop?: boolean;
  /** Whether pressing Esc closes topmost modal (default: true) */
  closeOnEscape?: boolean;
  /** Callback fired when user interacts outside modal - call e.preventDefault() to block dismissal */
  onInteractOutside?: (e: { target: EventTarget; preventDefault(): void }) => void;
  /** Children components */
  children: ReactNode;
}

// Modal Subcomponent Props
export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Children components */
  children: ReactNode;
}

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Children components */
  children: ReactNode;
}

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Optional custom ID (auto-generated if not provided) */
  id?: string;
  /** Children components */
  children: ReactNode;
}

export interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Children components */
  children?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Children components */
  children: ReactNode;
}

// Modal Stack State
export interface ModalStackEntry {
  /** Whether the modal is currently open */
  open: boolean;
  /** Whether this modal is the topmost in the stack */
  isTop: boolean;
  /** Index position in the stack (for z-index calculation) */
  stackIndex: number;
  /** Dismiss behavior configuration */
  dismissConfig?: ModalDismissConfig;
}

// Modal Dismiss Configuration
export interface ModalDismissConfig {
  /** Whether clicking backdrop closes this modal (default: true) */
  closeOnBackdrop?: boolean;
  /** Whether pressing Esc closes this modal (default: true) */
  closeOnEscape?: boolean;
  /** Callback fired when user interacts outside modal */
  onInteractOutside?: (e: { target: EventTarget; preventDefault(): void }) => void;
}

export interface ModalStackRegistry {
  [id: string]: ModalStackEntry;
}

// Modal Stack Actions
export interface ModalStackActions {
  /** Open a modal by ID */
  open: () => void;
  /** Close a modal by ID */
  close: () => void;
  /** Current open state */
  isOpen: boolean;
}

export interface ModalStackAPI {
  [id: string]: ModalStackActions;
}

// Provider Context Types
export interface ModalProviderState {
  /** Registry of all modals and their states */
  registry: ModalStackRegistry;
  /** Ordered stack of open modal IDs */
  stack: string[];
  /** Base z-index for modal layering */
  baseZIndex: number;
}

export interface ModalProviderActions {
  /** Register a new modal */
  register: (id: string) => void;
  /** Unregister a modal */
  unregister: (id: string) => void;
  /** Open a modal */
  openModal: (id: string) => void;
  /** Close a modal */
  closeModal: (id: string) => void;
  /** Update dismiss configuration for a modal */
  updateDismissConfig: (id: string, config: ModalDismissConfig) => void;
  /** Check if a modal is registered */
  isRegistered: (id: string) => boolean;
  /** Get modal stack entry */
  getModalEntry: (id: string) => ModalStackEntry | undefined;
}

export interface ModalContextValue extends ModalProviderState, ModalProviderActions {}

// Modal Root Props
export interface ModalRootProps {
  /** Custom container element for portal rendering */
  container?: HTMLElement;
  /** Base z-index for modal layering */
  baseZIndex?: number;
}

// Modal Provider Props
export interface ModalProviderProps {
  /** Base z-index for modal layering */
  baseZIndex?: number;
  /** Children components */
  children: ReactNode;
}

// Modal System Props (combines Provider + Root)
export interface ModalSystemProps {
  /** Base z-index for modal layering */
  baseZIndex?: number;
  /** Custom container element for portal rendering */
  container?: HTMLElement;
  /** Children components */
  children: ReactNode;
}

// ID Constraints and Rules
export interface ModalIdConstraints {
  /** Modal IDs must be unique within a single ModalSystem instance */
  uniquePerSystem: true;
  /** Modal IDs must be non-empty strings */
  nonEmpty: true;
  /** Modal IDs should be URL-safe (alphanumeric, hyphens, underscores) */
  urlSafe: true;
}

// Focus Management Types
export interface FocusStackEntry {
  /** Modal ID */
  modalId: string;
  /** Last focused element before modal opened */
  lastFocusedElement: HTMLElement | null;
}

// Animation State Types
export type ModalAnimationState = 'closed' | 'opening' | 'open' | 'closing';

export interface AnimationConfig {
  /** Duration of fade transition in milliseconds */
  duration: number;
  /** CSS easing function */
  easing: string;
}

// Utility Types
export type ModalEventType = 'open' | 'close' | 'focus-trap' | 'escape' | 'backdrop-click';

export interface ModalEventDetail {
  id: string;
  type: ModalEventType;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// Error Types
export class ModalError extends Error {
  constructor(
    message: string,
    public modalId?: string,
    public errorCode?: string
  ) {
    super(message);
    this.name = 'ModalError';
  }
}

export class ModalIdConflictError extends ModalError {
  constructor(id: string) {
    super(`Modal with id "${id}" is already registered in this ModalSystem`, id, 'ID_CONFLICT');
    this.name = 'ModalIdConflictError';
  }
}

export class ModalNotFoundError extends ModalError {
  constructor(id: string) {
    super(`Modal with id "${id}" is not registered in this ModalSystem`, id, 'NOT_FOUND');
    this.name = 'ModalNotFoundError';
  }
}