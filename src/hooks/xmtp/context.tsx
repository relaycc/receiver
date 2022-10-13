import React, { createContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const receiverContext = createContext<QueryClient | undefined>(
  undefined
);

const queryClient = new QueryClient();

export const ReceiverProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient} context={receiverContext}>
      {children}
    </QueryClientProvider>
  );
};
