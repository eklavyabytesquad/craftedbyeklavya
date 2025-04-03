'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for transparent to glassmorphism transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Google Fonts Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');
      `}</style>
      
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gradient-to-r from-blue-900/80 via-indigo-900/80 to-blue-800/80 backdrop-blur-lg border-b border-white/30 shadow-lg shadow-blue-500/20' 
            : 'bg-blue-950/60 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with enhanced animation */}
            <div className="flex-shrink-0 relative group">
              <Link href="/" className="flex items-center font-bold">
                <div className="relative z-10 h-12 w-auto flex items-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse rounded-lg"></div>
                  <Image 
                    src="https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/super30/logo.png" 
                    alt="DNS Logo" 
                    width={140}
                    height={50}
                    className="h-full w-auto object-contain transition-all duration-500 group-hover:scale-105 filter brightness-110 hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                    priority
                  />
                  <Image 
                    src="https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/super30/super30.png" 
                    alt="DNS Text" 
                    width={140}
                    height={50}
                    className="h-full w-auto object-contain ml-2 transition-all duration-500 group-hover:scale-105 filter brightness-110 hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                    priority
                  />
                </div>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/10 to-purple-400/20 blur-xl filter opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>
              </Link>
            </div>

            {/* Desktop Menu with futuristic animation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {['Home', 'DNS','Super30', 'Contact'].map((item, index) => (
                  <Link 
                    key={index}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="relative px-4 py-2 text-sm font-medium overflow-hidden group"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {/* Cyber bracket decoration */}
                    <span className="absolute top-0 left-0 w-1.5 h-0 bg-gradient-to-b from-blue-300 to-blue-400 group-hover:h-full transition-all duration-300 opacity-70"></span>
                    <span className="absolute bottom-0 right-0 w-1.5 h-0 bg-gradient-to-t from-blue-300 to-blue-400 group-hover:h-full transition-all duration-300 delay-75 opacity-70"></span>
                    
                    {/* Text with hover effect */}
                    <span className="relative z-10 text-white group-hover:text-blue-100 transition-colors duration-300 tracking-wider">
                      {item}
                    </span>
                    
                    {/* Animated underline and overline */}
                    <span className="absolute bottom-0 left-1/2 w-0 h-px bg-white group-hover:w-full group-hover:left-0 transition-all duration-400 ease-in-out"></span>
                    <span className="absolute top-0 right-1/2 w-0 h-px bg-white group-hover:w-full group-hover:right-0 transition-all duration-400 ease-in-out"></span>
                    
                    {/* Hover glow */}
                    <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Futuristic Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu}
                className="relative w-12 h-12 flex items-center justify-center rounded-full focus:outline-none group overflow-hidden"
                aria-expanded={isOpen ? 'true' : 'false'}
              >
                <span className="sr-only">Toggle menu</span>
                
                {/* Futuristic button design */}
                <span className="absolute inset-0 rounded-full border border-white/20 bg-blue-900/20 backdrop-blur-md z-0"></span>
                
                {/* Animated rings */}
                <span className="absolute inset-0 rounded-full border border-blue-400/30 scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100"></span>
                <span className="absolute inset-1 rounded-full border border-blue-300/20 scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100 delay-100"></span>
                
                {/* Enhanced hamburger animation */}
                <div className="flex flex-col justify-center items-center w-6 h-6 transition-all duration-500 relative z-10">
                  <span className={`block h-0.5 w-6 bg-gradient-to-r from-blue-300 to-white rounded-full transition-all duration-300 ease-out transform ${
                    isOpen ? 'rotate-45 translate-y-1.5 w-5 bg-white' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-4 ml-auto bg-white rounded-full my-1 transition-all duration-300 ease-out transform ${
                    isOpen ? 'opacity-0 -translate-x-6' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-6 bg-gradient-to-r from-white to-blue-300 rounded-full transition-all duration-300 ease-out transform ${
                    isOpen ? '-rotate-45 -translate-y-1.5 w-5 bg-white' : ''
                  }`}></span>
                </div>
                
                {/* Animated pulse */}
                <span className={`absolute inset-0 rounded-full bg-blue-500/10 transition-opacity duration-500 ${
                  isOpen ? 'animate-pulse opacity-100' : 'opacity-0'
                }`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with futuristic UI */}
        <div 
          className={`md:hidden transition-all duration-700 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="backdrop-blur-2xl bg-gradient-to-b from-blue-900/70 via-indigo-900/60 to-blue-950/70 border-b border-white/20 border-t border-t-white/20 overflow-hidden">
            {/* Decorative tech elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-12 w-16 h-16 bg-purple-500/5 rounded-full blur-xl"></div>
            
            {/* Horizontal circuit lines */}
            <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            <div className="absolute left-0 top-3/4 h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
            
            {/* Menu items with futuristic styling */}
            <div className="relative pt-4 pb-5 px-4 space-y-2 z-10">
              {['Home', 'DNS','Super30', 'Contact'].map((item, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-500 hover:translate-x-1"
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className="block transition-all duration-300 py-3 rounded-lg text-white hover:text-blue-200 relative group overflow-hidden"
                  >
                    <div className="flex items-center space-x-3 px-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {/* Animated indicator */}
                      <div className="relative w-6">
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover:scale-150 transition-transform duration-300"></span>
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="h-3 w-3 rounded-full border border-blue-400 scale-50 group-hover:scale-100 transition-transform duration-300"></span>
                        </span>
                      </div>
                      
                      {/* Menu text */}
                      <span className="text-lg font-medium tracking-wide">{item}</span>
                    </div>
                    
                    {/* Hover background with animations */}
                    <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-blue-600/20 to-blue-700/0 group-hover:w-full transition-all duration-500 rounded-r-full"></span>
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-blue-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></span>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Futuristic footer design for mobile menu */}
            <div className="relative border-t border-blue-500/20 mt-2 px-4 py-3 text-xs text-blue-300/70 flex justify-between items-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              <span className="tracking-widest">NAVIGATION.SYSTEM</span>
              <span className="text-blue-400/70 animate-pulse">{'//'}</span>
              <span className="tabular-nums tracking-wide">v2.5.0</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}