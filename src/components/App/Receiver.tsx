import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { receiverContext } from '../../hooks';

const queryClient = new QueryClient();

export const Receiver = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient} context={receiverContext}>
      {children}
    </QueryClientProvider>
  );
};
