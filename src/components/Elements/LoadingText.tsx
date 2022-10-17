import React from 'react';
import { motion } from 'framer-motion';

export const LoadingText = () => {
  return (
    <div className="LoadingText LoadingCircleContainer">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 1.6,
          repeatType: 'reverse',
        }}
        className="LoadingText LoadingCircle"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 1.2,
          repeatType: 'reverse',
        }}
        className="LoadingText LoadingCircle"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 0.8,
          repeatType: 'reverse',
        }}
        className="LoadingText LoadingCircle"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.6,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 0.4,
          repeatType: 'reverse',
        }}
        className="LoadingText LoadingCircle"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 0,
          repeat: Infinity,
          repeatDelay: 0,
          repeatType: 'reverse',
        }}
        className="LoadingText LoadingCircle"
      />
    </div>
  );
};
