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
    | 'no wallet';
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
          <Text>{'Make sure to include the ".eth" suffix.'}</Text>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no wallet') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>Please connect a wallet</Title>
          <Text>
            To sign in to XMTP, you will need a connected wallet first.
          </Text>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no peer') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>User not on network</Title>
          <Text>This user is not on the XMTP messaging network yet.</Text>
        </CardContainer>
        <BrandedFooter />
      </FullMiddleSection>
    );
  } else if (variant === 'no xmtp client') {
    return (
      <FullMiddleSection>
        <CardContainer>
          <Title>Initialize XMTP Client</Title>
          <Text>
            To begin messaging, you must first initialize the XMTP client.
          </Text>
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
          <Text>
            <b>Initializing.</b>
          </Text>
          <Text>To continue, please sign the wallet prompt.</Text>
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
          <Text>
            <b>Initializing.</b>
          </Text>
          <Text>Signature request cancelled. Try again...</Text>
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
          <Text>{`This is the beginning of your encrypted conversation with ${peerName}`}</Text>
        </CardContainer>
      </FullMiddleSection>
    );
  } else {
    throw new Error('We never should have got here!');
  }
};

export const BrandedFooter = () => {
  return (
    <Footer>
      <FooterLink href="https://try.relay.cc" target="_blank" rel="noreferrer">
        <img
          style={{
            height: '30px',
            width: '30px',
          }}
          src="https://relay-receiver-prod.s3.amazonaws.com/smallLogo.png"
          alt="Relay Logo"
        />
      </FooterLink>
      <FooterLink
        href="https://docs.relay.cc/relay/relay-receiver/overview"
        target="_blank"
        rel="noreferrer">
        <WordMark>Relay Receiver</WordMark>
      </FooterLink>
    </Footer>
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

    &:hover {
      cursor: pointer;
    }
  }
`;
export const DisabledButton = styled(Button)`
  filter: brightness(150%);
`;

const Text = styled.div`
  &&& {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #2d2d2d;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: auto;
`;

const WordMark = styled.h3`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const FooterLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`;
