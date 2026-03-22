'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/mainpage/navbar';
import SimpleBackground from '../components/mainpage/simplebackground';
import LoadingScreen from '../components/mainpage/loadingscreen';
import CustomCursor from '../components/mainpage/customcursor';

// Only show loading screen on first ever hard load, not on client navigation
const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('visited');

export default function Home() {
  const [loading, setLoading] = useState(!hasVisited);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-full max-w-6xl px-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 mb-6">
              Eklavya Singh
            </h1>
            
            <div className="h-20 md:h-24 mb-8 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                <span className="mr-3 sm:mr-4 text-gray-700">I am</span>
                <span 
                  className="inline-block text-gray-900 font-bold"
                  style={{
                    borderRight: '3px solid #000',
                    paddingRight: '8px',
                    minWidth: '120px'
                  }}
                >
                  {typedText || '|'}
                </span>
              </h2>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Eklavya Singh. All rights reserved.</p>
        </div>
        </footer>
      </div>
    </>
  );
}