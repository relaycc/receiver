import styled from 'styled-components';
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title: string;
}
export default function Card({ children, title }: CardProps) {
  return (
    <FullMiddleSection>
      <CardContainer>
        <Title>{title}</Title>
        {children}
      </CardContainer>
    </FullMiddleSection>
  );
}

const FullMiddleSection = styled.div`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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
`;

const Title = styled.div`
  letter-spacing: normal;
  margin: 0;
	padding: 0;
  font-weight: 500;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: #686868;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e4e4;
`;
