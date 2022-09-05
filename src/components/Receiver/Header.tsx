import { truncateAddress } from '../../utls/address';
import React, { useState } from 'react';
import Avatar from './Avatar';
import styled from 'styled-components';

type MinimizedConvoListSetter = (list: string[]) => string[];

interface HeaderProps {
  text: string | null;
  visible: boolean;
  peerAddress: string | undefined;
  peerName: string | undefined | null;
  toggleReceiver: () => unknown;
  closeReceiver: () => unknown;
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>;
  setMinimizedConvoList: (setter: MinimizedConvoListSetter) => unknown;
  peerIsAvailable: boolean | undefined;
}

export default function RelayHeader({
  text = 'Relay Receiver',
  peerAddress,
  peerName,
  toggleReceiver,
  closeReceiver,
  setShowConversations,
  setMinimizedConvoList,
  peerIsAvailable,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const headerText = () => {
    if (text) {
      return <SoloTextContainer>{text}</SoloTextContainer>;
    }

    if (peerName) {
      return (
        <TextContainer>
          <MainText>{peerName}</MainText>
          <SubText>{peerAddress && truncateAddress(peerAddress)}</SubText>
        </TextContainer>
      );
    } else {
      return (
        <SoloTextContainer>
          {peerAddress && truncateAddress(peerAddress)}
        </SoloTextContainer>
      );
    }
  };

  const handleGoBackClick = () => {
    setShowConversations(true);
    setShowMenu(false);
  };

  const handleMinimizeClick = () => {
    setShowMenu(false);
    toggleReceiver();
    setMinimizedConvoList((list: string[]) => {
      if (
        peerAddress === null ||
        peerAddress === undefined ||
        peerIsAvailable === false
      ) {
        return [...list];
      }
      if (list.indexOf(peerAddress) === -1) {
        return [...list, peerAddress];
      } else {
        return [...list];
      }
    });
  };

  const handleExitClick = () => {
    closeReceiver();
    setShowMenu(false);
  };

  return (
    <Header>
      <GoBackSvgContainer>
        <svg
          onClick={handleGoBackClick}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          height={'24px'}
          width={'24px'}
          style={{ marginRight: '5px' }}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <HeaderInfo onClick={() => setShowMenu(!showMenu)}>
          <UserInfoContainer>
            <Avatar address={peerAddress} />
            {headerText()}
          </UserInfoContainer>
          {peerIsAvailable && (
            <DropdownSvg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              height={'24px'}
              width={'24px'}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </DropdownSvg>
          )}
          {showMenu && (
            <DropdownMenu>
              <DropDownItemCopy
                onClick={() =>
                  navigator.clipboard.writeText(String(peerAddress))
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  height={'24px'}
                  width={'24px'}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
                Copy Address
              </DropDownItemCopy>
              <DropDownItem>
                <LiLink
                  href={'https://relay.cc/' + peerAddress}
                  target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    height={'24px'}
                    width={'24px'}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  Relay
                </LiLink>
              </DropDownItem>
              <DropDownItem>
                <LiLink
                  href={'https://etherscan.io/address/' + peerAddress}
                  target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    height={'24px'}
                    width={'24px'}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  Etherscan
                </LiLink>
              </DropDownItem>
            </DropdownMenu>
          )}
        </HeaderInfo>
      </GoBackSvgContainer>
      <RightIconContainer>
        <MinimizeSvg
          onClick={handleMinimizeClick}
          fill="none"
          viewBox="0 0 28 28"
          strokeWidth={2.5}
          stroke="black"
          height="28"
          width={28}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </MinimizeSvg>

        <ExitSvg
          onClick={handleExitClick}
          fill="none"
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
        </ExitSvg>
      </RightIconContainer>
    </Header>
  );
}

const Header = styled.div`
  &&& {
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    text-align: left;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
    color: black;
    display: flex;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space;
    padding: 0px 10px;
    z-index: 1011;
    background-color: white;
  }
`;

const TextContainer = styled.div`
  &&& {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const SoloTextContainer = styled.div`
  &&& {
    overflow: hidden;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 10px 0;
  }
`;

const MainText = styled.div`
  &&& {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 4px;
    color: black;
  }
`;

const SubText = styled.div`
  &&& {
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
  }
`;

const GoBackSvgContainer = styled.div`
  &&& {
  }
  display: flex;
  align-items: center;
  height: 25px;
  width: 100%;
`;

const RightIconContainer = styled.div`
  &&& {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 5px;
  }
`;

const MinimizeSvg = styled.svg`
  &&& {
    transform: translateY(6px);
  }
`;

const DropdownSvg = styled.svg`
  &&& {
    visibility: hidden;
    opacity: 0;
    transition: opacity 150ms, visibility 150ms;
    transform: translateX(-6px);
  }
`;

const DropdownMenu = styled.ul`
  &&& {
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
    transform: translateY(45px);
    position: absolute;
    top: 20px;
    z-index: 1100;
    border-radius: 4px;
    transition: opacity 150ms, visibility 150ms;
  }
`;

const DropDownItem = styled.li`
  &&& {
    color: black;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
    border-bottom: 1px solid #eeeeee;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    :hover {
      background-color: #eeeeee;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

const DropDownItemCopy = styled(DropDownItem)`
  &&& {
    color: black;
    text-decoration: none;
    height: 100%;
    width: 100%;
    padding: 15px;
  }
`;

const HeaderInfo = styled.div`
  &&& {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    cursor: pointer;

    :hover ${DropdownSvg} {
      visibility: visible;
      opacity: 1;
    }
    :hover ${DropdownMenu} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const ExitSvg = styled.svg``;

const LiLink = styled.a`
  &&& {
    color: black;
    text-decoration: none;
    height: 100%;
    width: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 8px;
  }
`;

const UserInfoContainer = styled.div`
  &&& {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
