'use client';

import { useState, useEffect } from 'react';

export default function DNSHeading() {
  const [isVisible, setIsVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Animation on component mount
  useEffect(() => {
    // Delay to ensure animation triggers after component renders
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Track scroll position for scroll icon animation
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll function for the scroll icon
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    // Removed the background gradient from this div
    <div className="w-full flex flex-col items-center justify-center py-8 md:py-16 lg:py-24 min-h-[70vh]">
      {/* Main title with 3D effect - Enhanced mobile responsiveness */}
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 px-2 md:px-0"
          style={{
            textShadow: `
              0 0 1px rgba(255,255,255,0.8),
              2px 2px 2px rgba(77, 171, 247, 0.6),
              -2px -2px 2px rgba(180, 230, 255, 0.4),
              0 0 20px rgba(100, 180, 255, 0.5),
              0 0 40px rgba(100, 180, 255, 0.3)
            `,
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-[#4dabf7] transform hover:scale-105 transition-transform duration-300"
            style={{
              transform: hover ? 'translateZ(10px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Developer
          </span>
          <br className="sm:hidden" /> {/* Line break on smallest screens */}
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4dabf7] to-white transform hover:scale-105 transition-transform duration-300 mt-2 sm:mt-0 sm:ml-3"
            style={{
              transform: hover ? 'translateZ(10px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
              animationDelay: '0.2s'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Network
          </span>
          <br className="sm:hidden" /> {/* Line break on smallest screens */}
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a5d8ff] transform hover:scale-105 transition-transform duration-300 mt-2 sm:mt-0 sm:ml-3"
            style={{
              transform: hover ? 'translateZ(10px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
              animationDelay: '0.4s'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Space
          </span>
        </h1>
      </div>

      {/* Futuristic Subtitle */}
      <div 
        className={`transform transition-all duration-1000 delay-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <p className="text-base md:text-lg lg:text-xl text-blue-200 mb-3 italic tracking-wide px-4 md:px-0">
          Connect · Collaborate · Create
        </p>
        
        {/* Exclusive Club Line */}
        <div className="relative my-4 mb-14">
          <div className="flex items-center justify-center">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#4dabf7]/70"></div>
            <p className="text-sm md:text-base font-light text-white mx-3 px-2 tracking-widest uppercase">
              An Exclusive Club For Developers
            </p>
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-[#4dabf7]/70 to-transparent"></div>
          </div>
          <div className="absolute -inset-1 blur-sm bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -z-10"></div>
        </div>
      </div>

      {/* Futuristic Scroll Down Indicator */}
      <div 
        className={`transform transition-all duration-1000 delay-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } absolute bottom-8 md:bottom-12 cursor-pointer`}
        onClick={scrollDown}
      >
        {/* Animated Scroll Icon */}
        <div className="flex flex-col items-center">
          {/* Text */}
          <p className="text-xs md:text-sm text-blue-300 tracking-widest uppercase mb-2 md:mb-3 pulse-text">
            Explore
          </p>
          
          {/* Futuristic Arrow Container */}
          <div className="relative w-8 h-12 md:w-10 md:h-14">
            {/* Outer hexagon frame */}
            <div className="absolute inset-0 border-2 border-[#4dabf7] rounded-full opacity-80"></div>
            
            {/* Animated Light Effect */}
            <div className="absolute inset-0 rounded-full opacity-40 animate-pulse-slow bg-gradient-to-b from-transparent via-[#a5d8ff] to-transparent"></div>
            
            {/* Arrow Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-6 flex flex-col items-center">
                <div className="w-1 h-1 bg-white rounded-full opacity-80 animate-bounce-delay-1"></div>
                <div className="w-1 h-1 bg-white rounded-full opacity-60 animate-bounce-delay-2 mt-1"></div>
                <div className="w-1 h-1 bg-white rounded-full opacity-40 animate-bounce-delay-3 mt-1"></div>
              </div>
            </div>
            
            {/* Arrow Down */}
            <svg 
              className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 text-[#a5d8ff] animate-pulse"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </div>
        </div>

        {/* Radial glow effect */}
        <div className="absolute -inset-4 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-md -z-10"></div>
      </div>

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes pulse-text {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes bounce-delay-1 {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-3px); }
          60% { transform: translateY(-1px); }
        }
        
        @keyframes bounce-delay-2 {
          0%, 30%, 60%, 90% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
          70% { transform: translateY(-1px); }
        }
        
        @keyframes bounce-delay-3 {
          0%, 40%, 70%, 100% { transform: translateY(0); }
          60% { transform: translateY(-3px); }
          80% { transform: translateY(-1px); }
        }
        
        .pulse-text {
          animation: pulse-text 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-bounce-delay-1 {
          animation: bounce-delay-1 2s infinite;
        }
        
        .animate-bounce-delay-2 {
          animation: bounce-delay-2 2s infinite;
        }
        
        .animate-bounce-delay-3 {
          animation: bounce-delay-3 2s infinite;
        }
      `}</style>
    </div>
  );
}