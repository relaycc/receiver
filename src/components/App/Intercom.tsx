import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import {
  motion,
  AnimatePresence as BrokenTypesAnimatePresence,
} from 'framer-motion';
import { useIsOpen, useWindowSize } from '../../hooks';

const AnimatePresence = BrokenTypesAnimatePresence as React.FunctionComponent<{
  children: React.ReactNode;
}>;

const VARIANTS = {
  hide: { maxHeight: 0, transition: { duration: 0.5 } },
  show: { maxHeight: '100vh', transition: { duration: 0.5 } },
} as const;

export const Intercom: FunctionComponent<{
  position?: 'left' | 'right';
  children: ReactNode;
}> = ({ children, position }) => {
  const windowSize = useWindowSize();
  const isOpen = useIsOpen();

  useEffect(() => {
    if (windowSize && windowSize.width <= 400) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
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
