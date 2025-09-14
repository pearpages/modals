import React, {
  useReducer,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { ModalContext } from './ModalContext';
import type {
  ModalId,
  CloseReason,
  OpenPayload,
  ModalEntry,
  ModalApi,
} from './types';

type ModalAction =
  | { type: 'OPEN'; payload: ModalEntry }
  | { type: 'CLOSE'; id: ModalId; reason: CloseReason }
  | { type: 'CLOSE_TOP'; reason: CloseReason }
  | { type: 'REPLACE'; id: ModalId; payload: ModalEntry }
  | { type: 'UPDATE'; id: ModalId; patch: Partial<OpenPayload> }
  | { type: 'SET_CLOSING'; id: ModalId }
  | { type: 'REMOVE'; id: ModalId };

interface ModalState {
  stack: ModalEntry[];
  nextId: number;
}

const initialState: ModalState = {
  stack: [],
  nextId: 1,
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.stack.find(
        (modal) => modal.id === action.payload.id,
      );
      if (existing) {
        console.warn(`Modal with id "${action.payload.id}" is already open`);
        return state;
      }
      return {
        ...state,
        stack: [...state.stack, action.payload],
        nextId: state.nextId + 1,
      };
    }

    case 'CLOSE': {
      const modal = state.stack.find((m) => m.id === action.id);
      if (!modal) return state;

      modal.onClose?.(action.reason);

      return {
        ...state,
        stack: state.stack.map((m) =>
          m.id === action.id ? { ...m, state: 'closing' as const } : m,
        ),
      };
    }

    case 'CLOSE_TOP': {
      if (state.stack.length === 0) return state;

      const topModal = state.stack[state.stack.length - 1];
      topModal.onClose?.(action.reason);

      return {
        ...state,
        stack: state.stack.map((m, index) =>
          index === state.stack.length - 1
            ? { ...m, state: 'closing' as const }
            : m,
        ),
      };
    }

    case 'REPLACE': {
      const index = state.stack.findIndex((m) => m.id === action.id);
      if (index === -1) return state;

      const newStack = [...state.stack];
      newStack[index] = action.payload;

      return {
        ...state,
        stack: newStack,
      };
    }

    case 'UPDATE': {
      const index = state.stack.findIndex((m) => m.id === action.id);
      if (index === -1) return state;

      const newStack = [...state.stack];
      newStack[index] = { ...newStack[index], ...action.patch };

      return {
        ...state,
        stack: newStack,
      };
    }

    case 'SET_CLOSING': {
      return {
        ...state,
        stack: state.stack.map((m) =>
          m.id === action.id ? { ...m, state: 'closing' as const } : m,
        ),
      };
    }

    case 'REMOVE': {
      return {
        ...state,
        stack: state.stack.filter((m) => m.id !== action.id),
      };
    }

    default:
      return state;
  }
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const subscriptions = useRef<Set<(stack: ModalEntry[]) => void>>(new Set());

  // Notify subscribers whenever state changes
  useEffect(() => {
    subscriptions.current.forEach((fn) => fn(state.stack));
  }, [state.stack]);

  const generateId = useCallback(() => `modal-${state.nextId}`, [state.nextId]);

  const open = useCallback(
    (payload: OpenPayload): ModalId => {
      const id = payload.id || generateId();
      const entry: ModalEntry = {
        ...payload,
        id,
        state: 'open',
        openedAt: Date.now(),
      };

      dispatch({ type: 'OPEN', payload: entry });

      // Call onOpen after render
      setTimeout(() => {
        entry.onOpen?.();
      }, 0);

      return id;
    },
    [generateId],
  );

  const close = useCallback(
    (id?: ModalId, reason: CloseReason = 'programmatic') => {
      if (id) {
        dispatch({ type: 'CLOSE', id, reason });
      } else {
        dispatch({ type: 'CLOSE_TOP', reason });
      }

      // Remove after animation delay
      const modal = id
        ? state.stack.find((m) => m.id === id)
        : state.stack[state.stack.length - 1];

      const delay = modal?.animations?.durationMs || 200;
      setTimeout(() => {
        dispatch({ type: 'REMOVE', id: modal?.id || '' });
      }, delay);
    },
    [state.stack],
  );

  const replace = useCallback((id: ModalId, next: OpenPayload) => {
    const entry: ModalEntry = {
      ...next,
      id,
      state: 'open',
      openedAt: Date.now(),
    };

    dispatch({ type: 'REPLACE', id, payload: entry });
  }, []);

  const update = useCallback((id: ModalId, patch: Partial<OpenPayload>) => {
    dispatch({ type: 'UPDATE', id, patch });
  }, []);

  const isOpen = useCallback(
    (id: ModalId): boolean => {
      return state.stack.some(
        (modal) => modal.id === id && modal.state === 'open',
      );
    },
    [state.stack],
  );

  const subscribe = useCallback(
    (fn: (stack: ModalEntry[]) => void) => {
      subscriptions.current.add(fn);
      // Call immediately with current state
      fn(state.stack);
      return () => subscriptions.current.delete(fn);
    },
    [state.stack],
  );

  const api = useMemo<ModalApi>(
    () => ({
      open,
      close,
      replace,
      update,
      isOpen,
      subscribe,
    }),
    [open, close, replace, update, isOpen, subscribe],
  );

  return <ModalContext.Provider value={api}>{children}</ModalContext.Provider>;
};
