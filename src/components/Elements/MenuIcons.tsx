import React, { FunctionComponent } from 'react';

export interface MenuIconProps {
  onClick: () => unknown;
  marginLeft?: string;
  marginRight?: string;
  className?: string;
}

export const ExitIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
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
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
      style={{ marginRight, marginLeft, padding: '0', cursor: 'pointer' }}
      onClick={onClick}
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
  );
};

export const MinimizeIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
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
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
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

export const PinIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
      style={{
        marginRight,
        marginLeft,
        padding: '0',
        cursor: 'pointer',
      }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22"></line>
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
    </svg>
  );
};

export const EyeIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
      style={{
        marginRight,
        marginLeft,
        padding: '0',
        cursor: 'pointer',
      }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};

export const PinOffIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
      style={{
        marginRight,
        marginLeft,
        padding: '0',
        cursor: 'pointer',
      }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22"></line>
      <line x1="12" y1="17" x2="12" y2="22"></line>
      <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12"></path>
      <path d="M15 9.34V6h1a2 2 0 0 0 0-4H7.89"></path>
    </svg>
  );
};

export const EyeOffIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
      style={{
        marginRight,
        marginLeft,
        padding: '0',
        cursor: 'pointer',
      }}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
      <line x1="2" y1="2" x2="22" y2="22"></line>
    </svg>
  );
};

export const GoBackIcon: FunctionComponent<MenuIconProps> = ({
  onClick,
  marginLeft,
  marginRight,
  className,
}) => {
  return (
    <svg
      className={`MenuIcon ${className}`}
      style={{
        marginRight,
        marginLeft,
        padding: '0',
        cursor: 'pointer',
      }}
      width="24"
      height="24"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
};
