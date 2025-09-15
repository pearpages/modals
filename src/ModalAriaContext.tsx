import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

/**
 * Context for managing aria-labelledby and aria-describedby IDs within a Modal
 */
interface ModalAriaContextValue {
  /** ID of the modal title for aria-labelledby */
  titleId?: string;
  /** ID of the modal description for aria-describedby */
  descriptionId?: string;
  /** Register a title ID */
  registerTitleId: (id: string) => void;
  /** Register a description ID */
  registerDescriptionId: (id: string) => void;
  /** Unregister a title ID */
  unregisterTitleId: (id: string) => void;
  /** Unregister a description ID */
  unregisterDescriptionId: (id: string) => void;
}

const ModalAriaContext = createContext<ModalAriaContextValue | null>(null);

/**
 * Provider for modal aria context - should be placed within each Modal component
 */
export const ModalAriaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [titleId, setTitleId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const registerTitleId = useCallback((id: string) => {
    setTitleId(id);
  }, []);

  const registerDescriptionId = useCallback((id: string) => {
    setDescriptionId(id);
  }, []);

  const unregisterTitleId = useCallback((id: string) => {
    setTitleId(prev => prev === id ? undefined : prev);
  }, []);

  const unregisterDescriptionId = useCallback((id: string) => {
    setDescriptionId(prev => prev === id ? undefined : prev);
  }, []);

  const value: ModalAriaContextValue = {
    titleId,
    descriptionId,
    registerTitleId,
    registerDescriptionId,
    unregisterTitleId,
    unregisterDescriptionId
  };

  return (
    <ModalAriaContext.Provider value={value}>
      {children}
    </ModalAriaContext.Provider>
  );
};

/**
 * Hook to access modal aria context
 */
export const useModalAria = (): ModalAriaContextValue => {
  const context = useContext(ModalAriaContext);
  if (!context) {
    throw new Error('useModalAria must be used within a ModalAriaProvider');
  }
  return context;
};