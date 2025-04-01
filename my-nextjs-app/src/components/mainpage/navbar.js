'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-purple-900/40 backdrop-blur-lg border-b border-purple-500/30 shadow-lg shadow-purple-500/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <Link href="/" className="text-white font-bold text-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 relative z-10">
                Eklavya Singh
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-amber-400/20 blur-lg filter opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {['Home', 'DNS', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <Link 
                  key={index}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  className="relative px-4 py-2 rounded-md text-sm font-medium overflow-hidden group"
                >
                  <span className="relative z-10 text-gray-200 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-amber-400 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </Link>
              ))}
              <Link 
                href="/resume" 
                className="relative overflow-hidden bg-gradient-to-r from-purple-500/80 to-amber-500/80 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-purple-600/90 hover:to-amber-600/90 transition-all duration-500 group"
              >
                <span className="relative z-10">Resume</span>
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-amber-500/80 to-purple-500/80"></span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-purple-800/30 backdrop-blur-md focus:outline-none group overflow-hidden border border-purple-500/30"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Toggle menu</span>
              
              {/* Custom hamburger animation */}
              <div className="flex flex-col justify-center items-center w-6 h-6 transition-all duration-300">
                <span className={`block h-0.5 w-5 bg-gradient-to-r from-purple-300 to-amber-300 rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`block h-0.5 w-5 bg-gradient-to-r from-purple-300 to-amber-300 rounded-full my-1 transition-all duration-300 ease-in-out ${
                  isOpen ? 'opacity-0 -translate-x-2' : ''
                }`}></span>
                <span className={`block h-0.5 w-5 bg-gradient-to-r from-purple-300 to-amber-300 rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </div>
              
              {/* Button hover effect */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/40 to-amber-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with improved animation */}
      <div 
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-2 backdrop-blur-xl bg-gradient-to-b from-purple-900/70 to-purple-950/70 border-b border-purple-500/30 border-t border-t-purple-500/30">
          {['Home', 'DNS', 'Projects', 'Skills', 'Contact'].map((item, index) => (
            <Link 
              key={index}
              href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
              onClick={toggleMenu}
              className="block transition-all duration-300 px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-purple-800/30 hover:scale-105 transform"
            >
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-amber-400"></span>
                <span>{item}</span>
              </div>
            </Link>
          ))}
          <Link 
            href="/resume" 
            onClick={toggleMenu}
            className="block transition-all duration-300 mt-2 mx-2 bg-gradient-to-r from-purple-500/80 to-amber-500/80 hover:from-purple-600/90 hover:to-amber-600/90 text-white px-4 py-3 rounded-lg text-base font-medium hover:scale-105 transform"
          >
            Resume
          </Link>
          
          {/* Decorative elements */}
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute left-10 bottom-10 w-10 h-10 bg-amber-500/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </nav>
  );
}