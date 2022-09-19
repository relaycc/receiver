import React, { FunctionComponent } from 'react';

export interface MenuIconProps {
  onClick: () => unknown;
  marginLeft?: string;
  marginRight?: string;
}

export const ExitIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
}) => {
  return (
    <svg
      style={{ marginLeft, marginRight, padding: '0', cursor: 'pointer' }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={28}
      width={28}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const GoToConversationsIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
}) => {
  return (
    <svg
      style={{ marginRight, marginLeft, padding: '0', cursor: 'pointer' }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      height={28}
      width={28}>
      <path
        fillRule="evenodd"
        d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const MinimizeIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
}) => {
  return (
    <svg
      style={{ marginRight, marginLeft, padding: '0', cursor: 'pointer' }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={28}
      width={28}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
};

export const NewConversationIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
}) => {
  return (
    <svg
      style={{ marginRight, marginLeft, padding: '0', cursor: 'pointer' }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={28}
      width={28}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
};
