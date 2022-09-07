import React from 'react';
import { Messages as Header } from '../Header';
import { Messages as List } from '../Messages';

export const Messages = () => {
  return (
    <>
      <Header />
      <List
        peerAddress={'0xf89773CF7cf0B560BC5003a6963b98152D84A15a'}
        messages={[]}
      />
    </>
  );
};
