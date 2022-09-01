import React from 'react';
import styled from 'styled-components';
import { useEnsName } from 'wagmi';

interface EnsNameProps {
  address: string;
  setShowBox: any;
  setPeerAddress: any;
  setShowConversations: any;
  setShowMewMessageDropdown: any;
}

export function EnsName({
  address,
  setShowBox,
  setPeerAddress,
  setShowMewMessageDropdown,
  setShowConversations,
}: EnsNameProps) {
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });
  const handleClick = () => {
    if (setShowBox) {
      setShowBox(true);
      setPeerAddress(address);
      setShowConversations(false);
      setShowMewMessageDropdown!(false);
    } else return;
  };

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return <Span onClick={handleClick}>{data}</Span>;
}

const Span = styled.span`
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  right: 30px;
  top: 15px;
  border-radius: 99rem;
  padding: 2px 4px;
  border: 1px solid black;
  background-color: black;
  color: white;
`;
