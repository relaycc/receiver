import React from 'react';

export const Check = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => unknown;
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      stroke="green"
      className={`${className} Check`}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};
