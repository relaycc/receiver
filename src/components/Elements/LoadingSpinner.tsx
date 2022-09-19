import React from 'react';

interface LoaderProps {
  height: number;
  width: number;
}
export default function LoadingSpinner(props: LoaderProps) {
  const { height, width } = props;

  return (
    <div className="LoadingSpinner">
      <img
        src={
          'https://relay-receiver-prod.s3.amazonaws.com/MobileLoadingSpinner.png'
        }
        alt="loading"
        width={width}
        height={height}
      />
    </div>
  );
}
