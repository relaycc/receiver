import React, { FunctionComponent, useState } from 'react';
import { InfoCard } from './InfoCard';
import { isEnsName, isLensName, isEthAddress } from '../../hooks';

export interface NewConversationProps {
  onClickCreate: (peerAddress: string) => unknown;
}

export const NewConversation: FunctionComponent<NewConversationProps> = ({
  onClickCreate,
}) => {
  const [peerAddress, setPeerAddress] = useState('');
  const [isError, setisError] = useState(false);

  return (
    <div className="NewConversation NewMessage">
      <form
        className="NewConversation Form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !isEnsName(peerAddress) &&
            !isEthAddress(peerAddress) &&
            !isLensName(peerAddress)
          ) {
            setisError(true);
          } else {
            onClickCreate(peerAddress);
          }
        }}>
        {isError && (
          <span className="NewConversation ErrorMessage">
            Please enter a valid handle...
          </span>
        )}
        <input
          className="NewConversation Input"
          autoFocus={true}
          placeholder="Enter an ENS name, Lens handle, or ETH address..."
          type="text"
          spellCheck="false"
          autoComplete="off"
          autoCorrect="false"
          autoCapitalize="false"
          value={peerAddress}
          onChange={(e) => {
            setisError(false);
            setPeerAddress(e.currentTarget.value);
          }}
        />
        <button className="NewConversation Button" type="submit">
          Create a New Conversation
        </button>
      </form>
      <InfoCard variant={'new conversation'} />
    </div>
  );
};
