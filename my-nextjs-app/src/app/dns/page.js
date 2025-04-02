'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/DNS/navbar';
import Background3D from '../../components/mainpage/3dbackground';
import DNSHeading from '../../components/DNS/heading'; // Import the new component

export default function DNSPage() {
  // State for detecting scroll (similar to main page for nav effects)
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for any potential animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white overflow-x-hidden relative">
      {/* 3D Background Effect */}
      <Background3D />
      
      {/* Navbar */}
      <Navbar />
      
      <main className="container mx-auto px-4">
        {/* DNS Section with the new 3D heading component */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-full max-w-6xl px-4">
            {/* Replace the old heading with the new DNSHeading component */}
            <DNSHeading />
          </div>
        </section>
      </main>
      
      {/* Footer - simplified from main page */}
      <footer className="py-6 border-t border-purple-900/50">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Eklavya Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}