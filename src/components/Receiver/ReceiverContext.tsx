import React from 'react';

const ReceiverContext = React.createContext({
  setPeerAddress: (item: string) => {},
  toggle: () => {},
  close: () => {}
});

export default ReceiverContext;