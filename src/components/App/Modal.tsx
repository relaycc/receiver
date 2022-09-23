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
  hide: { opacity: 0, transition: { duration: 0.5 } },
  invisible: { visibility: 'hidden', transition: { delay: 0.5 } },
  show: { opacity: 1, transition: { duration: 0.5 } },
  visible: { visibility: 'visible', transition: { duration: 0.5 } },
} as const;

export const Modal: FunctionComponent<{
  isOpen?: boolean;
  children: ReactNode;
}> = ({ isOpen, children }) => {
  const isOpenState = useIsOpen();
  const isActuallyOpen = isOpen === undefined ? isOpenState : isOpen;
  return (
    <AnimatePresence>
      {isActuallyOpen && (
        <motion.div
          className="Modal Overlay"
          key="receiver-modal"
          initial={['hide', 'invisible']}
          animate={['show', 'visible']}
          exit={['hide', 'invisible']}
          variants={VARIANTS}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
