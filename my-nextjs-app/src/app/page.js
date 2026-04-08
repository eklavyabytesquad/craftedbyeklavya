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
        <section className="relative flex flex-col md:flex-row md:items-end min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 pb-0">
          {/* Left: Text — centered on mobile, left-aligned & pushed up on desktop */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left pt-28 sm:pt-32 md:pt-0 md:pb-44 lg:pb-52">
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-400 mb-3 md:mb-4" style={{ fontFamily: '"Courier New", monospace' }}>
              Portfolio &mdash; 2026
            </p>
            <h1
              data-cursor-text="Hello!"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-black text-gray-900 mb-3 md:mb-5 leading-[0.95]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Eklavya<br />Singh
            </h1>
            
            <div className="h-12 sm:h-16 md:h-20 flex items-center">
              <h2 data-cursor-text="Role" className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-medium" style={{ fontFamily: '"Courier New", monospace' }}>
                <span className="mr-2 sm:mr-3 text-gray-500">I am</span>
                <span 
                  className="inline-block text-gray-900 font-bold"
                  style={{
                    borderRight: '2px solid #000',
                    paddingRight: '6px',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  {typedText || '|'}
                </span>
              </h2>
            </div>
          </div>

          {/* Right: Sticker Image — large, bottom-aligned to touch the divider */}
          <div data-cursor-text="That's Me!" className="relative w-60 h-72 sm:w-72 sm:h-96 md:w-[380px] md:h-[500px] lg:w-[480px] lg:h-[620px] xl:w-[540px] xl:h-[700px] flex-shrink-0 self-center md:self-end mx-auto md:mx-0">
            <Image
              src="/assets/eklavya/eklavya-suit-blue-sticker.png"
              alt="Eklavya Singh"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
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