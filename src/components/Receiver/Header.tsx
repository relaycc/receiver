import styled from 'styled-components';
import WhiteLogo from '../../../public/assets/images/white-logo.svg';
import CloseReceiverLine from '../../../public/assets/images/close-receiver-line.svg';
import Image from 'next/image';

interface HeaderProps {
  text?: string;
  showLinks?: boolean;
  onCloseReceiver?: () => unknown;
}

export default function RelayHeader({
  text = 'Welcome to DaoPanel Relay Receiver',
  showLinks = false,
  onCloseReceiver
}: HeaderProps) {
  return (
    <Header>
      { showLinks && (
        <CloseContainer onClick={onCloseReceiver}>
          <Image
            src={CloseReceiverLine.src}
            width={22}
            height={20}
            alt="relay"
          />
        </CloseContainer>
      )}
      { text }
      { showLinks && (
        <a href={`https://relay.cc/${text}`} target='_blank' rel="noreferrer">
          <ImageContainer>
            <Image
              src={WhiteLogo.src}
              width={22}
              height={20}
              alt="relay"
            />
          </ImageContainer>
        </a>
      )}
    </Header>
  );
}

const Header = styled.div`
  background-color: #5A46C6;
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  padding: 25px 0;
  font-family: Inter;
  position: relative;
`;

const ImageContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 21px;
`;

const CloseContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 21px;

  &:hover {
    cursor: pointer;
  }
`;
