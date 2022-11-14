import React from 'react';
import { FunctionComponent, useCallback } from 'react';
import { useReceiver, useXmtp, useStartClient } from '../../hooks';
import { Discord, Github, Mirror, Twitter } from './Icons';

export interface InfoCardProps {
  variant:
    | 'invalid ENS'
    | 'no peer'
    | 'no xmtp client'
    | 'waiting for signature'
    | 'signature denied'
    | 'no messages'
    | 'no wallet'
    | 'new conversation'
    | 'invalid handle'
    | 'no conversations'
    | 'no pinned conversations'
    | 'no ignored conversations'
    | 'no groups'
    | 'sign in';
  handle?: string | null;
}

export const InfoCard: FunctionComponent<InfoCardProps> = ({
  variant,
  handle,
}) => {
  const wallet = useXmtp((state) => state.wallet);
  const signIn = useStartClient();

  const dispatch = useReceiver((state) => state.dispatch);

  const goBack = useCallback(() => {
    dispatch({ id: 'go back screen' });
  }, [dispatch]);

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
  } else if (variant === 'invalid handle') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">Address Lookup Failed</div>
          <div className="InfoCard Text">
            Could not find an ETH address for <em>{handle}</em>. Currently
            supported ID types are ENS name, Lens handle, or Ethereum address.
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
            onClick={() => {
              if (wallet === null) {
                return;
              } else {
                signIn.mutate({ wallet });
              }
            }}>
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
            Signature request cancelled. Try again...
          </div>
          <div
            className="InfoCard Button"
            onClick={() => {
              if (wallet === null) {
                return;
              } else {
                signIn.mutate({ wallet });
              }
            }}>
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
          <div className="InfoCard Text">{`This is the beginning of your encrypted conversation`}</div>
        </div>
      </div>
    );
  } else if (variant === 'no conversations') {
    return (
      <div className="InfoCard CardContainer">
        <div className="InfoCard Text">
          It looks like this is your first time on the XMTP network. Try sending
          a message to Relay, or click the icon in the corner to start a new
          conversation.
        </div>
      </div>
    );
  } else if (variant === 'no pinned conversations') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Text">
            {
              "It looks you haven't pinned any conversations yet. You can pin a conversation by clicking the pin icon in the top right corner of any conversation window."
            }
          </div>
          <div className="InfoCard Button" onClick={goBack}>
            Go Back
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'no groups') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Text">
            {
              "It looks like you haven't joined any groups yet. You can join a group via the user interface."
            }
          </div>
          <div className="InfoCard Button" onClick={goBack}>
            Go Back
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'no ignored conversations') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Text">
            {
              "It looks you haven't ignored any conversations yet. You can ignore a conversation by clicking the eye icon in the top right corner of any conversation window."
            }
          </div>
          <div className="InfoCard Button" onClick={goBack}>
            Go Back
          </div>
        </div>
        <BrandedFooter />
      </div>
    );
  } else if (variant === 'sign in') {
    return (
      <div className="InfoCard FullMiddleSection">
        <div className="InfoCard CardContainer">
          <div className="InfoCard Title">{'Join the Relay Community 🎉'}</div>
          <div className="InfoCard Text">
            {
              "Whether you're a developer, designer, or an early adopter, we'd love to have you. Let's build the future of messaging together."
            }
          </div>
          <nav className="FooterNav">
            <a href="https://relay.cc" target="_blank" rel="noreferrer">
              <img
                style={{ display: 'inline-block' }}
                src="https://relay-receiver-prod.s3.amazonaws.com/smallLogoBlack.png"
                alt="Relay Logo"
                className="MenuScreen SocialIcon RelayLogo"
              />
            </a>
            <a
              href="https://github.com/relaycc/receiver"
              target="_blank"
              rel="noreferrer">
              <Github className="SocialIcon" />
            </a>
            <a
              href="https://twitter.com/relay_eth"
              target="_blank"
              rel="noreferrer">
              <Twitter className="SocialIcon" />
            </a>
            <a
              href="https://discord.com/invite/DTMKf63ZSf"
              target="_blank"
              rel="noreferrer">
              <Discord className="SocialIcon" />
            </a>
            <a
              href="https://mirror.xyz/relaycc.eth"
              target="_blank"
              rel="noreferrer">
              <Mirror className="SocialIcon Mirror" />
            </a>
          </nav>
        </div>
      </div>
    );
  } else {
    throw new Error('We never should have got here!');
  }
};

export const BrandedFooter = () => {
  return (
    <footer className="InfoCard Footer">
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
      <h3 className="InfoCard WordMark">Relay is open-source on</h3>
      <a
        className="InfoCard FooterLink"
        href="https://github.com/relaycc/receiver"
        target="_blank"
        rel="noreferrer"
        style={{ transform: 'translateY(-2px)' }}>
        <svg
          viewBox="0 0 24 24"
          height={30}
          width={30}
          style={{ marginLeft: '3px' }}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
        </svg>
      </a>
    </footer>
  );
};
