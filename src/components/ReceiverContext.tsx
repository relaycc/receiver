import React from 'react';

const ReceiverContext = React.createContext({
  toggle: () => {},
  close: () => {}
});

export default ReceiverContext;