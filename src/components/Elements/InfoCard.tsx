import React from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
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
      <FullMiddleSection>
        <CardContainer>
          <Title>Could not resolve ENS name</Title>
          <div className="InfoCard Text">
            {'Make sure to include the ".eth" suffix.'}
          </div>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no wallet') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>Please connect a wallet</Title>
          <div className="InfoCard Text">
            To sign in to XMTP, you will need a connected wallet first.
          </div>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no peer') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>User not on network</Title>
          <div className="InfoCard Text">
            This user is not on the XMTP messaging network yet.
          </div>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no xmtp client') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>Initialize XMTP Client</Title>
          <div className="InfoCard Text">
            To begin messaging, you must first initialize the XMTP client.
          </div>
          <Button onClick={() => wallet && dispatch({ id: 'sign in', wallet })}>
            Initialize
          </Button>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'waiting for signature') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>Initialize XMTP Client</Title>
          <div className="InfoCard Text">
            <b>Initializing.</b>
          </div>
          <div className="InfoCard Text">
            To continue, please sign the wallet prompt.
          </div>
          <DisabledButton>Waiting...</DisabledButton>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'signature denied') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>Initialize XMTP Client</Title>
          <div className="InfoCard Text">
            <b>Initializing.</b>
          </div>
          <div className="InfoCard Text">
            Signature request cancelled. Try again...
          </div>
          <Button onClick={() => wallet && dispatch({ id: 'sign in', wallet })}>
            Initialize
          </Button>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no messages') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>{'All Set  🎉'}</Title>
          <div className="InfoCard Text">{`This is the beginning of your encrypted conversation with ${peerName}`}</div>
        </CardContainer>
      </FullMiddleSection>
    );
  } else if (variant === 'new conversation') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <div className="InfoCard Text">
            Only those who have previously signed into the XMTP network are
            reachable.
          </div>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
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
            height: '30px',
            width: '30px',
          }}
          src="https://relay-receiver-prod.s3.amazonaws.com/smallLogo.png"
          alt="Relay Logo"
        />
      </a>
      <a
        className="InfoCard FooterLink"
        href="https://docs.relay.cc/relay/relay-receiver/overview"
        target="_blank"
        rel="noreferrer">
        <h3 className="InfoCard WordMark">Relay Receiver</h3>
      </a>
    </footer>
  );
};

export const FullMiddleSection = styled.div`
  &&& {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export const CardContainer = styled.div`
  &&& {
    background: #fbfaff;
    border: 1px dashed #a6a6a6;
    border-radius: 4px;
    width: 227px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-wrap: break-word;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export const Title = styled.div`
  &&& {
    color: #686868;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e4e4;
  }
`;

export const Button = styled.div`
  &&& {
    padding: 8px 12px;
    border: 1px solid rgba(55, 41, 125, 0.5);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: center;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    background: #5203fc;
    font-size: 14px;
    color: white;
    transition: all 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;
export const DisabledButton = styled(Button)`
  filter: brightness(150%);
`;
