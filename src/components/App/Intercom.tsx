import React, { FunctionComponent, ReactNode } from 'react';
import {
  motion,
  AnimatePresence as BrokenTypesAnimatePresence,
} from 'framer-motion';
import { useIsOpen, useReceiver, useWindowSize } from '../../hooks';
import { Dialog } from '@headlessui/react';

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
  const setIsOpen = useReceiver((state) => state.setIsOpen);
  return (
    <AnimatePresence>
      {isOpen && windowSize !== undefined && windowSize.width < 400 && (
        <Dialog
          onClose={() => setIsOpen(false)}
          static
          as={motion.div}
          open={isOpen}
          className={`Intercom Fixed Modal`}
          key="receiver-intercom"
          initial="hide"
          animate="show"
          exit="hide"
          variants={VARIANTS}>
          <Dialog.Panel>{children}</Dialog.Panel>
        </Dialog>
      )}
      {isOpen && windowSize !== undefined && windowSize.width >= 400 && (
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
