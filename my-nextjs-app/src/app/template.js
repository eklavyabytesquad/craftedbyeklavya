'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Template({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    const overlay = overlayRef.current;
    if (!el || !overlay) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(el, { opacity: 1 });
      gsap.set(overlay, { scaleX: 0 });
      return;
    }

    // Smooth curtain transition: left to right
    const tl = gsap.timeline();

    tl.set(overlay, { transformOrigin: 'left center', scaleX: 0 })
      .set(el, { opacity: 0 })
      // Curtain sweeps in from left
      .to(overlay, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      // Hold briefly
      .to({}, { duration: 0.15 })
      // Curtain sweeps out to right
      .set(overlay, { transformOrigin: 'right center' })
      .to(overlay, {
        scaleX: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      // Content fades in softly
      .to(
        el,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.45'
      );
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: '#000',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          pointerEvents: 'none',
        }}
      />
      <div ref={containerRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  );
}
