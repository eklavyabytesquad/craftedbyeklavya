// components/AboutSection.jsx
"use client";

import React, { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Matrix-style binary effect for background decoration
    const createBinaryElement = () => {
      const binaryContainer = document.createElement('div');
      binaryContainer.className = 'absolute text-blue-500/10 text-xs pointer-events-none';
      binaryContainer.style.fontFamily = 'monospace';
      binaryContainer.style.left = `${Math.random() * 100}%`;
      binaryContainer.style.top = `${Math.random() * 100}%`;
      binaryContainer.style.transform = 'scale(0.8)';
      binaryContainer.style.opacity = '0';
      binaryContainer.style.transition = 'opacity 1s ease-in-out';
      
      // Generate random binary string
      let binary = '';
      for (let i = 0; i < 8; i++) {
        binary += Math.round(Math.random());
      }
      binaryContainer.innerText = binary;
      
      // Animate and remove
      setTimeout(() => {
        binaryContainer.style.opacity = '0.8';
      }, 100);
      
      setTimeout(() => {
        binaryContainer.style.opacity = '0';
        setTimeout(() => {
          binaryContainer.remove();
        }, 1000);
      }, 3000);
      
      return binaryContainer;
    };
    
    // Add binary elements periodically
    const interval = setInterval(() => {
      if (sectionRef.current) {
        sectionRef.current.appendChild(createBinaryElement());
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom font imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&family=Orbitron:wght@400;500;600;700&display=swap');
        
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(255, 255, 255, 0.5); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes scan {
          0% { transform: translateY(0%); opacity: 0.8; }
          80% { transform: translateY(100%); opacity: 0.2; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
        }
        
        .code-block {
          font-family: 'Share Tech Mono', monospace;
          overflow: hidden;
          position: relative;
        }
        
        .code-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
          animation: scan 3s linear infinite;
        }
        
        .tech-card {
          animation: pulse-border 3s infinite, float 6s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        
        .tech-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
        }
        
        /* Blurred background for enhanced readability */
        .glass-panel {
          backdrop-filter: blur(8px);
          background: radial-gradient(circle at center, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.8));
        }
        
        /* Animated highlight for text */
        .text-highlight {
          position: relative;
          display: inline-block;
        }
        
        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(to top, rgba(59, 130, 246, 0.2), transparent);
          z-index: -1;
        }
        
        /* Subtle floating animation for the cards */
        .hover-float {
          transition: transform 0.3s ease;
        }
        
        .hover-float:hover {
          transform: translateY(-5px);
        }
      `}</style>

      <section id="about" className="py-16 relative overflow-hidden" ref={sectionRef}>
        {/* Abstract tech background with dot grid instead of lines */}
        <div className="absolute inset-0 opacity-10 z-0">
          {/* Dot grid pattern instead of lines */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
            {Array(400).fill().map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/30"></div>
              </div>
            ))}
          </div>
          
          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-indigo-900/5"></div>
        </div>
        
        {/* Floating tech elements */}
        <div className="absolute top-1/4 left-1/3 w-2 h-8 bg-blue-500/20 rounded-full blur-sm animate-[float_8s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-300/30 rounded-full blur-sm animate-[float_5s_ease-in-out_infinite_alternate-reverse]"></div>
        <div className="absolute bottom-1/4 left-1/5 w-4 h-1 bg-blue-400/20 rounded-full blur-sm animate-[float_7s_ease-in-out_infinite_alternate]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Holographic section heading */}
            <div className="relative mb-12 group">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white uppercase tracking-widest text-center"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                About Super30
              </h2>
              
              {/* Tech heading decoration */}
              <div className="flex justify-center items-center space-x-3 mt-2">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400"></div>
                <div className="h-3 w-3 border-2 border-blue-400 rounded-full animate-pulse"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              
              {/* Heading holo effect */}
              <div className="absolute -inset-4 bg-blue-500/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>
            
            {/* Main content with enhanced tech styling */}
            <div className="glass-panel rounded-xl border border-blue-500/30 shadow-xl relative overflow-hidden group">
              {/* Holographic glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/0 transition-all duration-1000"></div>
              
              {/* Tech corner brackets - keeping these for the tech look but removing internal lines */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400/70"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400/70"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400/70"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400/70"></div>
              
              {/* Scanning line effect - kept for futuristic feel */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-[scan_4s_linear_infinite]"></div>
              
              {/* Content structured in separate cards for better mobile experience */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
                {/* Main description - takes full width on mobile, left 2 cols on desktop */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-blue-900/30 backdrop-blur-md rounded-lg p-5 border border-blue-500/20 hover-float">
                    <div style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      <p className="text-blue-50 mb-4 text-lg relative z-10">
                        <span className="font-semibold text-white text-highlight">SUPER30</span> is an elite 4-week immersive tech bootcamp designed for the top 1% of college engineering talent. 
                        Unlike traditional learning models, we've engineered a high-velocity curriculum that propels students through the entire development ecosystem.
                      </p>
                      
                      <p className="text-blue-50 text-lg relative z-10">
                        Our program systematically deconstructs the modern tech stack – from front-end architecture to cloud infrastructure deployment and AI integration. 
                        We've optimized SUPER30 to provide maximum technical exposure with minimum theoretical overhead.
                      </p>
                    </div>
                    
                    {/* Tech indicators */}
                    <div className="mt-4 flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse delay-300"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse delay-700"></div>
                    </div>
                  </div>
                  
                  {/* Code block with animation - full width and visible on all devices */}
                  <div className="p-4 bg-blue-950/50 rounded-lg border border-blue-500/20 relative code-block overflow-hidden hover-float">
                    <div className="text-blue-300 opacity-90" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                      <div className="mb-1"><span className="text-blue-400">function</span> <span className="text-white">initializeSuperBootcamp</span>() {`{`}</div>
                      <div className="pl-4">{`const`} <span className="text-white">students</span> = selectTopTalent(<span className="text-blue-200">30</span>);</div>
                      <div className="pl-4">{`const`} <span className="text-white">curriculum</span> = optimizeForRapidGrowth();</div>
                      <div className="pl-4">{`const`} <span className="text-white">techStack</span> = [<span className="text-blue-200">'React'</span>, <span className="text-blue-200">'Auth'</span>, <span className="text-blue-200">'Sql'</span>];</div>
                      <div className="pl-4">launchProgram(students, curriculum, techStack);</div>
                      <div className="pl-4">{`return`} <span className="text-blue-200">'job-ready-developers'</span>;</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                </div>
                
                {/* Right side content - takes full width on mobile, right col on desktop */}
                <div className="space-y-6">
                  {/* Additional info card */}
                  <div className="bg-blue-900/30 backdrop-blur-md rounded-lg p-5 border border-blue-500/20 hover-float">
                    <h3 style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-md font-medium text-white mb-3 flex items-center">
                      <span className="inline-block w-1 h-1 bg-blue-400 mr-2"></span>
                      METHODOLOGY
                    </h3>
                    <p className="text-blue-50 text-base" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      Rather than sequential lectures, we employ parallel learning tracks with immediate hands-on application. By program completion, you'll possess a comprehensive technical toolkit for today's digital landscape.
                    </p>
                  </div>
                  
                  {/* Tech stat cards - stacked in a column */}
                  <div className="space-y-4">
                    {[
                      { value: "4", label: "WEEKS", icon: "⏱️" },
                      { value: "30", label: "STUDENTS", icon: "👩‍💻" },
                      { value: "100%", label: "PRACTICAL", icon: "🛠️" }
                    ].map((stat, index) => (
                      <div key={index} 
                        className="bg-blue-900/40 rounded-lg p-3 border border-blue-500/30 shadow-lg transform transition duration-300 hover:shadow-blue-400/30 group relative overflow-hidden flex items-center hover-float"
                      >
                        <div className="mr-3 text-lg opacity-70">{stat.icon}</div>
                        <div>
                          <div className="text-white text-xl font-bold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                            {stat.value}
                          </div>
                          <div className="text-blue-200 text-xs" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {stat.label}
                          </div>
                        </div>
                        
                        {/* Tech corner accent */}
                        <div className="absolute top-0 right-0 w-3 h-3">
                          <div className="absolute top-0 right-0 w-full h-full border-t border-r border-blue-400/50"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Why Join Section at the bottom - full width */}
              <div className="p-6 md:p-8 pt-0 md:pt-0">
                <div className="tech-card bg-blue-800/20 rounded-lg p-5 border border-blue-400/30 relative">
                  {/* Tech decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-blue-400/30 rounded-tr-lg"></div>
                  </div>
                  
                  <h3 
                    className="text-xl text-white font-semibold mb-4 flex items-center"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <span className="inline-block w-2 h-2 bg-blue-400 mr-2"></span>
                    WHY JOIN SUPER30
                  </h3>
                  
                  <p className="text-blue-100" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    This program is architected for ambitious students seeking exponential skill acceleration. 
                    You'll master not only core development principles but also cutting-edge AI-augmented workflows using tools like GPT-4 and Copilot.
                    Within just 4 weeks, you'll gain hands-on expertise with technologies that would require months through conventional learning paths.
                  </p>
                  
                  {/* Tech stat indicators in a wrap-friendly row */}
                  <div className="flex flex-wrap mt-5 gap-3">
                    <div className="bg-blue-900/40 px-3 py-1.5 rounded-md border border-blue-500/30 flex items-center hover-float">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-blue-100 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>4X LEARNING SPEED</span>
                    </div>
                    <div className="bg-blue-900/40 px-3 py-1.5 rounded-md border border-blue-500/30 flex items-center hover-float">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-blue-100 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>AI-ENHANCED</span>
                    </div>
                    <div className="bg-blue-900/40 px-3 py-1.5 rounded-md border border-blue-500/30 flex items-center hover-float">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-blue-100 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>CAREER ACCELERATOR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;