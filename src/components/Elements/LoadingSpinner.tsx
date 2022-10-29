import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        repeatDelay: 0,
        ease: 'linear',
      }}
      className={`LoadingSpinner ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="-4 -4 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </motion.svg>
  );
};
