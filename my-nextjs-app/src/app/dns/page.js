'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/DNS/navbar';
import SimpleBackground from '../../components/mainpage/simplebackground';
import DNSHeading from '../../components/DNS/heading';
import Features from '../../components/DNS/features';
import JoinUs from '../../components/DNS/joinus';
import Leadership from '../../components/DNS/leadership';
import Contact from '../../components/DNS/contact';

export default function DNSPage() {
  // State for detecting scroll (similar to main page for nav effects)
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for any potential animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white overflow-x-hidden relative">
      {/* Simple Background Effect */}
      <div className="opacity-80">
        <SimpleBackground />
      </div>
      
      {/* Navbar */}
      <Navbar scrolled={scrolled} />
      
      <main className="relative z-10">
        {/* Hero Section with only the heading component */}
        <section id="home" className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative">
          <div className="w-full max-w-6xl">
            {/* DNS Heading component here */}
            <DNSHeading />
          </div>
        </section>
        
        {/* Introduction Section - Separate from heading */}
        <section id="intro" className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl font-semibold text-white">
                🚀 Developer Network Space (DNS) – Elevate Your Coding Journey! 💻✨
              </p>
              <p className="mt-4 text-lg text-purple-100">
                Are you passionate about coding and seeking excellence? DNS offers an exclusive environment 
                for dedicated developers at SRM University, Vadapalani.
              </p>
              
              <div className="mt-10">
                <a 
                  href="#join-us"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-blue-600/50 transform hover:-translate-y-1 text-lg"
                >
                  Join the Club
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features">
          <Features />
        </section>
        
        {/* Join Us Section */}
        <section id="join-us">
          <JoinUs />
        </section>
        
        {/* Leadership Section */}
        <section id="leadership">
          <Leadership />
        </section>
        
        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-10 border-t border-purple-900/50 bg-black/70 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              {/* DNS Logo */}
              <img 
                src="https://pknfpxunrdaidfveqfha.supabase.co/storage/v1/object/public/images/DNS/dnstransparent.png" 
                alt="DNS Logo" 
                className="h-16"
              />
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-purple-300">
                &copy; {new Date().getFullYear()} Developer Network Space. All rights reserved.
              </p>
              <p className="text-purple-400 text-sm mt-1">
                Designed with ❤️ by DNS Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}