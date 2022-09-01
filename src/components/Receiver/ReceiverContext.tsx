import React from 'react';

const ReceiverContext = React.createContext({
  setPeerAddress: (item: string) => ({ item })
  toggle: () => undefined,
  close: () => undefined,
});

export default ReceiverContext;
