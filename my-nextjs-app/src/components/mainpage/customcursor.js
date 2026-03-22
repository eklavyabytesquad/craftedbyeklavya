'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (hasTouch && isCoarse) {
      setHidden(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Instant dot position via gsap.quickSetter (no layout thrash)
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    // Ring follows with GSAP's smooth interpolation
    const ringPos = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Dot moves instantly
      setDotX(e.clientX);
      setDotY(e.clientY);

      // Ring follows with ease
      gsap.to(ringPos, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
        onUpdate: () => {
          gsap.set(ring, { x: ringPos.x, y: ringPos.y });
        },
      });

      // Show cursors
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: 'auto' });
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.15, ease: 'power2.out' });
      gsap.to(ring, { scale: 0.7, duration: 0.2, ease: 'power2.out' });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    // Hover detection for interactive elements
    const onPointerOver = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        gsap.to(ring, { scale: 1.6, borderColor: 'rgba(255,255,255,0.8)', duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: 1.4, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onPointerOut = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.35)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{
          width: '7px',
          height: '7px',
          marginLeft: '-3.5px',
          marginTop: '-3.5px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          opacity: 0,
          willChange: 'transform',
        }}
      />

      {/* Ring follower */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference"
        style={{
          width: '38px',
          height: '38px',
          marginLeft: '-19px',
          marginTop: '-19px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.35)',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
