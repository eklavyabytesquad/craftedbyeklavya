'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '../components/mainpage/navbar';
import SimpleBackground from '../components/mainpage/simplebackground';
import LoadingScreen from '../components/mainpage/loadingscreen';
import CustomCursor from '../components/mainpage/customcursor';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if this is client-side navigation (not a fresh load/refresh)
  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navEntry && (navEntry.type === 'reload' || navEntry.type === 'navigate');
    
    if (!isReload && sessionStorage.getItem('visited')) {
      // Client-side navigation (back from DNS) — skip loading
      setLoading(false);
    }
  }, []);

  const handleLoadingFinish = useCallback(() => {
    setLoading(false);
    sessionStorage.setItem('visited', '1');
  }, []);

  // Text options for typing effect with varied descriptions
  const textOptions = [
    'Software Developer',
    'Full Stack Creator',
    'Tech Innovator',
    'UI/UX Designer',
    'Digital Architect'
  ];
  
  // Typing effect for the hero section
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentText = textOptions[currentTextIndex];
    
    const type = () => {
      if (isDeleting) {
        setTypedText(currentText.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentText.substring(0, typedText.length + 1));
      }
      
      // Change state based on typing progress
      if (!isDeleting && typedText === currentText) {
        // Start deleting after a pause
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        // Move to the next text
        setCurrentTextIndex((currentTextIndex + 1) % textOptions.length);
      }
    };
    
    const timer = setTimeout(type, typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTextIndex, textOptions]);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
        <SimpleBackground />
        <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section — 100vh */}
        <section className="relative flex items-end min-h-screen px-4 sm:px-8 md:px-16 pb-0">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center pb-16 sm:pb-24 md:pb-32">
            <h1 data-cursor-text="Hello!" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 mb-4 md:mb-6">
              Eklavya Singh
            </h1>
            
            <div className="h-16 sm:h-20 md:h-24 flex items-center">
              <h2 data-cursor-text="Role" className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold">
                <span className="mr-2 sm:mr-4 text-gray-700">I am</span>
                <span 
                  className="inline-block text-gray-900 font-bold"
                  style={{
                    borderRight: '3px solid #000',
                    paddingRight: '8px',
                    minWidth: '80px'
                  }}
                >
                  {typedText || '|'}
                </span>
              </h2>
            </div>
          </div>

          {/* Right: Sticker Image — touches the bottom divider */}
          <div data-cursor-text="That's Me!" className="relative w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-[420px] lg:w-[400px] lg:h-[520px] xl:w-[460px] xl:h-[600px] flex-shrink-0 self-end">
            <Image
              src="/assets/eklavya/eklavya-suit-blue-sticker.png"
              alt="Eklavya Singh"
              fill
              className="object-contain object-bottom drop-shadow-xl"
              priority
            />
          </div>
        </section>

        {/* Full-width black horizontal divider */}
        <div className="w-full h-[2px] bg-black" />

        {/* Content below the fold */}
        <section className="min-h-screen flex items-center justify-center px-4 py-24">
          <p className="text-gray-400 text-lg tracking-widest uppercase">More coming soon</p>
        </section>
      </main>
      
      {/* Footer */}
      <footer data-cursor-text="Footer" className="py-6 border-t-2 border-black">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Eklavya Singh. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </>
  );
}