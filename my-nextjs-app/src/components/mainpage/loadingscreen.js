'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Total animation duration ~3.2s, then dismiss
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onFinish?.(), 600); // wait for exit animation
    }, 3200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const firstName = 'EKLAVYA';
  const lastName = 'SINGH';

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: i * 0.08,
      },
    }),
    exit: (i) => ({
      opacity: 0,
      y: -20,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19],
        delay: i * 0.03,
      },
    }),
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 1.2,
      },
    },
    exit: {
      scaleX: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2 select-none">
            {/* First name */}
            <div className="flex overflow-hidden">
              {firstName.split('').map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white font-extralight tracking-[0.35em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Decorative line */}
            <motion.div
              className="h-[1px] w-full bg-white/40 origin-center"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />

            {/* Last name */}
            <div className="flex overflow-hidden">
              {lastName.split('').map((char, i) => (
                <motion.span
                  key={`last-${i}`}
                  custom={i + firstName.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white font-extralight tracking-[0.55em] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtle tagline */}
            <motion.p
              className="text-white/30 text-[10px] sm:text-xs tracking-[0.5em] uppercase mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
            >
              Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
