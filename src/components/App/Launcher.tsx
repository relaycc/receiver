import React, { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { useLaunch, useReceiver, useRelay } from '../../hooks';
import { Avatar } from '../Elements';
import { Signer } from '@ethersproject/abstract-signer';
<<<<<<< HEAD
import '../../styles/app.css'
=======
import '../../styles/app.css';
>>>>>>> 50829dc0f667d63dc00cb57cd06bef45b1264926

export interface LauncherProps {
  // TODO(achilles@relay.cc) We allow the user to pass in much more than a peer
  // address (ENS, Lens, etc), so we should name this variable accordingly. I
  // don't want to change the name until we at the very least have a good
  // migration guide process in place.
  peerAddress?: string | null;
  wallet?: Signer | null;
}

export const Launcher: FunctionComponent<LauncherProps> = ({
  peerAddress,
  wallet,
}) => {
  // Rename here because we want to think of the input as a handle internally,
  // even though the public prop is still called `peerAddress`.
  const inputHandle = peerAddress;
  const client = useRelay((state) => state.client);
  const dispatchRelay = useRelay((state) => state.dispatch);
  const pinnedConversations = useReceiver((state) => state.pinnedConversations);
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  const isOpen = useReceiver((state) => state.isOpen);
  const dispatchReceiver = useReceiver((state) => state.dispatch);
  const launch = useLaunch(wallet);

  const onClickLaunch = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      launch(inputHandle);
    }
  };

  useEffect(() => {
    if (client !== null) {
      dispatchRelay({ id: 'stream messages' });
    }
  }, [client]);

  return (
    <div className="Launcher Fixed">
      <ul className="Launcher Container">
        <button className="Launcher LaunchButton" onClick={onClickLaunch}>
          <ChatIcon />
        </button>
        {pinnedConversations.map((peerAddress) => (
          <div className="Launcher AvatarContainer" key={peerAddress}>
            <Avatar
              large={true}
              handle={peerAddress}
              onClick={() => {
                dispatchReceiver({
                  id: 'go to screen',
                  screen: { id: 'messages', peerAddress },
                });
                setIsOpen(true);
              }}
            />
            <div
              className="Launcher AvatarHoverDetails"
              onClick={() => {
                dispatchReceiver({
                  id: 'remove pinned conversation',
                  peerAddress,
                });
              }}>
              <CloseIcon />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

const ChatIcon = () => {
  return (
    <svg
      fill="white"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#5203fc"
      height={'24px'}
      width={'24px'}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      fill="black"
      viewBox="0 0 28 28"
      strokeWidth={2.5}
      stroke="black"
      height="28"
      width="28">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
