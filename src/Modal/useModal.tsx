import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import type { ModalApi } from './types';

export const useModal = (): ModalApi => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
