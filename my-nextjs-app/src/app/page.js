'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/mainpage/navbar';
import SimpleBackground from '../components/mainpage/simplebackground';
import TechSkillsGlobeSection from '../components/mainpage/globe';
import VSCodeEditor from '../components/mainpage/vscodeui';
import HorizontalImageGallery from '../components/mainpage/horizontalimg';

export default function Home() {
  // State for interactive effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Reference to skills section for smooth scrolling
  const skillsSectionRef = useRef(null);

  // Text options for typing effect with varied descriptions
  const textOptions = [
    'Software Developer',
    'Full Stack Creator',
    'Tech Innovator',
    'UI/UX Designer',
    'Digital Architect'
  ];
  
  // VSCode code content data
  const codeContent = [
    { num: 1, indent: 0, content: "class Developer {", type: "keyword" },
    { num: 2, indent: 1, content: "constructor() {", type: "function" },
    { num: 3, indent: 2, content: "this.name = 'Eklavya Singh';", type: "property" },
    { num: 4, indent: 2, content: "this.role = 'Full Stack Developer';", type: "property" },
    { num: 5, indent: 2, content: "this.education = ['IIT', 'SRM University'];", type: "property" },
    { num: 6, indent: 2, content: "this.location = 'India';", type: "property" },
    { num: 7, indent: 1, content: "}", type: "function" },
    { num: 8, indent: 0, content: "", type: "empty" },
    { num: 9, indent: 1, content: "get skills() {", type: "function" },
    { num: 10, indent: 2, content: "return [", type: "return" },
    { num: 11, indent: 3, content: "'JavaScript', 'React', 'Node.js',", type: "string" },
    { num: 12, indent: 3, content: "'Python', 'MongoDB', 'AWS',", type: "string" },
    { num: 13, indent: 3, content: "'UI/UX Design', 'Three.js'", type: "string" },
    { num: 14, indent: 2, content: "];", type: "return" },
    { num: 15, indent: 1, content: "}", type: "function" },
    { num: 16, indent: 0, content: "", type: "empty" },
    { num: 17, indent: 1, content: "get experience() {", type: "function" },
    { num: 18, indent: 2, content: "return {", type: "return" },
    { num: 19, indent: 3, content: "internships: 'Multiple tech companies',", type: "property" },
    { num: 20, indent: 3, content: "research: 'Working on patent applications',", type: "property" },
    { num: 21, indent: 3, content: "startups: 'Founded tech initiatives',", type: "property" },
    { num: 22, indent: 3, content: "leadership: 'Managing tech clubs'", type: "property" },
    { num: 23, indent: 2, content: "};", type: "return" },
    { num: 24, indent: 1, content: "}", type: "function" },
    { num: 25, indent: 0, content: "}", type: "keyword" },
    { num: 26, indent: 0, content: "", type: "empty" },
    { num: 27, indent: 0, content: "const eklavya = new Developer();", type: "variable" },
    { num: 28, indent: 0, content: "console.log('Ready to build amazing projects!');", type: "function" }
  ];
  
  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing effect for the hero section - Enhanced for better visibility
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
  
  // Mouse movement tracking for 3D effect - Reduced intensity for more subtle movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate the distance from center (normalized between -1 and 1)
      // Apply damping factor to reduce sensitivity
      const dampingFactor = 0.5; // Reduced from 1.0 to make movement more subtle
      const x = ((clientX - centerX) / centerX) * dampingFactor;
      const y = ((clientY - centerY) / centerY) * dampingFactor;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Dynamic 3D shadow effect based on mouse position - Reduced intensity
  const getTextShadow = useCallback(() => {
    // Reduced intensity values for more subtle effect
    const intensity = isMobile ? 2 : 4; // Reduced from 5/10 to 2/4
    const rotationFactor = isMobile ? 1 : 2; // Reduced rotation intensity
    
    const x = mousePosition.x * intensity;
    const y = mousePosition.y * intensity;
    
    return {
      textShadow: `
        ${-x}px ${-y}px 0px rgba(255, 255, 255, 0.2),
        ${-x * 1.5}px ${-y * 1.5}px 10px rgba(149, 76, 233, 0.3),
        ${x * 0.7}px ${y * 0.7}px 15px rgba(149, 76, 233, 0.2),
        0 0 20px rgba(255, 255, 255, 0.1),
        ${x * 2}px ${y * 2}px 25px rgba(249, 115, 22, 0.2)
      `,
      transform: `perspective(1000px) rotateX(${-y * rotationFactor}deg) rotateY(${x * rotationFactor}deg)`,
      transition: 'all 0.15s ease-out' // Made transition faster for more responsive feel
    };
  }, [mousePosition, isMobile]);

  // Scroll to skills section using ref
  const scrollToSkills = () => {
    if (skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white overflow-x-hidden relative">
      {/* Simple Background Effect */}
      <SimpleBackground />
      
      {/* Navbar */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        {/* Hero Section with dynamic typing text */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-full max-w-6xl px-4">
            {/* Name with 3D Effect */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-amber-300 mb-6 inline-block"
              style={getTextShadow()}
            >
              Eklavya Singh
            </h1>
            
            {/* Dynamic Typing Section - Enhanced for visibility */}

<div className="h-20 md:h-24 mb-8 flex items-center justify-center relative z-10">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
    <span className="mr-3 sm:mr-4 text-amber-300">I am</span>
    <span 
      className="inline-block text-white font-bold animate-pulse-slow"
      style={{
        borderRight: '3px solid #FCD34D',
        paddingRight: '8px',
        textShadow: '0 0 15px rgba(249, 115, 22, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)',
        transition: 'all 0.3s ease',
        minWidth: '120px' // Ensures there's always space even when text is empty
      }}
    >
      {typedText || '|'} {/* Fallback cursor when text is empty */}
    </span>
  </h2>
</div>
            
            {/* Enhanced Scroll Down Button */}
            <div className="mt-12">
              <button 
                onClick={scrollToSkills}
                aria-label="Scroll to skills section"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-amber-500 p-1 rounded-full shadow-lg shadow-purple-900/30 transition-all duration-300 transform hover:scale-110 hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-purple-900 rounded-full p-3 group-hover:bg-purple-800 transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-7 w-7 sm:h-8 sm:w-8 text-amber-300 group-hover:text-white transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </div>
                {/* Added glow effect */}
                <span className="absolute inset-0 rounded-full bg-amber-300 opacity-0 group-hover:opacity-25 blur-xl transition-opacity"></span>
              </button>
            </div>
          </div>
        </section>
        
        {/* VSCode-like Code Card */}
        <section id="code-card" className="py-20 mt-12">
          <VSCodeEditor codeContent={codeContent} />
        </section>

        {/* Horizontal Image Gallery - ADD THIS SECTION */}
<HorizontalImageGallery />

        {/* Tech Skills Globe Section - Added ref for scroll target */}
        <section ref={skillsSectionRef} id="skills" className="py-20">
          <TechSkillsGlobeSection />
        </section>

        {/* Created By Section */}
        <section className="py-10">
          <div className="max-w-2xl mx-auto backdrop-blur-sm bg-purple-950/30 p-6 rounded-xl border border-purple-500/20 shadow-xl text-center transform hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-center mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
              <span className="mx-4 text-amber-300 animate-pulse">❤️</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <p className="text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-amber-400 font-semibold">
              Created with passion by
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mt-1 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-white">
              EKLAVYA SINGH
            </h3>
            <div className="flex items-center justify-center mt-2">
              <div className="h-px w-20 bg-gradient-to-r from-purple-400 to-transparent"></div>
              <div className="h-px w-20 bg-gradient-to-l from-purple-400 to-transparent"></div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-purple-900/50">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Eklavya Singh. All rights reserved.</p>
        </div>
      </footer>

      {/* Global Styles and Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(252, 211, 77, 0.7); }
          50% { border-color: rgba(252, 211, 77, 1); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 0 25px rgba(249, 115, 22, 0.7); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-border {
          animation: pulse-border 1.2s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 0.7s infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        /* Improved scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #f59e0b);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7e22ce, #d97706);
        }
        
        /* Enhanced focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}