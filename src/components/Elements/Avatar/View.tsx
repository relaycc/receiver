import React, { FunctionComponent } from 'react';
import Blockies from 'react-blockies';
import { motion } from 'framer-motion';

export interface ReadyProps {
  status: 'ready';
  avatar: string;
  onClick?: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export interface LoadingProps {
  status: 'loading';
  address: string;
  onClick?: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export interface NoneProps {
  status: 'none';
  address: string;
  onClick?: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export interface FallbackProps {
  status: 'fallback';
  onClick?: () => unknown;
  size?: 'm' | 'l' | 'xl';
}

export type ViewProps = ReadyProps | LoadingProps | NoneProps | FallbackProps;

export const FALLBACK_BLOCKIE_SEED =
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

export const View: FunctionComponent<ViewProps> = (props) => {
  switch (props.status) {
    case 'ready':
      return (
        <motion.img
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
          className={`Avatar AvatarImage size-${props.size}`}
          onClick={props.onClick}
          src={props.avatar}
          alt="user"
        />
      );
    case 'loading':
      return (
        <div
          style={{ opacity: 0.2 }}
          className={`Avatar BlockiesContainer size-${props.size}`}
          onClick={props.onClick}>
          <Blockies
            seed={props.address}
            size={10}
            scale={props.size === 'xl' ? 7.5 : props.size === 'l' ? 5 : 4}
            className={'circle'}
          />
        </div>
      );
    case 'none':
      return (
        <div
          style={{ opacity: 1 }}
          className={`Avatar BlockiesContainer size-${props.size}`}
          onClick={props.onClick}>
          <Blockies
            seed={props.address}
            size={10}
            scale={props.size === 'xl' ? 7.5 : props.size === 'l' ? 5 : 4}
            className={'circle'}
          />
        </div>
      );
    case 'fallback':
      return (
        <div
          style={{ opacity: 1 }}
          className={`Avatar BlockiesContainer size-${props.size}`}
          onClick={props.onClick}>
          <Blockies
            seed={FALLBACK_BLOCKIE_SEED}
            size={10}
            scale={props.size === 'xl' ? 7.5 : props.size === 'l' ? 5 : 4}
            className={'circle'}
          />
        </div>
      );
  }
};
