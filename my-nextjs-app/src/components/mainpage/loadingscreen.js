'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onFinish?.(), 900); // wait for slide-up exit
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const firstName = 'EKLAVYA';
  const lastName = 'SINGH';

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.07,
      },
    }),
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 1.0,
      },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 select-none"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: 'easeIn' }}
          >
            {/* First name */}
            <div className="flex overflow-hidden">
              {firstName.split('').map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
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
              transition={{ duration: 0.8, delay: 2.0 }}
              style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
            >
              Portfolio
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
