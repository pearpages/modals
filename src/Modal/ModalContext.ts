import { createContext } from 'react';
import type { ModalApi } from './types';

export const ModalContext = createContext<ModalApi | null>(null);
