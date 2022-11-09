import React, { FunctionComponent } from 'react';

export interface PlusProps {
  className?: string;
  onClick?: () => unknown;
}

export const Plus: FunctionComponent<PlusProps> = ({ className, onClick }) => {
  return (
    <svg
      className={`${className} Plus`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      height={28}
      width={28}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
