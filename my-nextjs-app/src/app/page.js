'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/mainpage/navbar';
import Background3D from '../components/mainpage/3dbackground';
import TechSkillsGlobeSection from '../components/mainpage/globe';

// Enhanced Modern Card Component
const ModernCard = ({ text, delay }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add('animate-swing');
    }
  }, []);
  
  return (
    <div className="relative mx-1 sm:mx-2" style={{ height: '80px', width: '65px' }}>
      <div
        ref={cardRef}
        className="absolute top-0 flex items-center justify-center w-full h-16 rounded-md shadow-lg 
        bg-gradient-to-br from-purple-800 to-purple-950 border border-purple-400/30 
        shadow-purple-900/40 backdrop-filter backdrop-blur-sm text-white font-medium text-sm"
        style={{ 
          transformOrigin: 'top center',
          animation: `swing-${text.toLowerCase()} 3s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          textShadow: '0 0 8px rgba(255, 255, 255, 0.3)'
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default function Home() {
  // For the 3D text shadow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Function to handle cursor movement for the 3D text effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate the distance from center (normalized between -1 and 1)
      const x = (clientX - centerX) / centerX;
      const y = (clientY - centerY) / centerY;
      
      setMousePosition({ x, y });
    };
    
    // Add global CSS for animations with more subtle, professional patterns
    const style = document.createElement('style');
    style.textContent = `
      @keyframes swing-code {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(3deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-3deg); }
        100% { transform: rotate(0deg); }
      }
      
      @keyframes swing-sleep {
        0% { transform: rotate(2deg); }
        25% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        75% { transform: rotate(-1deg); }
        100% { transform: rotate(2deg); }
      }
      
      @keyframes swing-eat {
        0% { transform: rotate(-2deg); }
        30% { transform: rotate(3deg); }
        60% { transform: rotate(-1deg); }
        100% { transform: rotate(-2deg); }
      }
      
      @keyframes swing-repeat {
        0% { transform: rotate(1deg); }
        40% { transform: rotate(-3deg); }
        70% { transform: rotate(2deg); }
        100% { transform: rotate(1deg); }
      }
      
      .text-3d {
        text-shadow: 
          1px 1px 0px rgba(255, 255, 255, 0.2),
          2px 2px 0px rgba(255, 255, 255, 0.1),
          3px 3px 0px rgba(149, 76, 233, 0.2),
          4px 4px 8px rgba(149, 76, 233, 0.3),
          0 0 15px rgba(149, 76, 233, 0.2);
        transition: text-shadow 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(style);
    };
  }, []);
  
  // Dynamic 3D shadow effect based on mouse position
  const getTextShadow = () => {
    const intensity = 8; // Reduced intensity for more subtle effect
    const x = mousePosition.x * intensity;
    const y = mousePosition.y * intensity;
    
    return {
      textShadow: `
        ${-x}px ${-y}px 0px rgba(255, 255, 255, 0.2),
        ${-x * 1.2}px ${-y * 1.2}px 0px rgba(255, 255, 255, 0.1),
        ${-x * 0.5}px ${-y * 0.5}px 8px rgba(149, 76, 233, 0.3),
        ${x * 0.5}px ${y * 0.5}px 10px rgba(149, 76, 233, 0.2),
        0 0 15px rgba(255, 255, 255, 0.2)
      `
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white overflow-x-hidden">
      <Background3D />
      <Navbar />
      
      <main className="container mx-auto px-4 py-32">
        {/* Hero Section with 3D text and hanging cards */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-4xl backdrop-blur-sm bg-purple-950/30 p-8 rounded-xl border border-purple-500/20 shadow-xl relative overflow-visible">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                <span className="block mb-4 text-2xl text-amber-300">Welcome to my Portfolio</span>
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-amber-400 text-3d"
                  style={getTextShadow()}
                >
                  Welcome to Eklavya Singh Website
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl mb-6 text-gray-300 mt-6">
                Full Stack Developer & App Developer
              </h2>
              
              <p className="text-base md:text-lg mb-8 text-gray-300">
                Crafting immersive digital experiences with cutting-edge web technologies and creative 3D visualizations
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <a href="#projects" className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold py-2 px-5 rounded-md transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                  View My Work
                </a>
                <a href="#skills" className="bg-transparent hover:bg-purple-800/30 text-white font-bold py-2 px-5 rounded-md border border-purple-500 hover:border-amber-400 transition-all duration-300 transform hover:scale-105">
                  My Skills
                </a>
              </div>
            </div>
            
            {/* Hanging Cards - Smaller, more professional */}
            <div className="absolute -bottom-20 left-0 right-0 flex justify-center items-start">
              <ModernCard text="CODE" delay={0} />
              <ModernCard text="SLEEP" delay={0.3} />
              <ModernCard text="EAT" delay={0.6} />
              <ModernCard text="REPEAT" delay={0.9} />
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-20 mt-12">
          <div className="max-w-6xl mx-auto backdrop-blur-sm bg-purple-950/30 p-8 rounded-xl border border-purple-500/20 shadow-xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                Featured Projects
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-purple-900/40 rounded-md overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-700/30 transform hover:scale-102 hover:translate-y-1">
                  <div className="h-40 bg-gradient-to-br from-purple-800 to-indigo-900"></div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-white">Project {item}</h3>
                    <p className="text-gray-300 text-sm mb-3">A short description of this project showcasing modern web development and 3D visualization techniques.</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-purple-800/50 rounded-sm text-xs text-gray-200">React</span>
                      <span className="px-2 py-1 bg-purple-800/50 rounded-sm text-xs text-gray-200">Three.js</span>
                      <span className="px-2 py-1 bg-purple-800/50 rounded-sm text-xs text-gray-200">TailwindCSS</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-purple-950/30 p-8 rounded-xl border border-purple-500/20 shadow-xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
                Technical Skills
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {['JavaScript', 'React', 'Next.js', 'Three.js', 'TailwindCSS', 'Node.js', 'MongoDB', 'WebGL', 'TypeScript', 'Git', 'Figma', 'AWS'].map((skill) => (
                <div key={skill} className="bg-purple-900/30 p-3 rounded-md shadow-md hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-700/30">
                  <span className="font-medium text-sm text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Tech Skills Globe Section */}
        <TechSkillsGlobeSection />

        {/* Created By Section */}
        <section className="py-10">
          <div className="max-w-2xl mx-auto backdrop-blur-sm bg-purple-950/30 p-6 rounded-xl border border-purple-500/20 shadow-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
              <span className="mx-4 text-amber-300">❤️</span>
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
    </div>
  );
}