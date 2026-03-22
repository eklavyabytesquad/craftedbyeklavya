'use client';

export default function SimpleBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* Clean white background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
    </div>
  );
}
