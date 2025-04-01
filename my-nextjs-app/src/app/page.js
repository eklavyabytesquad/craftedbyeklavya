'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/mainpage/navbar';
import Background3D from '../components/mainpage/3dbackground';
import TechSkillsGlobeSection from '../components/mainpage/globe';

// Enhanced Swinging Card Component
const SwingingCard = ({ text, color, delay }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    // Add the animation class once mounted
    if (cardRef.current) {
      cardRef.current.classList.add('animate-swing');
    }
  }, []);
  
  // Define color styles for each card with improved visibility
// Define color styles for each card with improved visibility and 3D effects
const colorStyles = {
  code: "bg-gradient-to-br from-purple-700 to-purple-900 border-2 border-purple-400 shadow-[0_8px_15px_rgba(139,92,246,0.5)] backdrop-filter backdrop-blur-sm",
  sleep: "bg-gradient-to-br from-indigo-600 to-purple-800 border-2 border-indigo-400 shadow-[0_8px_15px_rgba(139,92,246,0.5)] backdrop-filter backdrop-blur-sm",
  eat: "bg-gradient-to-br from-purple-500 to-pink-700 border-2 border-purple-300 shadow-[0_8px_15px_rgba(139,92,246,0.5)] backdrop-filter backdrop-blur-sm",
  repeat: "bg-gradient-to-br from-purple-400 to-amber-600 border-2 border-amber-300 shadow-[0_8px_15px_rgba(139,92,246,0.5)] backdrop-filter backdrop-blur-sm"
};
  
  return (
    <div className="relative mx-2 sm:mx-4" style={{ height: '120px', width: '90px' }}>
      {/* The actual card */}
      <div
        ref={cardRef}
        className={`absolute top-0 flex items-center justify-center w-full h-20 rounded-lg shadow-lg text-white font-bold text-lg transform origin-top 
        ${colorStyles[color]} shadow-purple-900/50`}
        style={{ 
          transformOrigin: 'top center',
          animation: `swing-${color} 3s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(155, 89, 182, 0.7)'
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
    
    // Add global CSS for animations with distinct patterns for each card
    const style = document.createElement('style');
    style.textContent = `
      @keyframes swing-code {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(8deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-8deg); }
        100% { transform: rotate(0deg); }
      }
      
      @keyframes swing-sleep {
        0% { transform: rotate(5deg); }
        25% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
        75% { transform: rotate(-3deg); }
        100% { transform: rotate(5deg); }
      }
      
      @keyframes swing-eat {
        0% { transform: rotate(-5deg); }
        30% { transform: rotate(7deg); }
        60% { transform: rotate(-3deg); }
        100% { transform: rotate(-5deg); }
      }
      
      @keyframes swing-repeat {
        0% { transform: rotate(3deg); }
        40% { transform: rotate(-7deg); }
        70% { transform: rotate(5deg); }
        100% { transform: rotate(3deg); }
      }
      
      .text-3d {
        text-shadow: 
          1px 1px 0px rgba(255, 255, 255, 0.3),
          2px 2px 0px rgba(255, 255, 255, 0.2),
          3px 3px 0px rgba(155, 89, 182, 0.3),
          4px 4px 10px rgba(155, 89, 182, 0.5),
          0 0 20px rgba(155, 89, 182, 0.3);
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
    const intensity = 10;
    const x = mousePosition.x * intensity;
    const y = mousePosition.y * intensity;
    
    return {
      textShadow: `
        ${-x}px ${-y}px 0px rgba(255, 255, 255, 0.3),
        ${-x * 1.5}px ${-y * 1.5}px 0px rgba(255, 255, 255, 0.2),
        ${-x * 0.5}px ${-y * 0.5}px 10px rgba(155, 89, 182, 0.5),
        ${x * 0.5}px ${y * 0.5}px 15px rgba(155, 89, 182, 0.4),
        0 0 20px rgba(255, 255, 255, 0.3)
      `
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black text-white overflow-x-hidden">
      <Background3D />
      <Navbar />
      
      <main className="container mx-auto px-4 py-32">
        {/* Hero Section with 3D text and hanging cards */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-4xl backdrop-blur-sm bg-purple-900/20 p-8 rounded-xl border border-purple-500/30 shadow-xl relative overflow-visible">
            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                <span className="block mb-4 text-3xl text-amber-300">Welcome to my Portfolio</span>
                <span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 text-3d"
                  style={getTextShadow()}
                >
                  Welcome to Eklavya Singh Website
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-300 mt-8">
                Full Stack Developer & App Developer
              </h2>
              
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Crafting immersive digital experiences with cutting-edge web technologies and creative 3D visualizations
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a href="#projects" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/25 transform hover:scale-105">
                  View My Work
                </a>
                <a href="#contact" className="bg-transparent hover:bg-purple-700/30 text-white font-bold py-3 px-6 rounded-full border-2 border-purple-500 hover:border-amber-400 transition-all duration-300 transform hover:scale-105">
                  Get In Touch
                </a>
              </div>
            </div>
            
            {/* Hanging Cards - Redesigned with better visibility and continuous animation */}
            <div className="absolute -bottom-46 left-0 right-0 flex justify-center items-start">
              <SwingingCard text="CODE" color="code" delay={0} />
              <SwingingCard text="SLEEP" color="sleep" delay={0.5} />
              <SwingingCard text="EAT" color="eat" delay={1} />
              <SwingingCard text="REPEAT" color="repeat" delay={1.5} />
            </div>
          </div>
        </section>
        
        {/* DNS Section (Replacing About) */}
        <section id="dns" className="py-32 mt-16">
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-purple-900/20 p-8 rounded-xl border border-purple-500/30 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-amber-300 to-pink-500">
                DNS Services
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                I specialize in DNS architecture and management, ensuring your digital infrastructure is secure, optimized, and highly available. With expertise in modern DNS protocols and configurations, I can help you establish robust networking solutions.
              </p>
              <p className="text-lg">
                My approach to DNS management focuses on performance optimization, security hardening, and implementing best practices that keep your online assets protected while delivering fast resolution times for your users worldwide.
              </p>
              <p className="text-lg">
                Whether you need custom DNS configurations, DNSSEC implementation, or load balancing solutions, I leverage cutting-edge technologies to build resilient systems that form the backbone of your online presence.
              </p>
            </div>
          </div>
        </section>

       
        
        {/* Projects Section - Placeholder */}
        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto backdrop-blur-sm bg-purple-900/20 p-8 rounded-xl border border-purple-500/30 shadow-xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Featured Projects
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project cards would go here */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-purple-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-300 border border-purple-600/50 transform hover:scale-105 hover:rotate-1">
                  <div className="h-48 bg-gradient-to-br from-purple-700 to-pink-800"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-pink-300">Project {item}</h3>
                    <p className="text-gray-300 mb-4">A short description of this amazing project showcasing my skills in web development and 3D visualization.</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-purple-700/50 rounded text-xs text-pink-200">React</span>
                      <span className="px-2 py-1 bg-purple-700/50 rounded text-xs text-pink-200">Three.js</span>
                      <span className="px-2 py-1 bg-purple-700/50 rounded text-xs text-pink-200">TailwindCSS</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Skills Section - Placeholder */}
        <section id="skills" className="py-20">
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-purple-900/20 p-8 rounded-xl border border-purple-500/30 shadow-xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                My Skills
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
              {['JavaScript', 'React', 'Next.js', 'Three.js', 'TailwindCSS', 'Node.js', 'MongoDB', 'WebGL', 'TypeScript', 'Git', 'Figma', 'AWS'].map((skill) => (
                <div key={skill} className="bg-purple-800/40 p-4 rounded-lg shadow-md hover:shadow-pink-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-600/50">
                  <span className="font-medium text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section - Placeholder */}
        <section id="contact" className="py-20">
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-purple-900/20 p-8 rounded-xl border border-purple-500/30 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Get In Touch
              </span>
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-purple-900/50 border border-purple-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-purple-900/50 border border-purple-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full bg-purple-900/50 border border-purple-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/25">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        < TechSkillsGlobeSection />
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-purple-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Eklavya Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}