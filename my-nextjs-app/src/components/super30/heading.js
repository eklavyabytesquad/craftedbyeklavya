// components/HeaderSection.jsx
"use client";

import React, { useEffect, useRef } from 'react';

const HeaderSection = () => {
  const titleRef = useRef(null);
  
  // Animation for the robotic typing effect
  useEffect(() => {
    if (!titleRef.current) return;
    
    const title = titleRef.current;
    const originalText = title.innerText;
    title.innerText = "";
    
    const typeText = async () => {
      // First show a blinking cursor
      title.innerText = "|";
      await new Promise(r => setTimeout(r, 500));
      
      // Then start typing character by character
      for (let i = 0; i < originalText.length; i++) {
        title.innerText = originalText.substring(0, i + 1) + (i < originalText.length - 1 ? "|" : "");
        await new Promise(r => setTimeout(r, 50));
      }
      
      // Remove cursor and add glitch effect
      title.innerText = originalText;
      title.classList.add('text-glitch');
    };
    
    typeText();
  }, []);

  return (
    <>
      {/* Custom font imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
        
        /* Glitch animation */
        @keyframes glitch {
          0% { text-shadow: -2px 3px 0 rgba(0, 247, 255, 0.7), 2px -3px 0 rgba(255, 255, 255, 0.7); }
          20% { text-shadow: 2px -3px 0 rgba(0, 247, 255, 0.7), -2px 3px 0 rgba(255, 255, 255, 0.7); }
          40% { text-shadow: 2px -3px 0 rgba(0, 247, 255, 0.7), -2px 3px 0 rgba(255, 255, 255, 0.7); }
          60% { text-shadow: 2px -3px 0 rgba(0, 247, 255, 0.7), -2px 3px 0 rgba(255, 255, 255, 0.7); }
          80% { text-shadow: -2px 3px 0 rgba(0, 247, 255, 0.7), 2px -3px 0 rgba(255, 255, 255, 0.7); }
          100% { text-shadow: -2px 3px 0 rgba(0, 247, 255, 0.7), 2px -3px 0 rgba(255, 255, 255, 0.7); }
        }
        
        .text-glitch {
          animation: glitch 5s infinite alternate;
        }
        
        /* Scanning line animation */
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          50%, 100% { transform: translateY(100vh); }
        }
        
        /* Pulse border animation */
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(255, 255, 255, 0.6); }
        }
        
        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="container mx-auto px-4 pt-32 pb-16 relative overflow-hidden">
        {/* Technology grid background effect */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px opacity-10 z-0">
          {Array(48).fill().map((_, index) => (
            <div key={index} className="border border-blue-300/10"></div>
          ))}
        </div>
        
        {/* Scanning line effect */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 animate-[scanline_8s_linear_infinite]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          {/* Cyberpunk-style header with glow effect */}
          <div className="relative mb-10 group">
            {/* Main heading with tech font and glowing effect */}
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl font-extrabold mb-2 text-white uppercase tracking-wider transform transition duration-500 group-hover:scale-105"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              SUPER30: Elite Tech Bootcamp
            </h1>
            
            {/* Blue glow effect layer */}
            <div className="absolute -inset-1 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* Decorative circuit lines */}
            <div className="absolute -top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            
            {/* Futuristic brackets */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-blue-500/50 rounded"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-blue-500/50 rounded"></div>
            
            {/* Tech dots */}
            <div className="absolute -left-6 top-1/4 h-2 w-2 rounded-full bg-blue-500/70 animate-pulse"></div>
            <div className="absolute -right-6 top-3/4 h-2 w-2 rounded-full bg-blue-400/70 animate-pulse delay-700"></div>
          </div>
          
          {/* Subtitle with holographic effect */}
          <div className="relative bg-blue-900/30 backdrop-blur-lg rounded-lg p-5 md:p-6 border border-blue-500/40 shadow-lg mx-auto max-w-2xl transform transition duration-500 hover:shadow-blue-500/20 group animate-[pulseBorder_4s_ease-in-out_infinite]">
            <p className="text-lg md:text-xl text-blue-100 relative z-10" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              A 4-week intensive bootcamp limited to <span className="font-bold text-white">30 exceptional students</span>, 
              designed to transform college students into job-ready developers
            </p>
            
            {/* Digital circuit pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-600/0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {Array(6).fill().map((_, i) => (
                  <div key={i} className="absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" 
                       style={{ top: `${i * 20}%`, left: 0, opacity: 0.5 + (i % 2) * 0.3 }} />
                ))}
                {Array(6).fill().map((_, i) => (
                  <div key={i} className="absolute w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" 
                       style={{ left: `${i * 20}%`, top: 0, opacity: 0.5 + (i % 2) * 0.3 }} />
                ))}
              </div>
            </div>
            
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Futuristic divider */}
          <div className="mt-10 flex justify-center items-center space-x-2">
            <div className="h-0.5 w-16 bg-blue-600/80 rounded-full"></div>
            <div className="h-3 w-3 rounded-full bg-white/80 animate-pulse"></div>
            <div className="h-0.5 w-16 bg-blue-600/80 rounded-full"></div>
          </div>
          
          {/* Statistics with holographic cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { value: "4 Weeks", label: "Intensive Training" },
              { value: "30 Students", label: "Exclusive Batch" },
              { value: "100%", label: "Practical Learning" }
            ].map((stat, index) => (
              <div key={index} 
                className="bg-blue-900/20 backdrop-blur-lg rounded-lg p-4 border border-blue-500/30 shadow-lg transform transition duration-500 hover:-translate-y-1 hover:shadow-blue-400/30 group relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-400/10 to-blue-600/0 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                
                {/* Data display with tech font */}
                <div className="text-white text-3xl font-bold mb-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {stat.value}
                </div>
                <div className="text-blue-200" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {stat.label}
                </div>
                
                {/* Tech corner accents */}
                <div className="absolute top-0 left-0 w-3 h-px bg-blue-400"></div>
                <div className="absolute top-0 left-0 w-px h-3 bg-blue-400"></div>
                <div className="absolute bottom-0 right-0 w-3 h-px bg-blue-400"></div>
                <div className="absolute bottom-0 right-0 w-px h-3 bg-blue-400"></div>
              </div>
            ))}
          </div>
          
          {/* Futuristic scroll indicator */}
          <div className="mt-16 flex justify-center">
            <div className="relative group animate-[float_4s_ease-in-out_infinite]">
              <div className="absolute -inset-3 bg-blue-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-b from-blue-400 to-blue-600 p-px rounded-full">
                <div className="bg-blue-900 rounded-full p-2 group-hover:bg-blue-800 transition-colors duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              
              {/* Animated radar rings */}
              <div className="absolute inset-0 rounded-full border border-blue-400/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-0 group-hover:scale-200 opacity-0 group-hover:opacity-100 transition-all duration-1500 delay-100"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;