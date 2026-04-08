'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
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
    const textEl = textRef.current;
    if (!dot || !ring || !textEl) return;

    // Instant dot position via gsap.quickSetter (no layout thrash)
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    // Ring follows with GSAP's smooth interpolation
    const ringPos = { x: -100, y: -100 };

    let currentText = '';

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

    // Hover detection for interactive elements + dynamic text
    const onPointerOver = (e) => {
      const target = e.target;
      // Check for data-cursor-text on the element or its ancestors
      const cursorTextEl = target.closest('[data-cursor-text]');
      const newText = cursorTextEl ? cursorTextEl.getAttribute('data-cursor-text') : '';

      if (newText && newText !== currentText) {
        currentText = newText;
        textEl.textContent = currentText;
        gsap.to(ring, {
          width: 90,
          height: 90,
          marginLeft: -45,
          marginTop: -45,
          borderColor: 'rgba(255,255,255,0.8)',
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 0, duration: 0.2, ease: 'power2.out' });
        gsap.to(textEl, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
      } else if (!cursorTextEl) {
        // Regular interactive element hover (no text)
        if (
          target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]') ||
          window.getComputedStyle(target).cursor === 'pointer'
        ) {
          gsap.to(ring, {
            scale: 1.6,
            borderColor: 'rgba(255,255,255,0.8)',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(dot, { scale: 1.4, duration: 0.3, ease: 'power2.out' });
        }
      }
    };

    const onPointerOut = (e) => {
      const target = e.target;
      const cursorTextEl = target.closest('[data-cursor-text]');
      // Check if we're leaving a data-cursor-text element
      const relatedTarget = e.relatedTarget;
      const stillInCursorText = relatedTarget && relatedTarget.closest && relatedTarget.closest('[data-cursor-text]');

      if (cursorTextEl && !stillInCursorText) {
        currentText = '';
        gsap.to(ring, {
          width: 50,
          height: 50,
          marginLeft: -25,
          marginTop: -25,
          borderColor: 'rgba(255,255,255,0.35)',
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
        gsap.to(textEl, { opacity: 0, scale: 0.5, duration: 0.2, ease: 'power2.in' });
      } else if (!cursorTextEl) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255,255,255,0.35)',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
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

      {/* Ring follower — bigger default size */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{
          width: '50px',
          height: '50px',
          marginLeft: '-25px',
          marginTop: '-25px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.35)',
          opacity: 0,
          willChange: 'transform',
        }}
      >
        {/* Dynamic cursor text */}
        <span
          ref={textRef}
          className="pointer-events-none select-none"
          style={{
            color: '#fff',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: 0,
            transform: 'scale(0.5)',
            willChange: 'transform, opacity',
          }}
        />
      </div>
    </>
  );
}
