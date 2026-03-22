'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen({ onFinish }) {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0); // 0: THE, 1: name, 2: hold

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);   // show name after "THE"
    const t2 = setTimeout(() => setPhase(2), 2200);   // hold
    const t3 = setTimeout(() => {
      setShow(false);
      setTimeout(() => onFinish?.(), 900);
    }, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  const theText = 'THE';
  const firstName = 'EKLAVYA';
  const lastName = 'SINGH';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Cinematic letterbox bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-black z-10"
            initial={{ height: '50%' }}
            animate={{ height: '8%' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black z-10"
            initial={{ height: '50%' }}
            animate={{ height: '8%' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />

          <motion.div
            className="flex flex-col items-center select-none relative z-20"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
          >
            {/* "THE" — fades in first, small and regal */}
            <motion.span
              className="text-white/50 tracking-[0.6em] text-xs sm:text-sm md:text-base uppercase mb-3"
              style={{ fontFamily: 'var(--font-geist-mono), "Courier New", monospace' }}
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={phase >= 0 ? { opacity: 1, letterSpacing: '0.6em' } : {}}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {theText}
            </motion.span>

            {/* EKLAVYA — dramatic letter-by-letter reveal */}
            <div className="flex overflow-hidden">
              {firstName.split('').map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  className="text-white font-light tracking-[0.3em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.06,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Gold accent line */}
            <motion.div
              className="h-[1px] origin-center mt-3 mb-3"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,140,0.6), transparent)' }}
              initial={{ width: 0 }}
              animate={phase >= 1 ? { width: '100%' } : {}}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            />

            {/* SINGH — wider tracking, lighter weight */}
            <div className="flex overflow-hidden">
              {lastName.split('').map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  className="text-white/80 font-extralight tracking-[0.5em] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3 + i * 0.07,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtle diamond divider */}
            <motion.span
              className="text-white/20 text-[10px] mt-5 mb-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              ◆
            </motion.span>

            {/* Tagline */}
            <motion.p
              className="text-white/25 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase"
              style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              Portfolio
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
