import styled from 'styled-components';
import Loader from './LoadingSpinner';
import React from 'react'
import MobileErrorIndicator from '../../assets/images/MobileErrorIndicator.svg'

export interface StatusCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  isLoading: boolean;
  subtitleHeader?: string;
  loadingText?: string;
  isError: boolean;
  errorText?: string;
  isFirstMessagePrompt?: boolean;
  noPeerAvailable?: boolean;
  onClick: () => void;
}
export default function StatusCard({
  title,
  subtitle,
  buttonText,
  isLoading,
  loadingText,
  subtitleHeader,
  isError,
  errorText,
  isFirstMessagePrompt = false, 
  noPeerAvailable = false,
  onClick,
}: StatusCardProps) {
  return (
    <Card>
      {isError && (
        <Right>
          <img
            src={MobileErrorIndicator.src}
            height={20}
            width={20}
            alt="error"
          />
        </Right>
      )}
      <Title>{title}</Title>
      { subtitleHeader && 
        <SubtitleHeader>{subtitleHeader}</SubtitleHeader>
      }
      <Subtitle>{subtitle}</Subtitle>
      {noPeerAvailable && (
        <ReferSubtitle>
          Invite them to try{' '}
          <a href="https://daopanel.chat" target="_blank" rel="noreferrer">
            daopanel.chat
          </a>{' '}
          or test it out by messaging the daopanel founder{' '}
          <a href={'/seanwbren.eth'}>
            <h6>seanwbren.eth</h6>
          </a>
        </ReferSubtitle>
      )}

      { !isLoading && !isFirstMessagePrompt && 
        <Button onClick={onClick}>
          {isError ? errorText : buttonText}
        </Button>
      }
    </Card>
  );
}

const Right = styled.div`
  float: right;
`;

const Card = styled.div`
  background: #F7F7F7;
  border: 1px dashed #A6A6A6;
  border-radius: 8px;
  width: 227px;
  padding: 10px;
  text-align: center;
`;

const SubtitleHeader = styled.div`
  font-weight: 800;
  font-family: 'Inter';
  font-style: normal;
  font-size: 12px;
  color: #333333;
  letter-spacing: -0.01em;
  margin-top: 16px;
`;

const Title = styled.h1`
  /* Headline/Headline 3 */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.01em;
  color: #686868;
  text-align: center;
  padding: 0 8px 8px 8px;
  border-bottom: 1px solid #E4E4E4;
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
  margin: 16px 0 8px 0;
  padding: 8px;
  background: #5A46C6;
  border: 1px solid rgba(55, 41, 125, 0.5);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: white;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }
`;
