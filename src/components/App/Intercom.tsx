import React, { FunctionComponent, ReactNode } from 'react';
import {
  motion,
  AnimatePresence as BrokenTypesAnimatePresence,
} from 'framer-motion';
import { useIsOpen } from '../../hooks';

const AnimatePresence = BrokenTypesAnimatePresence as React.FunctionComponent<{
  children: React.ReactNode;
}>;

const VARIANTS = {
  hide: { maxHeight: 0, transition: { duration: 0.5 } },
  show: { maxHeight: '500px', transition: { duration: 0.5 } },
} as const;

export const Intercom: FunctionComponent<{
  isOpen?: boolean;
  position?: 'left' | 'right';
  children: ReactNode;
}> = ({ isOpen, children, position }) => {
  const isOpenState = useIsOpen();
  const isActuallyOpen = isOpen === undefined ? isOpenState : isOpen;
  return (
    <AnimatePresence>
      {isActuallyOpen && (
        <motion.div
          className={`Intercom Fixed ${'position-' + (position || 'right')}`}
          key="receiver-modal"
          initial="hide"
          animate="show"
          exit="hide"
          variants={VARIANTS}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
