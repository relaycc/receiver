import React from 'react';

const ReceiverContext = React.createContext({
  setPeerAddress: (item: string) => {},
  toggle: () => {},
});

export default ReceiverContext;