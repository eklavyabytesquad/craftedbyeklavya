'use client';

import React from 'react';
import TechSkillsGlobe from './techskills';

const TechSkillsGlobeSection = () => {
  return (
    <section id="tech-globe" className="py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            My Technical Universe
          </span>
        </h2>
        
        {/* Glassmorphism card containing the 3D globe */}
        <div className="backdrop-blur-lg bg-purple-900/20 p-8 rounded-xl border border-purple-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore my technical skills in this interactive visualization. Each node represents a technology I'm proficient in.
            </p>
          </div>
          
          {/* The 3D globe component */}
          <div className="h-[500px] md:h-[600px] w-full relative">
            <TechSkillsGlobe />
          </div>
          
          {/* Optional: Additional description or legend */}
          <div className="mt-8 text-center">
            <p className="text-purple-300 font-medium">
              Interact with the sphere to discover my full tech stack
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="px-3 py-1 bg-purple-800/70 rounded-full text-sm text-pink-200 border border-purple-600/50">
                Frontend
              </span>
              <span className="px-3 py-1 bg-indigo-800/70 rounded-full text-sm text-pink-200 border border-indigo-600/50">
                Backend
              </span>
              <span className="px-3 py-1 bg-pink-800/70 rounded-full text-sm text-pink-200 border border-pink-600/50">
                DevOps
              </span>
              <span className="px-3 py-1 bg-amber-800/70 rounded-full text-sm text-pink-200 border border-amber-600/50">
                3D & Design
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSkillsGlobeSection;