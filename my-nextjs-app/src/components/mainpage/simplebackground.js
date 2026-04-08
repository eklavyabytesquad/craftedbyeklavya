'use client';

export default function SimpleBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* Figma-style dotted grid background */}
      <div className="absolute inset-0 bg-[#f5f5f5]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #c0c0c0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
