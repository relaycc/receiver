import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { receiverContext } from '../../hooks';
import { XmtpProvider } from '@relaycc/xmtp-hooks';

const queryClient = new QueryClient();

export const Provider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: { worker: Worker };
}) => {
  return (
    <XmtpProvider config={config}>
      <QueryClientProvider client={queryClient} context={receiverContext}>
        {children}
      </QueryClientProvider>
    </XmtpProvider>
  );
};
