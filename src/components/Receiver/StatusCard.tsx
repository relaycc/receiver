import styled from 'styled-components';
import Image from 'next/image';
import Loader from './LoadingSpinner';
import Link from 'next/link';

export interface StatusCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  isLoading: boolean;
  loadingText?: string;
  isError: boolean;
  errorText?: string;
  noPeerAvailable?: boolean;
  onClick: () => void;
}
export default function StatusCard({
  title,
  subtitle,
  buttonText,
  isLoading,
  loadingText,
  isError,
  errorText,
  noPeerAvailable = false,
  onClick,
}: StatusCardProps) {
  return (
    <Card>
      {isLoading && (
        <Right>
          <Loader height={20} width={20} />
        </Right>
      )}
      {isError && (
        <Right>
          <Image
            src="/assets/images/MobileErrorIndicator.svg"
            height={20}
            width={20}
            alt="error"
          />
        </Right>
      )}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {noPeerAvailable && (
        <ReferSubtitle>
          Invite them to try{' '}
          <a href="https://daopanel.chat" target="_blank" rel="noreferrer">
            daopanel.chat
          </a>{' '}
          or test it out by messaging the daopanel founder{' '}
          <Link href={'/seanwbren.eth'} passHref>
            <h6>seanwbren.eth</h6>
          </Link>
        </ReferSubtitle>
      )}

      <Button onClick={onClick}>
        {isLoading ? loadingText : isError ? errorText : buttonText}
      </Button>
    </Card>
  );
}

const Right = styled.div`
  float: right;
`;

const Card = styled.div`
  background: #F7F7F7;
  border-radius: 8px 8px 8px 0px;
  width: 227px;
  position: relative;
  padding: 10px;
  height: 150px;
`;

const Title = styled.h1`
  /* Headline/Headline 3 */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.01em;
  color: #333333;
`;

const Subtitle = styled.h6`
  margin-top: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  align-items: center;
  letter-spacing: -0.01em;
  line-height: 18px;
  color: #333333;
`;

const ReferSubtitle = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #dad0e6;
  & > a {
    font-weight: normal;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.purple};
  }
  & > a:hover {
  }
  & > h6 {
    display: inline-block;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.purple};
    letter-spacing: -0.01em;
    cursor: pointer;
  }
`;

const Button = styled.button`
  position: absolute;
  width: 131px;
  height: 32px;
  left: 10px;
  bottom: 10px;

  background: #5A46C6;
  border-radius: 4px;
  border: none;
  color: white;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }
`;
