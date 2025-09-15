import React, { createContext, useContext } from 'react';

export interface ModalIdContextValue {
  modalId: string;
}

const ModalIdContext = createContext<ModalIdContextValue | undefined>(undefined);

export const ModalIdProvider: React.FC<{ modalId: string; children: React.ReactNode }> = ({
  modalId,
  children
}) => {
  return (
    <ModalIdContext.Provider value={{ modalId }}>
      {children}
    </ModalIdContext.Provider>
  );
};

export const useModalId = (): string => {
  const context = useContext(ModalIdContext);
  if (!context) {
    throw new Error('useModalId must be used within a Modal component');
  }
  return context.modalId;
};