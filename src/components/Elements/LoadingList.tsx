import React, { useEffect, useRef } from 'react';

export const LoadingList = () => {
  const divScrollToRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!divScrollToRef.current) return;
    divScrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className="MainContainer LoadingList">
      <div className="LoadingList LeftContainer">
        <div className="LoadingList LeftUserInfo">
          <div className="LoadingList LogoOutline" />
          <div className="LoadingList NameOutline" />
          <div className="LoadingList DateOutline" />
        </div>
        <div className="LoadingList LeftMessageContainer">
          <div className="LoadingList FirstMessage" />
          <div className="LoadingList SecondMessage" />
        </div>
      </div>
      <div className="LoadingList RightContainer">
        <div className="LoadingList RightUserInfo">
          <div className="LoadingList LogoOutline" />
          <div className="LoadingList NameOutline" />
          <div className="LoadingList DateOutline" />
        </div>
        <div className="LoadingList RightMessageContainer">
          <div className="LoadingList FirstMessage" />
        </div>
      </div>
    </div>
  );
};
