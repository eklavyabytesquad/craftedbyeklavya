'use client';

import React, { useEffect, useState } from 'react';
import TechSkillsGlobe from './techskills'; // Make sure the import path is correct

const TechSkillsGlobeSection = () => {
  // State for animation effects
  const [isVisible, setIsVisible] = useState(false);
  
  // Animate on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="tech-globe" className="py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated heading with underline effect */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              My Technical Universe
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100" 
                  style={{ animation: 'pulse 2s infinite, gradientShift 8s linear infinite' }}></span>
          </h2>
        </div>
        
        {/* Enhanced glassmorphism card with animation */}
        <div className={`relative backdrop-blur-xl bg-purple-900/10 rounded-2xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* Animated border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-2xl blur-sm opacity-75"
               style={{ animation: 'gradientShift 8s linear infinite' }}></div>
          
          {/* Inner content */}
          <div className="relative p-6 md:p-8 lg:p-10 bg-gray-900/90 rounded-2xl border border-purple-500/30 h-full">
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Explore my technical skills in this interactive visualization. Each node represents a technology I m proficient in.
                <span className="block mt-2 text-purple-300 italic">Rotate and zoom to discover my full tech arsenal</span>
              </p>
            </div>
            
            {/* The 3D globe component - Fixed height container with subtle animation */}
            <div className="h-[400px] md:h-[500px] lg:h-[600px] w-full relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-700 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 animate-pulse pointer-events-none z-10 opacity-50"></div>
              <TechSkillsGlobe />
            </div>
            
            {/* Enhanced legend section */}
            <div className="mt-10 text-center">
              <p className="text-purple-300 font-medium text-lg mb-4">
                Navigate the sphere to discover all dimensions of my expertise
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {/* Tech category pills with improved styling and hover effects */}
                <span className="px-4 py-2 bg-purple-800/30 rounded-full text-sm text-pink-200 border border-purple-600/50 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:bg-purple-700/50 hover:scale-105">
                  <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Frontend
                </span>
                <span className="px-4 py-2 bg-indigo-800/30 rounded-full text-sm text-blue-200 border border-indigo-600/50 shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:bg-indigo-700/50 hover:scale-105">
                  <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                  Backend
                </span>
                <span className="px-4 py-2 bg-pink-800/30 rounded-full text-sm text-pink-200 border border-pink-600/50 shadow-lg shadow-pink-900/30 transition-all duration-300 hover:bg-pink-700/50 hover:scale-105">
                  <span className="inline-block w-3 h-3 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
                  DevOps
                </span>
                <span className="px-4 py-2 bg-amber-800/30 rounded-full text-sm text-amber-200 border border-amber-600/50 shadow-lg shadow-amber-900/30 transition-all duration-300 hover:bg-amber-700/50 hover:scale-105">
                  <span className="inline-block w-3 h-3 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
                  3D & Design
                </span>
              </div>
            </div>
            
            {/* Additional subtle background elements */}
            <div className="absolute -z-10 top-1/4 left-10 w-20 h-20 bg-purple-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-1/4 right-10 w-32 h-32 bg-pink-600/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes with style tag in your global CSS or component */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default TechSkillsGlobeSection;