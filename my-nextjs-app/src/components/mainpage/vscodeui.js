'use client';

import { useState, useEffect, useRef } from 'react';
import eklavyaImage from "./assets/eklavya.jpg";

// VSCode Editor Component with enhanced mobile support and animations
export default function VSCodeEditor({ codeContent }) {
  const [activeLine, setActiveLine] = useState(1);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [lineVisible, setLineVisible] = useState({});
  const editorRef = useRef(null);
  
  // Animation for active line in code editor - without auto-scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prevLine) => {
        const nextLine = prevLine + 1;
        return nextLine > codeContent.length ? 1 : nextLine;
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, [codeContent.length]);

  // Create cursor blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530);
    
    return () => clearInterval(blinkInterval);
  }, []);

  // Progressive typing animation for code lines
  useEffect(() => {
    // Reset visible lines when active line changes
    if (activeLine === 1) {
      setLineVisible({});
      setTypingIndex(0);
    }

    // Make the line appear to be typed
    const line = codeContent.find(l => l.num === activeLine);
    if (!line || line.content === "") return;

    const totalChars = line.content.length;
    if (typingIndex < totalChars) {
      const typingTimer = setTimeout(() => {
        setTypingIndex(prev => prev + 1);
      }, 25); // Adjust speed as needed
      
      return () => clearTimeout(typingTimer);
    } else {
      // Line is fully typed, mark it visible
      setLineVisible(prev => ({
        ...prev,
        [activeLine]: true
      }));
      setTypingIndex(0);
    }
  }, [activeLine, typingIndex, codeContent]);

  // Handle color styles for code syntax highlighting
  const getCodeStyles = (type) => {
    switch(type) {
      case 'keyword':
        return 'text-purple-400';
      case 'function':
        return 'text-amber-300';
      case 'property':
        return 'text-blue-400';
      case 'string':
        return 'text-green-400';
      case 'variable':
        return 'text-red-400';
      case 'return':
        return 'text-gray-300';
      default:
        return 'text-gray-300';
    }
  };

  // Helper to create the animated typing effect
  const renderLineContent = (line) => {
    // If this is active line and not fully typed yet
    if (line.num === activeLine && !lineVisible[line.num]) {
      return line.content.substring(0, typingIndex);
    }
    // For completed lines or non-active lines
    return line.content;
  };

  return (
    <div className="max-w-4xl mx-auto backdrop-blur-sm bg-purple-950/20 rounded-xl border border-purple-500/20 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 hover:shadow-xl">
      {/* VS Code header with Mac-style buttons and animated indicators */}
      <div className="bg-gray-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors relative group">
            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50 duration-1000 group-hover:opacity-75"></span>
          </div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors relative group">
            <span className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse opacity-50 duration-700 group-hover:opacity-75"></span>
          </div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors relative group">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-50 duration-1500 group-hover:opacity-75"></span>
          </div>
        </div>
        <div className="flex-1 text-center text-xs sm:text-sm text-gray-400 truncate">developer.js - Eklavya Singh Portfolio</div>
        <div className="hidden sm:block text-xs bg-gray-700 rounded px-2 py-1 text-gray-300">JavaScript</div>
      </div>
      
      {/* VS Code main content area with sidebar and editor */}
      <div className="flex">
        {/* VS Code sidebar with profile - visible on all screens */}
        <div className="flex flex-col bg-gray-900 w-8 sm:w-10 md:w-12 py-4 items-center">
          {/* Profile image shown at top on all devices */}
          <div className="relative mb-6">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full overflow-hidden border-2 border-purple-500 transform hover:scale-110 transition-transform duration-300 shadow-md shadow-purple-500/30">
              <div className="relative h-full w-full bg-gray-800">
                <img 
                  src={eklavyaImage.src} 
                  alt="Eklavya Singh" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100?text=ES";
                    e.target.onerror = null;
                  }}
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          
          {/* Sidebar icons - simplified for mobile */}
          <div className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-300 transition-colors">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-300 transition-colors">
              <path d="M3 3h18v18H3z"></path>
              <path d="M3 9h18"></path>
              <path d="M9 21V9"></path>
            </svg>
          </div>
          <div className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
        </div>
        
        {/* Code editor content with typing animation */}
        <div ref={editorRef} className="bg-gray-950 flex-1 overflow-auto p-2 sm:p-3 md:p-5 font-mono text-[10px] xs:text-xs sm:text-sm md:text-base" style={{ scrollBehavior: 'auto' }}>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-6 xs:w-8 sm:w-10 bg-gray-900/30 flex flex-col items-end pr-1 text-gray-500 text-[10px] xs:text-xs select-none">
              {codeContent.map((line) => (
                <div key={`line-num-${line.num}`} className="h-5 xs:h-6 leading-5 xs:leading-6">{line.num}</div>
              ))}
            </div>
            <div className="ml-7 xs:ml-10 sm:ml-12">
              {codeContent.map((line) => (
                <div 
                  key={`line-${line.num}`}
                  data-line={line.num}
                  className={`leading-5 xs:leading-6 h-5 xs:h-6 ${activeLine === line.num ? 'bg-purple-800/20 -mx-2 sm:-mx-3 md:-mx-5 px-2 sm:px-3 md:px-5 border-l-2 border-purple-400 relative' : ''}`}
                >
                  <span className={getCodeStyles(line.type)}>
                    {line.indent > 0 && [...Array(line.indent)].map((_, i) => (
                      <span key={i} className="inline-block w-2 xs:w-3 sm:w-4">&nbsp;</span>
                    ))}
                    {renderLineContent(line)}
                    {activeLine === line.num && !lineVisible[line.num] && cursorBlink && (
                      <span className="inline-block w-1 xs:w-2 h-3 xs:h-4 bg-gray-400 align-text-bottom animate-pulse"></span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* VS Code footer/status bar with animated border */}
      <div className="bg-indigo-900/40 px-2 sm:px-4 py-1 text-[10px] xs:text-xs flex flex-wrap sm:flex-nowrap justify-between items-center text-gray-400 border-t border-indigo-500/30 relative overflow-hidden">
        {/* Animated border light effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-gradient-x"></div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 xs:h-3 xs:w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="hidden xs:inline">Last updated:</span> Apr 2025
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 xs:h-3 xs:w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="hidden xs:inline">Ready</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-0 w-full sm:w-auto justify-end">
          <span>UTF-8</span>
          <span className="hidden xs:inline">JavaScript</span>
          <span>Ln {activeLine}, Col {typingIndex}</span>
        </div>
      </div>
      
      {/* CSS animations for the component */}
      <style jsx>{`
        /* Allow scrolling for very small screens */
        @media (max-width: 640px) {
          .bg-gray-950 {
            max-height: 350px;
            overflow-y: auto;
          }
        }
        
        /* Animation for border gradient */
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        /* Extra extra small screen support */
        @media (max-width: 375px) {
          .xs\\:inline {
            display: none;
          }
          .xs\\:text-xs {
            font-size: 0.7rem;
          }
          .xs\\:h-6 {
            height: 1.35rem;
          }
          .xs\\:leading-6 {
            line-height: 1.35rem;
          }
          .xs\\:ml-10 {
            margin-left: 2rem;
          }
          .xs\\:h-4 {
            height: 0.9rem;
          }
          .xs\\:w-3 {
            width: 0.7rem;
          }
          .xs\\:w-2 {
            width: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}