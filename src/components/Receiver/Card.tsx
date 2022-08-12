import styled from 'styled-components';
import React from 'react'

export interface CardProps {
  children: React.ReactNode;
  title: string;
}
export default function Card({children, title}: CardProps) {
  return (
    <CardContainer>
      <Title>{title}</Title>
      { children }
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: #FBFAFF;
  border: 1px dashed #A6A6A6;
  border-radius: 8px;
  width: 227px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-wrap: break-word;
`;

const Title = styled.div`
  color: #686868;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E4E4;
`;