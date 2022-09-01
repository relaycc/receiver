import React from 'react';

export interface ReceiverContextType {
  setPeerAddress: (item: string) => unknown;
  toggle: () => unknown;
  close: () => unknown;
}

const ReceiverContext = React.createContext<ReceiverContextType>({
  setPeerAddress: (item: string) => item,
  toggle: () => undefined,
  close: () => undefined,
});

export default ReceiverContext;
