import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

// Core Modal Types
export type ModalSize = 'auto' | 'md' | 'full';

// Core Modal Props
// `id` is omitted from the base type: HTMLAttributes declares it optional, and
// here it is required and addresses the modal in the stack rather than the DOM.
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /** Unique identifier for the modal within a ModalSystem instance */
  id: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Children components (typically Modal.Content) */
  children: ReactNode;
}

// Modal Trigger Props
// Renders a real <button> (or clones one via asChild) and spreads the rest of
// its props onto it, so it carries the full button attribute surface.
export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Modal ID to open when triggered */
  target: string;
  /** Child element to render as trigger */
  children: ReactNode;
  /** Whether to render as child element */
  asChild?: boolean;
}

// Modal Content Props
export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Render the given child in place of the dialog element, keeping the dialog
   * role, ARIA wiring, sizing and focus trap. Useful for making the dialog
   * itself a <form>.
   */
  asChild?: boolean;
  /** Size variant of the modal */
  size?: ModalSize;
  /** Whether to enable fade animations */
  animated?: boolean;
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
  /** Children components — an empty slot is valid */
  children?: ReactNode;
}

/**
 * `id` is inherited from HTMLAttributes. It is generated automatically when
 * omitted; setting it is how you take control of the aria-labelledby target.
 */
export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Children components */
  children: ReactNode;
}

/**
 * `id` is inherited from HTMLAttributes. It is generated automatically when
 * omitted; setting it is how you take control of the aria-describedby target.
 */
export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Children components */
  children: ReactNode;
}

export interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Children components — an empty slot is valid */
  children?: ReactNode;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Children components — an empty slot is valid */
  children?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to render as child element */
  asChild?: boolean;
  /** Children components — an empty slot is valid */
  children?: ReactNode;
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
  /**
   * True when the Modal has an `open` prop. A controlled modal owns its state:
   * every library path that would open or close it calls `onOpenChange`
   * instead, and the provider only follows the prop.
   */
  controlled: boolean;
  /** The Modal's onOpenChange callback, if any */
  onOpenChange?: (open: boolean) => void;
  /** Previously focused element before modal opened (for focus restoration) */
  previouslyFocusedElement?: HTMLElement | null;
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
/**
 * Return value of useModalStack().
 *
 * The functions take the modal id rather than the hook returning one object per
 * registered modal: an index signature would make `modals['tpyo'].open()`
 * type-check and then throw, and exposing `isOpen` as a value would force the
 * returned object to be rebuilt whenever any modal in the stack changes state.
 */
export interface ModalStackApi {
  /** Open a modal by ID */
  open: (id: string) => void;
  /** Close a modal by ID */
  close: (id: string) => void;
  /** Whether the given modal is currently open */
  isOpen: (id: string) => boolean;
  /** Full stack entry for the given modal, or undefined if not registered */
  getModal: (id: string) => ModalStackEntry | undefined;
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
  /** Record whether a modal is controlled, and its onOpenChange callback */
  updateControl: (id: string, controlled: boolean, onOpenChange?: (open: boolean) => void) => void;
  /**
   * Ask a modal to open. Controlled modals get `onOpenChange(true)` and nothing
   * else; uncontrolled modals open directly. Every library path that opens a
   * modal — Modal.Trigger, useModalStack().open — goes through here.
   */
  requestOpen: (id: string) => void;
  /**
   * Ask a modal to close. Controlled modals get `onOpenChange(false)` and
   * nothing else; uncontrolled modals close directly. Escape, backdrop clicks,
   * Modal.Close and useModalStack().close all go through here.
   */
  requestClose: (id: string) => void;
  /** Check if a modal is registered */
  isRegistered: (id: string) => boolean;
  /** Get modal stack entry */
  getModalEntry: (id: string) => ModalStackEntry | undefined;
}

export interface ModalContextValue extends ModalProviderState, ModalProviderActions {}

// Modal Root Props
// baseZIndex is deliberately not a prop here: ModalRoot and ModalContent both
// read it from the provider, so a value set on only one of them would put
// backdrops and dialogs in different layer bands.
export interface ModalRootProps {
  /** Custom container element for portal rendering */
  container?: HTMLElement;
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

// Modal Button Types
export type ModalButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
export type ModalButtonSize = 'small' | 'medium' | 'large';

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ModalButtonVariant;
  /** Size of the button */
  size?: ModalButtonSize;
  /** Show loading state with spinner; implies disabled */
  loading?: boolean;
  /** Use asChild pattern to compose with existing elements */
  asChild?: boolean;
  /** Button content */
  children: ReactNode;
}