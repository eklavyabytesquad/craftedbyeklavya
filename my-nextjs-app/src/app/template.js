'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Template({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isFirstRender.current) {
      // No animation on first load
      isFirstRender.current = false;
      gsap.set(el, { opacity: 1, x: '0%' });
      return;
    }

    // Slide in from right
    gsap.fromTo(
      el,
      { x: '100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
      }
    );
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
