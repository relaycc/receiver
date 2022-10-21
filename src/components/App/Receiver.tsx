import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { receiverContext, ReceiverConfig, ReceiverContext } from '../../hooks';

const queryClient = new QueryClient();

export const Receiver = ({
  children,
  config,
}: {
  children: ReactNode;
  config?: ReceiverConfig;
}) => {
  return (
    <ReceiverContext.Provider value={{ config }}>
      <QueryClientProvider client={queryClient} context={receiverContext}>
        {children}
      </QueryClientProvider>
    </ReceiverContext.Provider>
  );
};
