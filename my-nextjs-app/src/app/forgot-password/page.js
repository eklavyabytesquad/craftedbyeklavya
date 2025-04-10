'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function PasswordChange() {
  // Animation effect for code lines
  useEffect(() => {
    const animateCodeLines = () => {
      const codeLines = document.querySelectorAll('.code-line');
      codeLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.1}s`;
      });
    };
    
    animateCodeLines();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center overflow-hidden">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 z-0 perspective-1000">
        {/* Code lines in 3D space */}
        <div className="absolute inset-0 transform-style-3d">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="code-line absolute h-px bg-blue-400 opacity-30 transform-gpu animate-float-3d"
              style={{
                width: `${Math.random() * 100 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translateZ(${Math.random() * 100 - 50}px) rotateY(${Math.random() * 360}deg)`,
              }}
            ></div>
          ))}
        </div>

        {/* Floating Binary Numbers */}
        {[...Array(40)].map((_, i) => (
          <div 
            key={`binary-${i}`}
            className="absolute text-blue-300 text-opacity-20 animate-float-slow pointer-events-none select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Math.random() > 0.5 ? '0' : '1'}
          </div>
        ))}

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Main Card */}
      <div className="relative z-10 max-w-md w-full mx-4 bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden border border-blue-100 transform transition-all duration-500 hover:shadow-blue-500/30 animate-card-appear">
        {/* Card Header with Animated Border */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white relative overflow-hidden">
          <div className="absolute inset-0 scanner-line"></div>
          <h1 className="text-xl font-bold flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Password Change Portal
          </h1>
        </div>

        {/* Card Content */}
        <div className="p-8 text-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-lg font-bold">Access Restricted</h2>
            </div>
            <p className="text-left">ONLY ADMIN CAN DO IT - CONTACT YOUR MENTOR</p>
          </div>
          
          <div className="relative mb-8 py-2 px-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="absolute inset-0 code-lines opacity-10"></div>
            <p className="text-blue-800 font-mono text-sm">
              <span className="text-blue-500">&gt;</span> System message: Password change requires administrator privileges.
            </p>
          </div>
          
          <Link 
            href="/login" 
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg shadow-md relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-blue-400 to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="relative z-10">Return to Login</span>
          </Link>
        </div>
      </div>

      {/* CSS for animations and effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.2; }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes float-3d {
          0% { transform: translateZ(0) rotateY(0deg); opacity: 0.1; }
          25% { opacity: 0.4; }
          50% { transform: translateZ(100px) rotateY(180deg); opacity: 0.1; }
          75% { opacity: 0.3; }
          100% { transform: translateZ(0) rotateY(360deg); opacity: 0.1; }
        }
        
        @keyframes scanner {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(100%); opacity: 0.5; }
        }
        
        @keyframes card-appear {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-3d {
          animation: float-3d 8s ease-in-out infinite;
        }
        
        .animate-card-appear {
          animation: card-appear 0.8s ease-out forwards;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .code-lines {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .scanner-line {
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5), transparent);
          height: 200%;
          width: 100%;
          animation: scanner 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}