import React from 'react';
import {
  Pinned as PinnedContent,
  Ignored as IgnoredContent,
  All as AllContent,
} from '../Elements';
import { Screen } from './Screen';

export const Pinned = () => {
  return <Screen content={<PinnedContent />} />;
};

export const Ignored = () => {
  return <Screen content={<IgnoredContent />} />;
};

export const All = () => {
  return <Screen content={<AllContent />} />;
};
