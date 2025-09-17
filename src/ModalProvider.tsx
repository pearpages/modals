import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef, ReactNode } from 'react';
import { 
  ModalContextValue, 
  ModalProviderProps, 
  ModalStackRegistry, 
  ModalStackEntry,
  ModalDismissConfig
} from './types';

interface ModalProviderState {
  registry: ModalStackRegistry;
  stack: string[];
  baseZIndex: number;
}

type ModalAction = 
  | { type: 'REGISTER'; id: string }
  | { type: 'UNREGISTER'; id: string }
  | { type: 'OPEN'; id: string }
  | { type: 'CLOSE'; id: string }
  | { type: 'UPDATE_DISMISS_CONFIG'; id: string; config: ModalDismissConfig }
  | { type: 'UPDATE_ON_OPEN_CHANGE'; id: string; onOpenChange?: (open: boolean) => void };

const modalReducer = (state: ModalProviderState, action: ModalAction): ModalProviderState => {
  switch (action.type) {
    case 'REGISTER': {
      const { id } = action;
      if (state.registry[id]) {
        console.warn(`Modal with id "${id}" is already registered`);
        return state;
      }
      return {
        ...state,
        registry: {
          ...state.registry,
          [id]: { open: false, isTop: false, stackIndex: -1 }
        }
      };
    }

    case 'UNREGISTER': {
      const { id } = action;
      const newRegistry = { ...state.registry };
      delete newRegistry[id];
      const newStack = state.stack.filter(stackId => stackId !== id);
      
      // Recalculate stack indices and top status
      const updatedRegistry = { ...newRegistry };
      newStack.forEach((stackId, index) => {
        if (updatedRegistry[stackId]) {
          updatedRegistry[stackId] = {
            ...updatedRegistry[stackId],
            stackIndex: index,
            isTop: index === newStack.length - 1
          };
        }
      });

      return {
        ...state,
        registry: updatedRegistry,
        stack: newStack
      };
    }

    case 'OPEN': {
      const { id } = action;
      if (!state.registry[id]) {
        console.warn(`Cannot open modal "${id}" - not registered`);
        return state;
      }

      if (state.registry[id].open) {
        return state; // Already open
      }

      const newStack = [...state.stack, id];
      const newRegistry = { ...state.registry };

      // Store the currently focused element for the modal being opened
      const previouslyFocusedElement = document.activeElement as HTMLElement || null;

      // Update all modals in stack
      newStack.forEach((stackId, index) => {
        if (newRegistry[stackId]) {
          newRegistry[stackId] = {
            ...newRegistry[stackId],
            open: true,
            stackIndex: index,
            isTop: index === newStack.length - 1,
            // Only set previouslyFocusedElement for the modal being opened
            ...(stackId === id && { previouslyFocusedElement })
          };
        }
      });

      return {
        ...state,
        registry: newRegistry,
        stack: newStack
      };
    }

    case 'CLOSE': {
      const { id } = action;
      if (!state.registry[id] || !state.registry[id].open) {
        return state; // Not open
      }

      const modalToClose = state.registry[id];
      const newStack = state.stack.filter(stackId => stackId !== id);
      const newRegistry = { ...state.registry };

      // Restore focus to the previously focused element (with a delay to ensure DOM is updated)
      if (modalToClose.previouslyFocusedElement && typeof modalToClose.previouslyFocusedElement.focus === 'function') {
        setTimeout(() => {
          modalToClose.previouslyFocusedElement?.focus();
        }, 0);
      }

      // Close the specific modal
      newRegistry[id] = {
        ...newRegistry[id],
        open: false,
        isTop: false,
        stackIndex: -1,
        previouslyFocusedElement: null // Clear the reference
      };

      // Update remaining stack
      newStack.forEach((stackId, index) => {
        if (newRegistry[stackId]) {
          newRegistry[stackId] = {
            ...newRegistry[stackId],
            stackIndex: index,
            isTop: index === newStack.length - 1
          };
        }
      });

      return {
        ...state,
        registry: newRegistry,
        stack: newStack
      };
    }

    case 'UPDATE_DISMISS_CONFIG': {
      const { id, config } = action;
      if (!state.registry[id]) {
        console.warn(`Cannot update dismiss config for modal "${id}" - not registered`);
        return state;
      }

      return {
        ...state,
        registry: {
          ...state.registry,
          [id]: {
            ...state.registry[id],
            dismissConfig: config
          }
        }
      };
    }

    case 'UPDATE_ON_OPEN_CHANGE': {
      const { id, onOpenChange } = action;
      if (!state.registry[id]) {
        console.warn(`Cannot update onOpenChange for modal "${id}" - not registered`);
        return state;
      }

      return {
        ...state,
        registry: {
          ...state.registry,
          [id]: {
            ...state.registry[id],
            onOpenChange
          }
        }
      };
    }

    default:
      return state;
  }
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: React.FC<ModalProviderProps> = ({ 
  baseZIndex = 1000, 
  children 
}) => {
  const [state, dispatch] = useReducer(modalReducer, {
    registry: {},
    stack: [],
    baseZIndex
  });

  const register = useCallback((id: string) => {
    dispatch({ type: 'REGISTER', id });
  }, []);

  const unregister = useCallback((id: string) => {
    dispatch({ type: 'UNREGISTER', id });
  }, []);

  const openModal = useCallback((id: string) => {
    dispatch({ type: 'OPEN', id });
  }, []);

  const closeModal = useCallback((id: string) => {
    dispatch({ type: 'CLOSE', id });
  }, []);

  const updateDismissConfig = useCallback((id: string, config: ModalDismissConfig) => {
    dispatch({ type: 'UPDATE_DISMISS_CONFIG', id, config });
  }, []);

  const updateOnOpenChange = useCallback((id: string, onOpenChange?: (open: boolean) => void) => {
    dispatch({ type: 'UPDATE_ON_OPEN_CHANGE', id, onOpenChange });
  }, []);

  const isRegistered = useCallback((id: string) => {
    return id in state.registry;
  }, [state.registry]);

  const getModalEntry = useCallback((id: string): ModalStackEntry | undefined => {
    return state.registry[id];
  }, [state.registry]);

  const contextValue: ModalContextValue = {
    ...state,
    register,
    unregister,
    openModal,
    closeModal,
    updateDismissConfig,
    updateOnOpenChange,
    isRegistered,
    getModalEntry
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

/**
 * Hook to register dismiss configuration for a modal content component
 * This should be called by Modal.Content components to configure their dismiss behavior
 */
export const useModalDismissConfig = (
  modalId: string, 
  config: {
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    onInteractOutside?: (e: { target: EventTarget; preventDefault(): void }) => void;
  }
) => {
  const { updateDismissConfig } = useModalContext();
  const onInteractOutsideRef = useRef(config.onInteractOutside);
  
  // Update the ref whenever the function changes
  useEffect(() => {
    onInteractOutsideRef.current = config.onInteractOutside;
  });
  
  useEffect(() => {
    const dismissConfig = {
      closeOnBackdrop: config.closeOnBackdrop ?? true, // Default to true
      closeOnEscape: config.closeOnEscape ?? true,     // Default to true
      onInteractOutside: onInteractOutsideRef.current ? (e: { target: EventTarget; preventDefault(): void }) => {
        onInteractOutsideRef.current?.(e);
      } : undefined
    };
    
    updateDismissConfig(modalId, dismissConfig);
  }, [modalId, config.closeOnBackdrop, config.closeOnEscape, updateDismissConfig]);
};