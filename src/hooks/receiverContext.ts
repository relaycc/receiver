import { createContext } from 'react';
import { QueryClient } from '@tanstack/react-query';

export const receiverContext = createContext<QueryClient | undefined>(
  undefined
);
