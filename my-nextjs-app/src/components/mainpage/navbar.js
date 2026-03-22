'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
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
    <nav className="fixed top-0 left-0 right-0 z-50 pt-6 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
          EKLAVYA SINGH
        </Link>

        {/* Centered Capsule Navigation */}
        <div
          className={`transition-all duration-500 ease-out ${
            scrolled 
              ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50' 
              : 'bg-white/60 backdrop-blur-md'
          } rounded-full border border-gray-200/50 px-6 py-3 absolute left-1/2 transform -translate-x-1/2`}
        >
          <div className="flex items-center gap-2">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1">
                {['Home', 'DNS', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                  <Link 
                    key={index}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="relative px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-black transition-all duration-300 hover:bg-gray-100/80 group"
                  >
                    <span className="relative z-10">{item}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button 
                  onClick={toggleMenu}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none transition-colors duration-300"
                  aria-expanded={isOpen ? 'true' : 'false'}
                >
                  <span className="sr-only">Toggle menu</span>
                  
                  {/* Hamburger animation */}
                  <div className="flex flex-col justify-center items-center w-6 h-6">
                    <span className={`block h-0.5 w-5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}></span>
                    <span className={`block h-0.5 w-5 bg-gray-800 rounded-full my-1 transition-all duration-300 ease-in-out ${
                      isOpen ? 'opacity-0' : ''
                    }`}></span>
                    <span className={`block h-0.5 w-5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}></span>
                  </div>
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden fixed top-24 left-4 right-4 transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-200/50 p-4 space-y-1">
          {['Home', 'DNS', 'Projects', 'Skills', 'Contact'].map((item, index) => (
            <Link 
              key={index}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              onClick={toggleMenu}
              className="block px-4 py-3 rounded-2xl text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}