'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Stars
} from '@react-three/drei';

// Import the enhanced LoadingPage component
import { LoadingPage } from '../components/loadingpage';
import { AnimatedCube } from '../components/animatedcube';

// Main component that combines loading and main page
export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Transition to main page after LoadingPage's countdown completes
    // We'll use a timeout of 6 seconds which should match the LoadingPage's internal countdown
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // 6 seconds for the animation
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <MainPage />
      )}
    </>
  );
}

// Main Page Component
function MainPage() {
  const technologies = [
    "HTML", "CSS", "JavaScript", "React", "Node", "Express", 
    "MongoDB", "PostgreSQL", "Supabase", "Firebase", "React Native", 
    "TypeScript", "Next.js", "Python", "AWS", "Vercel", 
    "Render", "GitHub", "Git", "MySQL", "PHP", "Tailwind", 
    "Bootstrap", "GraphQL", "Hasura", "Blender", "Spline"
  ];
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white overflow-hidden">
      <section className="h-screen flex flex-col items-center justify-center p-4 md:p-24">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-400 mb-4">
            Hello, Im a Developer
          </h1>
          <p className="text-gray-300 text-xl">Explore my interactive portfolio</p>
        </div>
        
        <div className="w-full max-w-4xl h-[500px] bg-gray-900/50 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden border border-purple-500">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance"
            }}
          >
            {/* Improved lighting */}
            <color attach="background" args={['#0F0721']} />
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            
            {/* Environment for reflections */}
            <Environment preset="night" />
            
            {/* Add stars for cosmic feel */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
            
            {/* Camera and Controls */}
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <OrbitControls enableZoom={true} maxDistance={20} minDistance={5} />
            
            {/* Improved 3D Object */}
            <AnimatedCube />
          </Canvas>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="group relative overflow-hidden px-6 py-3 bg-transparent rounded-lg">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-70"></span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></span>
            
            {/* Button glowing effect */}
            <span className="absolute bottom-0 right-0 w-10 h-10 -mb-2 -mr-3 rounded-full bg-purple-600 blur-xl opacity-50"></span>
            <span className="absolute top-0 left-0 w-10 h-10 -mt-2 -ml-3 rounded-full bg-blue-500 blur-xl opacity-50"></span>
            
            <span className="relative bg-black bg-opacity-70 backdrop-blur-sm text-white text-lg font-bold px-6 py-3 rounded-lg border border-white border-opacity-20">
              Projects
            </span>
          </button>
          <button className="group relative overflow-hidden px-6 py-3 bg-transparent rounded-lg">
            <span className="relative bg-transparent text-white text-lg font-bold px-6 py-3 rounded-lg border border-purple-500 hover:border-purple-300 transition-colors duration-300">
              Contact
            </span>
          </button>
        </div>
      </section>
      
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-400">
          Technologies
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center max-w-5xl mx-auto">
          {technologies.map((tech) => (
            <div 
              key={tech} 
              className="p-3 bg-purple-800 bg-opacity-30 rounded-lg border border-purple-600 hover:bg-purple-700 hover:border-purple-400 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <p className="text-white text-sm md:text-base font-semibold">{tech}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 | Developer Portfolio | Created with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </main>
  );
}