import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { FetchSignerResult } from '@wagmi/core';
import mir from 'mini-iframe-rpc';

import '../../styles/app.css';
import { Signer } from '@relaycc/xmtp-worker';

enum EVENTS {
  OPEN = 'receiver:open',
  CLOSE = 'receiver:close',
  TOGGLE = 'receiver:toggle',
}

export const ReceiverIframe: FunctionComponent<{
  wallet: FetchSignerResult<Signer>;
}> = ({ wallet }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!window?.addEventListener) {
      return;
    }

    const handler = (e: Event) => {
      if (!e?.type) {
        return;
      }
      switch (e.type) {
        case EVENTS.OPEN:
          setIsOpen(true);
          break;
        case EVENTS.CLOSE:
          setIsOpen(false);
          break;
        case EVENTS.TOGGLE:
          setIsOpen((prev) => !prev);
      }
    };

    Object.values(EVENTS).forEach((event) => {
      window.addEventListener(event, handler);
    });

    return () => {
      Object.values(EVENTS).forEach((event) => {
        window.removeEventListener(event, handler);
      });
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const rpc = new mir();
    rpc.register('request', (args) => {
    console.log({args})
      return window.ethereum?.request(JSON.parse(args));
    });
  }, []);

  return (
    <motion.iframe
      id="frame"
      title="receiver"
      className="Iframe"
      key="receiver"
      animate={isOpen ? 'open' : 'closed'}
      initial="closed"
      variants={{
        closed: { opacity: 0, y: 4 },
        open: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      src="http://localhost:3001/"
      sandbox="allow-scripts allow-popups allow-same-origin allow-forms"></motion.iframe>
  );
};

export const LaunchButton: FunctionComponent = () => {
  const handler = useCallback(() => {
    if (!window?.dispatchEvent) {
      return;
    }

    window.dispatchEvent(new Event(EVENTS.TOGGLE));
  }, []);
  return (
    <>
      <ChatIcon handleClick={handler} />
    </>
  );
};

const ChatIcon = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <svg
      onClick={handleClick}
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
