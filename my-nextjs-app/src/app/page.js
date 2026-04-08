'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '../components/mainpage/navbar';
import SimpleBackground from '../components/mainpage/simplebackground';
import LoadingScreen from '../components/mainpage/loadingscreen';
import CustomCursor from '../components/mainpage/customcursor';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrollShadow, setScrollShadow] = useState(false);

  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navEntry && (navEntry.type === 'reload' || navEntry.type === 'navigate');
    if (!isReload && sessionStorage.getItem('visited')) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollShadow(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadingFinish = useCallback(() => {
    setLoading(false);
    sessionStorage.setItem('visited', '1');
  }, []);

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}

      <div
        className="fixed top-0 left-0 right-0 z-[45] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: scrollShadow ? 1 : 0,
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 40%, transparent 100%)',
        }}
      />

      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
        <SimpleBackground />
        <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex flex-col md:flex-row md:items-end min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 pb-0">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left pt-24 sm:pt-28 md:pt-0 md:pb-52 lg:pb-60 xl:pb-64">
            <h1
              data-cursor-text="Hello!"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-black text-gray-900 mb-2 sm:mb-3 md:mb-5 leading-[0.95] whitespace-nowrap"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Eklavya Singh
            </h1>
            <p
              className="whitespace-nowrap text-[clamp(0.55rem,2.5vw,1.15rem)] font-medium text-gray-600 tracking-wide"
              style={{ fontFamily: '"Courier New", monospace' }}
            >
              Software Engineer
              <span className="mx-1.5 sm:mx-2 md:mx-3 text-gray-300">|</span>
              Entrepreneur
              <span className="mx-1.5 sm:mx-2 md:mx-3 text-gray-300">|</span>
              Author
              <span className="mx-1.5 sm:mx-2 md:mx-3 text-gray-300">|</span>
              8+ Hackathon Winner
            </p>
          </div>

          <div data-cursor-text="That's Me!" className="relative w-[85vw] h-[50vh] sm:w-80 sm:h-[420px] md:w-[380px] md:h-[500px] lg:w-[480px] lg:h-[620px] xl:w-[540px] xl:h-[700px] flex-shrink-0 self-center md:self-end mx-auto md:mx-0">
            <Image
              src="/assets/eklavya/eklavya-suit-blue-sticker.png"
              alt="Eklavya Singh"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </section>

        <div className="w-full h-[2px] bg-black" />

      </main>
      
      <footer data-cursor-text="Footer" className="py-6 border-t-2 border-black">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Eklavya Singh. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </>
  );
}