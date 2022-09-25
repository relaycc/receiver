import React from 'react';
import { FunctionComponent } from 'react';
import { useReceiver, useRelay } from '../../hooks';

export interface InfoCardProps {
  variant:
    | 'invalid ENS'
    | 'no peer'
    | 'no xmtp client'
    | 'waiting for signature'
    | 'signature denied'
    | 'no messages'
    | 'no wallet'
    | 'new conversation';
  peerName?: string;
}

export const InfoCard: FunctionComponent<InfoCardProps> = ({
  variant,
  peerName,
}) => {
  const dispatch = useRelay((state) => state.dispatch);
  const wallet = useReceiver((state) => state.wallet);

  if (variant === 'invalid ENS') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">Could not resolve ENS name</div>
          <div className="InfoCard Text">
            {'Make sure to include the ".eth" suffix.'}
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'no wallet') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">Please connect a wallet</div>
          <div className="InfoCard Text">
            To sign in to XMTP, you will need a connected wallet first.
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'no peer') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">User not on network</div>
          <div className="InfoCard Text">
            This user is not on the XMTP messaging network yet.
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'no xmtp client') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">Initialize XMTP Client</div>
          <div className="InfoCard Text">
            To begin messaging, you must first initialize the XMTP client.
          </div>
          <div
            className="InfoCard Button"
            onClick={() => wallet && dispatch({ id: 'sign in', wallet })}>
            Initialize
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'waiting for signature') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">Initialize XMTP Client</div>
          <div className="InfoCard Text">
            <b>Initializing.</b>
          </div>
          <div className="InfoCard Text">
            To continue, please sign the wallet prompt.
          </div>
          <button className="InfoCard Button Disabled">Waiting...</button>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'signature denied') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">Initialize XMTP Client</div>
          <div className="InfoCard Text">
            <b>Initializing.</b>
          </div>
          <div className="InfoCard Text">
            Signature request cancelled. Try again...
          </div>
          <div
            className="InfoCard Button"
            onClick={() => wallet && dispatch({ id: 'sign in', wallet })}>
            Initialize
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'no messages') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">{'All Set  🎉'}</div>
          <div className="InfoCard Text">{`This is the beginning of your encrypted conversation with ${peerName}`}</div>
        </div>
      </div>
    );
  } else if (variant === 'new conversation') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Text">
            Only those who have previously signed into the XMTP network are
            reachable.
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else {
    throw new Error('We never should have got here!');
  }
};

export const BrandedFooter = () => {
  return (
    <footer className="InfoCard Footer">
      <h3 className="InfoCard WordMark">Check out</h3>
      <a
        className="InfoCard FooterLink"
        href="https://try.relay.cc"
        target="_blank"
        rel="noreferrer">
        <img
          style={{
            height: '33px',
            width: '33px',
          }}
          src="https://relay-receiver-prod.s3.amazonaws.com/smallLogo.png"
          alt="Relay Logo"
        />
      </a>
      <h3 style={{ margin: '0px 2px 0px 0px' }} className="InfoCard WordMark">
        on
      </h3>
      <a
        className="InfoCard FooterLink"
        href="https://github.com/relaycc/receiver"
        target="_blank"
        rel="noreferrer"
        style={{ transform: 'translateY(-2px)' }}>
        <svg viewBox="0 0 24 24" height={30} width={30}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
        </svg>
      </a>
    </footer>
  );
};
